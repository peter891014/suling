
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    wx.cloud.init()
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // var baseUrl=app.getGolobleData.baseUrl;
    // 登录
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.baseUrl + '/wxlogin?code=' + res.code,
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res1) {
            // var openid = res.data.openid //返回openid
            // 1 var openid = res.data.openid //返回openid
            // 2var openid = res.data.openid //返回openi
            that.globalData.openid = res1.data.openid;
            that.globalData.access_token = res1.data.access_token;
            that.globalData.accessToken = res1.data.accessToken;
            that.globalData.session_key = res1.data.session_key;
            that.globalData.visiable = res1.data.aaa;
            wx.setStorage({
              key: 'third_Session',
              data: res1.data
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.isAuth = true;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              //x 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: res => {
              wx.navigateTo({
                url: '../../pages/login/login',
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    isAuth: true,
    useData: [],
    access_token:'',
    accessToken:'',
    openid: "",
    session_key: "",
    baseUrl: "https://www.sulinghr.com",
    wssUrl:  "ws://192.168.1.1011",
    visiable: null
  },
})
