import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import moment from 'moment';
import { readFile } from 'fs';
import { resolve } from 'path';

/**
 * Represents an email to be sent to a user.
 */
class Email {

    /**
     * The person sending the email.
     */
    get from() {
        return '"Chameleon Services" <noreply@chameleon-services.com>';
    }

    set template(t) {
        this._template = t;
    }

    /**
     * The template to inject data into.
     */
    get template() {
        return this._template || 'no_template.hbs';
    }

    /**
     * Email subject.
     */
    get subject() {
        return '';
    }

    /**
     * 
     * @param mailer The mail user's username and password.
     * @param sendTo The email to send the final result to.
     */
    constructor(mailer, sendTo) {
        this.emailUser = mailer;
        this.sendTo = sendTo;
    }

    /**
     * Do preprocessing for the template data.
     */
    async preprocess() { }

    /**
     * Copies the required data for the template.
     */
    get emailData() {
        return { email: this.sendTo }
    }

    async generateTextBody(data) {
        return '';
    }

    async generateHtmlBody(data) {
        let path =  resolve('templates', 'email', this.template);
        return new Promise((res, rej) => {
            readFile(path, 'utf8', (err, fd) => {
                if(err) rej(err);
                let template = handlebars.compile(fd);
                res(template(data));
            });
        });
    }

    _getOptions(textBody, htmlBody) {
        let options = {
            from: this.from,
            to: this.sendTo,
            subject: this.subject,
            text: textBody,
            html: htmlBody
        };

        return options;
    }

    /**
     * Gets a transporter from the environment settings.
     */
    get transporter() {
        return nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true,
            auth: {
                user: this.emailUser.username,
                pass: this.emailUser.password
            }
        });
    }

    async send() {
        let transporter = this.transporter;
        if(!this.sendTo) throw new Error("Email not specified.");

        await this.preprocess();
        let emailData = this.emailData;
        let html = await this.generateHtmlBody(emailData);
        let text = await this.generateTextBody(emailData);

        let emailOptions = this._getOptions(text, html);

        return new Promise((resolve, reject) => {
            transporter.sendMail(emailOptions, (err, info) => {
                if(err) reject(err);            
                resolve(true);
            });
        });        
    }
}

export default Email;