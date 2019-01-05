import Ax from 'axios/dist/axios'
import qs from 'querystring'

const request = new Ax()

request.config = {
  baseURL: 'http://www.wecozhiku.com/gsh5/index.php/Home/JshApi'
}

request.interceptors.request.use((request) => {
  var params = request.body
  if (params) {
    if (params.showLoading !== false) {
      // wx.showLoading({ title: '加载中...' })
      // wx.showNavigationBarLoading()
      // delete params.showLoading
    }
  }
  if (request.method === 'POST') {
    request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (request.body) {
      request.body = qs.stringify({
        ...request.body
      })
    }
  } else if (request.body) {
    request.url = request.url + '?' + qs.stringify(request.body)
    request.body = null
  }
  // request.headers = {'Authorization': 'Bearer ' + wx.getStorageSync('token')}
  return request
})
export default request
