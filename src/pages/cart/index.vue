<template>
  <div class="content">
    <div class="title">
      <span class="iconfont icon-shop"></span>
      <span>优购生活馆</span>
    </div>
    <!-- 商品列表 -->
    <ul class="goods-list">
      <li class="goods-item" v-for="item in goodsList" :key="item.goods_id">
        <span
          class="iconfont"
          :class="item.checked ? 'icon-check' : 'icon-uncheck'"
          @click="item.checked = !item.checked"
        ></span>
        <img :src="item.goods_small_logo" alt="" />
        <div class="right">
          <p class="lainghang">{{ item.goods_name }}</p>
          <div class="btm">
            <span class="price"
              >￥<span>{{ item.goods_price }}</span
              >.00</span
            >
            <div class="goods-num">
              <button @click="item.num--" :disabled="item.num === 1">-</button>
              <span>{{ item.num }}</span>
              <button @click="item.num++">+</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="account">
      <div class="select-all" @click="isAll = !isAll">
        <span
          class="iconfont"
          :class="isAll ? 'icon-check' : 'icon-uncheck'"
        ></span>
        <span>全选</span>
      </div>

      <div class="price">
        <p>
          合计:<span class="num">￥{{ totalPrice }}</span>
        </p>
        <p class="info">包含运费</p>
      </div>
      <div class="account-btn" @click="toPay">结算({{ totalNum }})</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsList: []
    };
  },
  onShow() {
    this.queryGoods();
    wx.setTabBarBadge({
      index: 2,
      text: Object.keys(wx.getStorageSync("cart")).length + ""
    });
  },
  onHide() {
    let cart = {};
    this.goodsList.forEach(v => {
      cart[v.goods_id] = {
        num: v.num,
        checked: v.checked
      };
    });
    // 存  wx38d8faffac4d34d2
    wx.setStorageSync("cart", cart);
  },
  computed: {
    isAll: {
      get() {
        return this.goodsList.every(v => {
          return v.checked;
        });
      },
      set(status) {
        this.goodsList.forEach(v => {
          v.checked = status;
        });
      }
    },
    totalNum() {
      return this.goodsList.reduce((sum, v) => {
        return sum + (v.checked ? v.num : 0);
      }, 0);
    },
    totalPrice() {
      // 所有被选中商品的数量*价格的和
      return this.goodsList.reduce((sum, v) => {
        return sum + (v.checked ? v.num * v.goods_price : 0);
      }, 0);
    }
  },
  methods: {
    toPay() {
      if (!this.totalNum) {
        wx.showToast({
          title: "商品不能为空", //提示的内容,
          icon: none //图标,
        });
        return;
      }
      let token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({ url: "/pages/login/main" });
        // return;
      }
      wx.navigateTo({ url: "/pages/pay/main" });
    },
    async queryGoods() {
      let cart = wx.getStorageSync("cart") || {};
      let gids = Object.getOwnPropertyNames(cart);
      let goodsList = await this.$request({
        url: `/api/public/v1/goods/goodslist?goods_ids=${gids}`
      });
      // 合并数据源
      goodsList.forEach(v => {
        v.num = cart[v.goods_id].num;
        v.checked = cart[v.goods_id].checked;
      });

      this.goodsList = goodsList;
    }
  }
};
</script>

<style lang="less">
.iconfont {
  font-size: 44rpx;
}
.title {
  height: 88rpx;
  display: flex;
  align-items: center;
  .iconfont {
    color: #999;
    margin: 6rpx 12rpx 0 32rpx;
  }
}
.goods-item {
  height: 206rpx;
  background-color: #fff;
  border-top: 1rpx solid #ddd;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  .iconfont {
    color: #eb4450;
    margin: 0 30rpx;
  }
  img {
    width: 160rpx;
    height: 160rpx;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 20rpx 0 18rpx;
    .btm {
      display: flex;
      margin-top: 40rpx;
      justify-content: space-between;
      .price {
        color: #eb4450;
        > span {
          font-size: 24px;
        }
      }
      .goods-num {
        display: flex;
        align-items: center;
        button {
          width: 60rpx;
          height: 50rpx;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 4rpx solid #666;
        }
        span {
          margin: 0 30rpx;
        }
      }
    }
  }
}
.goods-list {
  position: absolute;
  bottom: 98rpx;
  top: 88rpx;
  width: 100%;
  overflow: auto;
  padding-bottom: 60rpx;
  background-color: #f4f4f4;
}

.account {
  height: 98rpx;
  border-bottom: 1rpx solid #ddd;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  .iconfont {
    color: #eb4450;
    margin: 0 30rpx;
  }
  .account-btn {
    width: 230rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #eb4450;
  }
  .select-all {
    flex: 1;
  }
  .price {
    margin-right: 20rpx;
    .num {
      color: #eb4450;
    }
    .info {
      color: #999;
    }
  }
}
</style>
