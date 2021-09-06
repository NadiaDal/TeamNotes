### Application features
To-Do App
- dashboard with a notes list
- add and update todo items
- rearrange notes pressing on up and down arrow buttons
- autosave todo list on close and restore on open
- collaborative add and update notes in real-time from multiple users

### State management

The state is based on the Redux library.

[Automerge](https://github.com/automerge/automerge) is chosen as a library for building collaborative applications.
It is supposed to solve the problem of merging non conflicted data received from multiple clients.

### Network
Connection to the server using WebSockets

### UI
UI is built on the top of `react-native-elements`

### What to improve
Show to user not resolved conflicts and implement UI for resolving

Use Automerge.Text data type to allow collaborative editing text in one note

Add tests

Add user and multi-team management

### Running on simulator

- [setup](https://reactnative.dev/docs/environment-setup) environment for your OS
- run simulator
- clone repository `git clone <REPO>`
- update API_URL in .env file `mv .env.exaple .env`
- install dependency running from the root `npm install`
- run  from the root scripts `start` and `android` or `ios`
- to run tests and lint run scripts `test` and `lint`
