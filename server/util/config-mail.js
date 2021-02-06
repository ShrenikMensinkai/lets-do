const sgMail = require('@sendgrid/mail');
const path = require('path');
const ejs = require('ejs');
class Email{
    async sendRegistrationMail(mailId, inviteLink){
        try{
            let email_template= await ejs.renderFile(path.join(__dirname, '/register-email.ejs'),{
                confirm_link: inviteLink
            });
            let email = mailId.trim();
            sgMail.setApiKey(process.env.EMAIL_STRING);
            let msg = {
                to: email,
                from: 'shrenik.msk@gmail.com',
                subject: 'Team FLF',
                html: email_template
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