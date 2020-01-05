<template>
  <div class="header">
    <input
      type="text"
      v-model.trim="keyword"
      confirm-type="search"
      @confirm="confirmHandler"
    />
    <icon class="search-icon" type="search" size="16"> </icon>
    <icon
      v-show="keyword"
      class="clear-icon"
      type="clear"
      size="16"
      color="#ccc"
      @click="clearkw"
    >
    </icon>
  </div>
</template>

<script>
export default {
  props: ["query"],
  data() {
    return {
      keyword: this.query
    };
  },
  onLoad() {},
  watch: {
    query(newValue) {
      this.keyword = newValue;
    }
  },
  methods: {
    confirmHandler() {
      if (this.keyword) {
        this.$emit("query", this.keyword);
      }
    },
    clearkw() {
      this.keyword = "";
    }
  }
};
</script>

<style lang="less" scoped>
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
