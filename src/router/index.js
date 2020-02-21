import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '学生管理',
    component: Index,
    show:true,
    redirect: "/student",
    children:[
      {
        path: '/student',
        name: '查询学生信息',
        show:true,
        component: () => import('../views/student/Student.vue')
      },
      {
        path: '/studentSave',
        name: '添加学生信息',
        show:true,
        component: () => import('../views/student/StudentSave.vue')
      },
      {
        path: '/studentUpdate',
        name: '更新学生信息',
        show:false,
        component: () => import('../views/student/StudentUpdate.vue')
      }
    ]
  },
  {
    path: '/three',
    name: 'Three',
    show:true,
    component: Index,
    children:[      
      {
        path: '/three1',
        name: 'Three1',
        show:true,
        component: () => import('../views/Three1.vue')
      },
      {
        path: '/three2',
        name: 'Three2',
        show:true,
        component: () => import('../views/Three2.vue')
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
