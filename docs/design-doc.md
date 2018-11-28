#GitHub Avatar Flow Code Challenge
##Design Document - v1.0

---

## Overview
GitHub Avatar Flow displays the avatars for owners of public repositories on GitHub, and allows for more information to be shown when the user hovers over an avatar. To accomplish these goals, the software uses a browser-based client app made in React, as well as a backend server and API using Node.js and Express.

## Application Design
### Major systems

#### Client application
The client application utilizes React to render the **view** - the representation of the data returned from the server - to the user. It does not make requests directly to the GitHub API; instead, it makes calls to the Node API, which makes those requests and processes the returned information instead.

#### Backend API
The backend uses Node and Express to create an API that will serve as a **controller**, retrieving information from the GitHub API for the client application. After receiving the information, the backend processes it, and returns to the client app only the information that it needs. 

### Subsystems
#### Client application
The client application consists of several components:

##### Navbar
- Stateless component that shows the name of the project and visually 'grounds' the page (even though there is no navigation on the site).

##### AvatarList
- Stores the data returned from the backend in state in an array of users. This data consists of an avatar URL (string), a username (string), a user ID used as a key for each Avatar component when rendered (string), and a list of users that follow that user (array of strings).
- Contains render logic to handle displaying a list of Avatar components and give special CSS styling to Avatars associated with a username beginning with 'A', case-insensitive.
    - Each Avatar's React key will be its associated user's id
- Defines an 'onHover' callback function passed to Avatar components that displays the followers for the user associated with that avatar. Like the styling above, this callback is passed to avatars associated with a username that starts with 'A', case-insensitive.

##### Avatar
- Stateless component that displays the profile image for a user on GitHub.
- Can contain the aforementioned onHover callback that displays the user's follower list.

#### Backend API
The backend API will consist of two GET routes, both of which will query the GitHub API using Axios and return only the data that the frontend will need.

##### GET /repos/:since
- Parameters: 
    - Since (integer)
- Queries the GitHub API for a list of public repos, beginning with the number specified in the query 'since' parameter.
- The GitHub API will only return a [page](https://developer.github.com/v3/guides/traversing-with-pagination/) of the full repo list. When the user needs more repos, we'll send another request starting from the last one they have seen.
- Processes the data into an array of objects, each containing **the repo owner's login, the repo owner's id, and the URL link to their avatar**.

##### GET /followers/:login
- Parameters: 
    - Login (string)
- Queries the GitHub API for the logins of all of the users who follow the specified user.
- Processes the data into an array of objects, each containing **the followers owner's login and their id**.

## UI Mockup
![UI mockup](ui-mockup.jpg "UI mockup")

## Coding Style
The code base will use follow the Airbnb coding style with a few modifications:
- arrow-body-style: always
- quote-props: always
- prefer-const: false
- newline-after-import: false (only disabled because it appears to be giving false positives)

ESLint will be used to enforce the coding style.
(As I am new to the Airbnb style, this list may be modified over time as I discover more of the rules defined by the style.)

## Testing
The React frontend and the Node backend will both be tested using Jasmine. To help Jasmine test React components, Enzyme will also be used for testing the frontend (specifically, through the use of the Jasmine-Enzyme project).

### Frontend
- React components will need to be tested for correct output and, in the case of the Avatar component, proper reaction to the onHover event.

### Backend
- Both of the routes will be tested using a mock server to stand in-place of GitHub's servers - the app will get predetermined data from our mock server instead of the real one.

- The processing functions will be tested using mock data taken from a real request, also to avoid having tests require calls to the GitHub server. (This both speeds up the tests and avoids rate limiting during development.)
