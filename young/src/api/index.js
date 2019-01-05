// Vue.prototype.wxlogin = function () {
//   if (window.location.href.includes('sessID')) {
//     let newSessID = window.location.href.split('sessID=')[1]
//     store.state.sessID = newSessID
//     localStorage.setItem('sessID', newSessID)
//     window.location.href = window.location.href.split('?sessID=')[0]
//   } else {
//     window.location.href = 'http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/WebAuthorition?url=' + '/index' + encodeURIComponent(window.location.href)
//   }
//   console.log(this.$route.query.sessID)
// }
