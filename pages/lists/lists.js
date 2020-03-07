// page/component/list/list.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
Page({
  data: {
    list: [],
    userid:"",
    openid:"",
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    let postId = this.data.postId;
    try {
      var value = wx.getStorageSync('third_Session')
      if (value) {
        that.setData({
          openid: value.openid
        })
      }
    } catch (e) {
    }; wx.request({
      url: baseUrl + '/queryuser?openid=' + that.data.openid,
      success: res => {
        that.setData({
          userid: res.data.userid
        })
        wx.request({
          url: baseUrl + '/center/queryPointsDetail?userid=' + that.data.userid,//请求地址
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            var list = that.data.list
            list = res.data
            that.setData({
              list: list
            })
            console.log(list)
          },
        })
      }
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})