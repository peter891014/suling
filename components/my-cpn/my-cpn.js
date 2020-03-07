// components/my-cpn/my-cpn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listInfo:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseImg: function (event) {
      const index = event.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('itemclick',{index},{})
    }
  }
})
