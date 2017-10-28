import Email from './mail';
export class NewApplicantEmail extends Email {
    set formData(u) {
        this.data = u;
    }

    get template() {
        return 'new_application.hbs';
    }

    get subject() {
        return `New Job Applicant: ${this.data.name.first} ${this.data.name.last}`;
    }

    get emailData() {
        return Object.assign({}, { email: this.sendTo }, this.data);
    }
}

export default NewApplicantEmail;