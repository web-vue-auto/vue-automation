/**
 * Created by yejuan on 2017/3/14.
 */
import * as types from '../../mutation-types'

const state = {
    username: false,
    usersex:false
}
const getters = {
    username: state => state.username,
    usersex: state => state.usersex
}
const actions = {
    updateUsername ({ commit },name) {
        commit(types.UPDATE_USERNAME, { name })
    }
}
const mutations = {
    [types.UPDATE_USERNAME] (state, { name }) {
        state.username = name;
        // 截取名字
        if (typeof state.username =="boolean") return state.usersex = false;
        else state.usersex = name.substr(0,1);
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
