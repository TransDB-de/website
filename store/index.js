/*
* Vuex global state management store (https://vuex.vuejs.org/)
* */

export const state = () => ({
    user: null,
    isMobile: false
});

export const getters = {

    getUserData: (state, getters) => {
        let user = JSON.parse(localStorage.getItem("user"));
        return user ? user : null;
    },

    getLoginToken: (state, getters) => {
        let token = localStorage.getItem("loginToken");
        return token ? token : null;
    }

};

export const mutations = {

    SET_LOGIN_TOKEN(state, token) {
        if(token){
            localStorage.setItem("loginToken", token);
        }else{
            localStorage.removeItem("loginToken");
        }

    },

    SET_USER_DATA(state, data) {
        if(data){
            localStorage.setItem("user", JSON.stringify(data));
            state.user = data;
        }else{
            localStorage.removeItem("user");
            state.user = null;
        }
    },
    
    SET_MOBILE(state, isMobile) {
		state.isMobile = isMobile;
	}

};

export const actions = {

}