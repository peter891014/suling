// pages/jrzp/jrzp.js
//引入data文件夹中的js数据
import { AreaPicker } from "../../../view/areaSelector/selector.js"
var app = getApp()
//var newsData=require("../../data/newsdata.js");
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var baseUrl = app.globalData.baseUrl;

Page(Object.assign({}, AreaPicker,{

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    type: "0",
    industry: "",
    locationList:'',
    listInfo: [
      {
        title: '制造业',
        imgUrl: '../../../images/yizhi/index/changqi@2x.png',
        curUrl: '/images/yizhi/job/changqigong@2x.png',
      },
      {
        title: '小时工/兼职',
        imgUrl: '../../../images/yizhi/index/xiaoshi@2x.png',
        curUrl: '/images/yizhi/job/xiaoshi@2x.png',
      },
      {
        title: '服务业',
        imgUrl: '../../../images/yizhi/job/jianzhi@2x.png',
        curUrl: '/images/yizhi/job/jianzhi@2x.png',
      },
    ],
    winWidth: 0,
    winHeight: 0,
    windowHeight: 0,
    pageNo: 1,
    // tab切换
    location:'',
    currentTab: 0,
    useData: "",
    selectArray: [],
    tog:[],
    locationName:'',
    siteId:'',
    flv:'',
    roominfo:[],
    aaa: false
  },

  goDetail: function () {
    wx.switchTab({
      url: '../../live/detail/detail',
    })
  },
  //jrzp.wxml中组件传过来的点击事件，可以拿到点击某个的下标值
  handleTabClick: function (event) {
    //console.log(event)
    const type = event.detail.index;
   // console.log(type)
    this.setData({
      pageNo: 1,
      type: type
    });
    var industry = this.data.industry;
    var locationList = this.data.locationList;
    this.http(this.callback, type, industry, locationList);
  },
  changeRegin(e) {
    this.setData({ region: e.detail.value });
  },
  goVideo: function () {
    var that = this;
    var locationId = that.data.locationList;
    if(!that.data.aaa){
      wx.navigateTo({
        url: '../../gg/gg?locationId=' + locationId,
      })
    }else{
      wx.request({
        url: baseUrl +'/getRoomById?locationId='+locationId,
        success:function(res0){
          console.log(" res0.data.result.url" + res0.data.result.url)
          wx.navigateTo({
            url: '../../webview/webview?url=' + res0.data.result.url,
          })
        }
      })
      
    }
   
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  http: function (callback, type, industry, locationList) {
    var that = this;
    wx.request({
      url: baseUrl + '/entprz/pageListRecruit' + "?type=" + type + "&pageNo=" + this.data.pageNo + "&pageSize=20&industry=" + industry + '&locationId=' + locationList,
      data: {
        // type:type,
        // page:page
      },
      method: 'GET',
      success(res) {
        callback(res.data)
        // console.log("resdata:"+res.data)
        that.setData({
          useData: res.data
        })
      }
    })
  },
  callback: function (res) {
    console.log(res)
  },
  handlerIndustry: function () {
    console.log(e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
   
    wx.request({
      url: baseUrl + '/site/listsite',
      // 请求头部
      success: function (res) {
      
       var to = res.data.siteList
        that.findShop(to)
      }
    });
    var useData = app.globalData.useData;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({ windowHeight: res.windowHeight })
      },
    })
    // 网络请求

    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    //获取长期工/小时工的数据

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
    var that = this;
    wx.request({
      url: baseUrl + '/entprz/listindustry',// + '?industryid=' + event.detail.id,
      success: function (res) {
        that.setData({
          selectArray: res.data
        })
      }
    })
    that.setData({
      aaa: app.globalData.visiable
    })
    console.log(app.globalData.visiable + "app.globalData.visiable")
    var aaa = that.data.aaa;
    console.log(aaa + "visiable")
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    //显示加载图标
    wx.showLoading({
      title: '玩命加载中,请稍等',
      duration: 20000
    })

    var pageNo = this.data.pageNo + 1;
    var userdata0 = this.data.useData;
    wx.request({
      url: baseUrl + '/entprz/pagelistentprz' + "?type=" + this.data.type + "&pageNo=" + pageNo + "&pageSize=20&industry=" + this.data.industry,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
     ///   console.log("length:" + res.data.length);
        if (res.data.length != 0) {
          var c = userdata0.concat(res.data);
         // console.log(c);
          that.setData({
            useData: c,
            pageNo: pageNo + 1
          })
        }
        //  隐藏加载框
        wx.hideLoading();
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '分享页面',
      path: baseUrl + ' / entprz / pagelistentprz',
    }
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
       // console.log(arr)
        for(var i = 1; i < arr.length;i ++){
          var cur = arr[i].distance
          cur < min ? min = cur : null
        }
        //console.log(min)
        var num;
        for(var j = 0; j < arr.length; j ++){
            if(arr[j].distance == min){
                num = j 
            }  
        }
      //  console.log(num)
        _that.data.locationName = to[num].locationName
        _that.data.locationList = to[num].locationId
        _that.setData({
          locationList: to[num].locationId,
          locationName: to[num].locationName
        })
       // console.log(_that.data.locationName)
        var locationList = _that.data.locationList
        var industry = _that.data.industry;
        var type = _that.data.type;
        _that.http(_that.callback, type, industry, locationList);
      }
    });
  },

  handlerIndustry: function (e) {
    this.setData({
      industry: e.detail.id
    });
    var industry = this.data.industry;
    var locationList = this.data.locationList
    var type = this.data.type;
    this.http(this.callback, type, industry, locationList);
  },
  onAreaCommit(locationList) {//当用户更换地区
    //console.log(locationList);
    this.setData({
      district: locationList[0] || {},
      locationName: locationList[1].name|| {},
      locationList: locationList[1].id
    });
    var locationList = this.data.locationList
    var industry = this.data.industry;
    var type = this.data.type;
    this.http(this.callback, type, industry, locationList);
  }
}))

