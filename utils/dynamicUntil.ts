const db = uniCloud.database();
const dynamicTable = db.collection('dynamic')

export const getDynamicList = async (page = 1, size = 10) => {
	return new Promise((resolve, reject) => {
		dynamicTable.orderBy('create_at_time', 'desc').limit(size).skip((page - 1) * size).get().then((res) => {
			resolve(res)
		}).catch((e) => {
			console.log("database err:", e)
			reject(e)
		});
	})
}