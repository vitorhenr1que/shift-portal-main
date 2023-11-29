import axios from 'axios';
import configs from '../../appsettings';

export const genesisApi = axios.create({ baseURL: configs.baseApiUrl });

// Request
genesisApi.interceptors.request.use((config) => {
    _configHeaders(config, configs.subscriptionKey);
    return config;
}, (error) => {
    _requestErrorHandler(error)
});

// Response
genesisApi.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        _responseErrorHandler(error);
    }
);

function _configHeaders(config) {
    try {
        const token = localStorage.getItem('AUTHORIZATION_TOKEN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE,OPTIONS';
        var allow_headers = "Referer,Accept,Origin,User-Agent,Content-Type";
        config.headers['Access-Control-Allow-Headers'] = allow_headers;
    } catch (e) {
        throw e;
    }
}

function _requestErrorHandler(error) {
    //console.log("interceptors.request", error);
    //console.log('What happened? ' + error.response);
    return Promise.reject(error);
}

function _responseErrorHandler(error) {
    //console.log("interceptors.response", error);
    //console.log('What happened? ' + error.response);
    try {
        if ((axios.defaults.headers.common['Authorization'])) {
            const originalRequest = error.config;
            if (error.response.status === 401) {
                originalRequest._retry = true;
                localStorage.setItem('AUTHORIZATION_TOKEN', '');
                localStorage.setItem('ERROR_AUTHORIZATION_TOKEN', 'Token inválido ou expirado! Verifique suas credenciais');
                axios.defaults.headers.common['Authorization'] = '';
                window.location.assign("/");
            }
        }
    } catch (e) {
        throw e;
    }
    throw error;
}

export default genesisApi;