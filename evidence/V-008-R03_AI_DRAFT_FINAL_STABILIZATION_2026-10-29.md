# V-008-R03 — AI_DRAFT (NOT YET STUDENT APPROVED)
Date: 2026-10-29
Status: **AI_DRAFT / NOT EXECUTED**
Method: Condition A, Vibe Coding. Base: isolated accepted R02 branch `hardening/v008-r02`. Working branch: `hardening/v008-r03`.
Student original instruction: `بله میپذیرم شروع کن فقط زودتر تمومش کن.` (Exact original acceptance in `evidence/V-008-R02_STUDENT_ACCEPTANCE_AND_R03_START_2026-10-29.md`).

## Proposed exact English Vibe prompt for student review
> Finish V-008-R03 as quickly as possible, focusing only on real release blockers and final user-facing stabilization of Nordljud. Use the existing isolated Vibe branch and do not merge or publish anything. First verify which R02 behaviors can genuinely be tested on an SSO-protected Vercel Preview, and report missing Preview Supabase configuration instead of faking Auth or Cloud success. Run the existing tests, TypeScript check, and production build; add a focused test-first fix only if an actual R03 application defect is found. Check Guest lessons, four levels, two separate sticka senses, Daily Archive, Reminders, seven/fourteen-day Review, Progress, mobile/keyboard use, account-switch safety and helpful failure messages wherever actual browser access allows. Preserve the Swedish datasets, existing records, GitHub research evidence and the independent SDD implementation. Keep all real two-user RLS, Google/email sign-in/recovery, and development-to-Preview release-routing checks marked NOT TESTED until they are really demonstrated. Record the exact commit, actual CI and Vercel deployment identity, passing and blocked cases, and prepare a short R03 acceptance report. Do not change live Auth/Google/SMTP, Production Vercel settings, deploy publicly, merge PR #1/#2, or begin V-009 without my separate approval.

## Scope limits and no-fabrication rules
- Approval to start *planning* R03 and perform read-only diagnostics is already recorded; **this proposed exact R03 coding prompt is still AI_DRAFT**, not approved for code/test modifications.
- No CI run, browser test, new R03 source/test file or code fix may be described as complete based only on this draft.
- R03 can assess and document actual permission/configuration blockers now. Any live environment changes, test accounts or sending emails require a separate scoped student authorization.
- Previous baseline CI: [GREEN 94/94](https://github.com/alikhalessi/nordljud-swcon2627-r2/actions/runs/40928342244); post-acceptance exact HEAD not yet independently CI verified.
- R02 Production schema was applied and verified under migration `20261029192724`; do not apply it again.

## Persian translation for student review (AI translation, not the original prompt)
«لطفاً V-008-R03 را هرچه سریع‌تر به پایان برسان و فقط روی موانع واقعی انتشار و تثبیت نهایی تجربهٔ کاربری Nordljud تمرکز کن. فقط در شاخهٔ جداگانهٔ Vibe کار کن و هیچ چیزی را Merge یا عمومی منتشر نکن. اول روشن کن کدام قابلیت‌های R02 واقعاً در Preview محافظت‌شدهٔ Vercel قابل آزمایش هستند و اگر اتصال Supabase در Preview تنظیم نیست، ورود و ذخیره‌سازی ابری را موفق اعلام نکن. تست‌های موجود، TypeScript و Build را اجرا کن؛ فقط اگر با نقص واقعی R03 روبه‌رو شدی، با روش تست‌اول آن را اصلاح کن. هر جا دسترسی واقعی مرورگر وجود دارد، حالت مهمان، چهار سطح، دو معنی مجزای sticka، آرشیو روزانه، یادآوری‌ها، مرور ۷/۱۴روزه، پیشرفت، استفاده با موبایل/کیبورد، ایمنی جابه‌جایی حساب و پیام‌های خطا را بررسی کن. داده‌های سوئدی، اطلاعات موجود، شواهد پژوهش و نسخهٔ مستقل SDD را حفظ کن. آزمون واقعی جداسازی دادهٔ دو حساب، ورود گوگل/ایمیل/بازیابی رمز و مسیر توسعه به Preview را تا زمان مشاهدهٔ واقعی NOT TESTED نگه دار. SHA، نتیجهٔ واقعی CI، شناسهٔ Vercel، آزمون‌های موفق و مسدود و گزارش پذیرش کوتاه R03 را ثبت کن. بدون مجوز جداگانهٔ من تنظیمات زندهٔ Auth/Google/SMTP یا Production Vercel را تغییر نده، انتشار عمومی یا Merge انجام نده و V-009 را آغاز نکن.»

### Human review gate
User may modify or approve the **exact English prompt** above. Before that, **do not execute Vibe coding changes**. Read-only inspection and factual evidence writing are permitted and must be labelled accurately.
