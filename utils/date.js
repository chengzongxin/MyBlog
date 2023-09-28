export const date = {
	toString() {
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
	timeStamp(){
		return new Date().getTime() || Date.now()
	}
}