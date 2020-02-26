# API

## API Calls

- Upload XML Form
  - New form to be processed -> generates a corresponding Fillout.
- Get list of all possible Fillouts
  - Need to be categorized (By Front-end)
  - Output: `FormID` (multiple)
- Get list of all Drafts + Submission
  - Input: `AccountID`
  - Output: `SubmissionID` (Multiple)
- Get Fillout from List
  - Input: `FormID`
  - Output: `FilloutForm` + `SubmissionID` (Generated dynamically through userAccount + corresponding Form)
- Save Draft Fillout
  - Input: `FilloutForm` + `SubmissionID`
  - Output: `SubmissionID` (For easy reference)
- Get Draft/Submitted Fillout
  - To complete the Draft or view Submission.
  - Input: `SubmissionID`
  - Output: `FilloutForm`
- Delete Draft
  - Input: `SubmissionID`
- Submit Draft
  - Submitting Fillout to Official Patient Records.
  - Input: `FilloutForm` + `SubmissionID`
  - Output: `SubmissionID`

## API Endpoints

- Upload XML Form (POST): `/api/v1/form`
  - Payload: `XML`
- Get list of all possible Fillouts (GET): `/api/v1/fillout`
- Get list of all Drafts + Submission (GET): `/api/v1/account`
  - Payload: `AccountID`
- Get Fillout from List (GET): `/api/v1/fillout/:FormID`
- Save Draft Fillout (PATCH): `/api/v1/account/save`
  - Payload:
    - `FilloutForm`
    - `SubmissionID`
- Get Draft/Submitted Fillout (GET): `/api/v1/account/get`
  - Payload:
    - `SubmissionID`
- Delete Draft (DELETE): `/api/v1/account/delete`
  - Payload:
    - `SubmissionID`
- Submit Draft (POST): `/api/v1/account/submit`
  - Payload:
    - `FilloutForm`
    - `SubmissionID`

## Extra

- Get list of patients (to assist filling out form)
- Get related draft/Submissions for patient (to quickly find related data)
- Delete Form (Form might be invalid)
  - Which in turn invalidfy Draft/Submissions.
- Update Form
