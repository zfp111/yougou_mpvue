<template>
  <div>
    <!-- 顶部搜索 -->
    <Search></Search>
    <!-- 主体内容 -->
    <div class="content">
      <ul class="left">
        <li
          v-for="(cate1, index) in categories"
          :key="cate1.cat_id"
          @click="activeIndex = index"
          :class="{ active: activeIndex === index }"
        >
          {{ cate1.cat_name }}
        </li>
      </ul>
      <div class="right" v-if="isInit">
        <img src="../../../static/images/titleImage.png" alt="" />
        <ul>
          <li
            class="cate2"
            v-for="cate2 in categories[activeIndex].children"
            :key="cate2.cat_id"
          >
            <p class="title">
              /<span>{{ cate2.cat_name }}</span
              >/
            </p>
            <ul class="list">
              <li
                class="cate3"
                v-for="(cate3, index3) in cate2.children"
                :key="cate3.cat_id"
                @click="toSearch(cate3.cat_name)"
              >
                <img :src="cate3.cat_icon" alt="" />
                <p>{{ cate3.cat_name }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
export default {
  components: {
    Search
  },
  data() {
    return {
      activeIndex: 0,
      categories: [],
      isInit: false
    };
  },
  onLoad() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      this.categories = await this.$request({
        url: "/api/public/v1/categories"
      });
      this.isInit = true;
    },
    toSearch(name) {
      wx.navigateTo({
        url: "/pages/search/main?keyword=" + name
      });
    }
  }
};
</script>

<style lang="less">
.content {
  display: flex;
  position: absolute;
  top: 100rpx;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  padding-top: 20rpx;
  .left {
    width: 198rpx;
    background-color: #f4f4f4;
    overflow: auto;
    li {
      width: 100%;
      color: #333;
      height: 100rpx;
      box-sizing: border-box;
      line-height: 100rpx;
      text-align: center;
      border-bottom: 1px solid #eee;
      &.active {
        color: red;
        background-color: #fff;
        position: relative;
        &::before {
          position: absolute;
          content: "";
          width: 8rpx;
          height: 60rpx;
          background-color: red;
          left: 0;
          top: 20rpx;
        }
      }
    }
  }
  .right {
    flex: 1;
    height: 100%;
    padding: 0 16rpx;
    overflow: auto;
    img {
      height: 180rpx;
      width: 520rpx;
    }
    .cate2 {
      .title {
        height: 110rpx;
        color: #e0e0e0;
        text-align: center;
        line-height: 110rpx;
        span {
          margin: 0 30rpx;
          color: #333;
        }
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        .cate3 {
          width: 33.33%;
          text-align: center;
          img {
            width: 120rpx;
            height: 120rpx;
          }
          p {
            font-size: 28rpx;
            margin-top: 14rpx;
          }
        }
      }
    }
  }
}
</style>
