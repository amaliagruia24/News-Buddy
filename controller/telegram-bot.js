const {getAxiosInstance} = require('./axios');
const {errorHandler} = require('./helper');
const {getLatestNews, getNewsByKeyword, getNewsByCategory} = require('./news')
const {setUserAlert} = require('./user-alert')
const { TOKEN } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`

const axios = getAxiosInstance(TELEGRAM_API); 

function sendMessage(chatId, text) {
    return axios.get("sendMessage", {
        chat_id: chatId, 
        text: text
    })
    .catch((ex) => {
        errorHandler(ex, "sendMessage", "axios");
    });
}

async function handleMessage(message) {
    const text = message.text || "";
    if(!text) {
        errorHandler("No message text", handleMessage);
        return "";
    }
    try {
        const chatID = message.chat.id;
        const firstName = message.chat.first_name; 
        const lastName = message.chat.last_name;
        if(text.charAt(0) === "/") {
            const parts = text.split(" ");
            const command = parts[0].substr(1);
            switch (command) {
                case "start":
                    return sendMessage(
                        chatID, 
                        `Welcome, ${firstName} ${lastName}`
                    ); 
                case "latestnews":
                    const news = await getLatestNews();
                    return sendMessage(chatID, news);
                case "newsbycategory":
                    if (parts.length < 2) {
                        return sendMessage(
                            chatID, 
                            "Please specify a category. Example: /newsbycategory technology"
                        );
                    }
                    const category = parts[1];
                    const categoryNews = await getNewsByCategory(category);
                    return sendMessage(chatID, categoryNews);
                case "searchnews":
                    if (parts.length < 2) {
                        return sendMessage(
                            chatID, 
                            "Please specify a keyword. Example: /searchnews climate change"
                        );
                    }
                    const keyword = parts.slice(1).join(" "); 
                    const keywordNews = await getNewsByKeyword(keyword);
                    return sendMessage(chatID, keywordNews);
                case "newsalert":
                    if (parts.length < 2) {
                        return sendMessage(
                            chatID, 
                            "Please specify a time. Example: /newsalert 15:00"
                        );
                    }
                    const alertTime = parts[1];
                    setUserAlert(chatID, alertTime);
                    return sendMessage(chatID, `You will receive news daily at ${alertTime}`);
                default: 
                return sendMessage(chatID, "Hey. I don't know this command");
            }
        } else {
            return sendMessage(chatID, text);
        }
    } catch(error) {
        errorHandler(error, "handleMessage");
    }
}

module.exports = { sendMessage, handleMessage }