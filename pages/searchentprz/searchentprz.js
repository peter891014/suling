// pages/searchentprz/searchentprz.js
const app = getApp();

var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    money: ['1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000-6000', '6000-7000', '7000-8000', '8000以上'],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var name = options.name;
    // var that = this;
    // wx.request({
    //   url: baseUrl + '/entprz/listRecruit?name=' + name,   //这一部的含义是访问我们的数据,并把同类名字的数据全部拿出来
    //   success: function (e) {
    //     that.setData({
    //       list: e.data
    //     })

    //   }
    // })
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
  goGsdetail: function (event) {
    wx.navigateTo({
      url: '../jrzp/gsdetail/gsdetail?reId=' + event.currentTarget.dataset.entprzid
    })
  },
  confirm: function (e) {
    var name1 = e.detail.value;
    var that = this;
    wx.request({
      url: baseUrl + '/entprz/listentprz?name=' + name1,   //这一部的含义是访问我们的数据,并把同类名字的数据全部拿出来
      success: function (e) {
        that.setData({
          list: e.data
        })


      }
    })
  }
})