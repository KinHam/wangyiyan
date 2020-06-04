import ajax from './ajax'
//真实接口
import readyGou from './readyGou'

export const reqGetKingKongModule = () => ajax.get('/home/kingkongModule')
export const reqGetPolicyDescList = () => ajax.get('/home/policyDescList')
// 轮播图的图片
export const reqGetFocusList = () => ajax.get('/home/focusList')

//获取导航栏标签
export const reqGetIndexCateModule = () => ajax.get('/home/indexCateModule')
//获取bigPromotionModule
export const reqGetBigPromotionModule = () => ajax.get('/home/bigPromotionModule')

export const reqGetIndexActivityModule = () => ajax.get('home/indexActivityModule')
//类目热销榜
export const reqGetCategoryHotSellModule = () => ajax.get('/home/categoryHotSellModule')

//限时购
export const reqGetFlashSaleModule = () => ajax.get('/home/flashSaleModule')

//新品首发
export const reqGetNewItemList = () => ajax.get('/home/newItemList')

export const reqGetCateNavDatas = () => ajax.get('/home/cateNavDatas')


//readuGou值得够 导航接口
export const reqGetYouCanGou = () => readyGou.get('/topic/v1/know/navWap.json')

//值得够 首次数据
export const reqGetFirstGoods = () => readyGou.get('/topic/v1/find/recManual.json')
//值得够 触底加载接口        
export const reqGetLoadingGoods = (page, size) => readyGou.get('/topic/v1/find/recAuto.json', { params: { page, size } })
//https://m.you.163.com/topic/v1/find/recAuto.json?page=1&size=1
//export const reqGetLoadingGoods = (page, size) => readyGou.get(`/topic/v1/find/recAuto.json/${page}/${size}`)
