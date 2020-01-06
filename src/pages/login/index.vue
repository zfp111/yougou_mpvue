<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="getuserinfo">点我登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    getuserinfo() {
      let userinfo = null;
      wx.getUserInfo({
        success: res => {
          userinfo = res;
          wx.login({
            success: async res => {
              let data = await this.$request({
                url: "/api/public/v1/users/wxlogin",
                method: "POST",
                data: {
                  encryptedData: userinfo.encryptedData,
                  code: res.code,
                  iv: userinfo.iv,
                  rawData: userinfo.rawData,
                  signature: userinfo.signature
                }
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style></style>
