import axios from 'axios';
import * as ApiConstants from '../constants/ApiConstants';
import { Utility } from '../util';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Utility from '../../utils/Utility';

const axiosClient = axios.create({
    baseURL: ApiConstants.BASE_URL,
    timeout: 60000
});

const Api = async (
    config = {
        method: 'GET',
        data: {},
        url: ''
    },
    customHeader = {}
) => {
    const onSuccess = response => {
        Utility.log('Request successful !', JSON.stringify(response.data));
        if (response) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response.data);
        }
    };

    const onError = async error => {
        Utility.log('Request Failed:', error);
        if (error && error.response) {
            if (error.response.status && error.response.status === 401) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject(error.response.data);
            }
        } else {
            Utility.log('Error Message:', error);
            let data = {
                message: 'Something went wrong, please try later'
            }
            if (error.message) {
                data.message = error.message;
            }
            return Promise.reject(data);
        }
    };

    const token = await AsyncStorage.getItem('TOKEN');
    let headers = {
        'Content-Type': 'application/json',
        'accept-language': 'en',
        'Authorization': 'Bearer ' + token,
        // ...customHeader
    };
    Utility.log('Axios Headers:', headers);

    //Set Headers
    axiosClient.defaults.headers = headers;
    Utility.log('Request Headers:', axiosClient.defaults.headers);
    Utility.log('Request Configurations:', config);
    Utility.log('Request URL:', config.url);

    return axiosClient(config)
        .then(onSuccess)
        .catch(onError)
};

export default Api;