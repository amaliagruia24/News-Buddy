require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios');
const { handleMessage } = require('./controller/telegram-bot');
const { errorHandler } = require('./controller/helper');
const {scheduleNewsAlerts} = require('./controller/news-scheduler')

const { TOKEN, SERVER_URL } = process.env
const URI = `/webhook/${TOKEN}`
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`

const WEBHOOK_URL = SERVER_URL+URI

const app = express()
app.use(bodyParser.json())
scheduleNewsAlerts();

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

async function handler(req, method) {
    try {
        if (method === "GET") {
            return "GET call"
        }

        const { body } = req; 
        if (body && body.message) {
            const message = body.message;
            await handleMessage(message);
            return "Succes";
        }

        return "Unknown request"
    } catch(error) {
        errorHandler(error, "mainHandler");
    }
}

app.post(URI, async (req, res) => {
    console.log(req.body)
    res.send(await handler(req, "POST"));
})

app.get(URI, async (req, res) => {
    res.send(await handler(req, "GET"));

});

app.listen(process.env.PORT || 5000, async () => {
    console.log('App running on port ', process.env.PORT || 5000)
    await init()
});
