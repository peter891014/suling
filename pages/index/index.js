var canIUseSession = true;
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'IFCBZ-FF53U-ILBVP-BOAOD-SA4E7-GWFPK'//申请的开发者秘钥key
});
const app = getApp();
//var model = require('../../model/model.js')
var show = false;
var item = {};
var baseUrl = app.globalData.baseUrl;
var token = app.globalData.openid;
Page({
  data: {
    bsshow: "请输入搜索的公司",
    canIUseSession: true,
    banner: [],
    visible: true,
    visible2: true,
    aaa: false,
    //mayulong
    goods: [],
    city: "获取地址",
    county: "",
    street: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    province: "",
    hidden: false,
    nocancel: false,
    albumDisabled: true,
    bindDisabled: false,
    street: "",
    location: '',
    actions: [],
    msgList: [],
    background: '/images/yizhi/index/bg.png',
    item: {
      show: show
    },
    bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
  },
  ggclick: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  onLoad: function (options) {
    var that = this;
    let base641 = wx.getFileSystemManager().readFileSync(that.data.background, 'base64');
    that.setData({
      background: 'data:image/jpg;base64,' + base641,
    })
    wx.request({
      url: baseUrl + '/entprz/listNotice?size=5',
      header: { "token": token },
      success: function (e) {
        that.setData({
          msgList: e.data
        })
        console.log(that.data.msgList)
      }
    })
    wx.request({
      url: baseUrl + '/file/bannerlist?type=index',
      header: { "token": token },
      success: function (e) {
        console.log(e.data)
        that.setData({
          banner: e.data
        })
      }
    })
    var isAuth = app.globalData.isAuth;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          that.getUserInfo();
          var isAuth = app.globalData.isAuth;
        } else {
          var isAuth = app.globalData.isAuth;
          that.setData({
            visible: false
          })
        }
      }
    })
    wx.getLocation({
      success: function (res) {
        // 调用sdk接口
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            //获取当前地址成功
            var city1 = res.result.address_component.city;
            var district = res.result.address_component.district
            var street = res.result.address_component.street;
            var street_number = res.result.address_component.street_number
            var location = res.result.ad_info.location
            that.setData({
              city: city1,
              county: district,
              street: street,
              location: location
            })
          },
          fail: function (res) {
            console.log('获取当前地址失败');
          }
        });
      },
    })
  },
  loadLocation: function () {
    var me = this;
    wx.getLocation({
      type: "wgs84",
      altitude: true,
      success: function (res) {
        if (res && res.latitude && res.longitude) {
          var longitude = res.longitude,
            latitude = res.latitude;
          me.loadCity(longitude, latitude);
        } else {
          me.setData({
            city: '获取地址失败'
          });
        }
      },
    })
  },
  loadCity: function (longitude, latitude) {
    var me = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=859d16285fd000feec89e9032513f8bb&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/jason'
      },
      success: function (res) {
        if (res && res.data) {
          var city1 = res.data.result.addressComponent.city;
          var district = res.data.result.addressComponent.district
          var street = res.data.result.addressComponent.street;
          var street_number = res.data.result.addressComponent.street_number
          me.setData({
            city: city1,
            county: district,
            street: street
          })
        }
      }
    })
  },
  doLogin: function (e) {
    var isAuth = app.globalData.isAuth;
    wx.login({
      success: (res) => {
        this.getUserInfo();
        this.cancel();
      }
    })
  },
  getUserInfo: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.userInfoSetInSQL(userInfo)
      },
      fail: function () {
        // userAccess()
      }
    })
  },

  userInfoSetInSQL: function (userInfo) {
    var that = this;
    wx.getStorage({
      key: 'third_Session',
      success: function (res2) {
        var token = res2.data.token
        console.log("aaaopenid:" + res2.data.openid)
        wx.request({
          url: baseUrl + '/upduser',
          header: { "token": token },
          method: "POST",
          data: {
            openid: res2.data.openid,
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender,
            province: userInfo.province,
            city: userInfo.city,
            country: userInfo.country
          },
          success: function (res3) {
            that.setData({
              aaa: app.globalData.visiable
            })
            console.log("aaa1" + that.data.aaa)
            if (res3.data != "" && res3.data != null) {
              //SQL更新用户数据成功

            } else if (res3.data == "" || res3.data == null) {
              wx.navigateTo({
                url: '../phonenumber/phonenumber',
              })
            } else {
              //SQL更新用户数据失败
              that.setData({
                visible2: false
              })


            }
          }
        })
      }
    })



  },
  onShareAppMessage: function () {
    return {
      title: 'EASYJOB',
      desc: '一个面向蓝领的招聘平台',
      path: '/pages/index/index?uid=4719784'
    }
  },
  navigateToAddress: function () {
    wx.navigateTo({
      url: '../../pages/addindex/addindex'
    });
  },
  handleClick3({
    detail
  }) {
    var that = this;
    const index = detail.index;
    that.setData({
      visible: false
    });
  },
  cancel: function () {
    var isAuth = app.globalData.isAuth;
    this.setData({
      visible: true,
      visible1: false
    })
  },
  cancela: function () {
    var isAuth = app.globalData.isAuth;
    this.setData({
      visible2: true
    })
  },
  confirm: function () {
    var isAuth = app.globalData.isAuth;
    this.setData({
      isAuth: true
    });
  },
  confirma: function () {

    this.setData({
      visible2: true
    });
  },
  onReady: function (e) {

    //请求数据
    //  model.updateAreaData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
  },
  onReachBottom: function () { },
  nono: function () { },
  //今日招聘跳转
  gojrzp: function () {
    var that = this
    wx.navigateTo({
      url: '../jrzp/jrzp/jrzp',
    })
  },
  gofwfw: function () {
    wx.switchTab({
      url: '../lives/lives',
    })
  },
  ggclick: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  law: function (e) {
    wx.navigateTo({
      url: '../fwfw/fwfw?locationId=1001',
    })
  },
  showGoods: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../search/newsdetail/newsdetail?id=' + e.currentTarget.dataset.id,
    })
  },
  godear: function (e) {
    wx.navigateTo({
      url: '../dear/dear',
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  navigatitoAddress: function () {
    wx.navigateTo({
      url: '../address/list/list'
    })
  },
  searchConfirm(e) {
    wx.navigateTo({
      url: '../searchentprz/searchentprz?name=' + e.detail.value,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

})