<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="longList"
      >
        <div class="wrapper">
          <!--
          <van-cell v-for="item in list" :key="item" :title="item" />
          -->
          <div v-for="(list,index) in lists" :key="index">
            <div class="lookTopics" v-for="(item,index) in list" :key="index">
              <div class="outerWrap">
                <div class="innerWrap">
                  <div class="look">
                    <img :src="item.picUrl" alt />
                  </div>
                  <div class="lookDesc">{{item.title}}</div>
                  <div class="lookDetail">
                    <div class="avatar">
                      <img :src="item.avatar" alt />
                      <span class="username">{{item.nickname}}</span>
                    </div>
                    <div class="upArea">
                      <i class="handImg">
                        <img src="/public/hand.png" alt />
                      </i>
                      <span
                        class="readCount"
                      >{{item.readCount.toString().length>4?item.readCount.toString()[0]+'k':item.readCount}}</span>
                    </div>
                  </div>
                  <div class="singGoods" v-if="item.buyNow">
                    <div class="wrapCnt">
                      <div class="goodsName">{{item.buyNow.itemName}}</div>
                      <span class="buyText">去购物&nbsp;></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      leftList: [],
      rightList: [],
      lists: [],
      page: 1,
      size: 2
    };
  },
  mounted() {
    this.getYouCanGou();
    this.getFirstGoods();
    //this.getLoadingGoods({ page: 1, size: 2 });
    setTimeout(() => {
      //console.log("firstGoods", this.firstGoods);
      console.log("loadingGoods", this.loadingGoods);
      console.log("leftList", this.leftList);
      console.log("rightList", this.rightList);
      console.log("lists", this.lists);
    }, 3000);
  },
  methods: {
    ...mapActions(["getYouCanGou", "getFirstGoods", "getLoadingGoods"]),
    onLoad() {
      console.log("aaa");

      setTimeout(() => {
        if (this.refreshing) {
          console.log("ccc");
          this.list = [];
          this.refreshing = false;
        }
        console.log("bbb");
        this.getLoadingGoods({ page: ++this.page, size: this.size });
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        this.loading = false;

        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  },
  watch: {
    loadingGoods: {
      handler(value) {
        // console.log("value", value[0].look.nickname);
        // this.loadingGoods.forEach(item => {
        // //一个对象里面有look属性和topics属性
        // let res = item.topics.filter(item => {
        //   //在第一列显示
        //   if (item.layoutType == 1) {
        //     //如果是第一列显示就返回形成新数组
        //     return true;
        //   }
        // })
        value.forEach(item => {
          //一个对象里面有look属性和topics属性
          //console.log("item", item.topics);
          item.topics.forEach(topic => {
            // console.log("topic", topic.layoutType);
            if (topic.layoutType == 1) {
              this.leftList.push(topic);
            } else {
              this.rightList.push(topic);
            }
          });
          //遍历完topics还要判断look属性的只要给谁
          //给数组比较少的那个，如果相等给左边
          if (this.leftList.length <= this.rightList.length) {
            this.leftList.push(item.look);
          } else {
            this.rightList.push(item.look);
          }
        });
        this.lists = [this.leftList, this.rightList];
      },
      // immediate: true
      deep: true
    }
  },
  computed: {
    ...mapState({
      firstGoods: state => state.goodtopic.firstGoods,
      loadingGoods: state => state.goodtopic.loadingGoods,
      navList: state => state.goodtopic.navList
    })
    // lists() {
    //   return [this.leftList, this.rightList];
    // }
    // leftList() {
    //   //先进行判断左边数组和右边数组谁比较多,把如果左边比较少,到时就把
    //   //look属性里的数据给较少的一边
    //   //console.log("leftList", this.leftList);
    //   let less = null;
    //   if (this.leftList.length <= this.rightList.length) {
    //     //leftList数组比较少,第一次将会得到look里的数据
    //     less = true;
    //   }
    //   let arr = [...this.leftList];
    //   // if(this.loadingGoods.length<=1){
    //   //   return arr
    //   // }
    //   // 数据里面有多个对象 [{},{},{}]
    //   this.loadingGoods.forEach(item => {
    //     //一个对象里面有look属性和topics属性
    //     let res = item.topics.filter(item => {
    //       //在第一列显示
    //       if (item.layoutType == 1) {
    //         //如果是第一列显示就返回形成新数组
    //         return true;
    //       }
    //     });
    //     //如果item.topics里面有6个对象,
    //     //在这里过滤出来出来3个对象或小于3就把look属性里的数据也放在这里
    //     arr = [...arr, ...res];
    //     if (less) {
    //       arr.push(item.look);
    //       //第一次在左边下一次就再右边。因为请求的数据是偶数
    //       less = !less;
    //     }
    //     return arr;
    //   });
    // }
    // rightList() {
    //   //先进行判断左边数组和右边数组谁比较多,把如果左边比较少,到时就把
    //   //look属性里的数据给较少的一边
    //   let less = null;
    //   if (this.leftList.length > this.rightList.length) {
    //     //rightList数组比较少,第一次将会得到look里的数据
    //     less = true;
    //   }
    //   let arr = [...this.rightList];
    //   // if(this.loadingGoods.length<=1){
    //   //   return arr
    //   // }
    //   // 数据里面有多个对象 [{},{},{}]
    //   this.loadingGoods.forEach(item => {
    //     //一个对象里面有look属性和topics属性
    //     let res = item.topics.filter(item => {
    //       //在第一列显示
    //       if (item.layoutType == 2) {
    //         //如果是第一列显示就返回形成新数组
    //         return true;
    //       }
    //     });
    //     //如果item.topics里面有6个对象,
    //     //在这里过滤出来出来3个对象或小于3就把look属性里的数据也放在这里
    //     arr = [...arr, ...res];
    //     if (less) {
    //       arr.push(item.look);
    //       //第一次在左边下一次就再右边。因为请求的数据是偶数
    //       less = !less;
    //     }
    //     return arr;
    //   });
    // }
  }
};
</script>

<style lang="stylus" scoped>
.longList {
  margin-bottom: 50px;
  background-color: #eee;

  .wrapper {
    display: flex;

    .outerWrap {
      margin: 5px;

      .innerWrap {
        border-radius: 14px;
        overflow: hidden;

        .look {
          font-size: 0px;

          img {
            width: 174px;
          }
        }

        .lookDesc {
          background-color: #fff;
          width: 157.5px;
          height: 29px;
          padding: 9px 8px 0;
          font-size: 14px;
        }

        .lookDetail {
          background-color: #fff;
          display: flex;
          padding: 8.5px 8px 12px;
          justify-content: space-between;
          align-items: center;

          .avatar {
            display: flex;
            align-items: center;
            margin-top: 2px;

            img {
              border-radius: 10px;
              height: 24px;
              width: 24px;
            }

            .username {
              margin-left: 4px;
              font-size: 12px;
              width: 85px;
              height: 24px;
              margin: 0 0 0 4px;
              line-height: 24px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .upArea {
            height: 24px;
            display: flex;
            align-items: center;
            line-height: 24px;
            text-align: right;
            justify-content: flex-end;

            .handImg {
              img {
                display: block;
                width: 16px;
                height: 16px;
              }
            }

            .readCount {
              display: block;
              font-size: 12px;
              color: #7F7F7F;
              margin-left: 1px;
            }
          }
        }

        .singGoods {
          background-color: #fff;
          display: flex;
          padding: 0px 0 12px;
          justify-content: center;

          .wrapCnt {
            padding-top: 6px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 3px solid #eee;
            width: 152.5px;

            .goodsName {
              font-size: 12px;
              width: 100.5px;
              height: 16px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .buyText {
              font-size: 12px;
              color: #DD1A21;
              width: 50px;
              height: 16px;
            }
          }
        }
      }
    }
  }
}
</style>