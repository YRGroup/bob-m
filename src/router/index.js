import Vue from 'vue'
import Router from 'vue-router'

// 主页
import home from '@/view/main'
import main from '@/view/main/main'
import news from '@/view/main/news'
import doc from '@/view/main/doc'

// 功能模块
import schoolcard from '@/view/addon/schoolcard'


// 班级
import classmain from '@/view/class/main'
import classMainPage from '@/view/class/all'
import post from '@/view/class/post'
import notice from '@/view/class/notice'
import homework from '@/view/class/homework'
import homeworkList from '@/view/class/homeworkList'
import newHomework from '@/view/class/newhomework'
import kcb from '@/view/class/kcb'
import newClassPost from '@/view/class/newpost'
import manage from '@/view/class/manage'
import exam from '@/view/class/exam'

// 教师
import teacher from '@/view/teacher/main'
import teacherprofile from '@/view/teacher/profile'
import teacherfeed from '@/view/teacher/feed'
import teacherwork from '@/view/teacher/work'
import information from '@/view/teacher/information'

// 学生
import student from '@/view/student/main'
import studentMainPage from '@/view/student/all'
import score from '@/view/student/score'
import studentfeed from '@/view/student/feed'
import timeline from '@/view/student/timeline'
import studentedit from '@/view/student/edit'
import studentprofile from '@/view/student/profile'
import studentparent from '@/view/student/parent'

import reg from '@/view/login/reg'
import login from '@/view/login/login'

// 通讯录
import contact from '@/view/contact/main'
import msg from '@/view/contact/allmsg'

// 用户
import user from '@/view/user/main'
import edit from '@/view/user/edit'
import parentcenter from '@/view/user/parent'
import studentcenter from '@/view/user/student'
import teachercenter from '@/view/user/teacher'
import editcode from '@/view/user/editcode'
import mypost from '@/view/student/mypost'
import linkchild from '@/view/user/linkchild'
import systemNotice from '@/view/user/notice'
import systemNoticeInfo from '@/view/user/noticeInfo'

import videoList from '@/view/video/list'
import player from '@/view/video/player'


import errorPage from '@/view/sys/404'
//微信授权页面
import wxauth from '@/view/wxauth/wxauth'
// 视频直播 抽奖
import live from '@/view/live/player'
import liveusersign from '@/view/live/usersignin'

import signList from '@/view/live/signList'
import lottery from '@/view/live/lottery'
import voteStory from '@/view/xsdlive/voteStory'
Vue.use(Router)

