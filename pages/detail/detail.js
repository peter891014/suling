// pages/edit-resume-work-detail/edit-resume-work-detail.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
Page({
  data: {
    content_id: '',
    salary:['请选择你的资薪','1000-2000','2000-3000','3000-4000','4000-5000','5000-6000','6000-7000','7000-8000','8000以上'], 
    hiredate: '2015-01',//入职时间w
    firedate: '2015-01',//离职时间
    endDate: '2000-01',//离职时间,
    leaveDate: "",       // 选择离职的时间
    workContentLen: 0,
    salaryGrade:0,
    company: "",    // 公司名称
    workContent: "",     // 工作内容
    orporatename: "输入公司名称",
    position: "如：市场专员",
    jobcontent: "如：拓展合作资源，策划线上及线下推广活动",
    userid: '',
    openid: '',
    info:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
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
          url: baseUrl + "/queryworkexperiencebyid?userid=" + that.data.userid,
          success: function (res) {
            console.log(res.data)
            if(res.data == ""){
              that.data.info = 0;
              console.log(111)
              that.setData({
                info:0
              })
              console.log(that.data.info)
            }else{
                that.data.info = 1;
                that.data.company = res.data.company,
                that.data.salaryGrade = res.data.salaryGrade,
                that.data.hiredate = res.data.hiredate,
                that.data.firedate = res.data.firedate,
                that.data.description = res.data.description
               that.setData({
                company: res.data.company,
                salaryGrade: res.data.salaryGrade,
                hiredate: res.data.hiredate,
                firedate: res.data.firedate,
                description: res.data.description,
                info:1
              })
            }
          }
        })
      }
    })
  },
  //公司名称聚焦
  orporatenamefocus: function (e) {
    this.setData({
      company: ""
    });
  },
  //公司名称失焦
  orporatenameblur: function (e) {
    this.setData({
      orporatename: "输入公司名称",
      company: e.detail.value
    });
  },
  //入职时间
  bindDateChangeJoin: function (e) {
    this.setData({
      hiredate: e.detail.value,
      endDate: e.detail.value
    })
    console.log(e.detail);
  },
  //离职时间
  bindDateChangeLeave: function (e) {
    this.setData({
      firedate: e.detail.value
    })
  },
  //薪水情况
  bindPickersalary:function(e){
    this.setData({
      salaryGrade:e.detail.value
    })
  },
  //工作内容
  WorkContentTap: function (e) {
    var eValueLen = e.detail.value.length,
      eValue = e.detail.value;
    this.setData({
      workContentLen: eValueLen,
      description: eValue
    })
  },
  // 工作内容聚焦
  jobcontentfocus: function () {
    this.setData({
      jobcontent: ""
    })
  },
  // 工作内容矢焦
  jobcontentblur: function () {
    this.setData({
      jobcontent: "如：拓展合作资源，策划线上及线下推广活动"
    })
  },
  //保存工作详情
  setResumeWorkDetailFun: function () {
    var that = this;

    if (this.data.companyname == '' || this.data.companyname == undefined) {
      app.alert('请填写公司名称');
      return false;
    }
    if (this.data.condition == '' || this.data.department == undefined) {
      app.alert('请填写薪水情况');
      return false;
    }
    if (this.data.workContent == '' || this.data.workContent == undefined) {
      app.alert('请填写工作内容');
      return false;
    }
  },
  //提交工作信息(保存)
  submitCompanyTap: function (e) {
    if (this.data.company == '' || this.data.salaryGrade == '0' || this.data.description == '') {
      wx.showModal({
        title: "苏领提示您",
        content: "请填写完整信息"
      });
    } else {
      if(this.data.info != 1){
        wx.request({
          url: baseUrl + "/addworkexperience?userid=" + this.data.userid,
          method: 'POST',
          data: {
            userid: this.data.userid,
            company: this.data.company,
            salaryGrade: this.data.salaryGrade,
            hiredate: this.data.hiredate,
            firedate: this.data.firedate,
            description: this.data.description
          },
          success: function (res) {
            console.log(res)
          }
        })
      }else{
        wx.request({
          url: baseUrl + "/modifyworkexperience?userid=" + this.data.userid,
          method: 'POST',
          data: {
            userid: this.data.userid,
            company: this.data.company,
            salaryGrade: this.data.salaryGrade,
            hiredate: this.data.hiredate,
            firedate: this.data.firedate,
            description: this.data.description
          },
          success: function (res) {
            console.log(res)
          }
        })
      }
      if (this.data.info != 1){
        wx.showModal({
          title: '可以去报名拉',
          content: '提示',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../index/index',
              })
            }else{
              wx.switchTab({
                url: '../index/index',
              })
            }
          }
        })
        console.log(111)
      }else{
        wx.showToast({
          title: '保存成功！',
          icon: 'success',
          duration: 500
        });
        //更新上一级页面
        var pages = getCurrentPages();
        var curPagePre = pages[pages.length - 2];
        //更新上上一级页面
        curPagePre.setData({
          resumeWorkList: this.data
        });
        // //返回上一个页面
        setTimeout(function () {
          wx.navigateBack({})  // 返回上一页
        }, 800);
      }
    }
  },

})