// const BASE_URL = 'https://api.zbztb.cn'
// const BASE_URL = 'https://ugo.botue.com'
// const BASE_URL = 'https://api.zbztb.cn'
const BASE_URL = 'https://www.uinav.com'//https://www.uinav.com

function request (options) {
  return new Promise((resolve, reject) => {
    // 请求发出前，显示loading
    if (!options.noLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    let token = null
    if (options.isAuth) {
      token = wx.getStorageSync('token');
      if (!token) {
        wx.navigateTo({ url: '/pages/login/main' });
        return reject(new Error('未登录'))
      }
    }
    wx.request({
      url: BASE_URL + options.url,
      data: options.data || {},
      method: options.method || "GET",
      header: { Authorization: token },
      success: res => {
        let {
          meta,
          message
        } = res.data
        if (meta.status === 200) {
          resolve(message)
        } else {
          // 提示
          wx.showModal({
            title: '提示',
            content: `[${meta.status}]-${meta.msg}`
          })
          return reject(new Error('错误提示'))
        }
      },
      fail () {
        // 提示
        wx.showModal({
          title: '提示',
          content: `网络错误，请重试`
        })
        return reject(new Error('网络错误，请重试'))
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
