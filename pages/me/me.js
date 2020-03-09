// pages/mine/mine.js
let app = getApp()
var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: "",
    openid: "",
    visible: false,
    userInfo:{},
    resultImage:''
    
  },
  /**
  * 查看面试管理
  */
  viewResume: function (e) {
    wx.navigateTo({
      url: '../viewResume/viewResume',
    })
  },

  /**
   * 查看简历
   */
  viewDeliver: function (e) {
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
            url: baseUrl + "/getcvbyid?&userid=" + this.data.userid,
            success: function (res) {
              if (res.data.cv == null) {
                wx.showModal({
                  title: '请先填写简历',
                  content: '提示',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../deliver/deliver',
                      })
                    }
                  }
                })
              }else{
                wx.navigateTo({
                  url: '../gspeople/gspeople',
                })
              }
            }
          })
        }
      })

  },

  /**
   * 关注企业
   */
  viewInterview: function (e) {
    wx.navigateTo({
      url: '../interview/interview',
    })
  },

  /**
   * 问题反馈
   */
  viewCollect: function (e) {
    wx.navigateTo({
      url: '../collection/collection',
    })
  },
  detail:function(e){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  integral:function(e){
    wx.navigateTo({
      url: '../integral/integral',
    })
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
  myInvitationCode:function(){
    var that = this
    wx.cloud.callFunction({
      name: 'generateQR',
      data: {
        page: 'pages/index/index',
        scene: app.globalData.userid,
        width: 300
      },
      success(res) {
        console.log(res)
        that.setData({
          resultImage: res.result,
          userInfo: app.globalData.userInfo,
          visible: true
        })
      }
    })
  },
  close: function () {
    this.setData({ visible: false })
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



