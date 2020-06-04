<template>
  <div class="swiperTab">
    <img class="bg" src="https://m.you.163.com/topic/index/img/topic_title_bg.2373a140.png" alt />
    <div class="title">
      <img class="left" src="https://m.you.163.com/topic/index/img/topic_logo.c2284970.png" alt />
      <div class="right">严选好物&nbsp;用心生活</div>
    </div>
    <div class="swiper-container" ref="sw">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="grounp in newList" :key="grounp.id">
          <div v-for="item in grounp.list" :key="item.id">
            <div class="item">
              <img :src="item.picUrl" :alt="item.mainTitl" />
              <span class="mainTitle">{{item.mainTitle}}</span>
              <span class="viceTitle">{{item.viceTitle}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  mounted() {
    //this.configSwiper();
    // setTimeout(() => {
    //   console.log("navList", this.navList);
    //   console.log("newList", this.newList);
    // }, 2000);
  },
  props: ["navList"],
  computed: {
    newList() {
      let res = this.navList.reduce((ret, item, index, arr) => {
        //计算出分几组
        const len = Math.ceil(arr.length / 2);
        //设置一个变量让它等于下标除以分组后的长度.
        //比如 0  1  2  3  4 长度为5 分为 3 组
        // 下标为0 就是第一个对象里面
        //      1 就是第二个对象里面
        // 下标为2 就是第三个对象里面
        // 下标为3 就是第一个对象里面
        //      4 就是第二个对象里面
        let i = index % len;
        //比如data[0]里面已经是对象了,就不应初始化,
        //这里面还需要考虑到一开始没有数据和有数据的情况,
        //所以处理的时候还需要进行判断
        ret[i] = ret[i] || {};
        ret[i].id = item.id;
        ret[i].list = ret[i].list || [];
        ret[i].list.push(item);
        return ret;
      }, []);
      return res;
    }
  },
  watch: {
    newList: {
      handler(value) {
        //轮播图数据更新需要进行重新设置
        //就是newList的数据
        //console.log("value", value);
        //if (this.carouses.length < 1) return;
        if (value.length < 1) return;
        this.$nextTick(() => {
          this.configSwiper();
        });
      },
      immediate: true
    }
  },
  methods: {
    configSwiper() {
      var mySwiper = new Swiper(this.$refs.sw, {
        //loop: true,
        slidesPerView: "4",
        loopedSlides: 4,
        pagination: {
          el: ".swiper-pagination"
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.swiperTab >>> .swiper-pagination-bullet {
  margin: 0 !important;
  width: 30px;
  height: 4px;
  border-radius: 0% !important;
}

.swiperTab {
  position: relative;
  height: 342.5px;
  background-color: #eeeeee;
  padding-bottom: 12px;

  .bg {
    height: 259px;
  }

  .title {
    position: absolute;
    left: 6px;
    top: 30px;
    display: flex;

    .left {
      display: block;
      width: 65px;
      height: 34.33px;
    }

    .right {
      position: absolute;
      bottom: 2px;
      left: 68px;
      font-size: 15px;
      height: 22px;
      width: 125px;
      color: #ffffff;
    }
  }

  .swiper-container {
    width: 355px;
    height: 270px;
    position: absolute;
    bottom: 12px;
    background-color: #ffffff;
    border-radius: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;

    .swiper-wrapper {
      .swiper-slide {
        width: 88.75px;
        height: 236px;

        .item {
          margin-top: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          img {
            width: 60px;
            height: 60px;
          }

          .mainTitle {
            display: block;
            height: 20px;
            color: #333333;
            font-size: 14px;
            margin-top: 1px;
          }

          .viceTitle {
            margin-top: 1px;
            display: block;
            font-size: 12px;
            height: 15px;
            color: #999;
          }
        }
      }
    }

    .swiper-pagination-bullets {
      .swiper-pagination-bullet {
        width: 40px !important;
      }
    }
  }
}
</style>