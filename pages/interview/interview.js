// pages/searchentprz/searchentprz.js
const app = getApp();

var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    userid: "",
    etprz: [],
    openid: "",
    hidden: false,
    nocancel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    this.setData({
      nocancel: !this.data.nocancel
    });
    console.log("clicked confirm");
  },
  
  isCollectedTap: function (e) {
    var that = this;
    const idx = e.currentTarget.dataset.index;
    let carts = that.data.list;
    const isCollecteds = carts[idx].isCollected;
    carts[idx].isCollected = isCollecteds == 0 ? 1:0;
    let reId = carts[idx].reId;
    that.setData({
      list:carts
    })
    wx.showToast({
      title:"取消收藏"
   })
   //缓存收藏的状态
    // var obj = wx.getStorageSync('isCollected') || {};
    var isfollow = isCollecteds;
    wx.request({
      url: baseUrl + "/cancelFollowEntprz?reId=" + reId + "&userid=" + that.data.userid + "&isfollow=" + isfollow ,
      success: function (res) { 
        console.log(reId)
       }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function () {
      var that = this;
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
        console.log("userid:" + res.data.userid)
        wx.request({
          url: baseUrl + "/entprz/listuserjob?userid=" + this.data.userid + "&isfollow=1",
          success: function (res) {
            if(res.data.length == 0){
              console.log("1")
              that.setData({
                a : 1
              })
            }else{
              that.list = res.data
              console.log(that.list)
              for (var i = 0; i < that.list.length; i++) {
                that.list[i].isCollected = '0'
              }
              console.log(that.list)
              that.setData({
                list: res.data,
              })
              var list = that.list
              console.log(list)
            }
          }
        })
      }
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
  },
  goGsdetail: function (event) {
    console.log(event.currentTarget.dataset.entprzid);
    wx.navigateTo({
      url: '../jrzp/gsdetail/gsdetail?reId=' + event.currentTarget.dataset.entprzid
    })
  },
  searinput: function (e) {
    var name1 = e.detail.value;
    console.log(name1)
    var that = this;
    wx.request({
      url: baseUrl + '/entprz/listentprz?name=' + name1,   //这一部的含义是访问我们的数据,并把同类名字的数据全部拿出来
      success: function (e) {
        console.log(e)
        that.setData({
          list: e.data
        })

      }
    })
  }
})