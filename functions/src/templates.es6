import Email from './mail';

export class AppointmentScheduled extends Email {
    get template() {
        return 'appointment_scheduled.hbs';
    }

    get subject() {
        return 'Your appointment has been scheduled.';
    }

    setupAppointmentTimes() {
        
        if(!this.timestamp)
            throw new Error("Missing timestamp, cannot continue.");

        let ts = this.timestamp;

        // Add formatted date and time for email
        this.timestamp = ts;
        this.date = ts.format("MMMM DD, YYYY");
        this.time = ts.format("hh:mm A");
    }

    async preprocess() {
        await super.preprocess();
        return new Promise((res, rej) => {
            this.setupAppointmentTimes();
            res(true);
        });
    }

    get emailData() {
        var data = super.emailData();
        data = Object.assign({}, 
            {
                timestamp: this.timestamp,
                date: this.date,
                time: this.time,
                name: this.user
            });

        return data;
    }
}