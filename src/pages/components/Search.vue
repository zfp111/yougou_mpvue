<template>
  <!-- 顶部搜索栏 -->
  <div class="topBar" @click="toSearch">
    <div class="searchBar">
      <icon type="search" size="16" />
      <div>搜索</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toSearch() {
      wx.navigateTo({ url: "/pages/searchpage/main" });
    }
  }
};
</script>

<style lang="less">
.topBar {
  position: relative;
  height: 100rpx;
  padding: 20rpx 16rpx;
  background-color: #eb4450;
  box-sizing: border-box;
  .searchBar {
    height: 60rpx;
    border-radius: 5rpx;
    background-color: #fff;
    color: #bbb;
    display: flex;
    align-items: center;
    justify-content: center;
    icon {
      margin: 9rpx 16rpx 0 0;
    }
  }
}
</style>
