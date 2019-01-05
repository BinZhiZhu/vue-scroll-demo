<template>
  <div class="main-container">
    <div class="index-bg">
      <div class="btns">
        <!--<router-link to="/join">-->
          <div class="join-btn" @click="baomin">
            <label>我要报名</label>
          </div>
        <!--</router-link>-->
          <!--修改部分功能-->
        <router-link to="/vote">
          <div class="join-btn" style="margin-top: 10px">
            <label>我要投票</label>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Index',
  created () {
    this.$store.state.sessID = localStorage.getItem('sessID')
    this.checklogin()
  },
  methods: {
    baomin () {
      alert('报名已截止！')
    },
    wxlogin () {
      let sessID = this.$route.query.sessID
      let dataget = localStorage.getItem('sessID')
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
    },
    checklogin () {
      axios.get('http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/checkuser' + '?sessID=' + this.$store.state.sessID).then(res => {
        if (res.data.status === -100) {
          localStorage.setItem('sessID', 'null')
          this.wxlogin()
        } else {
          this.$store.state.sessID = localStorage.getItem('sessID')
        }
      })
    }
  }
}
</script>

<style lang="less">
  a{
    text-decoration:none;
    color: #ec6c06;
  }
  .main-container{
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
.index-bg{
  margin: 0 auto;
  -webkit-background-size: 100%;
  background-size: 100%;
  height: 100%;
  background-image: url(../assets/young/main.png);
}
.btns{
  margin-left: 0;
  position: absolute;
  bottom: 5%;
  left: 15%;
  width: 70%;
  color: #ec6c06;
  font-size: 20px;
}
.join-btn{
  background-color: #fff;
  border-radius: 30px;
  padding: 10px 0;
  width: 100%;
}
</style>
