<template>
    <div class="poster-container">
        <div class="poster-info">
          <div class="poster-info-bg">
            <div class="infos">
              <div class="photo-bg">
                <label class="num">编号：{{number}}</label>
                <img :src="imgurl" style="width: 100%;height: 180px;border-radius: 10px"/>
              </div>
              <div class="poster-t">
                <label>我是{{name}}</label>
                <label style="display: flex;align-items: center">我正在参加花城<span style="background-color:#000;border-radius: 50%;display: inline-block;width: 5px;height: 5px;margin: 0 5px"></span>金沙汇少儿才艺大赛</label>
                <label style="text-align: left;width: 100%;">需要大家的支持</label>
                <br/>
                <label style="text-align: left;display: block">请为我投上你宝贵的一票吧！</label>
              </div>
              <div class="poster-code">
                <img src="../assets/young/code@2x.png"/>
                <label>截图保存到手机</label>
              </div>
            </div>
          </div>
          <div v-transfer-dom>
            <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', 'background-color': 'transparent'}">
              <div style="color:#fff;text-align:center;height: 100%;" @click="showDialogStyle = false">
                <div class="details" >
                  <div style="height:auto;">
                    <span class="de-title">活动细则</span>
                    <span class="de-point">1.分享海报进行人气大比拼，截止至12月21日中午12：00，“网络人气奖”（最高票数获得者）将获得价值3000元奖品；
                    </span>
                    <span class="de-point">2.参与投票方式：关注公众号，点击菜单栏【才艺大赛】里的“报名/投票”按钮即可参与！
                    </span>
                    <span class="de-point">3.比赛结束后22号开始截止至12月30日中午12：00，票数最高者将获得“最佳节目奖”，赢取价值500元奖品。
</span>
                    <span class="de-tip">提示：最终解释权归主办方所有！</span>
                  </div>
                </div>
                <span class="close-ic"></span>
                <!--<x-icon type="ios-close-outline" style="fill:#fff;" size="30"></x-icon>-->
              </div>
            </x-dialog>
          </div>
        </div>
    </div>
</template>

<script>
import { XDialog, TransferDomDirective as TransferDom } from 'vux'
import axios from 'axios'
export default {
  name: 'Poster',
  directives: {
    TransferDom
  },
  components: {
    XDialog
  },
  created () {
    this.showDialogStyle = true
    this.$store.state.sessID = localStorage.getItem('sessID')
    this.checkinfo()
  },
  methods: {
    checkinfo () {
      axios.get('http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/chaxunlog' + '?sessID=' + this.$store.state.sessID).then(res => {
        if (res.data.status === 0) {
          this.name = res.data.info.name
          this.number = res.data.info.number
          this.imgurl = res.data.info.imgurl
        } else if (res.data.status === -1) {
          this.$router.push('/join')
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
      showDialogStyle: false,
      showScrollBox: false,
      number: '',
      name: '',
      imgurl: ''
    }
  }
}
</script>

<style lang="less">
  .close-ic{
    margin-top: 20px;
    display: inline-block;
    width: 30px;
    height: 30px;
    -webkit-background-size: 100%;
    background-size: 100%;
    background-image: url(../assets/young/close-icon@2x.png);
  }
  .details{
    color:#000;
    padding: 8%;
    margin: 0 10%;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(../assets/young/layer@2x.png);
    .de-title{
      font-size:20px;
      display: block;
      margin-top: 30%;
    }
    .de-point{
      font-size:14px;
      display: block;
      text-align:left;
      margin: 10px 0;
    }
    .de-tip{
      font-size:13px;
      display: block;
      color:#ec6c06;
      text-align:left;
      margin-top: 14px;
    }
  }
  .dialog-demo {
    .weui-dialog{
      border-radius: 8px;
      padding-bottom: 8px;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .img-box {
      height: 350px;
      overflow: hidden;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  label{
    display: inline-block;
  }
  .poster-container{
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .poster-info{
    width: 90%;
    margin-top: 60px;
    margin-bottom: 20px;
    margin-left: 5%;
  }
  .poster-info-bg{
    -webkit-background-size: cover;
    background-size: cover;
    height: 100%;
    background-image: url(../assets/young/bg-white@2x.png);
    background-repeat: no-repeat;
  }
  .poster-info h1{
    font-size: 1.4em;
    color:#ec6c06;
    text-align: center;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  .infos{
    padding: 30px;
  }
.photo-bg{
  display: flex;
  margin-top: 30px;
  height: 180px;
  border-radius: 10px;
}
.num{
  position: absolute;
  z-index: 100;
  align-self: flex-end;
  color: #ec6c06;
  background-color: #f2c742;
  padding: 5px 20px;
  border-radius: 0 10px;
}
.poster-t{
  display: flex;
  flex-flow: wrap;
  align-content: flex-start;
  margin-top: 20px;
}
.poster-t label{
  display: block!important;
  font-size: 15px;
}
.poster-code{
  margin-top: 50px;
  margin-bottom: 30px;
}
.poster-code img{
  width: 40%;
}
.poster-code label{
  display: block;
  color: #ec6c06;
  font-size: 12px;
  margin-top: 5px;
}
  /*weui change*/
  .weui-cell{
    padding: 5px 0!important;
  }
  .weui-cells{
    background-color: transparent !important;
  }
  .weui-cells:before{
    border-top: none!important;
    border-bottom: none!important;
  }
  .weui-cells:after{
    border-top: none!important;
    border-bottom: none!important;
  }
</style>
