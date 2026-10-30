### Questions requiring the student's decisions

#### Question 1: Guest persistence and account import

**Context**: FR-009 requires appropriate browser-scoped Guest state to survive refresh without unrelated account mixing.

**What we need to know**: Which Guest records should persist, what clears them, and should signing in offer any deliberate import?

| Option | Answer | Implications |
| --- | --- | --- |
| A | Retain level/selected sense, per-sense favorites/studied and Q2-defined progress/results in the same browser until explicitly cleared or browser data is cleared; keep Guest and account records separate, with no import. | Broad Guest continuity with a clear ownership boundary; no transfer flow is added. |
| B | Retain level/selected sense and per-sense favorites/studied only; mission/practice state is not retained across refresh; keep Guest/account records separate. | Smaller persistent Guest scope, with the refresh limitation visible to learners. |
| C | Retain the categories in A and offer deliberate user-confirmed import into the authenticated user's own state. | Adds a reviewed transfer/deduplication decision; never an automatic merge or another account's ownership. |
| Custom | State the exact persistent categories, clearing boundary and import rule. | The selected boundary will be recorded before affected requirements are finalized. |

**Your choice**: Awaiting student response. A is a proposal, not an adopted default.

#### Question 2: Mission completion and saved practice records

**Context**: FR-012 requires supported account-owned completion/results to survive refresh and sign-out/in; FR-005 never awards correctness credit for wrong or revealed answers.

**What we need to know**: What makes a mission complete, and what practice result/history depth must be saved?

| Option | Answer | Implications |
| --- | --- | --- |
| A | Mark completion after both source-supported checks have independent correct responses; save mission status and the latest result for each check alongside favorites/studied. | A bounded progress record; incorrect/revealed responses do not themselves complete the mission or earn correctness credit. |
| B | Let the learner explicitly mark mission completion as self-report; save that status and latest practice results separately. | Completion is clearly self-reported, not an assessed score or verified mastery; wrong/reveal credit remains zero. |
| C | Require both checks to be independently correct for completion and retain a history of practice attempts. | Preserves more review history; its retention/clearing boundary must then be specified before implementation. |
| Custom | State the completion rule and saved result/history categories. | The selected rule must remain distinguishable from mastery and preserve honest scoring. |

**Your choice**: Awaiting student response. No completion or retention policy is adopted by this draft.

#### Question 3: A selected sense has no target-level counterpart

**Context**: FR-008 requires an explanation and prohibits silently substituting an unrelated meaning when no legitimate target-level counterpart exists.

**What we need to know**: What should the learner experience at that boundary?

| Option | Answer | Implications |
| --- | --- | --- |
| A | Keep the selected sense identity visible, explain that it is unavailable at the target level, and let the learner explicitly choose another sense to resume supported study there. | Preserves semantic context while making the temporary unavailability explicit. |
| B | Explain the absence, clear active selection in the target level and require a new explicit selection before study/practice resumes. | No stale target-level content is shown; the previous sense is not presented as active there. |
| C | Ask before completing the level change: remain at the previous level or continue by explicitly selecting another target-level sense. | Makes the choice explicit before navigation changes; no automatic unrelated replacement. |
| Custom | Describe another explicit, truthful no-counterpart interaction. | It must preserve legitimate matches and never silently substitute meaning. |

**Your choice**: Awaiting student response. No interaction option is adopted by this draft.
