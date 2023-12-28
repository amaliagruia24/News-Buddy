const { GUARDIAN_KEY } = process.env
const GUARDIAN_API_ENDPOINT = 'http://content.guardianapis.com/search';

const {getAxiosInstance} = require('./axios');
const moment = require('moment');

const axiosGuardian = getAxiosInstance(GUARDIAN_API_ENDPOINT); 
async function getLatestNews() {
    const fromDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

    try {
        const params = {
            'api-key': GUARDIAN_KEY,
            'from-date': fromDate,
            'order-by': 'newest',
            'page-size': 10
        };

        const response = await axiosGuardian.get("", params); 
        const articles = response.data.response.results;
        return articles.map(article => `${article.webTitle}\n${article.webUrl}`).join('\n\n');
    } catch (error) {
        console.error('Error fetching news:', error);
        return "Sorry, I couldn't fetch the latest news.";
    }
}

async function getNewsByCategory(category) {
    const params = {
        'api-key': GUARDIAN_KEY,
        'section': category, 
        'order-by': 'newest',
        'page-size': 10
    };

    try {
        const response = await axiosGuardian.get("", params);
        const articles = response.data.response.results;
        return articles.map(article => `${article.webTitle}\n${article.webUrl}`).join('\n\n');
    } catch (error) {
        console.error('Error fetching news by category:', error);
        return `Sorry, I couldn't fetch news for the category: ${category}.`;
    }
}

async function getNewsByKeyword(keyword) {
    const params = {
        'api-key': GUARDIAN_KEY,
        'q': keyword, 
        'order-by': 'newest',
        'page-size': 10
    };

    try {
        const response = await axiosGuardian.get("", params);
        const articles = response.data.response.results;
        if (articles.length === 0) {
            return `No news articles found for "${keyword}".`;
        }
        return articles.map(article => `${article.webTitle}\n${article.webUrl}`).join('\n\n');
    } catch (error) {
        console.error('Error fetching news by keyword:', error);
        return `Sorry, I couldn't fetch news for the keyword: ${keyword}.`;
    }
}

module.exports = {
    getLatestNews, 
    getNewsByCategory, 
    getNewsByKeyword
}