<template>
  <div class="join-container">
      <div class="join-info">
        <div class="join-info-bg">
          <div class="infos">
            <h1>YOUNG动金沙</h1>
            <h1>花城·金沙汇少儿才艺大赛</h1>
          </div>
          <div style="margin:10px 50px;">
            <group style="border-bottom: 1px solid  #ec6c06;">
              <x-input v-model="name" placeholder="请输入萌宝名字" :max="5"></x-input>
            </group>
            <group style="border-bottom: 1px solid #ec6c06;">
              <x-input v-model="phone" name="mobile" keyboard="number" is-type="china-mobile" placeholder="请输入你的联系方式"></x-input>
            </group>
          </div>
          <div style="padding:0 50px;margin-bottom: 20px;">
            <label style="font-size: 14px;color: #ec6c06;position: relative;text-align:left;margin: 20px 0;display: block;">在此上传参赛小朋友的照片（建议上传横向照片）</label>
            <div class="upload-img">
              <div class="avatar">
                <div @mouseover="showBg=false" @mouseleave="showBg=true">
                  <div v-show="uploadIc" class="upload-ic">
                    <img style="width: 25%;" src=".././assets/young/upload-icon@2x.png"/>
                    <label style="color:#fff;display: block;">上传</label>
                  </div>
                  <input type="file" class="input-file" name="avatar" ref="avatarInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
                  <img :src="avatar?avatar:require('../assets/young/upload-bg@2x.png')" alt="" class="after-img" name="avatar">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class="up-btns" @click="uploadInfo">
          <div class="up-btn">
            <label>提交报名</label>
          </div>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XImg } from 'vux'
// import Upload from '../pages/upload'
import axios from 'axios'
export default {
  components: {
    XInput,
    Group,
    XImg
  },
  name: 'Join',
  comments: {
    XInput,
    Group
  },
  created () {
    this.showM = false
    this.$store.state.sessID = localStorage.getItem('sessID')
    this.checkinfo()
  },
  methods: {
    changeImage (e) {
      this.uploadIc = false
      let file = e.target.files[0]
      this.file = file
      let reader = new FileReader()
      let that = this
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        that.avatar = this.result
      }
    },
    uploadInfo () {
      let data = new FormData()
      data.append('operaType', JSON.stringify(this.uploadType))
      data.append('img', this.file)
      data.append('name', this.name)
      data.append('phone', this.phone)
      // 调用上传接口,把data传递给接口
      axios.post('http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/uploadImg' + '?sessID=' + this.$store.state.sessID, data).then(res => {
        if (res.data.status === 0) {
          this.$router.push('/success')
        } else if (res.data.status === -100) {
          localStorage.setItem('sessID', 'null')
          this.wxlogin()
        } else {
          alert(res.data.message)
        }
      })
    },
    checkinfo () {
      axios.get('http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/chaxunlog' + '?sessID=' + this.$store.state.sessID).then(res => {
        if (res.data.status === 0) {
          this.name = res.data.info.name
          this.phone = res.data.info.phone
          this.avatar = res.data.info.imgurl
        } else if (res.data.status === -100) {
          localStorage.setItem('sessID', 'null')
          this.wxlogin()
        }
      })
    }
    // wxlogin () {
    //   let sessID = this.$route.query.sessID
    //   let dataget = localStorage.getItem('sessID')
    //   if (dataget === 'null') {
    //     if (sessID) {
    //       localStorage.setItem('sessID', sessID)
    //       window.location.href = window.location.href.split('?sessID=')[0]
    //       // 这个刷新后数据都没了？？？
    //     } else {
    //       let a = encodeURIComponent(window.location.href)
    //       window.location.href = 'http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/WebAuthorition?url=' + a
    //     }
    //   }
    // }
  },
  data () {
    return {
      name: '',
      phone: '',
      File: '',
      avatar: '',
      file: '',
      showBg: false,
      uploadIc: true
    }
  }
}
</script>
<style lang="less" >
  input::-webkit-input-placeholder {
    color: #ec6c06;
    opacity:0.6;
    font-size: 14px;
  }
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  a{
    text-decoration:none;
    color:#ec6c06;
  }
    .join-container{
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .join-info{
    width: 90%;
    padding-top: 60px;
    margin-bottom: 20px;
    margin-left: 5%;
  }
  .join-info-bg{
    -webkit-background-size: cover;
    background-size: cover;
    border-radius: 10px;
    height: 100%;
    background-image: url(../assets/young/young-bg@2x.png);
    background-repeat: no-repeat;
  }
  .join-info h1{
    font-size: 1.4em;
    color:#ec6c06;
    text-align: center;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  .infos{
    padding: 30px 30px 0;
  }
  .upload-bg{
    -webkit-background-size: 100%;
    background-size: 100%;
    /*height: 100%;*/
    background-image: url(../assets/young/upload-bg@2x.png);
    background-repeat: no-repeat;
    /*margin-bottom: 50px;*/
  }
  .up-btns{
    margin-bottom: 30px;
    margin-left: 5%;
    width: 90%;
    color: #ec6c06;
    font-size: 20px;
    /*line-heght: 48px;*/
  }
  .up-btn{
    padding: 10px 0;
    background-color: #fff;
    border-radius: 30px;
  }
  /*weui change*/
  .weui-cell{
    padding: 5px 0!important;
  }
  .weui-cells{
    background-color: transparent !important;
    margin-top: 26px!important;
  }
  .weui-cells:before{
    border-top: none!important;
    border-bottom: none!important;
  }
  .weui-cells:after{
    border-top: none!important;
    border-bottom: none!important;
  }
  .weui-input{
    color: #ec6c06!important;
  }
  .avatar {
    overflow: hidden;
    cursor: pointer;
    position: relative;
    .input-file {
      position: absolute;
      top: 0;
      left: 0;
      width:100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    .up-bg {
      color: #fff;
      /*background-color: rgba(0, 0, 0, 0.3);*/
      text-align: center;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
    }
    .upload-ic{
      position: absolute;
      top: 25%;
      width: 100%;
      height: 100%;
    }
    .after-img{
      width:100%;
      max-height: 170px;
    }
    .text {
      padding-top: 10px;
      color: lightblue;
    }
  }
</style>
