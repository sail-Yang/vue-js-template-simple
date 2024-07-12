import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/user'
import { setToken, getToken, removeToken, getUsername, setUsername, removeUsername, getRole, setRole, removeRole } from '@/utils/auth'
import router from '@/router'
import { ref } from 'vue'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken() || null,
    username: getUsername() || '',
    role: getRole() || 'admin'
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setUsername(username) {
      this.username = username
    },
    setRole(role) {
      this.role = role
    },
    logOut() {
      this.token = ''
      this.username = ''
      this.role = ''
      removeToken()
      removeUsername()
      removeRole()
      router.push('/login')
    },
    loginHandle(user) {
      return new Promise((resolve, reject) => {
        login(user)
          .then((res) => {
            if(res.code === '200'){
              this.setToken(res.data.token)
              this.setUsername(res.data.username)
              this.setRole(res.data.role)
              setToken(res.data.token)
              setUsername(res.data.username)
              setRole(res.data.role)
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
})