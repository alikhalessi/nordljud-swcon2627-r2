# Educational input provenance — Round 2

**Source:** Owner's earlier private [Nordljud pilot](https://github.com/alikhalessi/nordljud-software-construction), branch `baseline-v1`, folder `shared-content/`. We deliberately import **data**, not prior application source. This is an informed redevelopment, not a blind independent experiment.

The files `verb-library/A2.json`, `B1.json`, `B2.json`, `C1.json` and `mission-seeds.json` were copied *byte-for-byte in Git blob identity* from the pilot, and their blob SHAs match. The corresponding GitHub source folder predates the prior A/B/C implementation.

| Level | Sense records | Source Git blob SHA |
|---|---:|---|
| A2 | 456 | `b0064f93419503fe4ff967303490bb31284a3959` |
| B1 | 456 | `b2ea9af945b72eafc008df20e5cc23541a0c6d9a` |
| B2 | 456 | `11d79a803d72c7172eda5f09894e4e514c434ec6` |
| C1 | 456 | `7b9e7121faf5c45038d845e92eda4f76b886c9cb` |

There are 1,824 level-specific sense records, but **456 sense records / 455 unique written verb spellings per level**, not 456 unique spellings. The two records spelled `sticka` represent distinct meanings and must retain separate identities. The older pilot SOURCE_MANIFEST's phrase “456 base verbs” is imprecise; preserve the original historical text but correct that interpretation for Round 2.

**Earlier upstream provenance:** The pilot reports recovery from the owner's earlier Swedish-learning materials (`Nordlyd_3B_Demo.html`, `Nordlyd_3B_1_Ready_To_Deploy.zip`, 8 October 2026), themselves describing educational material from previously provided Swedish-learning PDFs. Those primary PDFs and any distribution licenses have *not* been rechecked. Existing Swedish examples, translations and level grading are **not Swedish-teacher-validated**.

Blank verb forms/examples were preserved; missing text must not be hallucinated. Mission seeds are existing metadata, not an implemented application.

**Publication caveat:** Keep this academic repo private until underlying data rights and educational accuracy are reviewed. Do not publish elevated credentials, real user records or live authentication secrets.

This manifest supports reuse of common *inputs*. It does not permit copying old HTML/CSS/React/auth logic/tests into the new implementations.
