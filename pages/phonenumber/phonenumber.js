// pages/phonenumber.js
const app = getApp();
var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getPhoneNumber: function (e) {
    var that = this;
    var openid = app.globalData.openid;
    var session_key = app.globalData.session_key;
    // console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      console.log(e.detail.encryptedData)
      console.log(e.detail)
  
      wx.request({
        url: baseUrl + '/decodePhone',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: session_key,
          uid: openid,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "Post",
        success: function (res) {
          console.log(res);
          that.setData({
            visible2: true
          })
          wx.request({
            url: baseUrl + '/upduser',
            method: "POST",
            data: {
              openid: openid,
              phone: res.data
            },
            success: function (res2) {
              if (res2.data) {
                //SQL更新用户数据成功
                console.log("SQL更新用户数据成功");
                console.log(res2.data);
                wx.switchTab({
                  url: '../index/index'
                })
              } else {
                //SQL更新用户数据失败
                console.log("SQL更新用户数据失败");
              }
            }
          })
        }
      })
    }
  },
})