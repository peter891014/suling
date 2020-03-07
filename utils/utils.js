const moment = require('moment.min.js');
// 导出模块
module.exports = {
  dateFormat: function (objects, format) {
		objects.map(function (item, index) {
			moment.locale('en', {
			    longDateFormat : {
			        l: "YYYY-MM-DD",
			        L: "YYYY-MM-DD HH:mm"
			    }
			});
			if (format == undefined) {format = 'L'}
			// console.log(item.createdAt);
			item.createdAt = moment(item.createdAt).format(format);
			item.updatedAt = moment(item.updatedAt).format(format);
			return item;
		});
		return objects;
	}
}
