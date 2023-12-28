const { getLatestNews } = require('./news');
const { sendMessage } = require('./telegram-bot');
const { getUserAlerts } = require('./user-alert');
const cron = require('node-cron');

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); 
    const minutes = String(now.getMinutes()).padStart(2, '0'); 

    return `${hours}:${minutes}`;
}

function scheduleNewsAlerts() {
    cron.schedule('* * * * *', async () => {
        const currentTime = getCurrentTime();
        const userAlerts = getUserAlerts();
        for (const [chatId, alertTime] of Object.entries(userAlerts)) {
            if (alertTime === currentTime) {
                const news = await getLatestNews();
                sendMessage(chatId, news);
            }
        }
    });
}

module.exports = { scheduleNewsAlerts };
