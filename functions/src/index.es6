import * as functions from 'firebase-functions';
import NewApplicantEmail from './new_applicant';

export const sendApplicationEmail= functions.database.ref('applications/{id}').onCreate(event => {
    const data = event.data.val();
    console.log(`Got application from ${data.name.first} ${data.name.last}.`);

    let mailUser = functions.config().mail;
    let email = new NewApplicantEmail(mailUser, functions.config().marketing.contact_email);
    email.formData = data;
    return email.send();
});