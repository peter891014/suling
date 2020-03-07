// pages/jrzp/gsdetail/gsdetail.js
//var newsData = require("../../data/newsdata.js");
var app = getApp()
var accessToken = app.globalData.accessToken
var baseUrl = app.globalData.baseUrl;
var abc = "123";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    siteName: ['请选择服务站点'],
    money: ['1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000-6000', '6000-7000', '7000-8000', '8000以上'],
    isCollected: 0,      //默认没有收藏
    char_lt: ">",
    banner: [],
    showLeft2: false,
    name1: 'name1',
    userid: "",
    site: 0,
    recruit: [],
    openid: "",
    aaa: false,
    isapplication: 0,
    reId: '',
    viewbgn: '#00cc66',
    siteId: [],
    signup: '面试报名',
    locationId: '',
    showModalStatus: false,
    visible: false,
    userInfo: {},
    resultImage: ''
  },
  toggleLeft2() {
    this.setData({
      showLeft2: !this.data.showLeft2
    });
  },
  //站点选择
  bindPicker: function (e) {
    this.setData({
      site: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  isCollectedTap: function () {
    let isCollected = this.data.isCollected == 1 ? 0 : 1;
    this.setData({
      isCollected: isCollected
    })
    let title = isCollected == 1 ? "收藏成功" : "取消收藏";
    wx.showToast({
      title: title
    })
    //缓存收藏的状态
    // var obj = wx.getStorageSync('isCollected') || {};
    var isfollow = isCollected;
    wx.request({
      url: baseUrl + "/followEntprz?reId=" + this.data.reId + "&userid=" + this.data.userid + "&isfollow=" + isfollow,
      success: function (res) {
      }
    })
  },

  handleface: function () {
    let reId = this.data.reId;
    var that = this;
    //获取简历
    wx.request({
      url: baseUrl + '/getcvbyid?userid=' + that.data.userid,
      success: function (e) {
        if (e.data.cv == null) {
          wx.navigateTo({
            url: '../../deliver/deliver',
          })
        } else {
          if (that.data.isapplication == 0) {
            var siteid = that.data.siteId[that.data.site - 1]
            if (that.data.site == 0) {
              wx.showModal({
                title: '请选择服务站点',
                content: '提示',
                success: function (res) {
                  if (res.confirm) {
                    if (wx.pageScrollTo) {
                      wx.pageScrollTo({
                        scrollTop: 850
                      })
                    }
                  }
                }
              })
              return;
            } else {
              wx.request({
                url: baseUrl + "/sendingApplications?reId=" + reId + "&userid=" + that.data.userid + "&isapplication=1&siteId=" + siteid,
                success: function (res) {
                  if (res.data.success == "-1") {
                    wx.showModal({
                      title: '一天只能报名一家企业',
                      content: '提示',
                    })
                  } else {
                    wx.showToast({
                      title: '报名成功',
                    })
                    let isapplication = that.data.isapplication == 1 ? 0 : 1;
                    that.setData({
                      isapplication: isapplication
                    })
                    if (isapplication == 0) {
                      that.setData({
                        viewbgn: '#00cc66',
                        signup: '面试报名'
                      })
                    } else {
                      that.setData({
                        viewbgn: 'red',
                        signup: '取消报名'
                      })
                    }
                  }
                }
              })
            }
          } else {
            //取消报名
            wx.showModal({
              title: '是否取消报名',
              content: '提示',
              success: function (res) {
                if (res.confirm) {
                  wx.request({
                    url: baseUrl + "/cancelApplications?reId=" + reId + "&userid=" + that.data.userid + "&isapplication=0",
                    success: function (res) {
                      if (res.data.success == "-3") {
                        wx.showModal({
                          title: '不能在取消报名',
                          content: '提示',
                          success: function (res) {
                            if (res.confirm) {

                            }
                          }
                        })
                      } else {
                        let isapplication = that.data.isapplication == 1 ? 0 : 1;
                        that.setData({
                          isapplication: isapplication
                        })
                        if (isapplication == 0) {
                          that.setData({
                            viewbgn: '#00cc66',
                            signup: '面试报名'
                          })
                        } else {
                          that.setData({
                            viewbgn: 'red',
                            signup: '取消报名'
                          })
                        }
                      }
                    }
                  })
                }
              }
            })
          }
        }
      }
    })
  },
  makePhone: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      success: function () {
      }
    })
  },
  handlevideo: function (e) {
    console.log(this.data.locationId)

    if (this.data.aaa) {
      wx.request({
        url: baseUrl + "/getRoomById?locationId=" + this.data.locationId,
        success: function (res1) {
          wx.navigateTo({
            //  url: '../../webview/webview?url=' + 'shangzhibo.tv/watch/'+ res1.data.result.roomid +'? whole'
            url: '../../webview/webview?url=' + res1.data.result.url
          })
          // that.setData({
          //   flv: 'https://' + res1.data.result.url,
          //   // roomid: res1.data.result.roomid,
          //   // roomname: res1.data.result.roomname,
          //   // onlines: res1.data.result.onlines
          // })
        }
      })
    } else {
      wx.navigateTo({
        url: '../../gg/gg?locationId=' + this.data.locationId
      })
    }

  },
  //点击分享按钮后分享到朋友圈
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log("button")
    }
    return {
      title: '给你分享一份好的工作岗位',
      path: 'pages/jrzp/gsdetail/gsdetail?reId=' + this.data.reId,
      success: function (res) {

      }
    }
  },
  clickme: function () {
    this.showModal();
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  toShare: function () {

  },
  onLoad: function (options) {
    if (options.scene) {
      let scene = decodeURIComponent(options.scene);
      //&是我们定义的参数链接方式
      let userId = scene.split("&")[0];
      let reId1 = scene.split('&')[1];
      //其他逻辑处理。。。。。
      this.setData({
        reId: reId1,
        userId: userId
      })
      wx.request({
        url: baseUrl + "/entprz/getRecruitById",
        data: { "reId": reId1 },
        method: 'GET',
        success: function (res) {
          var recruit = res.data.recruit;
          if (recruit == undefined) {
            var toastText = '获取数据失败' + res.data.errMsg;
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000
            });
          } else {
            var siteName = that.data.siteName
            var siteId = that.data.siteId
            for (var i = 0; i < res.data.recruit.reSites.length; i++) {
              siteName.push(res.data.recruit.reSites[i].siteName)
              siteId.push(res.data.recruit.reSites[i].siteId)
            }
            that.setData({
              recruit: recruit,
              siteName: siteName,
              siteId: siteId,
              banner: res.data.recruit.company.bannerDtos
            });
          }
        }
      })
    } else {
      var that = this;
      that.setData({
        reId: options.reId,
        locationId: options.locationId
      })
      try {
        var value = wx.getStorageSync('third_Session')
        if (value) {
          that.setData({
            openid: value.openid,
            aaa: app.globalData.visiable
          })
        }
      } catch (e) {
      };
      //查询报名信息
      wx.request({
        url: baseUrl + '/queryuser?openid=' + that.data.openid,
        success: res => {
          that.setData({
            userid: res.data.userid
          })
          wx.request({
            url: baseUrl + '/queryUserEntprz?reId=' + that.data.reId + '&userid=' + that.data.userid,
            success: function (res) {
              // var s1=JSON.parse(res1.data)
              if (res.data == null || res.data == '') {
                abc = 0;
              } else {
                that.setData({
                  isCollected: res.data.isfollow,
                  isapplication: res.data.isapplication
                })
                if (res.data.isapplication == 0) {
                  that.setData({
                    viewbgn: '#00cc66',
                    signup: '面试报名'
                  })
                } else {
                  that.setData({
                    viewbgn: 'red',
                    signup: '取消报名'
                  })
                }
                abc = res.data.isfollow;

              }
            }
          })
        }
      })
      let reId = that.data.reId;
      let storageObj = wx.getStorageSync('isCollected'); //读取缓存数据,确认当前页面是否被收藏
      if (storageObj[reId]) {
        this.setData({
          isCollected: true
        })
      }
      var useData = app.globalData;
      that.setData({
        reId: reId
      })
      //获取企业信息
      wx.request({
        url: baseUrl + "/entprz/getRecruitById",
        data: { "reId": that.data.reId },
        method: 'GET',
        success: function (res) {
          var recruit = res.data.recruit;
          if (recruit == undefined) {
            var toastText = '获取数据失败' + res.data.errMsg;
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000
            });
          } else {
            var siteName = that.data.siteName
            var siteId = that.data.siteId
            for (var i = 0; i < res.data.recruit.reSites.length; i++) {
              siteName.push(res.data.recruit.reSites[i].siteName)
              siteId.push(res.data.recruit.reSites[i].siteId)
            }
            that.setData({
              recruit: recruit,
              siteName: siteName,
              siteId: siteId,
              banner: res.data.recruit.company.bannerDtos
            });
          }
        }
      })
      //获取企业得轮播图
      // wx.request({
      //   url: baseUrl + '/file/bannerlist?type=entprz_banner&entprzid=' + that.data.entprzid,
      //   success:function(e){
      //     that.setData({
      //       banner:e.data,
      //       aaa: app.globalData.visiable
      //     })
      //   }
      // })
    }
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
  /**
   * 用户点击右上角分享
   */
  sharepyj() {
    this.getQrcode();

  },
  show: function () {
    this.setData({ visible: true })
  },
  close: function () {
    this.setData({ visible: false })
  },
  getQrcode() {
    var that = this
    wx.cloud.callFunction({
      name: 'generateQR',
      data: {
        page: 'pages/jrzp/gsdetail/gsdetail',
        scene: that.data.userid + '&' + that.data.reId,
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
    // var  that=this
    // wx.request({
    //   url: "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + app.globalData.accessToken,//域名省略
    //   data: {
    //     page: "pages/jrzp/gsdetail/gsdetail",
    //     scene: "1234&123",
    //     width: 200
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: 'POST',
    //   dataType: 'json',
    //   success: function (res) {
    //     let qrcodeUrl = res.data;//服务器小程序码地址
    //     const fsm = wx.getFileSystemManager();
    //     const FILE_BASE_NAME = 'qrcode_base64src';
    //     const filePath = wx.env.USER_DATA_PATH + '/' + FILE_BASE_NAME + '.jpg';
    //     //var arrayBuffer = qrcodeUrl.buffer;
    //     fsm.writeFile({
    //       filePath,
    //       data: qrcodeUrl.buffer,
    //       encoding: 'binary',
    //       success(res) {
    //         that.setData({
    //           resultImage: filePath ,//结果图片
    //           visible: true,
    //           // erCode: wx.arrayBufferToBase64(res.result.buffer),
    //           userInfo: app.globalData.userInfo
    //         })

    //       },
    //       complete: res => {
    //         console.log("aaaaaaaaaaaa", res)
    //       },
    //       fail() { 
    //       },
    //     })
    // that.setData({
    //   visible: true,
    //  // erCode: wx.arrayBufferToBase64(res.result.buffer),
    //   userInfo: app.globalData.userInfo
    // })
    // wx.request({
    //   url: baseUrl +'/file/qrCode',
    //   data: wx.arrayBufferToBase64(qrcodeUrl),
    //   encoding: 'binary',
    //   success(res3){
    //     console.log(res3.data)
    //   }
    // })
    //},
    //   fail: function () { },
    //  // complete: options.complete || function () { }
    // })
  }
  // canvasToTempImage: function () {
  //   var that = this;
  //   wx.canvasToTempFilePath({
  //     canvasId: 'share',
  //     success: function (res) {
  //       var tempFilePath = res.tempFilePath;
  //       console.log(tempFilePath);
  //       that.setData({
  //         imagePath: tempFilePath,
  //         // canvasHidden:true
  //       });
  //     },
  //     fail: function (res) {
  //       console.log(res);
  //     }
  //   });

})  