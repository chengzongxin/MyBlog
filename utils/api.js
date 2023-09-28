const BASE_URL = 'http://localhost:8888'
export const myRequest = (option)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: BASE_URL + option.url,
			method:option.method || 'GET',
			data:option.data || {},
			success: (res) => {
				if (res.statusCode === 0 || res.statusCode === 200) {
					resolve(res)
				}else{
					uni.showToast({
						title:'获取数据失败'
					})
					reject(res)
				}
			},
			fail: (err) => {
				uni.showToast({
					title:'请求接口失败'
				})
				reject(err)
			}
		})
	})
}
