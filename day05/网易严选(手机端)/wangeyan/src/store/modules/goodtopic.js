import { reqGetYouCanGou, reqGetFirstGoods, reqGetLoadingGoods } from '../../api'

const state = {
  navList: [],
  firstGoods: [],
  loadingGoods: [
    {
      look: {
        readCount: ''
      },
      topics: [
        {
          readCount: ''
        }
      ]
    }
  ]
}
const mutations = {
  RECEIVE_YOU_CAN_GOU(state, navList) {
    state.navList = navList
  },
  RECEIVE_FIRST_GOODS(state, firstGoods) {
    state.firstGoods = firstGoods
  },
  RECEIVE_LOADING_GOODS(state, loadingGoods) {
    state.loadingGoods = loadingGoods
  }
}
const actions = {
  async getYouCanGou({ commit }) {
    const result = await reqGetYouCanGou()
    if (result.code === '200') {
      commit('RECEIVE_YOU_CAN_GOU', result.data.navList)
    }
  },
  async getFirstGoods({ commit }) {
    const result = await reqGetFirstGoods()
    //console.log('getFirstGoods.result', result)
    if (result.code === '200') {
      commit('RECEIVE_FIRST_GOODS', result.data)
    }
  },
  async getLoadingGoods({ commit }, { page, size }) {
    const result = await reqGetLoadingGoods(page, size)
    if (result.code === '200') {
      //console.log('result', result)
      commit('RECEIVE_LOADING_GOODS', result.data.result)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}