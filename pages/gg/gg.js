const app = getApp()

var websocket = require('webSocket.js');

var utils = require('../../utils/util.js');

var baseUrl = app.globalData.baseUrl;

//index.js
var that = undefined;
var doommList = [];
var i = 0;
var ids = 0;
var cycle = null  //计时器

// 弹幕参数
class Doomm {
  constructor(text, top, time, color) {  //内容，顶部距离，运行时间，颜色（参数可自定义增加）
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    this.id = i++;
  }
}
// 弹幕字体颜色
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  data:{
    add:false,
    add1:true,
    add2:true,
    //企业列表
    list:[],
    flv:"",
    chatList: [],
    chatMsg: '',
    winWidth: 0,
    winHeight: 0,
    color: "",
    siteId:"",
    // tab切换 
    currentTab: 0,
    scrollTop: 0,
    newslist: [],
    userInfo: {},
    scrollTop: 540,
    message: "",
    isAdmin: "",
    roomid:"",
    roomname:"",
    flv:"",
    onlines:'',
    aaa: false,
    previewImgList: [],
    //弹幕
    inputHeight:'15rpx',
      doommData: [],
      arr: []
  },
  onLoad(options){
    var that = this;
  //  that.data.locationId = options.locationId;
  //  that.data.flv='https://' + options.flv;
  
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
           aaa: app.globalData.visiable
      })
    }
    wx.request({
      url: baseUrl + '/queryuser?openid=' + app.globalData.openid,
      success: function (res) {
        console.log(res.data)
        that.setData({
          isAdmin: res.data.isadmin
        })
        console.log("admin:" + that.data.isAdmin)
      }
    })
    wx.request({
      url: baseUrl + "/getRoomById?locationId=" + options.locationId,
      success: function (res1) {
          that.setData({
            flv: 'https://' + res1.data.result.url,
            roomid: res1.data.result.roomid,
            roomname: res1.data.result.roomname,
            onlines: res1.data.result.onlines
          })
        console.log("aaa"+that.data.flv)
        var list = that.data.list;
    wx.request({
      url: baseUrl + '/entprz/liveRoomEntprzlist?locationId=' + options.locationId,
      success:function(res){
        console.log(res.data)
        list = res.data
        that.setData({
          list:res.data
        })
      }
    })
        websocket.connect(that.data.userInfo, that.data.roomid, function (res) {
          // console.log(JSON.parse(res.data) +"调通接口")
       
          var newd = JSON.parse(res.data)
          var date = newd.date;
          var content = newd.content
          var timer = new Date().getTime()
          if (timer - date <= 10000) {
            doommList.push(new Doomm(content, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
          }
          var list = []
          list = that.data.newslist
          list.push(JSON.parse(res.data))
          that.setData({
            newslist: list,
            doommData: doommList
          })
        })
      }
    })
  },

  onHide() {
    clearInterval(cycle)
    ids = 0;
    doommList = []
  },
  onUnload() {
    clearInterval(cycle)
    ids = 0;
    doommList = []
  },
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  textfocus : function (e) {
    var that = this;
    console.log(e, '键盘弹起')
     that.setData({
        inputHeight: '600rpx'
      })
  },
  textblur : function(e) {
    var that = this;
    console.log('键盘收起')
      that.setData({
        inputHeight:'15rpx'
      })
  },
  binddan(){
    var that = this;
    that.setData({
      add2: (!that.data.add2)
    })
  },
  bindmu(){
    var that = this;
    that.setData({
      add2: (!that.data.add2)
    })
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onReady(res) {
    this.ctx = wx.createLivePlayerContext('player')
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.log('live-player error:', e.detail.errMsg)
  },
  bindPlay() {
    var that = this;
    that.setData({
      add:(!that.data.add)
    })
    this.ctx.play({
      success: res => {
        console.log('play success')
      },
      fail: res => {
        console.log('play fail')
      }
    })
  },
  bindPause() {
    var that = this;
    that.setData({
      add: (!that.data.add)
    })
    this.ctx.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },
  bindrequestFullScreen(){
    var that = this;
    that.setData({
      add1: (!that.data.add1)
    })
    this.ctx.requestFullScreen({
      direction: 90,
      success:res =>{
        console.log('requestFullScreen success')
      },
      fail:res => {
        console.log('requestFullScreen fail')
      }
    })
  },
  bindexitFullScreen(){
    var that = this;
    that.setData({
      add1: (!that.data.add1)
    })
    this.ctx.exitFullScreen({
      success: res => {
        console.log('exitFullScreen success')
      },
      fail: res => {
        console.log('exitFullScreen fail')
      }
    })
  }, onUnload() {

    wx.closeSocket();

    // wx.showToast({

    //   title: '连接已断开~',

    //   icon: "none",

    //   duration: 2000

    // })
  },
  //事件处理函数
  send: function () {

    var flag = this

    if (this.data.message.trim() == "") {

      wx.showToast({

        title: '消息不能为空哦~',

        icon: "none",

        duration: 2000

      })

    } else {
      setTimeout(function () {
        flag.setData({
          increase: false
        })
      }, 500)
      websocket.send('{ "content": "' + this.data.message + '", "date": "' + new Date().getTime() + '","type":"text", "nickName": "' + this.data.userInfo.nickName + '", "avatarUrl": "' + this.data.userInfo.avatarUrl + '","isAdmin":"' + this.data.isAdmin + '"}')
      var list = this.data.newslist.length + 1;
      console.log(list)
      if(list * 48 > 540){
        this.setData({
          scrollTop: this.data.scrollTop + 48
        })
      }
    }
  },

  //监听input值的改变

  bindChange(res) {

    this.setData({

      message: res.detail.value

    })

  },

  cleanInput() {

    //button会自动清空，所以不能再次清空而是应该给他设置目前的input值

    this.setData({

      message: this.data.message

    })

  },

  increase() {

    this.setData({

      increase: true,

      aniStyle: true

    })

  },

  //点击空白隐藏message下选框

  outbtn() {

    this.setData({

      increase: false,

      aniStyle: true

    })

  },

  //查看企业
  goGsdetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../jrzp/gsdetail/gsdetail?entprzid=' + e.currentTarget.dataset.etprzid
    })
  },
})