export const format = {
	timeString() {
		let date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		month >= 9 ? month : month = '0' + month
		let day = date.getDate()
		day >= 9 ? day : day = '0' + day
		let hour = date.getHours()
		hour >= 9 ? hour : hour = '0' + hour
		let minute = date.getMinutes()
		minute >= 9 ? minute : minute = '0' + minute
		let second = date.getSeconds()
		second >= 9 ? second : second = '0' + second
		let dateStr = year + '-' + month + '-' + day + " " + hour + ":" + minute + ":" + second
		return dateStr
	},
	timeStamp() {
		return new Date().getTime() || Date.now()
	},
	dataUnit(size) {
		if (size < 1024) {
			return size + 'B'
		} else if (size < 1024 * 1024) {
			return (size / 1024.0).toFixed(1) + 'KB'
		} else {
			return (size / 1024.0 / 1024.0).toFixed(1) + 'M'
		}
	}
}