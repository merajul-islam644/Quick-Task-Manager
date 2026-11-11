# Plan 1 · First version

Every Blocks line names the skill `.studio/blocks-usage.md` gave it. This run builds T01 only.

## T01 Sign in, create an account, and land on a dashboard with 3 sample tasks (AU-01, TS-01)
- [x] Restyle the shell with the app's tokens and logo (app's own styling, no skill)
- [x] Copy the design kit and set light, dark and auto mode (app's own styling, no skill)
- [x] Opening screen and sign-in button, hosted sign-in (blocks-bootstrap, blocks-iam-sso-oidc-implementation)
- [x] Wire sign out in the account menu back to the opening screen (blocks-iam-account)
- [x] Define the Task record type with owner-only access (`blocks-data-gateway-configuration`)
- [x] Read the person's own tasks and the tab counts (`blocks-data-gateway-crud`)
- [x] Seed the 3 sample tasks once for a new account (`blocks-data-gateway-crud`)
- [x] Show Home's list, filters and empty state with real tasks (app's own screens, no skill)
- [x] Translate the app's words in its own module (`blocks-localization-configuration`)
- [x] Check and build app
