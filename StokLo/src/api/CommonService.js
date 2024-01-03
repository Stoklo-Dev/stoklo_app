import { Utility } from '../util';
import API from './CommonManager';
// import { Utility } from '../../utils';

const fetchGetApi = (url) => {
    Utility.log('fetchGetApi URL:', url);
    return API(
        {
            method: 'GET',
            url: url
        }
    )
};
const fetchPostApi = (url, params) => {
    Utility.log('fetchPostApi', url, params);
    return API(
        {
            method: 'POST',
            url: url,
            data: params
        }
    );
};
const fetchPutApi = (url, params) => {
    Utility.log('fetchPutApi', url, params);
    return API(
        {
            method: 'PUT',
            url: url,
            data: params
        }
    );
};
const fetchDeleteApi = (url) => {
    Utility.log('fetchDeleteApi', url);
    return API(
        {
            method: 'DELETE',
            url: url,
        }
    );
};

export const CommonService = {
    fetchGetApi,
    fetchPostApi,
    fetchPutApi,
    fetchDeleteApi,
}