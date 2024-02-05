import API from './UploadManager';
import * as ApiConstants from '../constants/ApiConstants'
import { Utility } from '../util';


const fetchPostFormData = (url, data) => {
    Utility.log(url, data)
    return API(
        {
            method: 'POST',
            url: url,
            data: data
        }
    );
};
const fetchPutFormData = (url, data) => {
    Utility.log(url, data)
    return API(
        {
            method: 'PUT',
            url: url,
            data: data
        }
    );
};

function paramsToBody(params) {
    Utility.log(params)
    if (!params || params.length < 1) {
        console.warn("response : empty params");
        return null;
    }

    const body = new FormData();
    for (let k in params) {
        body.append(k, params[k]);
    }
    return body;
}



export const UploadService = {
    fetchPostFormData,
    fetchPutFormData
};
