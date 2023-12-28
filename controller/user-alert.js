let userAlerts = {};

function setUserAlert(chatId, alertTime) {
    userAlerts[chatId] = alertTime;
}

function getUserAlerts() {
    return userAlerts;
}

module.exports = { setUserAlert, getUserAlerts };