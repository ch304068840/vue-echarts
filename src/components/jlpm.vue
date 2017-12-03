<template>
	<div>
		<el-container>
		    <el-main>
		      <el-table :data="tableData" v-loading="loading">
		        <el-table-column prop="name" label="债券简称" >
		        </el-table-column>
		        <el-table-column prop="date" label="成交净价(元)" >
		        </el-table-column>
		        <el-table-column prop="address" label="最新收益率(%)">
		        </el-table-column>
		        <el-table-column prop="dz" label="涨跌(BP)">
		        </el-table-column>
		        <el-table-column prop="addressa" label="加权收益率(%)">
		        </el-table-column>
		        <el-table-column prop="jyl" label="交易量(亿)">
		        </el-table-column>
		        加权收益率(%)
		      </el-table>
		    </el-main>
  		</el-container>
  		<div class="charts">
  			<div id="mycharset" :style="{width:'600px',height:'400px'}"></div>
  			<div id="mypie" :style="{width:'600px',height:'400px'}"></div>
  		</div>
	</div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
	export default{
		name:'jlpm',
		data(){
			return{
			tableData: [{
            date: '',
            name: '',
            address: '',
            addressa:'',
            dz:'',
            jyl:''
        	}],
            arrdata:[],
			sj:[],
			txsj:[],
			bzt:[],
			cjjj:[],
			baodei:[],
			jqsyl:[],
			loading:true,
  			}
		},
		methods:{
			shuju(){
				var url="/api/r/cms/www/chinamoney/data/bond/cbt-pri.json"
				axios.get(url,{
					params: {
						_:1512118860284,
						}
					})
					.then(response=>{
         				this.arrdata=response.data;
         				this.initData(this.arrdata.records);
         				var arr=[];
         				for(var i=0;i<this.arrdata.records.length;i++){
         					var obj={};
         					obj.name=this.arrdata.records[i].abdAssetEncdShrtDesc;
         					obj.date=this.arrdata.records[i].dmiLatestRateLabel;
         					
         					obj.address=this.arrdata.records[i].dmiLatestContraRateLabel;
         					obj.addressa=this.arrdata.records[i].dmiWghtdContraRateLabel;
         					if(this.arrdata.records[i].bp<0){
         						obj.dz=('-'+this.arrdata.records[i].bpLabel);
         					}else{
         						obj.dz=(this.arrdata.records[i].bpLabel);
         					}
         					obj.jyl=this.arrdata.records[i].dmiTtlTradedAmntLabel;	
         					arr[i]=obj;
         					// this.txsj.push(this.arrdata.records[i].dmiTtlTradedAmntLabel);
         					// this.sj.push(this.arrdata.records[i].abdAssetEncdShrtDesc);
         					this.bzt.push({'value':this.arrdata.records[i].dmiLatestContraRateLabel,'name':this.arrdata.records[i].abdAssetEncdShrtDesc});
         				}
         				console.log(this.bzt);
         				
         				this.tableData=arr;
         				this.loading=false;
      				})

			},
			initData (obj) {
	        obj = Object.values(obj)
	        obj.forEach((o, i)=>{
	          this.txsj.push(o.dmiTtlTradedAmntLabel);
	          this.sj.push(o.abdAssetEncdShrtDesc);
	          this.cjjj.push(o.dmiLatestRateLabel);
	          this.baodei.push(o.bp);
	          this.jqsyl.push(o.dmiWghtdContraRateLabel);
	        })
	        
	      },
			huatu(){
					let mychart=this.$echarts.init(document.getElementById('mycharset'));
					let options={
		            title: {
		                text: '现券市场成交行情',

		            },
		            tooltip: {},
		            legend: {
		                data:['交易量(亿)','成交净价(元)','涨跌(BP)']
		            },
		           xAxis:{
				       data:this.sj
					},
		            yAxis: {

		            },
		            series: [
		            {
		                name: '交易量(亿)',
		                type: 'line',
		                data:this.txsj
		            },
		            {
		                name: '成交净价(元)',
		                type: 'line',
		                data:this.cjjj
		            },
		            {
		                name: '涨跌(BP)',
		                type: 'line',
		                data:this.baodei
		            },

		            ]
		        };
				mychart.setOption(options);
			},
			huatua(){
				let mychart=this.$echarts.init(document.getElementById('mypie'));
				let options={
					title: {
		                text: '收益率(%)',
		                x:'center',
		            },
		            legend: { 
					        orient: 'horizontal', 
					        left: 'center', 
					        bottom: 0, 
					        data:this.sj
					    }, 
					    series : [
					        {
					            name: '最新收益率',
					            type: 'pie',
					            radius: [0, '30%'],
						            labelLine: { 
						                normal: { 
						                    show: false     //不需要设置引导线 
						                } 
						            }, 
					            data:this.bzt
					        },
					        {
					            name: '加权收益率',
					            type: 'pie',
					            radius: ['40%', '55%'],
					            data:this.jqsyl
					        },

					    ],
					     tooltip : {
					        trigger: 'item',
					        formatter: "{a}<br/>{b}:{c}({d}%)"
    					},
					}
				mychart.setOption(options);
			},
			
		},
		mounted(){
			setTimeout(() => {
			        this.huatu()
			      },1000)
			setTimeout(() => {
			        this.huatua()
			      },2000)
		},
		created(){
			this.shuju();

			
		}


	}
</script>
<style>
	.charts{width: 1200px;margin:0 auto;}
	.charts div{float: left;}
</style>
