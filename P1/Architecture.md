# Architecture
**Database**: MongoDB
Hosted on Mlab. Stores questions, SDC forms, SDC form responses, users and etc.

**SDCToolsApi**: ExpressJS, NodeJS
Interacts with MongoDB database and serves as an abstracted layer between the database and the frontend app.

**WebApp**: ReactJS
ReactJS front end, allows forms to be served and filled by the user. Requests and sends in formation to the SDCToolsApi to be processed before storage.
