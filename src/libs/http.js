import axios from 'axios'
import jwt_decode from 'jwt-decode'
import store from 'common/vuex'
import { isEmpty } from 'lodash'

const account = window.location.host.split('.')[0]

window.axios = axios.create({
    baseURL: `${process.env.API_URL}${account}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    responseType: 'json'
})

/**
 * Manage the request.
 */
window.axios.interceptors.request.use(config => {
    if (config.url.includes('http://api.postmon.com.br/v1/cep')) {
        return config
    }

    const token = localStorage.getItem('auth_token')

    if (! isEmpty(token)) {
        if (jwt_decode(token).exp < (Date.now() / 1000) && ! config.url.includes('/auth/token')) {
            return window.axios.get(`/auth/token`)
                .then(response => {
                    store.commit('auth/TOKEN', response.data.token)
                    config.headers.Authorization = `Bearer ${localStorage.getItem('auth_token')}`
                    return config
                })
        }
        config.headers.Authorization = `Bearer ${localStorage.getItem('auth_token')}`
        return config
    }

    return config
}, error => {
    return Promise.reject(error)
})

/**
 * Manage the response from request.
 */
window.axios.interceptors.response.use(response => {
    return response
}, error => {
    store.dispatch('global/SET_SUBMITING', false)
    const statusCode = error.response.status

    switch (statusCode) {
        case 422:
            store.dispatch('global/SET_VALIDATION_ERROR', error.response.data)
        default:
            return Promise.reject(error)
    }

    return Promise.reject(error)
})