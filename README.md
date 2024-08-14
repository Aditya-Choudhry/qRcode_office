Here are two folders:

1. **qRcode**
2. **offline**

### qRcode Folder:
- This folder is for GitHub upload.
- The routes that have been modified are in the following files under the **Pages** folder:

  - `pages/login.jsx`
  - `pages/signup.jsx`
  - `pages/subscription.jsx`
  - `pages/mybusiness.jsx`
  - `pages/allcontact.jsx`
  - `pages/allfeedback.jsx`
  - `pages/allusers.jsx`
  - `pages/allbusiness.jsx`
  - `pages/form.jsx`
  - `pages/positiveform.jsx`
  - `pages/privateForm.jsx`
  - `pages/reviewForm.jsx`

- In the **Part** folder within **Pages**:
  - `part/gerenalSection.jsx`: You also need to update the routes for the QR code part in line numbers 164 and 190 (as they are used to generate the link).
  - `part/keywordSection.jsx`

- The current route is: `https://crm.qrps.ca` (same as offline).

### offline Folder:
- This folder is for the localhost environment. The routes are adjusted for the localhost, with the default Vite development environment being: `http://localhost:5173`.

- The following files in the **Pages** folder need route changes:

  - `pages/login.jsx`
  - `pages/signup.jsx`
  - `pages/subscription.jsx`
  - `pages/mybusiness.jsx`
  - `pages/allcontact.jsx`
  - `pages/allfeedback.jsx`
  - `pages/allusers.jsx`
  - `pages/allbusiness.jsx`
  - `pages/form.jsx`
  - `pages/positiveform.jsx`
  - `pages/reviewForm.jsx`

- In the **Part** folder within **Pages**:
  - `part/gerenalSection.jsx`: Update the routes for the QR code part in line numbers 164 and 190 (as they are used to generate the link).
  - `part/keywordSection.jsx`

### Important Notes:
- If you make any frontend changes, please ensure they are updated in both folders.
- For the server/backend, remember to modify the CORS settings if necessary.

**Created by Aditya**
