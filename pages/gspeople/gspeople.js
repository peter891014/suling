// pages/jrzp/gspeople/gspeople.js
var app = getApp()
var baseUrl = app.globalData.baseUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userid: "",
    openid:"",
    resumeWorkList:null,
    usergender:['女','男'],
    schoolList: ['博士', '研究生', '本科', '大专', '中专', '高中', '初中','小学'],
    salary: ['请选择你的资薪', '1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000-6000', '6000-7000', '7000-8000', '8000以上'], 
  },
  onLoad:function(){
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
        console.log("opneid" + that.data.openid)
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
          url: baseUrl + "/getcvbyid?userid=" + that.data.userid,
          success: function (res) {
              that.data = res.data.cv
              console.log(that.data)
                that.setData({
                data : res.data.cv
            })
          }
        })
        wx.request({
          url: baseUrl + "/queryworkexperiencebyid?userid=" + this.data.userid,
          success:function(res){
            console.log(res.data)
            that.data.resumeWorkList = res.data
            that.setData({
              resumeWorkList:res.data
            })
            console.log(that.data.resumeWorkList)
          }
        })
      }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  editBaseInfoTap: function (e) {
    wx.navigateTo({
      url: '/pages/deliver/deliver',
    })
  },
  editWorkTap:function(e){
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
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