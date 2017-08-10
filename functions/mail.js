import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import moment from 'moment';
import * as fs from 'async-file';
import { resolve } from 'path';

// let data = {
//     timestamp: moment(),
//     email: 'admin@chameleon-services.com',
//     name: {
//         first: "Ted",
//         last: "Senft"
//     }
// };

export function setupAppointmentTimes(appointment) {

    if(!appointment.timestamp)
        throw new Error("Missing timestamp, cannot continue.");

    let ts = appointment.timestamp;

    // Add formatted date and time for email
    appointment.date = ts.format("MMMM DD, YYYY");
    appointment.time = ts.format("hh:mm A");

    return appointment;
}

function generateTextBody(appointment) {
    return '';
}

export async function generateEmailBody(appointment) {

    appointment = setupAppointmentTimes(appointment);

    if(!appointment.name || !appointment.name.first)
        appointment.name = Object.assign({}, appointment.name || {}, { first: "Anonymous" });

    let path =  resolve('templates', 
                'email', 'appointment-scheduled.html');
    return new Promise((res, rej) => {
        let data = fs.readFile(path, 'utf8')
            .then(htmlData => {
                let template = handlebars.compile(htmlData);
                res(template(appointment));
            })

            .catch(err => rej(err));
    });
}

export async function setupOptions(appointment) {
    if(!appointment.email)
        throw new Error("Email is not specified, cannot setup options.");
    

    let html =  await generateEmailBody(appointment);
    let options = {
        from: '"Chameleon Services" <noreply@chameleon-services.com>',
        to: appointment.email,
        subject: 'Your Estimate Appointment',
        text: '',
        html: html
    };

    return options;
}

/**
 * Gets a transporter from the environment settings.
 */
function getTransporter() {
    return nodemailer.createTransport({
        service: 'Godaddy',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

/**
 * Given an appointment JSON object, prepare and sent an appointment
 * reminder to a customer.
 * 
 * @param {appointment} appointment An appointment object from the web form
 */
export async function sendEmailReminder(appointment) {
    let transporter = getTransporter();

    appointment = setupAppointmentTimes(appointment);
    let email = await setupOptions(appointment);

    console.log(email);

    transporter.sendMail(email, (err, info) => {
        if(err) {
            console.log(err);
            return false;
        }
    
        return true;
    });
}

export default sendEmailReminder;