<template>
    <div class="vote-container">
      <div class="search-info">
        <div class="search">
          <form style="display: flex; padding: 5px;height: 30px;align-items: center">
            <x-icon type="ios-search" size="20" class="cell-x-icon"></x-icon>
            <input type="search" placeholder="输入编号或姓名" v-model="values"/>
          </form>
        </div>
        <span style="margin: 0 5% 0 0;color: orange;padding: 0;display: flex;align-items: center" @click="search">搜索</span>
      </div>
      <div class="list-item">
          <vote-item v-model="showM" :list="bList" photo-bg1="true" @toVote="toVote" @show="show"></vote-item>
        <div v-transfer-dom>
          <m-previewer :list="bList" ref="previewer" :options="options" @on-index-change="logIndexChange"></m-previewer>
        </div>
        <toast v-model="showM">投票成功！</toast>
      </div>
    </div>
</template>

<script>
import VoteItem from '../pages/voteItem'
import MPreviewer from '../pages/MPreviewer'
import axios from 'axios'
import { Toast, Previewer, TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Toast,
    VoteItem,
    Previewer,
    MPreviewer
  },
  name: 'vote-lister',
  created () {
    this.$store.state.sessID = localStorage.getItem('sessID')
    this.getList()
  },
  methods: {
    getList (keys = '') {
      axios.get('http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/index' + '?keys=' + keys + '&sessID=' + this.$store.state.sessID).then(res => {
        if (res.data.status === 0) {
          this.bList = res.data.list
          this.imgurl = this.bList.imgurl
          this.msrc = this.bList.imgurl
          this.src = this.bList.imgurl
        } else if (res.data.status === -100) {
          localStorage.setItem('sessID', 'null')
          this.wxlogin()
        }
      })
    },
    logIndexChange (arg) {
      console.log(arg)
    },
    show (index) {
      console.log(index)
      this.$refs.previewer.show(index)
    },
    toVote (id) {
      var vm = this
      axios.get('http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/vote' + '?imgid=' + id + '&sessID=' + this.$store.state.sessID, {}).then(res => {
        if (res.data.status === 0) {
          this.showM = true
          setTimeout(function () { vm.getList() }, 1000)
        } else if (res.data.status === -100) {
          localStorage.setItem('sessID', 'null')
          this.wxlogin()
        } else {
          alert(res.data.message)
        }
      })
    },
    search () {
      this.getList(this.values)
    }
  },
  data () {
    return {
      values: '',
      showM: false,
      bList: [],
      number: 1,
      onlyUrl: '',
      name: 'a',
      showImg: false,
      msrc: '',
      src: '',
      imgurl: '',
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
  input{
    font-size: 16px;
    background-color: transparent!important;
    box-shadow: none;
    outline: none!important;
    border: none!important;
    width: 100%;
    height: 100%;
  }
  input::-webkit-input-placeholder{
    color: orange!important;
    -webkit-appearance: none;
  }
  input[type="search"]::-webkit-search-cancel-button {
    display: none;
    border: none!important;
  }
  .vote-container{
    width: 100%;
    height: auto;
  }
  .bg{
    overflow: auto;
    /*position: relative;*/
  }
  .search-info{
    display: flex;
    /*margin-top: 40px;*/
  }
  .search{
    flex: 1;
    background: cornsilk;
    border-radius: 5px;
    margin: 5%;
  }
  /*weui change*/
  .cell-x-icon {
    display: block;
    fill: orange;
  }
  .list-item{
    margin-top: 3px;
  }
  /*vote-item  change*/
  .items .vote-btn{
    color: #000;
    font-size: 14px;
  }
  /*.weui-search-bar{*/
    /*background-color: transparent!important;*/
  /*}*/
  /*.weui-search-bar:before{*/
    /*border: none!important;*/
  /*}*/
  /*.weui-search-bar:after{*/
    /*border: none!important;*/
  /*}*/
  /*.vux-search-fixed{*/
    /*background: none!important;*/
  /*}*/
  /*.weui-icon-search{*/
    /*color: orange!important;*/
  /*}*/
  /*.vux-search-box {*/
    /*width: 100% !important;*/
  /*}*/
</style>
