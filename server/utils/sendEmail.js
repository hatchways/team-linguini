const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
    to: 'aslamm.anas29@gmail.com',
    from: 'hello@kanbanboards.com',
    subject: 'Welcome to Kanban Boards',
    content: [{type: 'text/plain', value: 'Thank you for registering on the kanban boards application. We welcome you in our community and look forward to seeing you around'}]
}

const sendEmail = () => {
    sgMail.send(msg, (err, json) => {
        if(err){ return console.log(err)}
        console.log('email sent')
    })
}
module.exports = sendEmail

/*
const sendEmail = (email) => {
    const options = {
        "method": "POST",
        "url": "https://api.sendgrid.com/v3/mail/send",
        "headers": {
          "authorization": "Bearer process.env.SENDGRID_API_KEY",
          "content-type": "application/json"
        },
        "body": { personalizations: 
            [ { to: [ { email: email, name: 'Aslam' } ],
                subject: 'Welcome to Kanban Boards' } ],
           from: { email: 'hello@kanban.com', name: 'Kanban Boards' },
           content: [{type: 'text/plain', value: 'Thank you for registering on the kanban boards application. We welcome you in our community and look forward to seeing you around'}] 
        }
    }
    
    request(options, (error, response, body) => {
        if(error) throw new Error(error);
    
        console.log(body)
    })
}

 module.exports = sendEmail
 */