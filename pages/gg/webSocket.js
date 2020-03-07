//服务器地址
var app = getApp()
var wssUrl = app.globalData.wssUrl;
function connect(user, id, func) {
  /// console.log('usr~:' )
  console.log(user)
  console.log(id)
  var url = wssUrl+'/websocket/' + id;
  // socket = new WebSocket("ws://localhost:8080/websocket");
  wx.connectSocket({

    url: url,

    header: { 'content-type': 'application/json' },

    success: function () {

      console.log('信道连接成功~:' + user)

    },

    fail: function () {

      console.log('信道连接失败~')

    }

  })

  wx.onSocketOpen(function (res) {

    //接受服务器消息

    wx.onSocketMessage(func);//func回调可以拿到服务器返回的数据

  });

  wx.onSocketError(function (res) {

  })

}

//发送消息

function send(msg) {

  wx.sendSocketMessage({

    data: msg

  });

}

module.exports = {

  connect: connect,

  send: send

}