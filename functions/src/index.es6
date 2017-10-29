import * as functions from 'firebase-functions';

// Disable for now, the automatic email system is not getting the proper config fields

// import NewApplicantEmail from './new_applicant';

// export const sendApplicationEmail= functions.database.ref('applications/{id}').onCreate(event => {
//     const data = event.data.val();
//     console.log(`Got application from ${data.name.first} ${data.name.last}.`);

//     let mailUser = functions.config().mail;
//     console.log(mailUser);
//     let email = new NewApplicantEmail(mailUser, data.email);
//     email.formData = data;

//     return true;
//     // return email.send();
// });