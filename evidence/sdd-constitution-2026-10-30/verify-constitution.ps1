param()

# Documentary/preservation verification for this Constitution draft only.
# Never invokes a Spec Kit stage, hook, provider, network command or application test.
$ErrorActionPreference = 'Stop'
$taskRoot = (Resolve-Path (Join-Path $PSScriptRoot '../..')).Path
$encoding = New-Object System.Text.UTF8Encoding($false)
$checks = New-Object 'System.Collections.Generic.List[object]'
$commands = New-Object 'System.Collections.Generic.List[object]'

function Read-ProjectText([string]$Path) {
    [System.IO.File]::ReadAllText((Join-Path $taskRoot $Path)).Replace("`r`n", "`n")
}

function Add-Check([string]$Name, [bool]$Pass, $Details) {
    $status = if ($Pass) { 'PASS' } else { 'FAIL' }
    $checks.Add(@{ Name = $Name; Status = $status; Details = $Details })
}

function Read-Git([string[]]$GitArguments) {
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $lines = @(& git -C $taskRoot @GitArguments 2>&1 | ForEach-Object { [string]$_ })
        $code = $LASTEXITCODE
    } finally {
        $ErrorActionPreference = $oldPreference
    }
    $commands.Add(@{ Executable = 'git'; Arguments = @('-C', $taskRoot) + $GitArguments;
        ExitCode = $code; Output = $lines })
    if ($code -ne 0) { throw ('Git check failed: ' + ($GitArguments -join ' ')) }
    return ,$lines
}

$before = Read-ProjectText 'evidence/sdd-constitution-2026-10-30/pre-edit-state.json' | ConvertFrom-Json
$branch = (Read-Git @('branch', '--show-current')) -join "`n"
$head = (Read-Git @('rev-parse', 'HEAD')) -join "`n"
Add-Check 'branch_and_starting_revision' ($branch -eq $before.Branch -and $head -eq $before.HEAD) @{ Branch=$branch; HEAD=$head }

foreach ($inputRecord in $before.ApprovedInputs) {
    $filePath = Join-Path $taskRoot $inputRecord.Path
    $rawHash = [string](Get-FileHash -LiteralPath $filePath -Algorithm SHA256).Hash
    $blob = (Read-Git @('rev-parse', ('HEAD:' + $inputRecord.Path))) -join "`n"
    $rawBlob = (Read-Git @('hash-object', '--no-filters', '--', $inputRecord.Path)) -join "`n"
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $lfBytes = [System.Text.Encoding]::UTF8.GetBytes(
        [System.Text.Encoding]::UTF8.GetString($bytes).Replace("`r`n", "`n"))
    $header = [System.Text.Encoding]::ASCII.GetBytes(('blob ' + $lfBytes.Length + [char]0))
    $sha1 = [System.Security.Cryptography.SHA1]::Create()
    try {
        $normalized = [System.BitConverter]::ToString(
            $sha1.ComputeHash([byte[]]($header + $lfBytes))).Replace('-', '').ToLowerInvariant()
    } finally { $sha1.Dispose() }
    Add-Check ('approved_input:' + $inputRecord.Path) ($rawHash -eq $inputRecord.RawSHA256 -and
        $blob -eq $inputRecord.Blob -and $normalized -eq $inputRecord.Blob) @{
        RawSHA256=$rawHash; UnchangedBytes=($rawHash -eq $inputRecord.RawSHA256);
        HEADBlob=$blob; RawWorkingBlob=$rawBlob; LFNormalizedBlob=$normalized;
        ExpectedBlob=$inputRecord.Blob; Normalization='in memory only'
    }
}

$allowed = @('.specify/memory/constitution.md', '.specify/templates/plan-template.md',
    '.specify/templates/spec-template.md', '.specify/templates/tasks-template.md',
    '.specify/templates/checklist-template.md', 'README.md')
$changed = Read-Git @('diff', '--no-ext-diff', '--no-textconv', '--name-only')
$staged = Read-Git @('diff', '--cached', '--no-ext-diff', '--no-textconv', '--name-only')
$unexpected = @($changed | Where-Object { $_ -notin $allowed })
$missing = @($allowed | Where-Object { $_ -notin $changed })
Add-Check 'tracked_change_scope' ($unexpected.Count -eq 0 -and $missing.Count -eq 0 -and
    $staged.Count -eq 0) @{ Actual=$changed; Unexpected=$unexpected; Missing=$missing; Staged=$staged }
$untracked = Read-Git @('ls-files', '--others', '--exclude-standard')
$outsideEvidence = @($untracked | Where-Object { -not $_.StartsWith('evidence/sdd-constitution-2026-10-30/') })
Add-Check 'new_file_scope' ($outsideEvidence.Count -eq 0) @{ Files=$untracked; Unexpected=$outsideEvidence }

