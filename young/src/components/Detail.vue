<template>
    <div class="detail-container">
      <div class="v-items">
          <div class="vote-item">
              <div class="inner">
                  <div class="v-list-img ss" @click="showImage">
                      <img class="previewer-demo-img" :src="aList.imgurl" style="width: 100%;"/>
                  </div>
                  <div class="items">
                      <label><span>编号：</span>{{aList.number}}</label>
                      <label style="width: 80px;overflow:hidden;display: block;white-space: nowrap;">{{aList.name}}</label>
                      <label class="vote-num"><span>票数：</span>{{aList.numcount}}<span>票</span></label>
                  </div>
              </div>
          </div>
      </div>
        <div  @click="showImg=false">
            <x-dialog class="dialog-demo" v-model="showImg">
                <div class="img-box">
                    <img :src="aList.imgurl" style="max-width:100%">
                </div>
            </x-dialog>
        </div>
        <div>
           <load-more :show-loading="false" tip="比赛照片" background-color="orange"></load-more>
        </div>
      <div class="v-photo-flex">
        <div class=" v-photo-bg holder" v-for="(item, index) in imgList" :key="index">
            <img class="previewer-demo-img" :src="item" style="width:100%;height: auto;" @click="showImages(index)">
        </div>
          <div  @click="showImgs=false">
              <x-dialog class="dialog-demo"  v-model="showImgs">
                  <div class="img-box">
                      <img :src="onlyUrls" style="max-width:100%">
                  </div>
              </x-dialog>
          </div>
        <!--<div v-transfer-dom>-->
          <!--<m-previewer :list="imgList" ref="previewer" :options="options" @on-index-change="logIndexChange"></m-previewer>-->
        <!--</div>-->
      </div>
        <div class="v-btns" @click="toVote">
            <div class="vote-btns" style="margin-top: 10px">
                <label>我要投票</label>
            </div>
        </div>
        <toast v-model="showM">投票成功！</toast>
    </div>
</template>

<script>
import VoteItem from '../pages/voteItem'
import MPreviewer from '../pages/MPreviewer'
import { Toast, LoadMore, TransferDom, XDialog } from 'vux'
import axios from 'axios'

export default {
  directives: {
    TransferDom
  },
  components: {
    LoadMore,
    VoteItem,
    MPreviewer,
    XDialog,
    Toast
  },
  name: 'detail',
  created () {
    this.getList()
  },
  methods: {
    getList () {
      axios.get('http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/infoimglist' + '?sessID=' + this.$store.state.sessID + '&number=' + this.$route.query.number).then(res => {
        this.aList = res.data.data.info
        this.name = this.aList.name
        this.imgList = res.data.data.imglist
      })
    },
    logIndexChange (arg) {
      console.log(arg)
    },
    showImage () {
      this.showImg = true
    },
    showImages (index) {
      this.showImgs = true
      this.onlyUrls = this.imgList[index]
    },
    toVote () {
      var vm = this
      var id = this.aList.id
      axios.get('http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/vote' + '?imgid=' + id + '&sessID=' + this.$store.state.sessID, {}).then(res => {
        if (res.data.status === 0) {
          this.showM = true
          this.aList.numcount++
          setTimeout(function () { vm.getList() }, 1000)
        } else if (res.data.status === -100) {
          localStorage.setItem('sessID', 'null')
          this.wxlogin()
        } else {
          alert(res.data.message)
        }
      })
    }
    // show (index) {
    //   console.log(index)
    //   this.$refs.previewer.show(index)
    // }
  },
  data () {
    return {
      number: '',
      sessID: '',
      aList: [],
      imgList: [],
      showImg: false,
      showImgs: false,
      onlyUrls: '',
      showM: false,
      // lists: [],
      // onlyList: lists,
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  }
}
</script>

<style lang="less">
  .bg{
    position: absolute;
  }
  .detail-container {
      img{
          height: auto;
          width: 100%;
      }
      justify-content: center;
      width: 100%;
      height: auto;
      .v-items {
          margin-top: 20px;
      }
      .inner .v-list-img {
          width: 35%;
      }
      .ss {
          height:100px;
          overflow:hidden;
          border-radius: 10px;
          border: 1px solid gold;
      }
      .v-photo-flex {
          position: absolute;
          height: 45%;
          overflow-y: auto;
          margin: -30px 4%;
          padding: 1%;
          display: flex;
          flex-wrap: wrap;
      }
      .v-photo-flex .v-photo-bg:after {
          flex: auto;
      }
      .v-photo-bg {
          width: 46%;
          height: 120px;
          border-radius: 10px;
          overflow: hidden;
      }
      .holder {
            margin: 2%;
        }
      .previewer-demo-img {
          height: auto;
          border-radius: 10px;
      }
      .detail {
          padding: 34px;
      }
      /*vote-item  change*/
      .vote-item .inner {
          font-size: 14px;
          flex-direction: column;
      }
      .inner .items {
          width: 100%;
          justify-content: space-around;
          flex-direction: row;
          margin-bottom: 10px;
      }
      .vote-item .vote-btn {
          display: none;
      }
      /*weui  change*/
      .weui-loadmore_line .weui-loadmore__tips {
          color: orange !important;
          background-color: #fff;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          margin: 0 20px;
          padding: 0.4em 1.5em !important;
          top: -1.2em !important;
      }
      .vux-loadmore.weui-loadmore_line:before, .vux-loadmore.weui-loadmore_line:after {
          border-top: 1px solid orange !important;
      }
      .v-btns {
          position: fixed;
          margin-left: 0;
          /*position: absolute;*/
          bottom: 5%;
          left: 15%;
          width: 70%;
          color: #ec6c06;
          font-size: 20px;
      }
      .vote-btns {
          color: #ec6c06;
          background-color: #fff;
          border-radius: 30px;
          padding: 10px 0;
          width: 100%;
      }
  }
  .weui-mask{
      background-color: #000000!important;
  }
  .dialog-demo {
      .weui-dialog{
          width: 100%!important;
          background-color: #000000!important;
          border-radius: 0!important;
      }
      .dialog-title {
          line-height: 30px;
          color: #666;
      }
      .img-box {
          height: auto;
          overflow: hidden;
      }
  }
</style>
