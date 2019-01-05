<template>
  <div class="success-container">
    <div class="success-ic">
      <img src="../assets/young/success-icon@2x.png"/>
    </div>
    <div class="success-text">
      <label style="display: block;font-size: 24px;font-weight: bold;">提交成功</label>
      <label style="display: block;font-size: 14px;margin: 10px 0;">请保持你的电话畅通，后续工作人员会电话回访进行确认。</label>
    </div>
    <router-link to="/poster">
      <div class="s-btns">
        <div class="post-btn">
          <label>生成专属我的海报</label>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'success'
}
</script>

<style scoped>
  a{
    text-decoration:none;
    color: #ec6c06;
  }
.success-container{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  /*justify-content: center;*/
}
  .success-ic{
    padding:0 50px;
  }
.success-ic img{
  width: 30%;
}
  .success-text{
    color: #fff;
    padding: 10px;
  }
.s-btns{
  /*position: absolute;*/
  /*left: 15%;*/
  margin-left: 15%;
  width: 70%;
  color: #ec6c06;
  font-size: 20px;
  /*line-height: 48px;*/
}
.post-btn{
  padding: 10px 0;
  background-color: #fff;
  border-radius: 30px;
  width: 100%;

}
</style>
