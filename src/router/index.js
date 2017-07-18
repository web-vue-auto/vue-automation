import Vue from 'vue'
import Router from 'vue-router'
// 首页
import partone from '../components/index/partone'
import parttwo from '../components/index/parttwo'
import partfour from '../components/index/partfour'
import welcome from '../components/index/welcome'
//vue
import list from '../components/vue/list'
import create from '../components/vue/create'
// management
import mone from '../components/management/index'
import createmsg from '../components/management/common/createmsg'
import messagetable from '../components/management/common/messageTable'
// user
import user from '../components/user/user'
import userperson from '../components/user/userperson'
import advice from '../components/user/advice'
import mytask from '../components/user/mytask'
//cdn
import cdn from '../components/cdn/cdnlist'
//task
import task from '../components/task/taskList'
import taskwelcome from '../components/task/taskwelcome'
import taskdetails from '../components/task/taskdetails'
import taskSend from '../components/task/taskSend'
import taskannouncement from '../components/task/taskannouncement'
//components
import components from '../components/components/comList'
import vuecli from '../components/components/vuecli'
import vuemodel from '../components/components/vuemodel'
import template from '../components/components/contents/template'
//import step1 from '../components/components/componentsStep1'
import components_index from '../components/components/index'
import comnav from '../components/components/comNav'
//resouse
import resouse from '../components/resouse/resouse'
import resouce_list from '../components/resouse/resouceList/resouce_list'
import resoucemsg from '../components/resouse/resouceList/resoucemsg'
//node
import noderesouce from '../components/node/node-resouce'
//bbs
import bbs from '../components/bbs/bbs'
import bbswork from '../components/bbs/bbs_work'
import bbsworkdetails from '../components/bbs/bbs_work_details'
import bbslife from '../components/bbs/bbs_life'
import bbslifedetails from '../components/bbs/bbs_life_details'
//review
import review from '../components/review/review.vue'

//module
import module from '../components/module/module'
//permission
import permission from '../components/management/common/permission'
//404
import errorpage from '../components/management/common/errorpage'

//rules
import rules from '../components/rules/rules'
import uipage from '../components/rules/content/uipage'
import operatingGuide from '../components/rules/content/operatingGuide'
import codepage from '../components/rules/content/codepage'

//footstep
import footstep from '../components/footstep/footstep'

//knowledge
import knowledge from '../components/knowledge/knowledge'
import createknowledgepage from '../components/knowledge/createknowledgepage'

Vue.use(Router)


export default new Router({
    mode: 'history',
    hashbang: false,
    history: true,
    routes: [{
            path: '/',
            redirect: '/index'
        }, {
            path: '/index',
            name: 'index',
            component: partone
        }, {
            path: '/userperson',
            name: 'userperson',
            component: userperson
        }, {
            path: '/noderesouce',
            name: 'noderesouce',
            component: noderesouce
        }, {
            path: '/advice',
            name: 'advice',
            component: advice
        }, {
            path: '/mytask',
            name: 'mytask',
            component: mytask
        }, {
            path: '/joinus',
            name: 'joinus',
            component: partfour
        }, {
            path: '/form',
            name: 'form',
            component: parttwo
        }, {
            path: '/list',
            name: 'list',
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
            component: list
        }, {
            path: '/comnav',
            name: 'comnav',
            component: comnav,
            children: [{
                path: '/components_index',
                name: 'components_index',
                component: components_index
            }, {
                path: '/template',
                name: 'template',
                component: template
            }]
        }, {
            path: '/create',
            name: 'create',
            component: create
        }, {
            path: '/cdn',
            name: 'cdn',
            component: cdn
        }, {
            path: '/mone',
            name: 'mone',
            component: mone,
            children: [{
                path: '/user',
                component: user
            }, {
                path: '/welcome',
                name: 'welcome',
                component: welcome
            }, {
                path: '/resouce_list',
                component: resouce_list
            }, {
                path: '/messagetable',
                component: messagetable,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: '/task',
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
                component: task
            }, {
                path: '/taskSend',
                name: 'taskSend',
                component: taskSend
            }, {
                path: '/taskannouncement',
                name: 'taskannouncement',
                component: taskannouncement
            }, {
                path: '/components',
                component: components
            }]
        }, {
            path: '/taskdetails',
            name: 'taskdetails',
            component: taskdetails
        }, {
            path: '/taskwelcome',
            name: 'taskwelcome',
            component: taskwelcome
        }, {
            path: '/createmsg',
            name: 'createmsg',
            component: createmsg
        }, {
            path: '/module',
            name: 'module',
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
            component: module
        }, {
            path: '/resouse',
            name: 'resouse',
            component: resouse
        }, {
            path: '/resoucemsg',
            name: 'resoucemsg',
            component: resoucemsg
        }, {
            path: '/permission',
            name: 'permission',
            component: permission
        }, {
            path: '/errorpage',
            name: 'errorpage',
            component: errorpage
        }, {
            path: '/bbs',
            name: 'bbs',
            component: bbs
        }, {
            path: '/bbswork',
            name: 'bbswork',
            component: bbswork
        }, {
            path: '/bbslife',
            name: 'bbslife',
            component: bbslife
        }, {
            path: '/bbsworkdetails',
            name: 'bbsworkdetails',
            component: bbsworkdetails
        }, {
            path: '/bbslifedetails',
            name: 'bbslifedetails',
            component: bbslifedetails
        }, {
            path: '/vuecli',
            name: 'vuecli',
            component: vuecli
        }, {
            path: '/vuemodel',
            name: 'vuemodel',
            component: vuemodel
        }, {
            path: '/review',
            name: 'review',
            component: review
        }, {
            path: '/rules',
            name: 'rules',
            component: rules
        }, {
            path: '/codepage',
            name: 'codepage',
            component: codepage
        }, {
            path: '/operatingGuide',
            name: 'operatingGuide',
            component: operatingGuide
        }, {
            path: '/footstep',
            name: 'footstep',
            component: footstep
        }, {
            path: '/uipage',
            name: 'uipage',
            component: uipage
        }, {
            path: '/knowledge',
            name: 'knowledge',
            component: knowledge
        }, {
            path: '/createknowledgepage',
            name: 'createknowledgepage',
            component: createknowledgepage
        },
        // {
        //   path: '/step1',
        //   name: 'step1',
        //   component: step1
        // }

    ]
})
