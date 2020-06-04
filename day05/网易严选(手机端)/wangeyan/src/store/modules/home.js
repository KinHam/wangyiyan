import { reqGetKingKongModule, reqGetPolicyDescList, reqGetFocusList, reqGetIndexCateModule, reqGetBigPromotionModule, reqGetIndexActivityModule, reqGetCategoryHotSellModule, reqGetFlashSaleModule, reqGetNewItemList, reqGetCateNavDatas } from '../../api'
const state = {
  //主页的分类图标
  kingKongModule: {},
  policyDescList: [],
  //轮播图数据
  focusList: [],
  indexCateModule: [],
  bigPromotionModule: {
    floorList: [
      {
        cells: [{
          picUrl: '',
          itemList: [{ picUrl: '' }]
        }]
      },
      {
        cells: [{
          picUrl: '',
        }]
      },
      {
        cells: [{
          picUrl: '',
        }]
      },
      {
        cells: [{
          picUrl: '',
        }]
      }
    ]
  },
  indexActivityModule: [
    {
      zhuti: '',
      picUrl: '',
    },
    {
      activityList: [
        {
          picUrl: ''
        }
      ]
    }
  ],
  categoryHotSellModule: {
    categoryList: [
      {},
      {}
    ]
  },
  flashSaleModule: {},
  newItemList: {},
  cateNavDatas: [
    {}
  ]
}
const mutations = {
  RECEIVE_KING_KONG_MODULES(state, kingKongModule) {
    state.kingKongModule = kingKongModule
  },
  RECEIVE_POLICY_DESCLIST(state, policyDescList) {
    state.policyDescList = policyDescList
  },
  RECEIVE_FOUCS_LIST(state, focusList) {
    state.focusList = focusList
  },
  RECEIVE_INDEX_CATE_MODULE(state, indexCateModule) {
    state.indexCateModule = indexCateModule
  },
  RECEIVE_BIG_PROMOTION_MODULE(state, bigPromotionModule) {
    state.bigPromotionModule = bigPromotionModule
  },
  RECEIVE_INDEX_ACTIVITY_MODULE(state, indexActivityModule) {
    state.indexActivityModule = indexActivityModule
  },
  RECEIVE_CATEGORY_HOT_SELL_MODULE(state, categoryHotSellModule) {
    state.categoryHotSellModule = categoryHotSellModule
  },
  RECEIVE_FLASH_SALE_MODULE(state, flashSaleModule) {
    state.flashSaleModule = flashSaleModule
  },
  RECEIVE_NEW_ITEM_LIST(state, newItemList) {
    state.newItemList = newItemList
  },
  RECEIVE_CATE_NAV_DATAS(state, cateNavDatas) {
    state.cateNavDatas = cateNavDatas
  }
}
const actions = {
  async getkingKongModule({ commit }) {
    const result = await reqGetKingKongModule()
    if (result.code === 200) {
      //提交对应的mutations,并修改状态数据
      commit("RECEIVE_KING_KONG_MODULES", result.data)
    }
  },
  async getPolicyDescList({ commit }) {
    const result = await reqGetPolicyDescList()
    if (result.code === 200) {
      commit('RECEIVE_POLICY_DESCLIST', result.data)
    }
  },
  //获取轮播图数据
  async getFocusList({ commit }) {
    const result = await reqGetFocusList()
    if (result.code === 200) {
      commit('RECEIVE_FOUCS_LIST', result.data)
    }
  },
  async getIndexCateModule({ commit }) {
    const result = await reqGetIndexCateModule()
    if (result.code === 200) {
      commit('RECEIVE_INDEX_CATE_MODULE', result.data)
    }
  },
  async getBigPromotionModule({ commit }) {
    const result = await reqGetBigPromotionModule()
    if (result.code === 200) {
      commit('RECEIVE_BIG_PROMOTION_MODULE', result.data)
    }
  },
  async getIndexActivityModule({ commit }) {
    const result = await reqGetIndexActivityModule()
    if (result.code === 200) {
      commit('RECEIVE_INDEX_ACTIVITY_MODULE', result.data)
    }
  },
  async getCategoryHotSellModule({ commit }) {
    const result = await reqGetCategoryHotSellModule()
    if (result.code === 200) {
      commit('RECEIVE_CATEGORY_HOT_SELL_MODULE', result.data)
    }
  },
  async getFlashSaleModule({ commit }) {
    const result = await reqGetFlashSaleModule()
    if (result.code === 200) {
      commit('RECEIVE_FLASH_SALE_MODULE', result.data)
    }
  },
  async getNewItemList({ commit }) {
    const result = await reqGetNewItemList()
    if (result.code === 200) {
      commit('RECEIVE_NEW_ITEM_LIST', result.data)
    }
  },
  async getCateNavDatas({ commit }) {
    const result = await reqGetCateNavDatas()
    if (result.code === 200) {
      commit('RECEIVE_CATE_NAV_DATAS', result.data.categoryL1List)
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