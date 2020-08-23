import Vue from "vue";

const TOKEN_KEY = 'token'

const TokenService = {
    setToken(tokenData) {
        Vue.$cookies.set(TOKEN_KEY, tokenData);
    },
    getAccesToken() {
        return `JWT ${Vue.$cookies.get(TOKEN_KEY).access}`;
    },
    getRefreshToken() {
        return `JWT ${Vue.$cookies.get(TOKEN_KEY).refresh}`
    }
}

export { TokenService }