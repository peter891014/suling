// pages/search/search.js
const app = getApp();

var baseUrl = app.globalData.baseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    useDataTotal: [

    ],
    useData1: [],
    useData2: [],
    useData3: [],
    list: [],
    t1: "",
    t2: ""

  },
  goSearchContainer: function (event) {
    console.log(event)

    wx.navigateTo({
      url: '../jrzp/gsdetail/gsdetail?etprzid=' + event.currentTarget.dataset.etprzid
    })
  },
  goIdea:function(){
    wx.navigateTo({
      url:'../search/Idea/Idea'})
  },
  goDetail:function (e) {
    wx.navigateTo({
      url: '../search/newsdetail/newsdetail?id=e'
    })
  },
  openarea:function(){
    wx.navigateTo({
      url: '../openarea/openarea',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: baseUrl + '/entprz/listNotice',
      success:function(res){
        console.log(res.data)
        that.setData({
          list:res.data
        })
      }
    })
    // wx.request({
    //   url: baseUrl + '/entprz/listNotice',
    //   success: function (res) {
    //     var t1;
    //     var t2;
    //     var useData1 = [];
    //     var useData2 = [];
    //     var useData3;
    //     that.data.useDataTotal = res.data;
    //     t1 = that.data.useDataTotal[0].createTime;
    //     console.log(res.data[0].createTime)
    //     that.data.useDataTotal.forEach(item => {
    //       console.info(item)
    //       if (t1 == item.createTime) {

    //         useData1.push(item)
    //       } else if (item.createTime != t1) {
    //         t2 = item.createTime
    //         useData2.push(item)
    //       } else if ((item.createTime != t1 && item.createTime != t2)) {
    //         t3 = item.createTime
    //         useData3.push(item)
    //       }
    //     })
    //     that.setData({
    //       t1: t1,
    //       t2: t2,
    //       useData1: useData1,
    //       useData2: useData2,
    //       useData3: useData3,
    //     })
    //     console.log("t1:" + t1)
    //     console.log("t2:" + t2)

    //     console.log("useData1:" + useData1)
    //     console.log("useData2:" + useData2)
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

  }
})