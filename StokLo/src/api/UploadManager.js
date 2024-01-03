import axios from 'axios';
import * as ApiConstants from '../constants/ApiConstants'

import _ from 'lodash';
import * as Utility from "../util/Utility"
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Create an Axios Client with defaults
 */
const axiosClient = axios.create({
    baseURL: ApiConstants.BASE_URL,
    timeout: 60000
});

/**
 * Request Wrapper with default success/error actions
 */
const Api = async (
    config = {
        method: 'GET',
        data: {},
        url: ''
    },
    customHeader = {}
) => {
    // Success
    const onSuccess = response => {
        Utility.log('Request Successful!', response.data);
        if (response) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response.data);
        }
    };

    // Error
    const onError = async error => {
        Utility.log('Request Failed:', error);
        if (error && error.response) {
            if (error.response.status && error.response.status === 401) {
                /**
                 * If 401
                 * Clear the token from offline store
                 * and navigate to Initial Stack using Navigation Service
                 */
                return Promise.reject(error.response.data);
            } else {
                // Request was made but server responded with something
                // other than 2xx
                return Promise.reject(error.response.data);
            }
        } else {
            // Something else happened while setting up the request
            // triggered the error
            // Utility.log('Error Message:', error.message);
            let data = { message: 'Something went wrong, please try later' }
            if (error.message) {
                data.message = error.message
            }
            return Promise.reject(data);
        }
    };

    const token = await AsyncStorage.getItem('TOKEN');
    // const encodedToken = Buffer.from(token).toString('base64')
    // Append headers
    let headers = {
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + token,
        'accept-language': 'en',
        'Accept': 'application/json',
        ...customHeader
    };
    Utility.log('Axios Headers', headers);
    // Set headers
    axiosClient.defaults.headers = headers;

    Utility.log('Request Headers', axiosClient.defaults.headers);
    // Utility.log('Request Configurations', config);
    Utility.log('Request URL', config.url);
    return axiosClient(config)
        .then(onSuccess)
        .catch(onError);
};

export default Api;