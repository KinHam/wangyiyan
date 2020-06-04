<template>
  <div class="home">
    <!-- 
      
    -->
    <div class="header">
      <a href="javascript;" class="title">网易严选</a>
      <van-search class="search" value @click="goSearch" placeholder="搜索商品,共29863款好物" />
      <a class="login" href="javascript;">登录</a>
    </div>
    <van-tabs>
      <van-tab title="推荐"></van-tab>
      <van-tab v-for="item in indexCateModule" :title="item.name" :key="item.id">{{ item.name}}</van-tab>
    </van-tabs>
    <!-- 轮播图  -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in focusList" :key="item.id" @click="onFocusList(item.targetUrl)">
        <img v-lazy="item.picUrl" :alt="item.name" />
      </van-swipe-item>
    </van-swipe>
    <!-- 下标服务保证 -->
    <div class="indexServicePolicy">
      <ul class="g-grow">
        <li class="item" v-for="(item,index) in policyDescList" :key="index">
          <a>
            <i class="u-icon" :style="{backgroundImage: `url(${item.icon})`}"></i>
            <span class="text">{{item.desc}}</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- kingKongModule -->
    <div class="kingKongModule">
      <div class="wrap" v-for="(item,index) in kingKongModule.kingKongList" :key="index">
        <a class="kingKong-item" href="javascript;">
          <div class="icon">
            <img :src="item.picUrl" :alt="item.text" />
          </div>
          <div class="txt" :style="{color:`#${item.textColor}`}">{{item.text}}</div>
        </a>
      </div>
    </div>
    <!--新人专享 -->
    <div class="indexBigPromotionModule">
      <div
        class="floor floorTop-1"
        :style="{backgroundImage:`url(${bigPromotionModule.floorList[0].cells[0].picUrl})`}"
      >
        <van-swipe class="small-swipe" :show-indicators="false" :autoplay="3000">
          <van-swipe-item
            v-for="(image) in bigPromotionModule.floorList[0].cells[0].itemList"
            :key="image.id"
          >
            <img v-lazy="image.picUrl" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="floor floorFirst">
        <img :src="bigPromotionModule.floorList[1].cells[0].picUrl" alt />
      </div>
      <van-grid :column-num="3">
        <van-grid-item v-for="cell in bigPromotionModule.floorList[2].cells" :key="cell.id">
          <van-image :src="cell.picUrl" />
        </van-grid-item>
        <van-grid-item>
          <van-image :src="bigPromotionModule.floorList[3].cells[0].picUrl" />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 新人专享礼-->
    <div class="freshmanModule">
      <div class="moduleTitle">
        <span>{{indexActivityModule[0].zhuti}}</span>
      </div>
      <div class="content">
        <div class="left">
          <div class="name">{{indexActivityModule[0].title}}</div>
          <div class="imgWrap">
            <img :src="indexActivityModule[0].picUrl" alt />
          </div>
        </div>
        <div class="right">
          <div
            class="activityItem"
            v-for="(item,index) in indexActivityModule[1].activityList"
            :key="index"
          >
            <div class="picwrap">
              <img :src="item.picUrl" alt />
              <div class="discount">
                <div class="line1">{{item.activityPrice}}</div>
                <div class="line2">{{item.originPrice}}</div>
              </div>
            </div>

            <div class="cnt">
              <div class="title">{{item.title}}</div>
              <div class="tag">{{item.tag}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 类目热销榜 -->
    <div class="categoryHotSellModule">
      <div class="moduleTitle">
        <h2>{{categoryHotSellModule.title}}</h2>
      </div>
      <div class="content">
        <div class="line1">
          <div class="item1" v-for="item in categoryHotSellModule.categoryList1" :key="item.id">
            <h3>{{item.categoryName}}</h3>
            <img :src="item.picUrl" :alt="item.categoryName" />
          </div>
        </div>
        <div class="line2">
          <div clsss="item2" v-for="item in categoryHotSellModule.categoryList2" :key="item.id">
            <h3 class="title">{{item.categoryName}}</h3>
            <img :src="item.picUrl" :alt="item.categoryName" />
          </div>
        </div>
      </div>
    </div>

    <!-- 限时购 -->
    <div class="flashSaleModule">
      <div class="moduleTitle">
        <div class="left">
          <h2>{{flashSaleModule.name}}</h2>
          <van-count-down :time="flashSaleModule.remainTime" class="time">
            <template v-slot="timeData">
              <span class="block">{{ timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
        <div class="right">
          <a href="javascript;">更多 ></a>
        </div>
      </div>
      <div class="content">
        <div class="line2">
          <div clsss="item2" v-for="item in flashSaleModule.itemList" :key="item.id">
            <img :src="item.showPicUrl" alt />
            <span class="activityPrice">¥{{item.activityPrice}}</span>
            <span class="originPrice">¥{{item.originPrice}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 新品首发 -->
    <div class="newItemList">
      <div class="moduleTitle">
        <div class="left">
          <h2>{{newItemList.name}}</h2>
        </div>
        <div class="right">
          <a href="javascript;">更多 ></a>
        </div>
      </div>
      <div class="content">
        <div class="line2">
          <div clsss="item2" v-for="item in newItemList.lists" :key="item.id">
            <img :src="item.showPicUrl" alt />
            <span class="activityPrice">{{item.simpleDesc}}</span>
            <span class="originPrice">¥{{item.retailPrice}}</span>

            <span v-show="item.tag" class="tag-status-new">{{item.tag}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <footer class="ftWrap">
      <div class="footer">
        <div class="bd">
          <a href="javascript;">下载APP</a>
          <a href="javascript;">电脑版</a>
        </div>
        <p class="copyright">
          网易公司版权所有 © 1997-
          <br />食品经营许可证：JY13301080111719
        </p>
      </div>
    </footer>
    <!-- 底部导航标签栏 -->
    <FlooterNav />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { reqGetYouCanGou } from "../api";
import FlooterNav from "../components/FlooterNav";
export default {
  components: { FlooterNav },
  async mounted() {
    //获取kingKongModule,也就是新品首发,居家生活10个分类项
    this.getkingKongModule();
    //获取品牌保证 3个数据 (网易自营品牌,30天无忧退货)
    this.getPolicyDescList();
    //获取轮播图数据
    this.getFocusList();
    //获取首页分类
    this.getIndexCateModule();
    //获取防疫特供区域
    this.getBigPromotionModule();
    this.getIndexActivityModule();
    this.getCategoryHotSellModule();
    //限时购
    this.getFlashSaleModule();
    //https://m.you.163.com/topic/v1/know/navWap.json
    //const result = await reqGetYouCanGou();
    //获取新品
    this.getNewItemList();
    setTimeout(() => {
      //consol.e.log("reqGetYouCanGou", result);
      console.log("newItemList", this.newItemList);
    }, 3000);
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      "getkingKongModule",
      "getPolicyDescList",
      "getFocusList",
      "getIndexCateModule",
      "getBigPromotionModule",
      "getIndexActivityModule",
      "getCategoryHotSellModule",
      "getFlashSaleModule",
      "getNewItemList"
    ]),
    onFocusList(targetUrl) {
      console.log("aa", targetUrl);
    },
    goSearch() {
      console.log("aaa", this.$router);
    }
  },
  computed: {
    ...mapState({
      kingKongModule: state => state.home.kingKongModule,
      policyDescList: state => state.home.policyDescList,
      focusList: state => state.home.focusList,
      indexCateModule: state => state.home.indexCateModule,
      bigPromotionModule: state => state.home.bigPromotionModule,
      indexActivityModule: state => state.home.indexActivityModule,
      categoryHotSellModule: state => state.home.categoryHotSellModule,
      flashSaleModule: state => state.home.flashSaleModule,
      newItemList: state => state.home.newItemList
    })
  }
};
</script>

<style lang="stylus" scoped>
.home {
  background-color: rgb(234, 234, 234);
}

.header {
  height: 44px;
  width: 375px;
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;

  .title {
    display: block;
    margin-left: 10px;
    font-size: 18px;
  }

  .search {
    height: 28px;
    color: #333;
  }

  .login {
    display: block;
    width: 37px;
    height: 20px;
    color: #dd1a21;
    margin-left: 1px;
    border: 1px solid #dd1a21;
    text-align: center;
    line-height: 20px;
    border-radius: 4px;
    font-size: 12px;
  }
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  width: 375px;
  height: 148px;

  img {
    width: 375px;
    height: 148px;
  }
}

.indexServicePolicy {
  width: 345px;
  height: 36px;
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  padding: 0 15px;

  .g-grow {
    display: flex;
    flex: 1;
    height: 36px;

    .item {
      flex: 1;
      display: flex;
      align-items: center;

      a {
        display: flex;

        .u-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: cover;
        }

        .text {
          font-size: 12px;
          margin-left: 4px;
        }
      }
    }
  }
}

.kingKongModule {
  background-color: #fff;
  height: 170px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .wrap {
    display: flex;

    .kingKong-item {
      display: block;
      height: 78px;
      width: 55px;
      padding-left: 10px;
      padding-right: 10px;
      margin-top: 5px;

      .icon {
        width: 55px;
        height: 55px;

        img {
          width: 55px;
          height: 55px;
        }
      }

      .txt {
        height: 18px;
        width: 55px;
        margin-top: 3px;
        font-size: 13px !important;
        text-align: center;
      }
    }
  }
}

.indexBigPromotionModule {
  height: 290px;
  width: 375px;
  margin-top: 10px;

  .floorTop-1 {
    height: 110px;
    background-size: cover;
    position: relative;

    .small-swipe {
      position: absolute;
      left: 38px;
      top: 17px;
      height: 84px;
      width: 84px;

      img {
        height: 84px;
        width: 84px;
      }
    }
  }

  .floorFirst {
    width: 355px;
    height: 80px;
    padding: 0 10px;

    img {
      width: 355px;
      height: 80px;
    }
  }
}

.freshmanModule {
  height: 280px;
  width: 375px;
  background-color: #fff;

  .moduleTitle {
    height: 45px;
    width: 345px;
    padding: 0 15px;

    span {
      display: block;
      margin: 0 auto;
      color: #333333;
      font-size: 16px;
      height: 45px;
      width: 80px;
      text-align: center;
      line-height: 45px;
    }
  }

  .content {
    width: 375px;
    height: 219px;
    display: flex;

    .left {
      height: 217px;
      width: 172.5px;
      background-color: #FBE2D3;
      margin-right: 2px;
      margin-left: 15px;

      .name {
        padding-top: 15px;
        padding-left: 15px;
        font-size: 16px;
        color: #333333;
        height: 24px;
      }

      .imgWrap {
        width: 129px;
        height: 180px;
        margin: 0 auto;
        margin-top: 20px;

        img {
          width: 129px;
          height: 128.5px;
        }
      }
    }

    .right {
      width: 172.5px;
      height: 202px;

      .activityItem {
        height: 97.5px;
        background-color: #FBE2D3;
        padding-top: 10px;
        padding-left: 15px;
        position: relative;
        margin-bottom: 2px;

        .picwrap {
          height: 108.5px;

          .discount {
            .line1 {
              position: absolute;
              right: 10px;
              font-size: 12px;
            }

            .line2 {
              position: absolute;
              font-size: 12px;
              right: 10px;
              top: 30px;
            }
          }

          img {
            width: 100px;
            height: 100px;
            position: absolute;
            right: 0;
          }
        }

        .cnt {
          position: absolute;
          top: 10px;

          .title {
            font-size: 16px;
            color: #333;
          }

          .tag {
            font-size: 12px;
            color: #7F7F7F;
          }
        }
      }
    }
  }
}

.categoryHotSellModule {
  height: 355px;
  background-color: #fff;
  margin-bottom: 5px;
  margin-top: 10px;

  .moduleTitle {
    padding: 0 15px;
    height: 50px;
    display: flex;
    align-items: center;

    h2 {
      padding-left: 5px;
    }
  }

  .content {
    height: 305px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 10px;

    .line1 {
      width: 350px;
      display: flex;

      .item1 {
        width: 220px;
        height: 100px;
        margin-left: 5px;
        margin-bottom: 5px;
        background-color: #F9F3E4;
        position: relative;

        h3 {
          font-size: 14px;
          color: #333333;
          position: absolute;
          left: 16px;
          top: 34px;
        }

        img {
          width: 100px;
          height: 100px;
          position: absolute;
          right: 0;
          top: 0px;
        }
      }
    }

    .line2 {
      width: 350px;
      height: 180px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      div {
        background-color: #F5F5F5;
        width: 82.5px;
        height: 90px;
        text-align: center;
        margin-left: 5px;
        margin-top: 5px;

        .title {
          margin-top: 5px;
          font-size: 12px;
          color: #333333;
          height: 18px;
          text-align: center;
        }

        img {
          height: 60px;
          width: 60px;
        }
      }
    }
  }
}

.flashSaleModule {
  height: 355px;
  background-color: #fff;
  margin-bottom: 5px;
  margin-top: 10px;

  .moduleTitle {
    padding: 0 15px;
    height: 50px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      height: 50px;
      width: 180px;

      h2 {
        padding-left: 5px;
        font-size: 16px;
        margin-right: 12px;
      }

      .time {
        .colon {
          display: inline-block;
          margin: 0 4px;
          color: #ee0a24;
        }

        .block {
          display: inline-block;
          width: 22px;
          color: #fff;
          font-size: 12px;
          text-align: center;
          background-color: #ee0a24;
        }
      }
    }

    .right {
      width: 44px;
      height: 50px;
      color: #333333;
      font-size: 14px;
      line-height: 50px;
      text-align: cneter;
    }
  }

  .content {
    height: 305px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 10px;

    .line2 {
      width: 350px;
      height: 180px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      div {
        width: 108px;
        height: 150px;
        text-align: center;
        margin-left: 5px;
        margin-top: 5px;

        .activityPrice {
          color: #DD1A21;
          font-size: 14px;
        }

        .originPrice {
          color: #7F7F7F;
          font-size: 12px;
        }

        img {
          background-color: #F5F5F5;
          height: 108px;
          width: 108px;
        }
      }
    }
  }
}

.newItemList {
  height: 480px;
  background-color: #fff;
  margin-bottom: 5px;
  margin-top: 10px;

  .moduleTitle {
    padding: 0 15px;
    height: 50px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      height: 50px;
      width: 180px;

      h2 {
        padding-left: 5px;
        font-size: 16px;
        margin-right: 12px;
      }
    }

    .right {
      width: 44px;
      height: 50px;
      color: #333333;
      font-size: 14px;
      line-height: 50px;
      text-align: cneter;
    }
  }

  .content {
    height: 305px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 10px;

    .line2 {
      width: 350px;
      height: 180px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      div {
        width: 108px;
        height: 200px;
        margin-left: 5px;
        margin-top: 5px;

        .activityPrice {
          color: #333333;
          font-size: 12px;
          display: block;
        }

        .originPrice {
          color: #DD1A21;
          font-size: 16px;
          display: block;
        }

        .tag-status-new {
          margin-bottom: 2.5px;
          height: 15px;
          padding: 0 4px;
          line-height: 15px;
          color: #DD1A21;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #DD1A21;
          border-radius: 10px;
          margin-left: 6px;
          white-space: nowrap;
          font-size: 9px;
        }

        img {
          background-color: #F5F5F5;
          height: 108px;
          width: 108px;
        }
      }
    }
  }
}

.ftWrap {
  height: 200px;
  background-color: #414141;
  width: 375px;
  display: flex;
  justify-content: center;
  align-items: center;

  .footer {
    .bd {
      width: 355px;
      height: 31px;
      display: flex;
      margin-bottom: 18px;
      justify-content: center;
      align-items: center;

      a {
        display: block;
        color: #fff;
        width: 86px;
        height: 29px;
        margin-right: 25px;
        border: 1px solid #fff;
        line-height: 29px;
        text-align: center;
      }
    }

    .copyright {
      height: 32px;
      width: 355px;
      color: #999;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>