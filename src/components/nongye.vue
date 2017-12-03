<template>
	<div>
		<el-header :style="{height:'40px',padding:'30px 0 0 10px'}">
			<span><b :style="{color:'#5A5E66'}">报价机构 : </b><select style="border-color:#D8DCE5;height:40px" id="select" v-html="opse"></select></span>
			<span> <el-button @click="fn()" type="primary">查询</el-button></span>
		</el-header>
		
		<el-main>
			 <el-container>
		    <el-main>
		      <el-table :data="tableData" v-loading="loading">
		        <el-table-column prop="name" label="报价机构" >
		        </el-table-column>
		        <el-table-column prop="date" label="债券简称" >
		        </el-table-column>
		        <el-table-column prop="address" label="买入/卖出净价(元)">
		        </el-table-column>
		        <el-table-column prop="dz" label="买入/卖出收益率(%)">
		        </el-table-column>
		      </el-table>
		    </el-main>
  		</el-container>
		</el-main>	
		 
  		

		
	</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'

export default{
	name:'nongye',
	data(){
		return{
			arrdata:[],
			tableData: [{
            date: '',
            name: '',
            address: '',
            dz:''
        	}],
        	opse:'',
        	seach:'农业银行',
        	loading:true,
        	
        	
		}
	},
	methods:{
		shuju(){
				var url="/api/dqs/rest/dqs-u-bond/CbMktMakQuot"
				axios.get(url,{
					params: {
						flag:1,
						lang:'cn',
						abdAssetEncdShrtDesc:'全部',
						emaEntyEncdShrtDesc:this.seach,
						}
					})
					.then(response=>{
         				this.arrdata=response.data;
         				console.log(this.arrdata.records.length);
         				var arr=[];
         				for(var i=0;i<this.arrdata.records.length;i++){
         					var obj=[];
         					obj.name=this.arrdata.records[i].emaEntyEncdShrtDesc;
         					obj.date=this.arrdata.records[i].abdAssetEncdShrtDesc;
         					obj.address=this.arrdata.records[i].tradeAmnt;
         					obj.dz=this.arrdata.records[i].contraRate;
         					arr[i]=obj;
         				}
         				this.opse=this.arrdata.data.optionCn;
         				this.tableData=arr;
         				this.loading=false;
         				
      				})

			},
			
			fn(){
				this.loading=true;
				var select=document.getElementById('select').value;
				this.seach=select;
				
				this.shuju();
				
				
			},
			
	},

	
	created(){
			
			this.shuju()
		}
}
</script>