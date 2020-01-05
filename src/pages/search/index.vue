<template>
  <div>
    <!-- 搜索框 -->
    <div class="headerll" :style="{ position: isScroll ? 'static' : 'fixed' }">
      <!-- <div class="searchmodule">
        <icon type="search" size="16" />
        <input type="text" @confirm="reload" v-model="keyWord" />
      </div> -->
      <Searchlist @query="queryHandler" :query="keyWord" />

      <!-- 顶部筛选栏 -->
      <ul class="shaixuan">
        <li
          v-for="(item, index) in shaixuanData"
          :key="index"
          @click="activeIndex = index"
          :class="{ active: activeIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- 商品列表栏 -->
    <ul class="goodslist" :style="{ marginTop: isScroll ? '0' : '220rpx' }">
      <li
        @click="toItem(goods.goods_id)"
        class="list"
        v-for="goods in goodsLists"
        :key="goods.cat_id"
      >
        <img :src="goods.goods_small_logo" alt="" />
        <div>
          <div class="lainghang">
            {{ goods.goods_name }}
          </div>
          <p class="price">
            ¥<span>{{ goods.goods_price }}</span
            >.00
          </p>
        </div>
      </li>
    </ul>
    <!-- 提示没有数据了 -->
    <p class="tip" v-show="isLastPage">--我是有底线的--</p>
  </div>
</template>

<script>
const PAGE_SIZE = 6;
import Searchlist from "../components/searchlist";
export default {
  components: {
    Searchlist
  },
  data() {
    return {
      activeIndex: 0,
      shaixuanData: ["综合", "销量", "价格"],
      keyWord: "",
      goodsLists: [],
      // isRequest: false,
      isLastPage: false,
      isScroll: false
    };
  },
  onLoad(options) {
    this.keyWord = options.keyword;
    this.reload();
    this.pagenum = 1;
    this.isRequest = false;
  },
  // 下拉刷新
  onPullDownRefresh() {
    // this.pagenum = 1;
    this.isScroll = false;
    this.reload();
    // this.isScroll = true;
  },
  // 上拉加载更多
  onReachBottom() {
    if (!this.isLastPage) {
      this.pagenum++;
    }
    this.getGoods();
  },
  onPageScroll() {
    this.isScroll = true;
    console.log(this.isScroll);
  },
  methods: {
    queryHandler(keyword) {
      this.keyWord = keyword;
      this.reload();
    },
    reload() {
      this.pagenum = 1;
      this.isLastPage = false;
      this.isRequest = false;
      this.goodsLists = [];
      this.getGoods();
    },
    getGoods() {
      if (this.isRequest || this.isLastPage) {
        return;
      }
      // 发请求前，isRequest置为true
      this.isRequest = true;
      wx.request({
        url: "https://ugo.botue.com/api/public/v1/goods/search",
        data: {
          query: this.keyWord,
          pagenum: this.pagenum,
          pagesize: PAGE_SIZE
        },
        success: res => {
          if (res.data.meta.status === 200) {
            this.goodsLists = [...this.goodsLists, ...res.data.message.goods];
            if (this.goodsLists.length === res.data.message.total) {
              this.isLastPage = true;
            }
          }
        },
        complete: () => {
          this.isRequest = false;
        }
      });
    },
    toItem(goodsId) {
      wx.navigateTo({
        url: "/pages/item/main?goodsid=" + goodsId
      });
    }
  }
};
</script>

<style lang="less">
.headerll {
  position: fixed;
  width: 100%;
  background-color: #fff;
  top: 0;
}
.searchmodule {
  height: 120rpx;
  background-color: #eee;
  position: relative;
  overflow: hidden;
  icon {
    position: absolute;
    top: 44rpx;
    left: 40rpx;
  }
  input {
    margin: 30rpx 20rpx;
    height: 60rpx;
    background-color: #fff;
    padding-left: 60rpx;
    border-radius: 5rpx;
  }
}
.shaixuan {
  height: 100rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  li {
    width: 33.33%;
  }
  .active {
    color: red;
  }
}
.goodslist {
  .list {
    // height: 260rpx;
    padding: 35rpx 20rpx;
    border-top: 1px solid #ddd;
    display: flex;
    img {
      width: 200rpx;
      height: 200rpx;
      margin-right: 30rpx;
    }
    div {
      width: 486rpx;

      .price {
        margin-top: 90rpx;
        font-size: 28rpx;
        color: #eb4450;
        span {
          font-size: 36rpx;
        }
      }
    }
  }
}
.tip {
  text-align: center;
  color: #ccc;
}
.header {
  height: 120rpx;
  background-color: #eee;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    background-color: #fff;
    height: 60rpx;
    width: 720rpx;
    padding-left: 74rpx;
    box-sizing: border-box;
  }
  .search-icon {
    position: absolute;
    left: 44rpx;
  }

  .clear-icon {
    position: absolute;
    right: 44rpx;
    z-index: 100;
  }
}
</style>
