exports.install = function (Vue, options) {
  Vue.prototype.wxlogin = function () {
    let sessID = this.$route.query.sessID
    let dataget = localStorage.getItem('sessID')
    console.log(dataget)
    if (dataget === 'null') {
      if (sessID) {
        localStorage.setItem('sessID', sessID)
        // window.location.href = window.location.href.split('?sessID=')[0]
        // 这个刷新后数据都没了？？？
      } else {
        let a = encodeURIComponent(window.location.href)
        window.location.href = 'http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/WebAuthorition?url=' + a
      }
    }
  }
}
