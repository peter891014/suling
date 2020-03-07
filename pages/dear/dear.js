var app = getApp()
var token = app.globalData.openid;
var baseUrl = app.globalData.baseUrl;
Page({
  data: {
    userid: "",
    openid: "",
    banner:[]
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: baseUrl + '/file/bannerlist?type=welcome',
      header: { "token": token },
      success: function (e) {
        console.log(e.data)
        that.setData({
          banner: e.data
        })
      }
    })
  },
})
