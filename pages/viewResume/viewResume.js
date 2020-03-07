var app = getApp()

var baseUrl = app.globalData.baseUrl;
Page({
  data: {
    userid: "",
    openid:"",
    /**
        * 页面配置
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    list:[],
    list1:[],
    list2:[],
    list3:[],
    a:'',
    b:'',
    c:''
  },

  onLoad: function () {
    var that = this;

    /**
     * 获取系统信息
     */
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
          url: baseUrl + "/entprz/listuserjob?userid=" + this.data.userid + '&isapplication=1',
          success: function (res) {
            var list1 = that.data.list1
            var list2 = that.data.list2
            var list3 = that.data.list3
            that.list=res.data
            for(var i = 0; i < that.list.length; i++){
              if(that.list[i].status == 0 || that.list[i].status == 1 || that.list[i].status ==2) {
                    list1.push(that.list[i])
              }else if(that.list[i].status == 3 || that.list[i].status == 4){
                    list2.push(that.list[i])
              } else if (that.list[i].status == 8 || that.list[i].status == 9){
                     list3.push(that.list[i])
              }
        }
            var a = that.data.a;
            var b = that.data.b;
            var c = that.data.c;
            console.log(list3)
            if(list1.length == 0){
              a = 1
            }else{
              a = 0
            }
            if (list2.length == 0) {
              b = 1
            }else{
              b = 0
            }
            if (list3.length == 0) {
              c = 1
            } else {
              c = 0
            }
            that.setData({
              a:a,
              b:b,
              c:c,
              list: res.data,
              list1: list1,
              list2: list2,
              list3: list3
            })
        }
        })
      }
    })
  },
  /**
     * 滑动切换tab
     */
  makePhone: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      success: function () {
      }
    })
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {


    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {

      return false;

    } else {

      that.setData({

        currentTab: e.target.dataset.current,

      })

    }

  },
  remove:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.list1;
    let entprzid = list[index].entprzid
    wx.showModal({
      title: '是否取消面试',
      content: '提示',
      success: function (res) {
        if (res.confirm) {
          if (index > -1) {
            list.splice(index, 1)
          }
          that.setData({
            list1: list
          })
          wx.request({
            url: baseUrl + "/cancelApplications?entprzid=" + entprzid + "&userid=" + that.data.userid + "&isapplication=0",
            success: function (res) {
              wx.showToast({
                title: '取消报名成功',
              })
            }
          })
        }
      }
    })
   
  },
  jumpup:function(e){
    var entprzid = e.currentTarget.dataset.entprzid;
    wx.navigateTo({
      url: '../jrzp/gsdetail/gsdetail?reId=' + entprzid,
    })
  },

  bindChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })
  },
})
