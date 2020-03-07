var app = getApp();
var baseUrl = app.globalData.baseUrl;
Page({
  data: {
    num: "",
    list: [],
    userid: "",
    openid: "",
    imgUrls: [
      '../../images/yizhi/index/b1.jpg',
      '../../images/yizhi/index/b2.jpg',
      '../../images/yizhi/index/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  onLoad: function () {
    var that = this;
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
        console.log(JSON.stringify(value) + ":value")
        that.setData({
          openid: value.openid
        })
        //JSON.stringify(value).openid
        console.log("oppneid" + that.data.openid)
      }
    } catch (e) {
      // Do something when catch error
    };
    wx.request({
      url: baseUrl + '/queryuser?openid=' + that.data.openid,
      success: res => {
        that.setData({
          userid: res.data.userid
        })
        wx.request({
          url: baseUrl + '/center/queryPoints?userid=' + that.data.userid,//请求地址
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            var num = that.data.num;
            num = res.data
            that.setData({
              num: num
            })
          },
        })
      }
    }),
      wx.request({
      url: baseUrl + '/center/getCommodityList',//请求地址
        method: 'GET',
        success: function (res) {
          console.log(res.data)
          var list = that.data.list
          list = res.data
          that.setData({
            list: list
          })
          console.log(that.data.list)
        },
      })
  },
})