$document = Read-ProjectText '.specify/memory/constitution.md'
$placeholders = @([regex]::Matches($document, '\[[A-Z][A-Z0-9_]*\]') | ForEach-Object { $_.Value })
$todos = @([regex]::Matches($document, 'TODO\(([^)]+)\)') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique)
Add-Check 'no_unexplained_constitution_placeholders' ($placeholders.Count -eq 0 -and
    $todos.Count -eq 1 -and $todos[0] -eq 'RATIFICATION_DATE') @{ BracketTokens=$placeholders; Deferred=$todos }
$versionPass = $document.Contains('unversioned stock template -> 0.1.0') -and
    $document.Contains('**Version**: 0.1.0') -and
    $document.Contains('**Drafted:** 2026-10-30') -and
    $document.Contains('**Last Amended**: 2026-10-30') -and
    $document.Contains('**Status:** DRAFT') -and $document.Contains('NOT RATIFIED')
Add-Check 'version_dates_and_review_status' $versionPass @{ Version='0.1.0'; Drafted='2026-10-30'; Ratification='PENDING' }
$principles = @([regex]::Matches($document, '(?m)^### ([IVX]+)\. ') | ForEach-Object { $_.Groups[1].Value })
Add-Check 'template_heading_hierarchy' (($principles -join ',') -eq 'I,II,III,IV,V,VI,VII,VIII' -and
    $document.Contains('## Core Principles') -and $document.Contains('## Governance')) @{ Principles=$principles }
Add-Check 'no_unqualified_should_rules' (-not [regex]::IsMatch($document, '(?i)\bshould\b')) 'Normative rules use MUST; substantive review is recorded separately.'

$hookExists = Test-Path -LiteralPath (Join-Path $taskRoot '.specify/extensions.yml')
Add-Check 'post_execution_hook_file_absent' (-not $hookExists) @{ Exists=$hookExists; HooksExecuted=$false }
$freeze = Read-Git @('for-each-ref', '--format=%(refname) %(objectname)',
    'refs/heads/freeze/v009-vibe-research-2026-10-29',
    'refs/remotes/origin/freeze/v009-vibe-research-2026-10-29')
Add-Check 'cached_freeze_anchor_unchanged' ($freeze -contains
    'refs/remotes/origin/freeze/v009-vibe-research-2026-10-29 0b5a4a58631503c3a454ecc36d62b892c569ef14') @{
    Observed=$freeze; Limitation='Cached ref only; no remote contact. Local freeze ref absent at start.'
}
$requestCopy = Join-Path $PSScriptRoot 'request-as-received.txt'
$requestSource = 'C:\Users\alikh\.codex\attachments\37c80f6c-c5ba-4dcc-9b9c-91452422f471\Pasted text.txt'
$copyHash = [string](Get-FileHash -LiteralPath $requestCopy -Algorithm SHA256).Hash
$sourceHash = [string](Get-FileHash -LiteralPath $requestSource -Algorithm SHA256).Hash
Add-Check 'received_request_exact_bytes' ($copyHash -eq $sourceHash) @{ SourceSHA256=$sourceHash; CopySHA256=$copyHash }
$requestText = [System.IO.File]::ReadAllText($requestCopy)
$match = [regex]::Match($requestText, '(?s)```text\r?\n(\$speckit-constitution\r?\n.*?)```')
$retainedInput = [System.IO.File]::ReadAllText((Join-Path $PSScriptRoot 'constitution-input.txt'))
Add-Check 'exact_constitution_block_retained' ($match.Success -and $match.Groups[1].Value -ceq $retainedInput) 'Exact text extracted from the received wrapper, not reconstructed.'

$whitespace = Read-Git @('-c', 'core.whitespace=cr-at-eol', 'diff', '--check', '--no-ext-diff', '--no-textconv')
Add-Check 'git_diff_whitespace' ($whitespace.Count -eq 0) $whitespace
$gitVersion = Read-Git @('--version')
$finalStatus = Read-Git @('--no-optional-locks', 'status', '--porcelain=v1', '--branch', '--untracked-files=all')

$resultNumber = 1
do {
    $resultPath = Join-Path $PSScriptRoot ('validation-{0:D3}.json' -f $resultNumber)
    $resultNumber++
} while (Test-Path -LiteralPath $resultPath)
$failed = @($checks | Where-Object { $_.Status -eq 'FAIL' })
$result = @{ Kind='Constitution documentary/preservation checks; not application acceptance';
    Date='2026-10-30'; Timezone='Europe/Helsinki'; StartingHEAD=$before.HEAD; CurrentHEAD=$head;
    Passed=($failed.Count -eq 0); Checks=$checks.ToArray(); Commands=$commands.ToArray();
    GitVersion=$gitVersion; GitStatus=$finalStatus; RuntimeTests='NOT TESTED';
    Ratification='PENDING'; LaterStages='NOT EXECUTED'; ResultPath=$resultPath }
[System.IO.File]::WriteAllText($resultPath, ($result | ConvertTo-Json -Depth 10), $encoding)
$result | ConvertTo-Json -Depth 10
if ($failed.Count -gt 0) { exit 1 }
