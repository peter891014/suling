// pages/search-gs/search-gs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  //键盘输入时实时调用搜索方法
  input(e) {
    this.search(e.detail.value)
  },
  //点击完成按钮时触发
  confirm(e) {
    this.search(e.detail.value)
  },
  search(key) {
    var that = this;
    //从本地缓存中异步获取指定 key 的内容
    var list = wx.getStorage({
      key: 'list',
      //从Storage中取出存储的数据
      success: function (res) {
        if (key == '') {   //用户没有输入时全部显示
          that.setData({
            list: res.data
          })
          return;
        }
        var arr = [];     //临时数组，用于存放匹配到的数组
        for (let i in res.data) {
          res.data[i].show = false;  //所有数据隐藏
          if (res.data[i].search.indexOf(key) >= 0) {
            res.data[i].show = true;  //让匹配到的数据显示
            arr.push(res.data[i])
          }
        }
        if (arr.length == 0) {
          that.setData({
            list: [{ show: true, name: '没有相关数据！' }]
          })
        } else {
          that.setData({
            list: arr
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = [
      { name: "苏州聚缘阁智能科技有限公司", show: true, search: "苏州聚缘阁智能科技有限公司" },
      { name: "上海市第二人民医院", show: true, search: "上海市第二人民医院" },
      { name: "苏州市三星电子有限公司", show: true, search: "苏州市三星电子有限公司" },
      { name: "苏州市三星医药有限公司", show: true, search: "苏州市三星医药有限公司" },
      { name: "苏州市三星电视有限公司", show: true, search: "苏州市三星电视有限公司" },
      { name: "苏州市三星家电有限公司", show: true, search: "苏州市三星医家电限公司" },
      { name: "苏州市第二建筑有限公司", show: true, search: "苏州市第二建筑有限公司" },
      { name: "苏州市三星医药有限公司", show: true, search: "苏州市三星医药有限公司" },
      { name: "无锡市三星医药有限公司", show: true, search: "无锡市三星医药有限公司" },
      { name: "常州市三星医药有限公司", show: true, search: "常州市三星医药有限公司" }, 
      { name: "苏州市三星医药有限公司", show: true, search: "苏州市三星医药有限公司" },
      { name: "苏州市三星医药有限公司", show: true, search: "苏州市三星医药有限公司" },
      { name: "苏州市三星医药有限公司", show: true, search: "苏州市三星医药有限公司" }
    ]
    wx.setStorage({
      key: 'list',
      data: list
    })
    this.setData({
      list: list
    })
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})