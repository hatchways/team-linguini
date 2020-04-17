const http = require("https")

const options = {
    "method": "POST",
    "hostname": "api.sendgrid.com",
    "port": null,
    "path": "/v3/mail/send",
    "headers": {
      "authorization": "Bearer process.env.SENDGRID_API_KEY",
      "content-type": "application/json"
    }
}

const req = http.request(options, (res) => {
    const chunks = []

    res.on("data", (chunk) => {
        chunks.push(chunk)
    })

    res.on("end", () => {
        const body = Buffer.concat(chunks)
        console.log(body)
    })
})

req.write(JSON.stringify({ personalizations: 
    [ { to: [ { email: 'aslamm.anas29@gmail.com', name: 'Aslam' } ],
        dynamic_template_data: { verb: '', adjective: '', noun: '', currentDayofWeek: '' },
        subject: 'Welcome to Kanban Boards' } ],
   from: { email: 'noreply@johndoe.com', name: 'John Doe' },
   content: [{type: 'text/plain', value: 'Thank you for registering on the kanban boards application. We welcome you in our community and look forward to seeing you around'}] 
}));
 req.end();