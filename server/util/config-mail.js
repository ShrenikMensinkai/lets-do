const sgMail = require('@sendgrid/mail');

class Email{
    async sendRegistrationMail(mailId, inviteLink){
        try{
            let email = mailId.trim();
            sgMail.setApiKey(process.env.EMAIL_STRING);
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