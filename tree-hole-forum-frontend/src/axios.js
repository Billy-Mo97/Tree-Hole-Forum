import Axios from 'axios'
import {Component} from 'react'
Component.prototype.$axios=Axios


Axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
