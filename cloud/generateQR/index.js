// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const log = cloud.logger()
const uploadFile = async function(arrayBuffer,path) {
  let{fileID} = await cloud.uploadFile({
    cloudPath:path,
    fileContent:arrayBuffer
  })
  return fileID
}
//云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let result
  var scene = event.scene;
  var page = event.page;
  var width = event.width;
  try {
   let {
      buffer
   } = await cloud.openapi.wxacode.getUnlimited({
       scene: scene,
       page: page,
       width: width
   })
   fileID = await uploadFile(buffer,"unlimited.jpg")
   return fileID
  }catch(err){
    log.error({
      err
    })
   return err
  }
   
}
