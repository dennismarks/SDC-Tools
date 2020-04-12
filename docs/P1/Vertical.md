# Vertical

## Developing

- Run `npm install` in both the `backend` and `frontend` folders
- Run `nodemon server` inside `backend` to run a server
- Run `npm start` inside the `frontend`

## Patient CRUD Endpoints

- `/` - GET: return all patient objects from database
- `/patient/:id` - GET: return a specific patient object from database given id
- `/patient/add` - POST: create a new patient entry given patientID, name, email and phone
- `/patient/update/:id` - POST: update existing patient entry inside database given id
- `/patient/:id` - DELETE: remove a patient entry from database given id
