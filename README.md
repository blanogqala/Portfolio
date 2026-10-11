# Bathandwa Nogqala — Portfolio

Responsive, dependency-free HTML/CSS/JavaScript portfolio. Redesigned from the existing page-turning portfolio with content updated from the October 2026 CV.

## Run locally

```sh
python -m http.server 4173
```

Open http://localhost:4173. No build step or runtime environment variables are required. Relative asset paths support both root hosting and GitHub Pages project paths.

## Content and design

- Warm neutral background, purple accent, editorial typography and existing portrait.
- Original Dashboard and CAPACITI chatbot projects, screenshots and source/demo links retained.
- EloFix and MediNathi are attributed to LITI Holdings. Their graphics are explicitly illustrative, not product screenshots. No confidential data or source code is included.
- Experience dates and education updated using the supplied CV. Earlier Boxer experience and personal achievements retained in an expandable section.
- LinkedIn corrected to the public profile URL in the CV.
- CV available on request rather than exposing the source PDF's residential address and phone numbers.
- Existing Web3Forms integration retained. Requests time out after 15 seconds; errors preserve the entered message and offer email fallback. The public access key is the original site's form identifier. Delivery still depends on the existing Web3Forms account configuration.
- No analytics or tracking added. Google Fonts is an optional external font request; local font fallbacks are provided.

Inspiration: the scannable experience/project structure at https://brittanychiang.com/, interaction care at https://rauno.me/, and the supplied Canvas Lab's Manrope/DM Sans typography and restrained purple palette. Original implementation; no reference-site code copied.

## Before publication

Review company-project wording and public disclosure permissions. Confirm existing demo links are still the destinations you want. MediNathi intentionally has no guessed live URL. The two existing Credly badges remain separate from the CV's course list because their titles were not verified. The old site's ambiguous “CompTIA A+ — CISCO Networking Academy” claim was not repeated; verify the credential before adding it.

Deploy only after design/content approval. Keep the existing hosting provider: this is a static site compatible with GitHub Pages and Vercel. No domain or deployment settings changed by this redesign.

## Checks

Use `node --check script.js` and `git diff --check`. Browser checks should cover mobile navigation, keyboard access, project filters, expandable details, no horizontal overflow, and mocked contact success/failure. Never send test messages to the real recipient during automated checks.

### Validation completed in this change

- `node --check script.js` and `git diff --check` passed.
- Chromium/Playwright: no horizontal overflow at 1440, 768, 390 and 320 px; mobile menu open/close, project filters, case-study expansion and internal anchor targets passed; no JavaScript errors.
- Contact form success and failure were tested with intercepted requests only. Real message delivery was not tested.
- Desktop and mobile screenshots inspected. External fonts did not load in the test environment, so screenshots also verify the fallback font layout.
- GitHub push and connector write were blocked by missing write authorization. No remote branch, pull request, merge or deployment was created.

## Screenshot and motion update

- Added the supplied EloFix marketing/request-flow and MediNathi marketing/practice screenshots.
- Replaced Everyday Dashboard with AI-Powered Learning and corrected the chatbot's technology description to match its current repository.
- Added gentle portrait floating, pointer-based 3D card tilt, scroll reveals, reading progress and active navigation. Motion can be paused; operating-system reduced-motion preferences disable it. Mobile avoids pointer-based motion.
- Browser checks cover 1440/768/390/320 px layouts, filters, gallery visibility, navigation, motion controls and JavaScript errors. Application source builds and 20 mocked backend tests also pass. Live AI configuration is still required; no claim of deployed repairs is made.
