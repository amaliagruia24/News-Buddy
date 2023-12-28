# News-Buddy

Telegram bot designed to help users stay informed and updated with the latest world's news. 

# Implementation details 
This project represents the implementation of a Telegram bot that allows users to receive news based on preferences, using a stack of modern technologies and services. The backend is implemented using NodeJS and Express. NodeJS facilitates the integration of various APIs and handling of asynchronous requests. For news retrieval, The Guardian API was used. The API's data delivery ensures that the bot users receive accurate and up-to-date news content. The bot interacts with users through the Telegram Bot API. This API allows the bot to process and respond to user commands efficiently, enabling features like news searches, category browsing, and scheduled alerts. For local development and testing, ngrok is used to expose the local server to the internet. ngrok provides a public URL for the local Telegram bot server, making it possible to interact with the bot during the development phase without deploying it to a public server. Axios, a promise-based HTTP client for Node.js, is used to handle requests to The Guardian API and the Telegram API. 

# Commands and features
- /start - starts the bot. 
- /latestnews - the bot retrieves the most recent news articles from The Guardian sources.
- /newsbycategory [category] - the bot retrieves news based on a specific category (e.g: technology, business, etc.)
- /searchnews [keywords] - users can search for news on specific topics by providing a keyword
- /newsalert [time] - users can receive daily updates with the latest news. 

# Config variables 
Define the .env file with the following configuration:
- TOKEN: Get from [telegram] using @BotFather 
- SERVER_URL: the server generated with [ngrok]
- GUARDIAN_KEY: API KEY generated from [The Guardian API]. 



[telegram]: <https://core.telegram.org/bots/api>
[ngrok]: <https://ngrok.com/>
[The Guardian API]: <https://open-platform.theguardian.com/documentation/>
