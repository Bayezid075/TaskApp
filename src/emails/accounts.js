const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const wellComeEmail = (email,name)=>{
sgMail.send({


  to: email, // Change to your recipient
  from: 'mrbayezidhoshen@gmail.com', // Change to your verified sender
  subject: 'Wellcome TO Bayezid Task App',
  text: `Wellcome ${name}  Use My Task Application for make your life easy !`,
  html: `<h1>Wellcome ${name}  Use My Task Application for make your life easy</h1>`,


})

}



const AfterDelEmail = (email,name)=>{
    sgMail.send({
    
    
      to: email, // Change to your recipient
      from: 'mrbayezidhoshen@gmail.com', // Change to your verified sender
      subject: 'Do you have any Problem with Bayezid Task App',
      text: ` ${name} check option for fix problem . Task Application for make your life easy !`,
      html: `<h1>${name} check option for fix problem . Task Application for make your life easy</h1>`,
    
    
    })
    
    }
    

module.exports = {
    wellComeEmail,
    AfterDelEmail
}


