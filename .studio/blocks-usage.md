# Blocks work for this run

## AU-01 Sign in and create an account
- **Blocks work**
  - sign-in: hosted sign-in page through the scaffold's OIDC client; one "Sign in or create an account" button on the opening screen starts it (plan).
  - self sign-up: project sign-up read at runtime with the SDK's public sign-up settings; the button's label follows it (plan). Turned on for the project (one switch).
  - records: a `Task` record type for each person's tasks and the 3 sample tasks a new account starts with (plan). Access: Custom on read, write, edit and delete, row policy `CreatedBy` = signed-in person, so only the owner sees and changes their own.
  - account menu: signed-in person's own profile (`iam.me`) and sign-out (`auth.logout`) from the SDK.
- **The plan left out**: sign-up was off for the project; turned on (anyone can create an account, as the brief's "app" type says). Social sign-in not needed.
- **Skills**: `blocks-bootstrap` (scaffold), `blocks-data-gateway-configuration`, `blocks-data-gateway-crud`, `blocks-iam-account`.

## TS-01 See my tasks
- **Blocks work**
  - records: read the person's own `Task` records (plan); owner-only access rule does the guarding, the screen just lists them.
  - counts: worked out in the app from the listed records (the gateway has no count API).
- **The plan left out**: nothing.
- **Skills**: `blocks-data-gateway-crud`, `blocks-data-gateway-configuration`.

## TS-02 Add a task (later step; the Task record type is created now)
- **Blocks work**: records: create a `Task` (plan). Write access is the owner's policy.
- **The plan left out**: nothing.
- **Skills**: `blocks-data-gateway-crud`.

## TS-03, TS-04, TS-05 (later steps)
- **Blocks work**: records: edit `done`, `title`, `dueDate`, delete (plan). Owner-only edit and delete policies.
- **The plan left out**: nothing.
- **Skills**: `blocks-data-gateway-crud`.

## NU-01 See my statistics (later step)
- **Blocks work**: records: read the person's own tasks and count them in the app (plan; no gateway count API).
- **The plan left out**: nothing.
- **Skills**: `blocks-data-gateway-crud`.

## AC-01 See my account (later step)
- **Blocks work**: sign-in: `iam.me` for name, email and created date; `auth.logout` for sign out (plan).
- **The plan left out**: nothing.
- **Skills**: `blocks-iam-account`.

## GN-01 Move around on a phone (later step)
- **Blocks work**: no Blocks service; plain UI (responsive layout of the existing screens).
- **The plan left out**: nothing.
- **Skills**: none.

## Languages
- The app's words live in its own translation module `app-9935c5f9`; the project's languages decide the switch. Report any language change as one project change.

## Sample tasks
- The 3 sample tasks (Finish project report done, Read a book today, Go for a walk tomorrow) are created once, when the person's list is first found empty.
