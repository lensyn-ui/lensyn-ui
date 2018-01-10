/*********************************************************************
 * Created by sudeming on 2017/7/25                                  *
 * 通用模块--Vuex                                                      *
 *********************************************************************/

import * as common from '../CommonConst'
import axios from 'axios'

const state = {
    componentList: [],
    mComponentList: [],
    versionList: [],
    leftTreeShow: false
};

const getters = {
    componentList: state => state.componentList,
    mComponentList: state => state.mComponentList,
    versionList: state => state.versionList,
    leftTreeShow: state => state.leftTreeShow
};

const actions = {
    getComponentData({ commit }) {
        axios.get(common.getUrl({ url: common.COMPONENT_LIST_URL }))
            .then(resData => {
                commit(common.COMPONENT_LIST, { resData: resData.data });
            })
            .catch(e => {
                commit(common.COMPONENT_LIST, { resData: [] });
            });
    },
    getMComponentData({ commit }) {
        axios.get(common.getUrl({ url: common.MCOMPONENT_LIST_URL }))
            .then(resData => {
                commit(common.MCOMPONENT_LIST, { resData: resData.data });
            })
            .catch(e => {
                commit(common.MCOMPONENT_LIST, { resData: [] });
            });
    },
    getVersionData({ commit }) {
        axios.get(common.getUrl({ url: common.VERSION_LIST_URL }))
            .then(resData => {
                commit(common.VERSION_LIST, { resData: resData.data });
            })
            .catch(e => {
                commit(common.VERSION_LIST, { resData: [] });
            });
    },
    collapseTree({ commit }) {
        commit(common.LEFT_LIST_SHOW);
    }
};

const mutations = {
    [common.COMPONENT_LIST](state, { resData }) {
        state.componentList = resData;
    },
    [common.MCOMPONENT_LIST](state, { resData }) {
        state.mComponentList = resData;
    },
    [common.VERSION_LIST](state, { resData }) {
        state.versionList = resData;
    },
    [common.LEFT_LIST_SHOW](state) {
        state.leftTreeShow = !state.leftTreeShow;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};