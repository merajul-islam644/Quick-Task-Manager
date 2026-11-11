# Plan 1 · First version

**How to build it**
What kind of thing this is: Records app.
The app has a fixed sidebar (a compact header and menu on phones) with Home, Statistics and Settings, and each page is drawn from the design kit. Tasks are kept as records that belong to the signed-in person, so only they see, add, change and remove their own; the summary cards, the filter tab numbers and the statistics screen are all counted from those tasks at the moment they are shown. Signing in and creating an account happen on the hosted sign-in page. A new account is given the 3 sample tasks once, when it is first opened.
No library beyond the starter's.
Not this way: Keeping tasks in the browser only: each person's tasks then live on one device and vanish with the browser, so tasks are kept as records tied to the signed-in person instead.
Not this way: A pop-up dialog for adding a task: the owner asked for a card on the dashboard so adding stays one quick step.
Prove by running (reading the code is not enough for these):
- AU-01 AC2: Create a fresh account in a browser and check the dashboard lists 3 tasks and the Total tasks card reads 3.
- TS-01 AC1: Seed 3 tasks with one done, open Home, and read the tab numbers All 3, Pending 2, Completed 1 and the green Completed label.
- TS-02 AC2: Type only spaces into the task input, press Enter, and check nothing is added and "Write the task first." appears.
- TS-03 AC1: With 3 pending tasks, click the second task's checkbox and check it stays second while the cards read Total 3, Completed 1, Pending 2.
- TS-05 AC2: With 4 tasks, run Clear All then Cancel and confirm 4 remain; run it again with Delete all and confirm the empty state.
- NU-01 AC2: Open Statistics with 5 tasks and 2 done, mark one more done on Home, and check Statistics reads Completed 3, Pending 2.
- GN-01 AC1: Open Home in a 390 pixel wide viewport and check the compact header with a menu button and no horizontal scrolling.
Answer each of these with a `check_verified` line that says `by: ran` and what you saw; without that, the check is recorded as claimed, not held.
Risks:
- Sample tasks are added when an account is created; a second visit must not add them again.
- Names and email addresses come from the hosted sign-in page, so Settings can only show what was given at sign-up.

**What this plan does**
- Adds AU-01 Sign in and create an account
- Adds TS-01 See my tasks
- Adds TS-02 Add a task
- Adds TS-03 Mark a task done
- Adds TS-04 Edit a task
- Adds TS-05 Delete a task
- Adds NU-01 See my statistics
- Adds AC-01 See my account
- Adds GN-01 Move around on a phone

**Built with (Blocks)**: what the plan says each feature uses and why. `.studio/blocks-usage.md` starts from these lines: keep each, and add what a feature needs that they miss.
- AU-01 Sign in and create an account
  - sign-in: People sign in on the hosted sign-in page and come back to their own dashboard.
  - self sign-up: Anyone can create an account and start using the app straight away.
  - records: Keeps each person's tasks, and the 3 sample tasks a new account starts with.
- TS-01 See my tasks
  - records: Reads the person's tasks and works out each tab's number from them.
- TS-02 Add a task
  - records: Adds the task to the person's list.
- TS-03 Mark a task done
  - records: Saves the change from pending to done, and back.
- TS-04 Edit a task
  - records: Saves the changed text and due date on the task.
- TS-05 Delete a task
  - records: Removes the task, or every task of the person, after they confirm.
- NU-01 See my statistics
  - records: Counts the person's tasks to show the three numbers.
- AC-01 See my account
  - sign-in: Shows who is signed in and signs them out.
  - records: Nothing here; the account is shown, not changed.

**Build steps**
- [ ] **T01 Sign in, create an account, and land on a dashboard holding 3 sample tasks** — Covers AU-01 (Sign in and create an account), TS-01 (See my tasks). Done when AU-01 AC1–AC3 and TS-01 AC1–AC3 hold
- [ ] **T02 Add a task from the dashboard card, by button or Enter** — Covers TS-02 (Add a task). Done when TS-02 AC1–AC2 hold
- [ ] **T03 Check a task off in place, and reopen it** — Covers TS-03 (Mark a task done). Done when TS-03 AC1–AC2 hold
- [ ] **T04 Change a task's text or due date, and delete tasks including Clear All** — Covers TS-04 (Edit a task), TS-05 (Delete a task). Done when TS-04 AC1–AC2 and TS-05 AC1–AC2 hold
- [ ] **T05 Live counts on the statistics screen, and the person's own account on Settings** — Covers NU-01 (See my statistics), AC-01 (See my account). Done when NU-01 AC1–AC2 and AC-01 AC1–AC2 hold
- [ ] **T06 The same dashboard on a phone: compact header, menu, stacked cards** — Covers GN-01 (Move around on a phone). Done when GN-01 AC1–AC2 hold

This run builds T01, T02, T03, T04, T05, T06, one step at a time: Studio gives you each step when the one before it is done.
