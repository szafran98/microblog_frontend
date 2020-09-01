import Vue from "vue";
import axios from 'axios';

const TOKEN_KEY = 'token'

const TokenService = {
    setToken(tokenData) {
        Vue.$cookies.set(TOKEN_KEY, tokenData);
    },
    returnAccessTokenHeader() {
        let accessToken = this.getAccessToken()
        if (accessToken === null) return null
        return {
            headers: {
                'Authorization': `JWT ${this.getAccessToken()}`
            }
        };
    },
    removeToken() {
        Vue.$cookies.remove(TOKEN_KEY);
    },
    /*
    verifyToken() {
        console.log(this.getAccessToken())
        axios.post('http://127.0.0.1:8000/auth/jwt/verify/', {
            token: this.getAccessToken()
        })
            .then(res => {
                if (res.status === 200) {

                }
            })
    },

     */
    getAccessToken() {
        try {
            return Vue.$cookies.get(TOKEN_KEY).access
        } catch (e) {
            //throw new Error('There is no access token')
            return null
        }
        //return Vue.$cookies.get(TOKEN_KEY).access || null;
    },
    getRefreshToken() {
        return Vue.$cookies.get(TOKEN_KEY).refresh;
    },
    refreshTokenApiRequest() {
        axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', {
            refresh: this.getRefreshToken()
        })
            .then(res => {
                Vue.$cookies.set(TOKEN_KEY, {
                    access: res.data.access,
                    refresh: this.getRefreshToken()
                });
            })
    }
}


export { TokenService }