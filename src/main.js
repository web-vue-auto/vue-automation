import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import markdown from 'markdown'
import store from './store'
import wangeditor from 'wangeditor'
import VueQuillEditor from 'vue-quill-editor'
import axios from 'axios'
import 'element-ui/lib/theme-default/index.css'
import helper from './utils/helper'
import va from './utils/va'
import echarts from 'echarts'
import VueCodeMirror from 'vue-codemirror'
import combtn from './components/components/contents/combtn'

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(VueQuillEditor)

Vue.use(ElementUI)

Vue.use(va)

Vue.use(iView);

Vue.use(echarts);

Vue.use(VueCodeMirror);

// 全局引用markdown
window.markdown = markdown;
window.echarts = echarts;
window.wangeditor = wangeditor;


// 设置build默认post请求头dev时请注释掉
// axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';


// 路由拦截器
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("token");//获取token
    if (token) {
        next();
    }else{
        switch(to.name)
        {
        case "index":
          next();
          break;
        case "joinus":
          next();
          break;
        case "form":
          next();
          break;
        default:
            next({
                path:"/joinus"
            })
        }
    }
})

// http请求拦截
import { MessageBox } from 'element-ui';

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status == "504") {
          return MessageBox({title:'提示',message:'服务端错误'})
        }
    });

// 时间格式化方法
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 注册全局组件
Vue.component('combtn',combtn)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h=> h(App)
})
window.HELPER = helper;
