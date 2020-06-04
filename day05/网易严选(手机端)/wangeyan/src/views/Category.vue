<template>
  <div>
    <div class="header">
      <van-search class="search" value @click="goSearch" placeholder="搜索商品,共29863款好物" />
    </div>
    <van-tree-select class="sideNav" :items="items" :main-active-index.sync="active">
      <template #content>
        <div
          class="subcatecontainer"
          v-show="active===index"
          v-for="(category1,index) in cateNavDatas"
          :key="category1.id"
        >
          <div class="singlebanner">
            <img :src="category1.bannerUrl" alt />
          </div>
          <ul class="list1" v-show="index<3">
            <li v-for="category3 in category1.subCateList[0].subCateList" :key="category3.id">
              <img :src="category3.url" :alt="category3.name" />
              <p>{{category3.name}}</p>
            </li>
          </ul>
          <div v-show="index>2">
            <ul class="list" v-for="category2 in category1.subCateList" :key="category2.id">
              <li class="title">{{category2.name}}</li>
              <li class="wrapCont">
                <div
                  class="cateing"
                  v-for="(category3,index) in category2.subCateList"
                  :key="index"
                >
                  <img :src="category3.url" alt />
                  <p class="text">{{category3.name}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
    this.getCateNavDatas();
    setTimeout(() => {
      console.log("aa", this.cateNavDatas);
    }, 4000);
  },
  data() {
    return {
      active: 0
      // items: [{ text: "分组 1" }, { text: "分组 2" }]
    };
  },
  methods: {
    ...mapActions(["getCateNavDatas"]),
    goSearch() {
      console.log(this.$router);
    }
  },
  computed: {
    ...mapState({
      cateNavDatas: state => state.home.cateNavDatas
    }),
    items() {
      let a = [{ text: "1" }];
      let result = this.cateNavDatas.reduce((arr, item, index) => {
        arr[index] = {};
        arr[index].text = item.name;
        return arr;
      }, []);
      return result || a;
    }
  }
};
</script>

<style lang="stylus" scoped>
.header {
  height: 44px;
  width: 375px;
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;

  .search {
    height: 28px;
    color: #333;
    flex: 1;
    text-align: center;
  }
}

.van-sidebar {
  flex: 0.6;
  font-size: 14px;
}

.sideNav {
  height: 100% !important;

  .subcatecontainer {
    flex: 1.2;
    padding: 12.2px;

    background-color, .singlebanner {
      img {
        width: 264px;
        height: 96px;
      }
    }

    .list1 {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 10px;

      li {
        width: 72px;
        height: 108px;

        img {
          width: 72px;
          height: 72px;
        }

        p {
          text-align: center;
        }
      }
    }

    .list {
      margin-top: 14px;

      .title {
        color: #333333;
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 12px;
        padding-bottom: 4px;
        border-bottom: 1px solid #d9d9d9;
      }

      .wrapCont {
        display: flex;
        flex-wrap: wrap;

        .cateing {
          width: 72px;
          height: 108px;

          img {
            width: 72px;
            height: 72px;
          }

          .text {
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>