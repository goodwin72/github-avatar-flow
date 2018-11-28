#GitHub Avatar Flow Code Challenge
##Requirements Document - v1.1

---

### Overview
This project aims to provide:
- a client application for viewing the GitHub avatars for public repository owners, as well as viewing the followers for owners whose usernames start with the letter A (case-insensitive).
- a backend application for querying the GitHub API for the aforementioned information, processing the information, and returning to the client app the data that it needs.

As this project is being developed for a coding challenge, **the requirements are mostly those that were specified by the challenge's criteria**. This includes both functional criteria, such as features that the client application should be able to perform, as well as non-functional criteria, such as the use of particular technologies.

However, there are a few places where the functional requirements are open-ended in the original prompt. **In these cases, the functional requirements were decided based upon assumptions of realistic use cases for this project in the real world**.

### Requirements
#### Stakeholders
As this project is to be developed for a coding challenge, the only real stakeholder is the **the team giving the challenge**. 

However, as this project is meant to mirror the process of creating software for a real-world user base who are desiring its functionality, **I have designed it with the assumption that this hypothetical user base exists, and will be using this software**.

#### User stories (Functional Requirements)
| # | Title | Description | Priority | Notes |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 1 | Avatar display | A user wants to view the avatars of owners of public repositories | Necessary | The challenge's specifications requested fitting as many avatars as possible on screen at once. I've assumed that this means "as many as possible *without compromising usability and accessibility*". As such, the images should be fit closely together, but still easily discernable from each other. |
| 2 | View more users/avatars | A user wants to view more avatars than those they are initially shown. | Assumed Necessary | With how large GitHub's collection of images is, it won't be possible to load all of them on the page at once. While the specifications did not state whether users should be able to view more avatars than those initially loaded, in the real-world, I would strongly assume that this feature would be expected. |
| 3 | Follower display for certain users | A user wants to view a list of followers for public repository owners whose username starts with the letter A, case-insensitive | Necessary | As I am assuming this software will be used by a real-world user base searching for this functionality, *avatars for owners fulfilling this criteria should be highlighted in some way on-screen to streamline the user experience*.|
| 4 | Detail display | A user wants to view details about a repository owner when they click on their avatar | Desirable | This requirement was listed as a bonus feature in the challenge's specifications. It was not stated whether this feature should apply to all avatars on the page, so I've assumed that it should be possible for all if implemented. |
| 5 | Filter users shown | A user wants to view the avatars for only users meeting particular criteria | Desirable, not a focus | This requirement was also listed as a bonus feature. Given that this requirement is a bonus, and could include an arbitrary number of different possible filtering criteria, I've decided to not focus on it, and leave it for last. If it is implemented, I will update this description with more specific details based on what filters I implement. |

#### Non-functional requirements
The challenge set several non-functional requirements concerning the use of particular technologies. They also set several other non-functional requirements that would be applicable to a hypothetical user base, as well.

##### Of interest to just the challenge
- Use a Node.js API to query the GitHub API
- Do not query the GitHub API directly from the client application
- Do not return data to the client that it does not need
- Use Vue, Angular, or React as a framework for the client app
- Use Bootstrap for UI components
- Start with repository 1000

##### Of interest to the challenge and hypothetical users
- Avoid rate limiting from the GitHub API by keeping the number of queries to it at a minimum
- If rate limiting (or another connection failure to the GitHub API) occurs, handle the error gracefully.
