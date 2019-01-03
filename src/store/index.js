import Vue from 'vue'
import Vuex from 'vuex'
// import User from './user'

Vue.use(Vuex)

import API from '@/server/API'

const store = new Vuex.Store({
  state: {
    showBottomNav: true,
    title: '勹卜传媒',
    hasLogin: false,
    role: null || 'guest',
    currentUserId: null,
    currentClassId: null,
    currentStudentId: null,
    currentStudent: {},
    isLoading: false,
    currentClassInfo: {},
    hasStudent: false,
    currentUser: null,
    hasNoStudent: false,
    hasNewPost: false,
    UnReadMsgCount: '0',
    user: {},
    currentVideoInfo: {},

    ApiUrl: '',
    nationList: ["汉族", "回族", "藏族", "维吾尔族", "其他"],
    // politicalList:['普通居民','无党派人士','中共党员','中共预备党员','共青团员','民革党员','民盟盟员','民建会员','民进会员','农工党党员','致公党党员','九三学社社员','台盟盟员'],
    politicalList: ['团员', '党员', '其他', '无'],
    colors: {
      '语文': '#fe6867',
      '数学': '#30b0ff',
      '英语': '#8b8efb',
      '物理': '#ff80c0',
      '化学': '#50c7ee',
      '生物': '#5cb85c',
      '历史': '#ff9f22',
      '政治': '#01c19e',
      '地理': '#5ad8eb',
      '音乐': '#ff8e03',
      '美术': '#67c23a',
      '体育': '#d860f8',
      '计算机': '#ffc100'
    },
    commentsList: []
  },
  getters: {
    isWeixin: function () {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    showTopNav: () => {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return false;
      } else {
        return true;
      }
    },
    token: state => {
      if (state.currentUser) {
        return state.currentUser.Token
      }
    },
    role: state => {
      if (state.currentUser) {
        return state.currentUser.Role
      }
      return '未知'
    },
    isStudent: state => {
      if (!state.currentUser)
        return false
      let role = state.currentUser.Role
      return role == '学生'
    },
    isParent: state => {
      if (!state.currentUser)
        return false
      let role = state.currentUser.Role
      return role == '家长'
    },
    isTeacher: state => {
      if (!state.currentUser)
        return false
      let role = state.currentUser.Role
      return role == '教师' || role == '任课教师' || role == '班主任'
    },
    isAdviserTeacher: state => {
      if (!state.currentUser)
        return false
      let role = state.currentUser.Role
      return role == '班主任'
    },
    currentUserId: state => {
      if (state.currentUser) {
        return state.currentUser.Meid
      }
    },
    hasNoSchoolCard: (state, getters) => {
      if (state.currentUser && !getters.isParent) {
        if (!state.currentUser.ExtendInfo.CampusCard) {
          return true
        } else {
          return false
        }
      }
      if (state.currentUser && getters.isParent) {
        let a = state.currentUser.ExtendInfo.Students.find(o => {
          return o.Meid == state.currentStudentId
        })
        if (!a.CampusCard) {
          return true
        } else {
          return false
        }
      }
    },
    hasFullInfo: (state, getters) => {
      if (getters.isTeacher && state.currentUser.ExtendInfo.Status == 0) {
        return 'teacher'
      } else if (getters.isParent && state.currentUser.ExtendInfo.Students.length !== 0 && state.currentUser.ExtendInfo.Students[0].Status == 0) {
        return 'parent'
      } else {
        return 'ok'
      }
    },

  },
  mutations: {
    setUser(state, val) {
      state.user = new User(val)
    },
    login(state, val) {

      state.hasLogin = true
      state.currentUser = val
      state.currentUserId = val.Meid
      state.role = val.Role
      state.UnReadMsgCount = val.UnReadMsgCount
      if (this.getters.isParent) {
        if (val.ExtendInfo.Students.length != 0) {
          state.hasNoStudent = false
          state.currentClassId = val.ExtendInfo.Students[0].ClassID
          state.currentStudentId = val.ExtendInfo.Students[0].Meid
        } else {
          state.hasNoStudent = true
        }
      }

      if (this.getters.isStudent) {
        state.currentClassId = val.ExtendInfo.ClassID
        state.currentStudentId = val.Meid
      }

      if (this.getters.isTeacher) {
        if (val.ExtendInfo) {
          if (val.ExtendInfo.Classes.length != 0) {
            state.currentClassId = val.ExtendInfo.Classes[0].ClassID
          }
        }
      }

      if (val.HasNewUnReadDynamic == 1) {
        state.hasNewPost = true
      }

      localStorage.setItem('user', JSON.stringify(val))
      localStorage.setItem('token', val.Token)
      localStorage.setItem('hasLogin', true)
      localStorage.setItem('id', val.Meid)
      localStorage.setItem('role', val.Role)
      localStorage.setItem('currentClassId', state.currentClassId)
    },
    logout(state) {
      state.hasLogin = false
      state.currentUserId = null
      state.role = 'guest'
      state.hasNoStudent = false
      state.hasNewPost = false

      state.currentClassInfo = {}

      localStorage.clear()
      sessionStorage.clear()
      document.cookie = "meid=aa;path=/;domain=" + document.domain.match(/[^\.]+\.[^\.]+$/)[0] + ";expires=" + new Date(2011, 1, 1).toGMTString()
      document.cookie = "meid=aa;path=/;domain=" + document.domain + ";expires=" + new Date(2011, 1, 1).toGMTString()
    },
    changeRole(state, val) {
      state.role = val.toString()
    },
    getClassInfo(state, val) {
      state.classInfo = val
    },
    changeTitle(state, val) {
      state.title = val.toString()
    },
    changeCurrentStudent(state, val) {
      state.currentStudent = val
    },
    changeCurrentStudentId(state, val) {
      state.currentStudentId = val
    },
    changeCurrentClass(state, val) {
      state.currentClassId = val.ClassID
    },
    setCurrentClassInfo(state, val) {
      state.currentClassInfo = val
    },
    setToken(state, val) {
      state.token = val
      if (!localStorage.token) {
        localStorage.token = val
      }
    },
    setApiUrl(state, val) {
      state.ApiUrl = val
    },
    unbind(state) {
      state.hasNoStudent = true
    },
    setCurrentVideoInfo(state, val) {
      state.currentVideoInfo = val
    },
    setCommentsList(state, val) {
      state.commentsList = val
    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    }
  },
  actions: {
    setApiUrl({
      commit,
      state
    }, payload) {
      if (sessionStorage.ApiUrl) {
        commit('setApiUrl', sessionStorage.ApiUrl)
      } else {
        API.getApiUrl(payload).then(res => {
          sessionStorage.ApiUrl = res
          commit('setApiUrl', sessionStorage.ApiUrl)
        })
      }
    },
    login({
      getters,
      commit,
      state
    }, payload) {
      return new Promise((resolve, reject) => {
        API.login(payload).then(res => {
          commit('setToken', res.Token)
          commit('login', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout({
      getters,
      commit,
      state
    }, payload) {
      return new Promise((resolve, reject) => {
        API.logout().then(() => {
          commit('setToken', null)
          commit('logout')
        })
      })
    },
    getCurrentUser({
      getters,
      commit,
      state
    }, payload) {
      return new Promise((resolve, reject) => {
        API.getCurrentUser().then(res => {
          if (localStorage.token) {
            commit('setToken', localStorage.token)
          }
          commit('login', res)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getCurrentClassInfo({
      getters,
      commit,
      state
    }, payload) {
      API.getClassInfo(state.currentClassId).then(res => {
        commit('setCurrentClassInfo', res)
      })
    },
  },
  getCommentsList({
    getters,
    commit,
    state
  }, payload) {
    ApI.getCommentsList().then(res => {
      commit('setComnentList', res)
    })
  }
})

export default store
