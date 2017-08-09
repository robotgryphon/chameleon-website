'use strict';

import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import moment from 'moment';
import * as mail from './mail';

let appointment = {
    timestamp: moment().startOf('day').set('hour', '17'),
    email: 'admin@chameleon-services.com',
    name: {
        first: "Ted"
    }
};

mail.generateEmailBody(appointment)
    .then(body => console.log(body));
// mail.sendEmailReminder(appointment);