<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <myheader></myheader> 
    <router-view/>
  </div>
</template>

<script>
import myheader from "@/components/header"
export default {
  name: 'app',
  components:{
    myheader
  },
  
      
   
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  margin:0;
  padding:0;

}
 a{
  text-decoration: none;
  display: inline-block;
  width: 100%;
  height: 100%;
 }
</style>

