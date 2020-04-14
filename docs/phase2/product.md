# Technical product report

## What did you actually build during this phase?

- We were able to unify and streamline the building process to let the backend serve an optimized version of the frontend.
- Atlas connection was successfully established and open for modification, whereas before we had a deprecation error with Atlas.
- Backend infrastructure was revamped and restructured for a better-ordered development file system.
- Experimental: In a WIP branch, we are able to serve the full stack with a fully packagable, executable Electron app. This is still in beta testing to make sure the app works.
- The components to render the fillable form page are completed.
- We were also able to enhance the "Kanban" board on Github to provide developers with good-first-issue, dedicated, or veteran tasks, which has led to a more productive commit schedule since the team now always knows what to do next.
- Some Building CI tests were implemented to make sure no one submits broken code.

### How is this different from what you originally proposed? Why?

- Not a lot is quite different from what we originally proposed; we are, in fact, on schedule with our timelines of deliverables. Especially with the extended deadlines, things are coming along very nicely.
- Adding Building CI tests proved useful, though; it was a simple addition that we originally overlooked. 

## High-level design of your software

- Our Express backend connects to an Atlas Cluster which stores all of the application data, and enabled the API endpoints.
  - The backend also serves the built version of the frontend.
  - EXPERIMENTAL: Instead of just hosting the frontend to be run as a website, an electron app is hosting the frontend instead, which enables packaging the app on all platforms and running it locally.
  - Backend also handles the retrival of data, filtering, and generation of corresponding JSONs from XMLs.
- Frontend is a React-Bootstrap application that is doing the API calls and dynamically rendering the forms.
  - Which will eventually be an Electron app.

## Technical highlights: interesting bugs, challenges, lessons learned, observations, etc.

- During the development sprints, our initial bottleneck was that even though developers understood the app and its functionalities, the majority wasn't able to determine the tasks to undertake for the upcoming Milestone. However the problem was remedied, as more dedicated tasks were created and allocated effectively within the team.
  - There's also now a warning when the kanban board has not been updated in a day or two.
- While developing the frontend to connect with the endpoints, we realized that JS is quite a struggle to deal with as irregular functions needed to be bound to the class in order to be used.
  - Also Async functions are quite an interesting thing to deal with.
- The impact of the current pandemic situation is not one to be ignored, as commit frequencies were down. It's something that affects everyone, and it's quite a relief to have received the extension for this course.
- Correctly parsing data is no joke.
- Writing unit tests is quite time-consuming, and it's something that our team needs to focus on as well as developing.

## Reflect on your teamwork and process. What worked well, what needs improvement.

- It's quite clear that everyone is doing their best during this time. There was some inactivity coming from a few teammates, but the common problem was just having to deal with the pandemic, which is fair.
- Code quality has been consistently well.
- Communicating over Facebook Messenger has also been working well, allowing us to reach each other easily and quickly, whilst using Discord has proved useful for getting into calls for discussions.

### Ideally you will have specific artifacts from your development process to show (for instance, a burndown chart)

- The Github Project board is living proof that work is being done and people are contributing.
- The Issue tab is also being assigned on a daily basis.

## Triage: What will you build for phase 3, the final demo?

- EXPERIMENTAL:
  - We hope to be able to make the app workable offline, hence why there's an Electron app coming into play. We hope that through Electron, the app can be widely used across all platforms.
  - Which means that the forms must be packaged with the app for offline access.
  - This is quite a huge functionality, but we believe that we can learn alot from it.
- MVP:
  - Authentication should work for multiple accounts
  - Saving draft forms + submissions to global dump.
  - Finish all front end work for a coherent, comprehensive UX.
  - Administration on all accounts and all forms with their use cases.
