import express, { Request, Response } from 'express';

var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("INSERT API KEY");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse post to json
app.use(express.json());

// Inbound mail webhook
app.post('/webhook', (req: Request, res: Response) => {
    // Parse and process mail received
    res.status(200).send('Webhook received');
    const isSpam = req.headers['X-Spam-Status'];

    const body = req.body 

    if(isSpam) {
        console.log("Spam reçu de " + body["From"])
    } else {
        console.log("Mail reçu de " + body["From"] + " at " + body["Date"] + " : \n" + body["TextBody"])

        client.sendEmail({
            "From": "theo.slimani2@etu.univ-lorraine.fr",
            "To": body["From"],
            "Subject": "Following your email",
            "HtmlBody": body["HtmlBody"],
            "TextBody": body["TextBody"],
            "MessageStream": "outbound"
          });
    }

});

// Start serveur
app.listen(PORT, () => {
    console.log(`Serveur started on http://localhost:${PORT}`);
    console.log("To make webhook visible on internet :\nrun ngrok http " + PORT )
});