export default new Router({
  // 历史记录模式，需要服务器配置支持
  // mode: 'history',
  routes: [

    {
      path: '/',
      component: home,

      children: [{
          path: '',
          name: 'main',
          component: main,
          meta: {
            anonymous: true
          }
        },
        {
          path: '/news',
          name: 'news',
          component: news,
          meta: {
            anonymous: true
          }
        },
        {
          path: '/doc',
          name: 'doc',
          component: doc
        },
        {
          path: '/schoolcard',
          name: 'schoolcard',
          component: schoolcard
        },
        { //班级
          path: '/class',
          component: classmain,
          children: [{
              path: '',
              component: classMainPage
            },
            {
              path: 'work',
              component: homeworkList
            },
            // {
            //   path: 'homework/:homeworkId',
            //   name: 'homework',
            //   component: homework
            // },
            // {
            //   path: '/hw/:homeworkId',
            //   name: 'anonymousPost',
            //   component: homework,
            //   meta: {
            //     anonymous: true
            //   }
            // },
            {
              path: 'kcb',
              component: kcb
            },
            {
              path: 'newhomework',
              component: newHomework
            },
            {
              path: 'notice',
              component: notice
            },
            {
              path: 'manage',
              component: manage
            },
            {
              path: 'exam',
              component: exam
            },
            {
              path: '/contact',
              name: 'contact',
              component: contact
            },
          ]
        },
        // 发动态
        {
          path: 'new',
          component: newClassPost
        },
        {
          path: 'homework/:homeworkId',
          name: 'homework',
          component: homework
        },
        // 班级作业
        {
          path: '/hw/:homeworkId',
          name: 'anonymousHomework',
          component: homework,
          meta: {
            anonymous: true
          }
        },
        { //班级动态详情
          path: '/post/:postId',
          name: 'post',
          component: post,
        },
        {
          path: '/p/:postId',
          name: 'anonymousPost',
          component: post,
          meta: {
            anonymous: true
          }
        },
        { //教师个人主页
          path: '/teacher/:teacherId',
          component: teacher,
          children: [{
              path: '',
              name: 'teacher',
              component: teacherfeed
            },
            {
              path: 'profile',
              component: teacherprofile
            },
            {
              path: 'feed',
              component: teacherfeed
            },
            {
              path: 'work',
              component: teacherwork
            },

          ]
        },
        { // 教师资料
          path: '/teacher/:teacherId/information',
          name: 'information',
          component: information
        },
        { //学生个人主页
          path: '/student/:studentId',
          component: student,
          children: [{
              path: '',
              component: studentMainPage
            },
            {
              path: 'feed',
              component: studentfeed
            },

            {
              path: 'timeline',
              component: timeline
            },
            {
              path: 'edit',
              component: studentedit
            },
            {
              path: 'parent',
              component: studentparent
            },
            {
              path: 'mypost',
              component: mypost
            }
          ]
        },
        { // 学生成绩
          path: '/student/:studentId/profile',
          name: 'studentprofile',
          component: studentprofile
        },
        { // 学生成绩报告
          path: '/student/:studentId/score/:examId',
          name: 'score',
          component: score
        },
        { // 学生编辑信息
          path: '/student/:studentId/edit',
          name: 'studentedit',
          component: studentedit
        },
        // 通讯录

        {
          path: '/msg/:userId',
          name: 'msg',
          component: msg
        },
        // 用户
        {
          path: '/user',
          name: 'user',
          component: user
        },
        {
          path: '/edit',
          name: 'edit',
          component: edit
        },
        {
          path: '/parentcenter',
          name: 'parentcenter',
          component: parentcenter
        },
        {
          path: '/studentcenter',
          name: 'studentcenter',
          component: studentcenter
        },
        {
          path: '/teachercenter',
          name: 'teachercenter',
          component: teachercenter
        },
        {
          path: '/user/editcode',
          name: 'editcode',
          component: editcode
        },
        {
          path: '/user/mypost',
          name: 'mypost',
          component: mypost
        },
        {
          path: '/user/linkchild',
          name: 'linkchild',
          component: linkchild
        },
        {
          path: '/user/notice',
          name: 'systemNotice',
          component: systemNotice
        },
        {
          path: '/user/noticeInfo',
          name: 'systemNoticeInfo',
          component: systemNoticeInfo
        },
        {
          path: '/video',
          component: videoList
        },
        {
          path: '/player',
          component: player
        },
      ]
    },

    // 注册 登陆
    {
      path: '/reg',
      name: 'reg',
      component: reg,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        anonymous: true
      }
    },
    {
      path: '/404',
      name: 'errorPage',
      component: errorPage,
    },
    {
      path: '*',
      redirect: {
        path: '/404'
      }
    },
    // 直播
    {
      path: '/live/:liveId',
      name: 'live',
      component: live,
      meta: {
        anonymous: true,
        wx_auth: true
      }
    },
    //抽奖
    {
      path: '/lottery/:liveId',
      name: 'lottery',
      component: lottery,
      meta: {
        anonymous: true
      }
    },
    // wx授权页
    {
      path: '/wxauth',
      name: 'wxauth',
      component: wxauth,
      meta: {
        anonymous: true
      }
    },
    // 抽奖入场
    {
      path: '/signin/:id',
      name: 'signin',
      component: liveusersign,
      meta: {
        anonymous: true,
        wx_auth: true
      }
    },
    // 入场列表
    {
      path: '/signList/:id',
      name: 'signList',
      component: signList,
      meta: {
        anonymous: true
      }
    },
    {
      path: '/vote/:id',
      name: 'vote',
      component: voteStory,
      meta: {
        anonymous: true
      }
    }
    // {
    //   path: '/xsdSign',
    //   name: 'xsdSign',
    //   component: xsdSign,
    //   meta: {
    //     anonymous: true
    //   }
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
