// const BASE_URL = 'https://api.zbztb.cn'
// const BASE_URL = 'https://ugo.botue.com'
// const BASE_URL = 'https://api.zbztb.cn'
const BASE_URL = 'https://www.uinav.com'

function request (options) {
  return new Promise((resolve, reject) => {
    // 请求发出前，显示loading
    if (!options.noLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    wx.request({
      url: BASE_URL + options.url,
      data: options.data || {},
      method: options.method || "GET",
      success: res => {
        let {
          meta,
          message
        } = res.data
        if (meta.status === 200) {
          resolve(message)
        }
      },
      complete () {
        // 请求结束后，隐藏loading
        if (!options.noLoading) {
          wx.hideLoading()
        }
      }
    })
  })
}

export default request
