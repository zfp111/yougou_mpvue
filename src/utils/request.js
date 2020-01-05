const BASE_URL = 'https://ugo.botue.com'

function request (options) {
  return new Promise((resolve, reject) => {
    if (!options.isLoading) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    }
    wx.request({
      url: BASE_URL + options,
      data: options.data || {},
      success: result => {
        const { message, meta } = result.data
        if (meta.status === 200) {
          resolve(message)
        }
      },
      complete () {
        if (!options.isLoading) {
          wx.hideLoading()
        }

      }
    })
  })

}
export default request