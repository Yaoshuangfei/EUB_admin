<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;background: #fff;text-align: right;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="primary" v-on:click="AddUsers">添加</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="orderInformation" highlight-current-row v-loading="listLoading" style="width: 100%;min-width: 1080px;">
			<el-table-column prop="orderNumber" label="序号">
			</el-table-column>
			<el-table-column prop="userName" label="用户名">
			</el-table-column>
			<el-table-column prop="amountPaid" label="描述">
			</el-table-column>
			<el-table-column prop="creationTime" label="创建时间">
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<!-- <el-button v-if='scope.row.index === 1' type='text' size="small" @click="handleEdit(scope.$index, scope.row)">暂停</el-button> -->
					<!-- <el-button v-else-if='scope.row.index === 0' :disabled="true" type='text' size="small" @click="handleEdit(scope.$index, scope.row)">已处理</el-button> -->
					<el-button type="text" size="small" @click="seeBtn(scope.$index, scope.row)">编辑</el-button>
					<el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<!--<el-col :span="24" class="toolbar" style="background:#fff;">-->
			<!--&lt;!&ndash; <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> &ndash;&gt;-->
			<!--<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">-->
			<!--</el-pagination>-->
		<!--</el-col>-->

		<!--添加用户-->
		<el-dialog title="添加用户" v-model="adduserVisible" :close-on-click-modal="false" >
			<el-form :model="orderDetails" label-width="70px" :rules="editFormRules" ref="editForm">
				<el-form-item label="用户名">
					<el-input v-model="input" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="input" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="确认密码">
					<el-input v-model="input" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input
							type="textarea"
							:rows="2"
							placeholder="请输入内容"
							v-model="textarea">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
				<!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button> -->
				<el-button type="primary" @click.native="adduserVisible = false">下一步</el-button>
			</div>
		</el-dialog>
		<!--编辑界面-->
		<el-dialog title="修改后台登录密码" v-model="editFormVisible" :close-on-click-modal="false" >
			<el-form :model="orderDetails" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="管理员账户">
					<el-input v-model="input" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="旧密码">
					<el-input v-model="input" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="新密码">
					<el-input v-model="input" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码">
					<el-input v-model="input" placeholder="请输入内容"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
				 <el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
				<el-button type="primary" @click.native="editFormVisible = false">关闭</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
    import { state } from '../../vuex/state'
    import util from '../../common/js/util'
    import {baseUrl , editUser, addUser } from '../../api/api';

    export default {
        data() {
            return {
                radio: '0',
                checked: true,
                value:'',
                value1:'',
                value2:'',
				input:'',
				textarea:'',
                adduserVisible:false,
                selectSubjectStatus: [
                    {
                        value:'0',
                        label:'全部'
                    },{
                        value:'1',
                        label:'待付款'
                    },{
                        value:'2',
                        label:'待发货'
                    },{
                        value:'3',
                        label:'已发货'
                    },{
                        value:'4',
                        label:'待评价'
                    },{
                        value:'5',
                        label:'退货'
                    }],
                options: [{
                    value: '0',
                    label: '全部'
                }, {
                    value: '1',
                    label: '订单编号'
                }, {
                    value: '2',
                    label: '快递单号'
                }, {
                    value: '3',
                    label: '用户名'
                }],
                filters: {
                    name: '',
                    status:'',
                    type:''
                },
                users: [],
                total: 100,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    username: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                //新增界面数据
                orderDetails: {
                },
                orderInformation:[{
                    orderNumber :'145877458784524c',
                    courierNumber :'145877458784524c',
                    userName:'吸引力量',
                    amountPaid :'300',
                    orderTotal :'900',
                    orderStatus :'待付款',
                    paymentMethod :'微信支付',
                    creationTime:'2017-09-08 17:09',
                    deliveryTime:'2017-09-08 17:09',
                    commodityName:'雨花说'
                }]
            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            getlist(){
                const _this = this
                _this.table = []
                const params = {
                    accountId:'1',
                    accessToken:'',
                    resourceType:'',
                    page:{
                        pageNum:_this.page,
                        pageSize:'10'
                    }
                }
                console.log(params)
                $.post(baseUrl+"/admin/banner/getBannerByPage",
                    { param: JSON.stringify(params) },
                    function(data){
                        const info = eval('(' + data + ')');
                        const response = JSON.parse(info);
                        const list = response.obj.results
                        console.log(response)
                        // _this.page = response.obj.total
                        _this.total = response.obj.totalRecord
                        for(var i = 0;i<list.length;i++){
                            _this.table.push(list[i])
                        }
                    }
                )
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            seeBtn: function (index, row) {
                this.editFormVisible = true;
                this.orderDetails = Object.assign({}, row);
            },
            //显示新增界面
            AddUsers: function () {
                this.adduserVisible = true;
            },
            //编辑
//            editSubmit: function () {
//                this.$refs.editForm.validate((valid) => {
//                    if (valid) {
//                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
//                            this.editLoading = true;
//                            //NProgress.start();
//                            let para = Object.assign({}, this.editForm);
//                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
//                            editUser(para).then((res) => {
//                                this.editLoading = false;
//                                //NProgress.done();
//                                this.$message({
//                                    message: '提交成功',
//                                    type: 'success'
//                                });
//                                this.$refs['editForm'].resetFields();
//                                this.editFormVisible = false;
//                                this.getUsers();
//                            });
//                        });
//                    }
//                });
//            },
            //新增
//            addSubmit: function () {
//                this.$refs.addForm.validate((valid) => {
//                    if (valid) {
//                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
//                            this.addLoading = true;
//                            //NProgress.start();
//                            let para = Object.assign({}, this.addForm);
//                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
//                            addUser(para).then((res) => {
//                                this.addLoading = false;
//                                //NProgress.done();
//                                this.$message({
//                                    message: '提交成功',
//                                    type: 'success'
//                                });
//                                this.$refs['addForm'].resetFields();
//                                this.adduserVisible = false;
//                                this.getUsers();
//                            });
//                        });
//                    }
//                });
//            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { ids: ids };
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            // this.getlist();
        }
    }

</script>

<style>

</style>