import { expect } from 'chai';
import Email from '../src/mail';
import { stub } from 'sinon';
import { describe, it, before, beforeEach, after } from 'mocha';
import * as functions from 'firebase-functions';
import dotenv from 'dotenv';

dotenv.config();
expect();

var configStub, mail;

class TestEmail extends Email {
    set user(u) {
        this.userDetails = u;
    }

    get template() {
        return 'test_mail.hbs';
    }

    get subject() {
        return 'Test Email, Please Ignore';
    }

    get emailData() {
        return { 
            email: this.sendTo,
            name: this.userDetails.name
        }
    }
}

before(() => {
    configStub = stub(functions, 'config');
    configStub.returns({
        mail: {
            username: process.env.MAIL_USERNAME,
            password: process.env.MAIL_PASSWORD
        }
    });
});

beforeEach(() => {
    mail = new Email(functions.config().mail, 'admin@chameleon-services.com');
})

describe('Email', () => {

    it('requires an email address', () => {
        expect(mail.sendTo).to.be.a('string');
        expect(mail.emailUser).to.be.an('object')
            .and.to.have.all.keys('username', 'password');
    });

    it('can gather all required options', async () => {
        await mail.preprocess();
        let options = mail.emailData;
        expect(options).to.include({ email: 'admin@chameleon-services.com' });
    });

    it('can generate an html email body', async () => {
        await mail.preprocess();
        let emailData = mail.emailData;
        let html = await mail.generateHtmlBody(emailData);
        
        expect(html)
            .to.be.a('string')
            .and.to.not.be.empty;
    });

    it('can have its template changed', async () => {
        await mail.preprocess();
        let emailData = mail.emailData;
        let template = mail.template;
        mail.template = 'test_mail.hbs';

        expect(mail.template).to.not.eq(template);
    });

    it('can send the email', async () => {
        let mail = new TestEmail(functions.config().mail, "admin@chameleon-services.com");
        mail.user = { name: { first: "Test", last: "User" }};
        return mail.send();
    })
});

after(() => {
    configStub.restore();
})