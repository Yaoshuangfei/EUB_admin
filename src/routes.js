import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Home/indexMain.vue'
import { state } from './vuex/state'






// 商户管理
import business_info from './views/business_management/business_info.vue'
import business_loan from './views/business_management/business_loan.vue'
import business_feedback from './views/business_management/business_feedback.vue'


// 用户管理
import user_info from './views/user_management/user_info.vue'
import user_loan_list from './views/user_management/user_loan_list.vue'

// 产品列表
import product from './views/product_list/product.vue'


// 借款管理
import borrow from './views/loan_management/borrow.vue'
import loan_order from './views/loan_management/loan_order.vue'

// 贷后管理
import reimbursement from './views/after_loan/reimbursement.vue'
import overdue from './views/after_loan/overdue.vue'
import already_bad_debts from './views/after_loan/already_bad_debts.vue'






















// 店铺信息
import StoreInformation from './views/Home/StoreInformation.vue'

/*系统管理 systemSettings*/  
import Jurisdiction from './views/systemSettings/Jurisdiction.vue'
import SystemPush from './views/systemSettings/SystemPush.vue'
import ChangePasswords from './views/systemSettings/ChangePasswords.vue'
import releaseLook from './views/systemSettings/releaseLook.vue'
import releaseAdd from './views/systemSettings/releaseAdd.vue'
import releaseReg from './views/systemSettings/releaseReg.vue'

/*配置管理 configuration*/
import banner from './views/configuration/banner.vue' 
import system from './views/configuration/system.vue' 
import Authentication from './views/configuration/Authentication.vue'




/*订单管理 order*/
import OrderInformation from './views/order/OrderInformation.vue'
import details from './views/order/details.vue'

// 物流管理 logistics
import DeliverGoods from './views/logistics/DeliverGoods.vue'
import Freight from './views/logistics/Freight.vue'
// import Address from './views/logistics/Address.vue'

/*商品管理 commodity */
import GoodShipped from './views/commodity/GoodShipped.vue'
import OnSale from './views/commodity/OnSale.vue'
import OffTheShelf from './views/commodity/OffTheShelf.vue'
import Illegal from './views/commodity/Illegal.vue'
import ReturnGoods from './views/commodity/ReturnGoods.vue'

// 身份管理 Identity
// import Identity from './views/Identity/Identitys.vue'

/*店铺管理 shop */ // 
import see from './views/shop/see.vue'
import style from './views/shop/style.vue'
import picture from './views/shop/picture.vue'

/*财务管理 Finance*/
import FlowingWater from './views/Finance/FlowingWater.vue'
import txgl from './views/Finance/txgl.vue'

// 补货专区 Replenishment 
import Replenishment from './views/Replenishment/Replenishment.vue'
import add from './views/Replenishment/add.vue'



// 增值管理   Increment
import video from './views/Increment/video.vue'
import PublicWelfare from './views/Increment/PublicWelfare.vue'
import Marketing from './views/Increment/Marketing.vue'
import pjadmin from './views/Increment/pjadmin.vue'






let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
     {
        path: '/mian',
        component: Main,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/StoreInformation', component: StoreInformation, name: '首页' ,  }
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 商户管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component:Main, name: '主页', hidden: true },
            { path: '/business_info', component:business_info, name: '商户信息' },
            { path: '/business_loan', component:business_loan, name: '商户借款记录' },
            { path: '/business_feedback', component:business_feedback, name: '商户反馈列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 用户管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/user_info', component:user_info, name: '用户信息' }
            // { path: '/user_loan_list', component:user_loan_list, name: '用户借款记录' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: ' 产品管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/product', component: product, name: '产品列表' }
            // { path: '/ChangePasswords', component: ChangePasswords, name: '商户反馈列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '借款管理',
        iconCls: 'fa el-icon-picture',
        children: [
            { path: '/borrow', component: borrow, name: '借款订单' },
            { path: '/loan_order', component: loan_order, name: '放款订单' }
            
        ]
    },
    {
        path: '/',
        component: Home,
        name: '贷后管理',
        iconCls: 'fa el-icon-picture',
        children: [
            { path: '/reimbursement', component: reimbursement, name: '已还款订单' },
            { path: '/overdue', component: overdue, name: '已逾期订单' },
            { path: '/already_bad_debts', component: already_bad_debts, name: '已坏账订单' },
             { path: '/details/:id', component: details, name: '订单详情' ,hidden: true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '风控管理',
        iconCls: 'fa el-icon-picture',
        children: [
            { path: '/banner', component: banner, name: '风控黑名单管理' },
            { path: '/system', component: system, name: '开户机审通过订单' },
            { path: '/Authentication', component: Authentication, name: '开户机审拒绝订单' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '运营管理',
        iconCls: 'fa el-icon-picture',
        children: [
            { path: '/DeliverGoods', component: DeliverGoods, name: '发货' },
            { path: '/Freight', component: Freight, name: '运费模板' }
            // { path: '/Address', component: Address, name: '地址管理' }
        ]
    },
     {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/GoodShipped', component: GoodShipped, name: '发布商品' },
            { path: '/OnSale', component: OnSale, name: '出售中的商品' },
            { path: '/OffTheShelf', component: OffTheShelf, name: '下架商品' },
            { path: '/Illegal', component: Illegal, name: '违规商品' },
            { path: '/ReturnGoods', component: ReturnGoods, name: '退货的商品' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '店铺管理',
    //     iconCls: 'fa el-icon-menu',
    //     children: [
    //         { path: '/see', component: see, name: '查看店铺' },
    //         { path: '/style', component: style, name: '店铺样式管理' },
    //         { path: '/picture', component: picture, name: '图片存储' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '财务管理',
    //     iconCls: 'fa el-icon-date',
    //     children: [
    //         { path: '/FlowingWater', component: FlowingWater, name: '流水记录' },
    //         { path: '/txgl', component: txgl, name: '提现管理' }
    //     ]
    // },
   // {
   //      path: '/',
   //      component: Home,
   //      name: '',
   //      iconCls: 'fa fa-address-card',
   //      leaf: true,//只有一个节点
   //      children: [
   //          // { path: '/Replenishment', component: Replenishment, name: '补货专区' ,hidden: true},
   //          { path: '/add', component:add, name: '补货专区' ,  }
   //      ]
   //  },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',
        hidden: true,
        children: [
            // { path: '/examine', component: examine},
            // { path: '/see', component: see},
            // { path: '/addPlan/:id/:index', name:'计划发布', component: addPlan}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;