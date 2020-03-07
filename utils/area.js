const app = getApp();
var str = [];
var baseUrl = app.globalData.baseUrl;
wx.request({
  url: baseUrl+'/getAddressData',
  success(res) {
    if (res.data) {

      str = res.data;
     
    }
  }
})
function getAreaInfo(callBack){
  callBack(str);
 
}

module.exports.getAreaInfo = getAreaInfo;