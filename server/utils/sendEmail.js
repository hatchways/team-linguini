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