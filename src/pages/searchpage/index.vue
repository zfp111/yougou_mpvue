<template>
  <div class="wrapper">
    <Searchlist @query="toSearchList" :query="keyword" />
    <div class="history-search">
      <div class="title">
        <span class="title">历史搜索</span>
        <icon type="clear" size="18" @click="clickall"> </icon>
      </div>
      <ul>
        <li
          @click="toSearchList(item)"
          v-for="(item, index) in keywordList"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Searchlist from "../components/searchlist";
const KEYWORD_LIST = "keyword_list";
export default {
  components: {
    Searchlist
  },
  data() {
    return {
      keyword: "",
      // 保存搜索历史
      keywordList: []
    };
  },
  onShow() {
    // 页面初始化或者返回时，从storage里面取keywordList
    this.keywordList = wx.getStorageSync(KEYWORD_LIST) || [];
    this.keyword = "";
  },
  methods: {
    toSearchList(kw) {
      console.log(kw);
      this.keyword = kw;

      let _keywordList = [...this.keywordList];
      _keywordList.unshift(kw);

      // 去重
      let words = new Set(_keywordList);

      // 保存在storage里面
      wx.setStorageSync(KEYWORD_LIST, [...words]);

      wx.navigateTo({ url: "/pages/search/main?keyword=" + kw });
    },
    // 清除搜索历史
    clickall() {
      wx.showModal({
        title: "提示", //提示的标题,
        content: "你确定要清除所有历史?", //提示的内容,
        success: res => {
          if (res.confirm) {
            wx.removeStorageSync(KEYWORD_LIST);
            this.keywordList = [];
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.search {
  background-color: #eee;
  padding: 30rpx 15rpx;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  position: relative;
  icon {
    position: absolute;
    top: 50rpx;
    left: 38rpx;
  }
  input {
    height: 60rpx;
    flex: 1;
    background-color: #fff;
    padding-left: 70rpx;
    box-sizing: border-box;
    border-radius: 4rpx;
  }
  button {
    width: 160rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    border: 1rpx solid #bfbfbf;
    background-color: #eee;
    margin-left: 20rpx;
  }
}

.history-search {
  color: #333;
  font-size: 28rpx;
  padding: 30rpx 30rpx 30rpx 15rpx;
  .title {
    display: flex;
    justify-content: space-between;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30rpx;
    li {
      height: 64rpx;
      line-height: 64rpx;
      padding: 0 26rpx;
      background-color: #ddd;
      margin: 0 30rpx 16rpx 0;
    }
  }
}
</style>
