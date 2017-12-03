<template>
	<div>
		
		<el-menu :default-active="activeIndex2"
		  class="el-menu-demo"
		  mode="horizontal"
		  background-color="#545c64"
		  text-color="#fff"
		  active-text-color="#ffd04b">
		  <el-menu-item index="1"><router-link to="/">(最新)现券市场成交行情</router-link></el-menu-item>
		  <el-menu-item index="2"><router-link to="/nongye">(全部)现券市场做市报价</router-link></el-menu-item>
		  <el-menu-item index="3"><a target="_blank">个人中心</a></el-menu-item>
		</el-menu>

	</div>
</template>
<script>
	export default{
		name:'myheade',
		data(){
			return{
				activeIndex2: '1'
			}
		},

	}
</script>

