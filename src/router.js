import VueRouter from 'vue-router'

// import home from './components/home.vue'
// import myinfo from './components/myinfo.vue'
// import exps from './components/exps.vue'
// import teacher from './pages/index.vue'
// import old_teacher from "./components/old_teacher.vue";

var router = new VueRouter({
    // mode: 'history',  //要使用hash模式还是 history模式 我们一般情况下还是用 hash模式 history在后台支持的情况下可以开启
    routes: [
        // {path: '/2', component: exps},
        // {path: '/3', component: myinfo},
        // {path: '/4', component: teacher},
        // {path: '/5', component: old_teacher},
        {
            path: '/1',
            name:'home',
            meta: {
                title: '首页',
            },
            component: (resolve) => require(['./components/home.vue'], resolve)
        },
        {
            path: '/2',
            name:'exps',
            meta: {
                title: '实验',
            },
            component: (resolve) => require(['./components/exps.vue'], resolve)
        },
        {
            path: '/3',
            name:'myinfo',
            meta: {
                title: '学生中心',
            },
            component: (resolve) => require(['./components/myinfo.vue'], resolve)
        },
        {
            path: '/4',
            meta: {
                title: '老师中心',
            },
            component: (resolve) => require(['./pages/teacher/index.vue'], resolve),
            children: [
                // 当 /user/:id 匹配成功，
                // UserHome 会被渲染在 User 的 <router-view> 中
                {
                    path: 'class',
                    name: 'class',
                    component: (resolve) => require(['./pages/teacher/class.vue'], resolve),
                },

                // ...其他子路由
            ]
        },
        {
            path: '/5',
            name:'oldteacher',
            meta: {
                title: '旧的老师中心',
            },
            component: (resolve) => require(["./components/old_teacher.vue"], resolve)
        },
        {
            path: '/expDetail',
            name:'expDetail',
            meta: {
                title: '实验的详细信息',
            },
            component: (resolve) => require(["./pages/teacher/expDetail.vue"], resolve)
        },
        {
            path: '*',
            redirect: '/3'
        }
    ]
});

export default router