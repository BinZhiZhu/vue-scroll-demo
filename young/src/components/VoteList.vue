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
        <div class="scroller">
            <scroller :on-refresh="refresh" :on-infinite="infinite" ref="scrollerBottom" style="top: 12%;">
                <div class="list-item">
                <!--二次修改-->
                <vote-item v-model="showM" :list="bList" :photo-bg1="true" @toDetail="toDetail" @showImage="showImage"></vote-item>
                <!--<vote-item v-model="showM" :list="bList" :photo-bg1="true" @toVote="toVote" @showImage="showImage"></vote-item>-->
                <div  @click="showImg=false">
                <x-dialog class="dialog-demo"  v-model="showImg">
                <div class="img-box">
                <img :src="onlyUrl" style="max-width:100%">
                </div>
                </x-dialog>
                </div>
                <!--<toast v-model="showM">投票成功！</toast>-->
                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
import VoteItem from '../pages/voteItem'
import axios from 'axios'
import { Toast, Previewer, TransferDom, XDialog } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Toast,
    VoteItem,
    Previewer,
    XDialog
  },
  name: 'vote-list',
  created () {
    this.$store.state.sessID = localStorage.getItem('sessID')
    this.getList()
  },
  methods: {
    getList (keys = '') {
      axios.get('http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/index' + '?keys=' + keys + '&sessID=' + this.$store.state.sessID).then(res => {
        if (res.data.status === 0) {
          this.bList = res.data.list
        } else if (res.data.status === -100) {
          // localStorage.setItem('sessID', 'null')
          this.wxlogin()
        }
      })
    },
    showImage (index) {
      this.showImg = true
      this.onlyUrl = this.bList[index].imgurl
    },
    toDetail (number) {
      console.log(number)
      this.$router.push({
        path: '/detail',
        query: {
          number: number
        }
      })
    },
    toVote (id) {
      alert('投票已结束！')
      // var vm = this
      // axios.get('http://www.wecozhiku.com/gsh5/index.php/Home/JshApi/vote' + '?imgid=' + id + '&sessID=' + this.$store.state.sessID, {}).then(res => {
      //   if (res.data.status === 0) {
      //     this.showM = true
      //     setTimeout(function () { vm.getList() }, 1000)
      //   } else if (res.data.status === -100) {
      //     localStorage.setItem('sessID', 'null')
      //     this.wxlogin()
      //   } else {
      //     alert(res.data.message)
      //   }
      // })
    },
    search () {
      this.getList(this.values)
    },
    refresh (done) {
      // 下拉刷新
      // your code
    },
    infinite (done) {
      // 上拉加载
      if (this.isBottom) {
        // 当没有更多数据的时候结束加载
        this.loadingTips = '无更多数据'
        setTimeout(() => {
          done && done(true)
        }, 1000)
      } else {
        // 有更多数据时进行数据分页显示
        setTimeout(() => {
          this.page++
          this.getList(this.page)
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
        }, 1500)
      }
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
      loadingTips: '',
      isBottom: false
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
