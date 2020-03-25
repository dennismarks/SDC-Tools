# Technical product report

## What did you actually build during this phase?

- We were able to unify the building process to let the backend serves the optimized version of the frontend.
- Atlas connection was successfully established and open for modification. Whereas before we had a deprecation error.
- Backend infrastructure was revamped and restructured for a more ordered development file system.
- Experimental: In a WIP branch, we are able to serve the full stack with a fully packagable, executable Electron app. This is still in beta testing to make sure the app works.
- The components to render the fillable page is completed.
- We were also able to enhance the "Kanban" board in order to provide developers with good-first-issue, dedicated or veteran tasks. Which has led to a more productive commit schedules with the team, since they always know what to do next.
- Some Building CI tests were implemented to make sure no one submit broken code.

### How is this different from what you originally proposed? Why?

- Not alot are quite different from what we originally proposed. We are, in fact, on schedule with our timelines of deliverables. Especially with the extended deadlines, things are coming along very nicely

## High-level design of your software

- Our Express backend connects to an Atlas Cluster which stores all of the application data, and enabled the API endpoints.
  - The backend also serves the built version of the frontend.
  - EXPERIMENTAL: Instead of just hosting the frontend to be run as a website, an electron app is hosting the frontend instead. Which enables packaging the app on all platforms and running it locally.
  - Backend also handles the retrival of data, filtering, and generation of corresponding JSONs from XMLs.
- Frontend is an React-Bootstrap application that is doing the API calls and dynamically rendering the forms.
  - Which will eventually be an Electron app.

## Technical highlights: interesting bugs, challenges, lessons learned, observations, etc.

- During the development sprints, our initial bottleneck is, even though developers understand the app and its functionalities, the majority wasn't able to determine the tasks required for the upcoming Milestone. This was a failure from the Project Manager, Max. However the problem was remedied, as he create more dedicated tasks and allocating them effectively within the team.
  - It's a warning when the kanban board has not been updated in a day or two.
- While developing the frontend to connect with the endpoints, we realized that JS is quite a struggle to deal with as irregular functions needed to be bound to the class in order to be used.
  - Also Async functions are quite an interesting thing to deal with.
- The impact of the current pandemic situation is not one to be ignored, as commit frequencies were down. It's something that affects everyone, and it's quite a relief to have the extension from course.
- Correctly parsing data is no joke.
- Writing unit tests are quite time-consuming. And it's something that our team needs to focus on as well as developing.

## Reflect on your teamwork and process. What worked well, what needs improvement.

- Everyone is doing their best during this time of the year. It's quite clear. Although there were some inactivity coming from a few teammates, but the common problem is just having to deal with the pandemic. Which is fair.
- Code quality has been consistently well.

### Ideally you will have specific artifacts from your development process to show (for instance, a burndown chart)

- The Github Project board is a living proof that work are being done and people are contributing.
- The Issue tab is also being assigned on a daily basis.

## Triage: What will you build for phase 3, the final demo?

- EXPERIMENTAL:
  - We hope to be able to make the app workable offline. Hence that's where the Electron app comes in play. And we hope through it, the app can be widely used across all platforms.
  - Which means that the forms must be packaged with the app for offline access.
  - This is quite a huge functionality, but we believe that we can learn alot from this.
- MVP:
  - Authentication should work for multiple filler's accounts
  - Draft forms + Submission to global dump.
  - A coherent UX.
  - Administration on all accounts and all forms with their usecases.
