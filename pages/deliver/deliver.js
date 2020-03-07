// pages/edit-resume-base/edit-resume-base.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
Page({
  data:{
    edulevellist: ['博士', '研究生', '本科', '大专', '中专', '高中', '初中', '小学'],//学历
    genderlist: ['女', '男'],//性别
    user: "输入您的姓名",    // 姓名placeholder
    userphone: "输入您的电话",
    useremail: "输入紧急联系人的电话",
    houseuser:'请输入您现在居住的地方',
    usera: '单位CM',
    userb:'请填写您的籍贯',
    userid: '',
    openid:'',
    info:'',
    userf:'请填写紧急联系人姓名',
    /**
     * 页面的初始数据
     */
      name: '',//姓名
      gender: 0,//性别index
      height:'',
      education: 2,//默认本科
      household: '',//默认北京
      phone: '',//联系电话
      emergencyContactPhone: '',//紧急联系人电话
      birthyear: '2001-01',//出生日期
      emergencyContactName:'',//紧急联系人姓名
      habihould:'',
  },

  /*
   生命周期函数--监听页面加载
   */
  onLoad: function () {
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
          url: baseUrl + "/getcvbyid?userid=" + this.data.userid,
          success: function (res) {
            if(res.data.cv == null){
              that.data.info = true
              that.setData({
                info:true
              })
            }else{
              that.data.name = res.data.cv.name,//姓名
              that.data.gender = res.data.cv.gender,//性别index
              that.data.height = res.data.cv.height,
              that.data.education = res.data.cv.education,//默认本科
              that.data.household = res.data.cv.household,
              that.data.phone = res.data.cv.phone,//联系电话
              that.data.emergencyContactPhone = res.data.cv.emergencyContactPhone,                that.data.birthyear = res.data.cv.birthyear,
              that.data.habitation = res.data.cv.habitation
              that.data.emergencyContactName = res.data.cv.emergencyContactName
              that.data.info = false,
              that.setData({
                info:false,
                name: res.data.cv.name,//姓名
                gender: res.data.cv.gender,//性别index
                height: res.data.cv.height,
                education: res.data.cv.education,//默认本科
                household: res.data.cv.household,
                phone: res.data.cv.phone,//联系电话
                emergencyContactPhone: res.data.cv.emergencyContactPhone,//紧急联系人
                birthyear: res.data.cv.birthyear,//出生日期
                emergencyContactName: res.data.cv.emergencyContactName,
                habitation:res.data.cv.habitation
              }) 
              console.log(that.data.info)
            }
          }
        })
      }
    })
  },
  
  namefocus: function (e) {
    this.setData({
      user: ""
    })
  },
  //姓名失去焦点
  blurfocus: function (e) {
    console.log(this.data.info)
    this.setData({
      user: "输入您的姓名",
      name: e.detail.value
    })
  },
  //身高
  heifocus: function (e) {
    this.setData({
      usera: ""
    })
  },
  //姓名失去焦点
  heightfocus: function (e) {
    this.setData({
      user: "输入您的身高",
      height: e.detail.value
    })
  },

  //籍贯
  habifocus: function (e) {
    this.setData({
      userb: ""
    })
  },
  tionfocus: function (e) {
    this.setData({
      userb: "输入您的籍贯",
      habitation: e.detail.value
    })
  },
  //现居地址
  holdfocus: function (e) {
    this.setData({
      houseuser: ""
    })
  },
  housefocus: function (e) {
    this.setData({
      houseuser: "输入现居住地址",
      household: e.detail.value
    })
  },
  //性别
  bindPickerChangeSex: function (e) {
    this.setData({
      gender : e.detail.value
    })
  },
  //学历
  bindPickerChangeEduLevel: function (e) {
    this.setData({
      education: e.detail.value
    })
  },
  //出生日期
  bindDateChangeBirthday: function (e) {
    this.setData({
      birthyear: e.detail.value
    })
  },
  //城市
  bindPickerChangeCity: function (e) {
    this.setData({
      household: e.detail.value
    })
  },
  // 电话获取焦点
  phonefocus: function (e) {
    this.setData({
      userphone: ""
    })
  },
  //电话失去焦点
  phoneblur: function (e) {
    this.setData({
      userphone: "输入您的电话",
      phone: e.detail.value
    });
  },
  emailfocus: function (e) {
    this.setData({
      useremail: ""
    })
  },
  //邮箱失去焦点
  emailblur: function (e) {
    this.setData({
      useremail: "输入紧急联系人电话",
      emergencyContactPhone: e.detail.value
    })
  },
  nafocus:function(e){
    this.setData({
      userf:"",
    })
  },
  melblur:function(e){
    this.setData({
      useremail: "输入紧急联系人姓名",
      emergencyContactName: e.detail.value
    })
  },
  //保存
  submitResumeBaseTap: function () {
    if ((this.data.name == "") || (this.data.phone == "") || (this.data.emergencyContactPhone == "")) {
      wx.showModal({
        title: "苏领提示您",
        content: "请填写完整信息"
      });
    } else if (this.data.name || this.data.phone || this.data.emergencyContactPhone) {
      if (new Date().getFullYear() < this.data.birthyear.substring(0, 4)) {
        wx.showModal({
          title: "苏领提示您",
          content: "请填写真实出生时间"
        });
        if (new Date().getMonth() < this.data.birthyear.substring(5, 7)) {
          wx.showModal({
            title: "苏领提示您",
            content: "请填写真实出生时间"
          });
        }
      } else if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(this.data.phone))) {
        wx.showModal({
          title: "苏领提示您",
          content: "手机号码格式不对！"
        });
      } else if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(this.data.emergencyContactPhone))) {
        wx.showModal({
          title: "苏领提示您",
          content: "紧急手机格式不对！"
        });
      } else {
        var that = this;
        if(that.data.info == true){
          wx.request({
            url: baseUrl + "/addcv?&userid=" + this.data.userid,
            method: 'POST',
            data: {
              userid: that.data.userid,
              name: that.data.name,
              gender: that.data.gender,
              height: that.data.height,
              education: that.data.education,
              household: that.data.household,
              phone: that.data.phone,
              birthyear: that.data.birthyear,
              emergencyContactPhone: that.data.emergencyContactPhone,
              habitation : that.data.habitation,
              emergencyContactName: that.data.emergencyContactName
            },
            success: function (res) {
              console.log('成功了')
            }
          })
        }else{
          wx.request({
            url: baseUrl + "/modifycv?&userid=" + this.data.userid,
            method: 'POST',
            data: {
              userid: that.data.userid,
              name: that.data.name,
              gender: that.data.gender,
              height: that.data.height,
              education: that.data.education,
              household: that.data.household,
              phone: that.data.phone,
              birthyear: that.data.birthyear,
              emergencyContactPhone: that.data.emergencyContactPhone,
              habitation: that.data.habitation,
              emergencyContactName: that.data.emergencyContactName
            },
            success: function (res) {
              console.log('成功了')
            }
          })
        }
        if (that.data.info == true){
          wx.showModal({
            title: '填写工作经历',
            content: '提示',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../detail/detail',
                })
              } else {
                wx.showToast({
                  title: '保存成功！',
                  icon: 'success',
                  duration: 500
                })
                //返回上一个页面
                var pages = getCurrentPages();
                var curPage = pages[pages.length - 2];
                curPage.setData({
                  data: that.data
                });
                //返回上一个页面
                setTimeout(function () {
                  wx.navigateBack({
                  })
                }, 800);
              }
            }
          })
        }else{
          wx.showToast({
            title: '保存成功！',
            icon: 'success',
            duration: 500
          })
          //返回上一个页面
          var pages = getCurrentPages();
          var curPage = pages[pages.length - 2];
          curPage.setData({
            data: this.data
          });
          //返回上一个页面
          setTimeout(function () {
            wx.navigateBack({
            })
          }, 800);
        }   
      }
    }
  },
})