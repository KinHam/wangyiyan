/*
    引入vant资源
*/

import Vue from 'vue'

import {
  Button, List, PullRefresh, Cell, CellGroup,
  Form, field, Swipe, SwipeItem, Lazyload, Tab, Tabs, Grid, GridItem, Image as VanImage, CountDown,
  Tabbar, TabbarItem, Search, TreeSelect, Skeleton
} from 'vant';
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(PullRefresh);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);
Vue.use(Form);
Vue.use(Button)
Vue.use(field);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(CountDown);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);
Vue.use(TreeSelect);
Vue.use(Skeleton);
