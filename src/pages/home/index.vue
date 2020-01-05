<template>
  <div>
    <!-- 顶部搜索栏 -->
    <Search></Search>
    <!-- 轮播图 -->
    <swiper
      indicator-dots
      autoplay
      interval="3000"
      circular
      indicator-active-color="#fff"
      indicator-color="rgba(255,255,255,0.3)"
    >
      <block v-for="(item, index) in swiperdata" :key="index">
        <swiper-item>
          <img :src="item.image_src" alt="" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 分类 -->
    <div class="cato">
      <img
        v-for="(items, index) in catitems"
        :key="index"
        :src="items.image_src"
        alt=""
      />
    </div>
    <!-- 楼层 -->
    <div
      class="floor"
      v-for="(item, floorindex) in floordata"
      :key="floorindex"
    >
      <div class="floor_title">
        <img :src="item.floor_title.image_src" alt="" />
      </div>
      <div class="floor_body">
        <div class="floor_left">
          <img :src="item.product_list[0].image_src" alt="" />
        </div>
        <div class="floor_right">
          <block v-for="(fl, flindex) in item.product_list" :key="flindex">
            <img :src="fl.image_src" alt="" v-if="flindex" />
          </block>
        </div>
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
      // 轮播图数组
      swiperdata: [],
      catitems: [],
      floordata: {}
    };
  },
  onLoad() {
    this.getSwiper();
    this.getCatitems();
    this.getFloordata();
  },
  methods: {
    async getSwiper() {
      this.swiperdata = await this.$request("/api/public/v1/home/swiperdata");
    },
    async getCatitems() {
      this.catitems = await this.$request("/api/public/v1/home/catitems");
    },
    async getFloordata() {
      this.floordata = await this.$request("/api/public/v1/home/floordata");
    }
  }
};
</script>

<style lang="less">
swiper {
  width: 100%;
  height: 340rpx;
  img {
    width: 100%;
    height: 100%;
  }
}
.cato {
  height: 194rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  img {
    height: 140rpx;
    width: 128rpx;
  }
}
.floor {
  display: flex;
  flex-direction: column;
  .floor_title {
    height: 88rpx;
    // padding-top: 20rpx;
    img {
      width: 100%;
      height: 78rpx;
      margin-top: 10rpx;
    }
  }
  .floor_body {
    height: 426rpx;
    padding: 20rpx 17rpx;
    display: flex;
    .floor_left {
      width: 232rpx;
      img {
        width: 232rpx;
        height: 386rpx;
      }
    }
    .floor_right {
      height: 386rpx;
      img {
        width: 232rpx;
        height: 188rpx;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
