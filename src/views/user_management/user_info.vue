<template>
	<section>
		<!--工具条-->
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
			<el-form :inline="true" :model="filters">
				<!-- <el-form-item>
					<el-input v-model="filters.name" placeholder="支付银行"></el-input>
				</el-form-item> -->
				<el-form-item label="用户ID">
				    <el-input v-model="filters.id"></el-input>
				</el-form-item>
				<el-form-item label="用户姓名">
				    <el-input v-model="filters.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号码">
				    <el-input v-model="filters.tell"></el-input>
				</el-form-item>
				<el-form-item label="银行卡信息">
				    <el-input v-model="filters.backinfo"></el-input>
				</el-form-item>
				<el-form-item label="是否是重点关注对象">
					<el-select v-model="filters.type" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item>
				<!-- <el-form-item label="平台名称">
				    <el-select v-model="filters.type" clearable>
				      <el-option v-for="item in options" :label="item.label" :value="item.value">
				      </el-option>
				    </el-select>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" v-on:click="getlist">查询</el-button>
					<!-- <el-button type="primary">导出订单</el-button> -->
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" border style="width: 100%;min-width: 1080px;">
			<el-table-column type="index">
			</el-table-column>
			<el-table-column prop="UserID"  label="用户ID">
			</el-table-column>
			<el-table-column prop="UserName"  label="用户姓名">
			</el-table-column>
			<el-table-column prop="UserAge"  label="年龄">
			</el-table-column>
			<el-table-column prop="Telphone"  label="手机号码">
			</el-table-column>
			<el-table-column prop="Addrs"  label="地址">
			</el-table-column>
			<el-table-column prop="State" :formatter='statefun'  label="是否重点关注对象">
			</el-table-column>
			<el-table-column prop="TrustNm"  label="信用值">
			</el-table-column>
			<el-table-column prop="UserMoney"  label="账号钱数">
			</el-table-column>
			<el-table-column prop="UserEub"  label="账户eub个数">
			</el-table-column>
			<el-table-column prop="BankCard"  label="银行卡信息">
			</el-table-column>
			
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="text" size="small" @click="showh(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span='12' v-show="seeType" style="border:1px solid #ddd;position: absolute;top:20%;left:30%;height: 500px;background:#fff;z-index: 9;border-radius: 10px;    overflow-y: auto;">
			<el-col :span="23" style="margin-left: 20px;margin-top: 20px;">
				<el-col :span="24">用户信息</el-col>
				<el-col :span="24">
					<el-tabs v-model="activeName2">
					    <el-tab-pane label="用户管理" name="first">
							<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff">
								<el-form :inline="true" :model="filters">
									<el-form-item label="用户ID">
									    <el-input v-model="filters.id"></el-input>
									</el-form-item>
									<el-form-item label="用户姓名">
									    <el-input v-model="filters.name"></el-input>
									</el-form-item>
									<el-form-item label="手机号码">
									    <el-input v-model="filters.tell"></el-input>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="24" style="padding-bottom: 0px;background: #fff;margin-bottom: 10px; ">
								机审核内容
							</el-col>
							<el-col :span="24">
								<el-collapse v-model="activeName" accordion>
								  <el-collapse-item title="一致性 Consistency" name="1">
								    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
								    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
								  </el-collapse-item>
								  <el-collapse-item title="反馈 Feedback" name="2">
								    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
								    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
								    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
								    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
								    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
								    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
								    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
								    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
								    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
								    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
								    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
								    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
								  </el-collapse-item>
								  <el-collapse-item title="效率 Efficiency" name="3">
								    <div>简化流程：设计简洁直观的操作流程；</div>
								    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
								    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
								  </el-collapse-item>
								  <el-collapse-item title="可控 Controllability" name="4">
								    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
								    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
								  </el-collapse-item>
								</el-collapse>
							</el-col>
							
					    </el-tab-pane>
					    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
					    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
					    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
				  	</el-tabs>
			  	</el-col>
			  	<el-col :span="24" style="text-align: center;margin-top: 10px;">
					<el-button type="primary" v-on:click="hiidenBtn">关闭</el-button>
				</el-col>
			</el-col>
		</el-col>
		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar" style="background:#fff;">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->
	</section>
</template>

<script>
	import { state } from '../../vuex/state'
	import util from '../../common/js/util'
	import {baseUrl , editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				list:[],
				filters: {
					id: '',
					name:'',
					tell:'',
					backinfo:'',
					type:''
				},
				activeName:'1',
				activeName2:'first',
				seeType:false,
				options: [{
		          value: '0',
		          label: '全部'
		        }, {
		          value: '1',
		          label: '是'
		        }, {
		          value: '2',
		          label: '否'
		        }],
				total: 0,
				page: 1,
				listLoading: false
			}
		},
        computed: {//实时计算使用
        },
		methods: {
			getlist(){
				const _this = this;
				_this.list = []
				$.ajax({
                	async : true,
                    type:'GET',	
                    dataType:'jsonp',
                    url:baseUrl+"type=user",
                    // contentType:'application/json;charset=utf-8',
                    jsonp : 'jsonpCallback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
                	jsonpCallback: 'jsonp', //设置回调函数名
                    success:function(response, status, xhr){
                    	// console.log('状态为：' + status + ',状态是：' + xhr.statusText);
                        console.log(response)
                        _this.list.push(response.data)
                    }
                });
			},
			showh(index,row){
				this.seeType = true
			},
			hiidenBtn(){
				this.seeType = false
			},
			statefun(row, column){
				if(row.State === 0){
					return '否'
				}else if(row.State === 1){
					return '是'
				}
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
			}
		},
		mounted() {
			 this.getlist();
		}
	}
</script>

<style>
	.el-dialog--small {
    	width: 30%;
    	border-radius: 10px
	}
	.el-form-item__label{
		text-align: left;
	}
	.el-dialog__body{
		margin-left: 0 ! important ;
	}
	.img {
		width:100px;
		height:100px;
	}
</style>