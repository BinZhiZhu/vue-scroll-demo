<template>
  <div class="vote-items">
    <div class="vote-item" v-for="(item, index) in list" :key="index">
        <div class="inner" >
            <div class="v-list-img" v-if="photoBg1">
                    <!--背景引入图片-->
                <div :style="'background-image:' + 'url(' + item.imgurl + ')'" class="child-img previewer-demo-img" @click="showImage(index)"></div>
                    <!--img引入图片-->
                    <!--<img class="previewer-demo-img" :src="item.imgurl" style="width: 100%;height: 100px;" @click="show(index)"/>-->
            </div>
            <div class="items" @click="toDetail(item.number)">
                <label><span v-show="tip">编号：</span>{{item.number}}</label>
                <label style="width: 80px;overflow:hidden;display: block;white-space: nowrap;">{{item.name}}</label>
                <label class="vote-num"><span v-show="tip">票数：</span>{{item.votenum}}<span v-if="photoBg1">票</span></label>
            </div>
            <!--这里改了-->
            <div class="vote-btn" @click="toDetail(item.number)">
                <label class="vote-lab">投票</label>
                <!--<label class="vote-lab" @click="vote(item.id)">投票</label>-->
            </div>
        </div>
    </div>
  </div>

</template>

<script>
import { Toast, Previewer, TransferDom } from 'vux'
export default {
  name: 'voteItem',
  directives: {
    TransferDom
  },
  components: {
    Toast,
    Previewer
  },
  props: {
    photoBg1: false,
    photoBg2: false,
    tip: false,
    list: {}
  },
  methods: {
    // show (index) {
    //   this.$emit('show', index)
    // },
    showImage (index) {
      this.$emit('showImage', index)
    },
    toDetail (number) {
      this.$emit('toDetail', number)
    },
    vote (id) {
      this.$emit('toVote', id)
    }
  },
  data () {
    return {
      show2: false
    }
  }
}
</script>

<style lang="less">
  .vote-item{
    background: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    width: 90%;
    height: 100%;
    margin: 0 5% 5%;
  }
  .inner{
    height: 100%;
    width: 100%;
    display: flex;
    /*flex-direction: row;*/
    justify-content: space-around;
    align-items: center;
  }
  .items{
    display: flex;
    flex-direction: column;
  }
  .v-list-img{
    -webkit-background-size: 100%;
    background-size: 100%;
    width: 40%;
    margin: 10px 0;
    /*margin-top: 5px;*/
    /*margin-left: 3%;*/
    background-repeat: no-repeat;
    background-image: url(../assets/young/vote-photo-bg@2x.png);
  }
  .child-img{
    width: 100%;
    height: 100px;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center center;
  }
  .vote-num{
    color: red;
  }
  .vote-btn{
    /*margin-top: 20%;*/
    -webkit-background-size: 100%;
    background-size: 100%;
    width: 20%;
    background-repeat: no-repeat;
    background-image: url(../assets/young/vote@2x.png);
  }
.vote-lab{
  padding: 25% 25% 34%;
  display: block;
  color:#fff;
}
</style>
