import * as functions from 'firebase-functions';
import { AppointmentScheduled } from './templates';

export const mail = functions.https.onRequest(mailFunction);

async function mailFunction(req, res) {
    const mailUser = functions.config().mail;
   
    let mail = new AppointmentScheduled(mailUser, req.body.email);
    mail.user = req.body.user;
    mail.timestamp = req.body.timestamp;

    mail.send()
        .then(res.status(200).send("ok"))
        .catch(err => {
            console.log(err);
            res.status(500).send("failed");
        });
}
