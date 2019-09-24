import Cookie from 'cookie'
import Cookies from 'js-cookie'

export const state = () => ({
    token: null
})

export const mutations = {
    setToken(state, token){
        state.token = token;
        //console.log('setToken');
        Cookies.set('jwt-token', token);
        //console.log('add jwt-token');
    },
    cleareToken(state){
        state.token = null;
        //Cookie.remove('jwt');
        Cookies.remove('jwt-token');
        //console.log('remove jwt-token');
    }
}

export const actions = {
    async login({commit, dispatch}, data){
        try {
            let {token} = await this.$axios.$post('login', data);
            commit('setToken', token);
        }catch(e){
            console.log("errrrrrror: " + JSON.stringify(e));
            commit('setError', e, {root: true});
            throw e;
        }
    },
    async createUser({commit}, data){
        try{
            let res = await this.$axios.$post('register', data);            
        }catch(e){
            commit('setError', e, {root: true})
            throw e;
        }
    },
    setToken({commit}, token){
        commit('setToken', token);
    },
    logout({commit}){
        commit('cleareToken');
    },
    autoLogin({commit}){
        const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie;

        const cookies = Cookie.parse(cookieStr || '') || {};
        const token = cookies['jwt-token'];

        commit('setToken', token);
    }
}

export const getters = {
    isAuthenticated: state => !!state.token,
    getToken: state => state.token,
}