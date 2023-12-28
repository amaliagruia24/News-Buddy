const axios = require('axios');

function getAxiosInstance(BASE_URL, headers = {}) {
    return {
        get(method, params) {
            const url = method ? `/${method}` : '';
            return axios.get(url, {
                baseURL: BASE_URL, 
                params, 
                headers, 
            });
        }, 
        post(method, data) {
            return axios({
                method: "post", 
                baseURL: BASE_URL, 
                url: `/${method}`, 
                data, 
                headers,
            })
        }
    }
}


module.exports = {getAxiosInstance}