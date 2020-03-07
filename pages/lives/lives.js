//index.js
import { AreaPicker } from "../../view/areaSelector/selector.js"
var app = getApp()
var baseUrl = app.globalData.baseUrl;
var token = app.globalData.openid;
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
Page(Object.assign({}, AreaPicker, {
  data: {
    //轮播图配置
    autoplay: true,
    interval: 3000,
    duration: 1200,
    locationName: '',
    siteId: '',
    index: '',
    banner: [],
    aaa:false,
    dataList: '',
    locationList: '',
    hascontent:true,
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: baseUrl + '/site/listsite',
      // 请求头部
      success: function (res) {
        console.log(res.data.siteList)
        var to = res.data.siteList
        that.findShop(to);
        var siteId = that.data.siteId;
      }
    });
    wx.request({
      url: baseUrl + '/file/bannerlist?type=liveIndex',
      header: { "token": token },
      success: function (e) {
        var banner = that.data.banner
        banner = e.data
        that.setData({
          banner: e.data,
          aaa: app.globalData.visiable
        })
        console.log("aaa000"+that.data.aaa)
        
      }
    })
  },
  lives: function (siteId) {
    var that = this
    wx.request({
      url: baseUrl + '/livelist?locationId=' + siteId,
      success: function (res) {
        console.log(res.data)
        var dataList = that.data.dataList
        dataList = res.data
        that.setData({
          dataList: res.data
        })
        if (dataList.size==""||dataList.length==0){
         
          that.setData({
            hascontent:false
          })
         
        }else{
          that.setData({
            hascontent: true
          })
        }
      }
    })
  },
  findShop(to) { //拿到商家的地理位置，用到了腾讯地图的api
    // 实例化API核心类
    var _that = this
    var demo = new QQMapWX({
      key: 'IFCBZ-FF53U-ILBVP-BOAOD-SA4E7-GWFPK' // 必填
    });
    // 调用接口
    demo.calculateDistance({
      to,
      success: function (res) {
        var arr = res.result.elements
        var min = arr[0].distance;
        console.log(arr)
        for (var i = 1; i < arr.length; i++) {
          var cur = arr[i].distance
          cur < min ? min = cur : null
        }
        console.log(min)
        var num;
        for (var j = 0; j < arr.length; j++) {
          if (arr[j].distance == min) {
            num = j
          }
        }
        console.log(num)
        _that.data.locationName = to[num].locationName
        _that.data.locationList = to[num].locationId
        _that.setData({
          locationList: to[num].locationId,
          locationName: to[num].locationName,
        })
        console.log("bbb" + _that.data.locationList)
        var siteId = _that.data.locationList
        _that.lives(siteId);
      }
    });

  },

  onAreaCommit(locationList) {//当用户更换地区
    console.log(locationList);
    this.setData({
      district: locationList[0] || {},
      locationName: locationList[1].name || {},
      locationList: locationList[1].id
    });
    var siteId = this.data.locationList
    this.lives(siteId);
  }
}))