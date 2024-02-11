var nodemailer = require('nodemailer')

const SendEmail = (data, req, res, next) => {
  console.log(data.name);
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahmedohafsi@gmail.com',
    pass: 'hello2024'
  }
});



var mailOptions = {
  from: 'ste.yoyojul@outlook.com',
  to: 'ahmedohafsi@gmail.com' ,
  subject: data.subject,
  text: data.msg ,
}


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
     next()
  }
})

}

module.exports = { SendEmail }