// page/component/details/details.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
Page({
  data: {
    userid: "",
    openid: "",
    id: '',
    goods: {
    },
    name: '',
    phone: '',
    address: '',
    numa: '',
    num: 1,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    minusStatus: 'disabled',
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      id: options.id,
      numa: options.num
    })
    console.log(that.data.numa)
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
      }
    })
    var id = that.data.id
    wx.request({
      url: baseUrl + '/center/getCommodityDetail?commodityId=' + id,//请求地址
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        var goods = that.data.goods
        goods = res.data
        that.setData({
          goods: goods
        })
        console.log(that.data.goods)
      },
    })
  },
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },

  addToCart() {
    var that = this
    var price = that.data.goods.price
    var num = that.data.num
    var numa = that.data.numa
    if (numa < price * num) {
      wx.showModal({
        title: '提示',
        content: '您的积分不够',
        showCancel: false
      })
    } else {
      this.setData({
        showModal: true
      })
    }
  },
  /**
   
  * 弹出框蒙层截断touchmove事件
   
  */

  preventTouchMove: function () {

  },

  /**
   
  * 隐藏模态对话框
   
  */

  hideModal: function () {

    this.setData({

      showModal: false

    });

  },

  /**
   
  * 对话框取消按钮点击事件
   
  */

  onCancel: function () {

    this.hideModal();

  },

  /**
   
  * 对话框确认按钮点击事件
   
  */
  bindName(e) {
    var that = this;
    var name = that.data.name
    this.setData({
      name: e.detail.value
    })
  },
  bindPhone(e) {
    var that = this;
    var phone = that.data.phone
    this.setData({
      phone: e.detail.value
    })
  },
  bindDetail(e) {
    var that = this;
    var address = that.data.address
    this.setData({
      address: e.detail.value
    })
  },
  onConfirm: function () {
    var that = this;
    if (that.data.name && that.data.phone && that.data.address) {
      wx.request({
        url: baseUrl + "/center/getPresent",
        method: 'POST',
        data: {
          userId: that.data.userid,
          name: that.data.name,
          address: that.data.address,
          phone: that.data.phone,
          num: that.data.num,
          commodityId: that.data.id
        },
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '兑换成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整',
        showCancel: false
      })
    }
    this.hideModal();
  },
})