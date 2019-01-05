<template>
  <div>
    <div class="avatar">
      <div @mouseover="showBg=false" @mouseleave="showBg=true">
        <div v-show="uploadIc" class="upload-ic">
          <img style="width: 25%;" src=".././assets/young/upload-icon@2x.png"/>
          <label style="color:#fff;display: block;">上传</label>
        </div>
        <input type="file" class="input-file" name="avatar" ref="avatarInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
        <img :src="avatar?avatar:require('../assets/young/upload-bg@2x.png')" alt=""  class="after-img" name="avatar">
      </div>
    </div>
    <!--<div class="text" @click="upload" v-if="file">确定上传</div>-->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'upload',
  data () {
    return {
      File: '',
      avatar: '',
      file: '',
      showBg: false,
      uploadIc: true
    }
  },
  props: ['uploadType', 'imgUrl', 'imgWidth', 'imgHeight'],
  created () {
    this.avatar = this.imgUrl
  },
  methods: {
    changeImage (e) {
      this.uploadIc = false
      let file = e.target.files[0]
      this.file = file
      console.log(this.file)
      let reader = new FileReader()
      let that = this
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        that.avatar = this.result
      }
    },
    upload () {
      console.log(this.file)
      // console.log(this.avatar)
      if (this.$refs.avatarInput.files[0].length !== 0) {
        let data = new FormData()
        data.append('multfile', JSON.stringify(this.$refs.avatarInput.files[0]))
        data.append('operaType', JSON.stringify(this.uploadType))
        data.append('img', this.file)
        // 调用上传接口,把data传递给接口
        axios.post('http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/uploadImg' + '?sessID=' + this.$store.state.sessID, data).then(res => {
          this.File = res.data.data
          this.$emit('upload', data)
        })
      }
    }
  }
}
</script>

<style lang="less">
  .avatar {
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
      height: 170px;
    }
    .text {
      padding-top: 10px;
      color: lightblue;
    }
  }
</style>
