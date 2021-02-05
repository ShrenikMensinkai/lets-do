const sgMail = require('@sendgrid/mail');

class Email{
    async sendRegistrationMail(mailId, inviteLink){
        try{
            let email = mailId.trim();
            sgMail.setApiKey('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');
            let msg = {
                to: email,
                from: 'shrenik.msk@gmail.com',
                subject: 'User Registration',
                text: 'login',
                html: `<p>Link - <strong>${inviteLink}</strong>. 
                Use this password to login and reset the password</p>`,
            };
            sgMail.send(msg).then(() => {
                console.log('Email sent')
              })
              .catch((error) => {
                console.error(error)
              })
        }catch(error){
            throw error;
        }
    }
};

exports.Email = Email;