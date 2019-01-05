<template >
  <div id="app" class="bg">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin: 0;
  }
#app {
  display: -webkit-flex; /* Safari */
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  border:hidden;
  font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
.bg{
  position: absolute;
  margin: 0 auto;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  overflow: auto;
  height: 100%;
  width: 100%;
  background-image: url(./assets/young/bg.png);
  background-repeat: no-repeat;
  background-position: center center;
  /*background-attachment:fixed;*/
}
</style>
