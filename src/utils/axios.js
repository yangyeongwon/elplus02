import axios from 'axios'
import router from '../router/index'
import {ElMessage} from 'element-plus'

axios.defaults.baseURL = 'http://localhost:14001'
// axios.defaults.withCredentials = true
// axios.defaults.headers['token'] = localGet('token') || ''      //kkkkk localGet 구현
/**
 * kkkkkkkkkkkkkkkkkkkkkk
 * 변수로 받아서 처리
 *  default application/x-www-form-urlencoded
 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'//'application/json'

// axios.interceptors.request.use(req => {
// })

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    ElMessage.error('에러가 발생 했습니다.')
    return Promise.reject(res)
  }
  
  if (res.status != 200) {
    if (res.data.message) ElMessage.error(res.data.message)

    if (res.data.resultCode == -9) {
      router.push({ path: '/login' })
    }

    return Promise.reject(res.data)
  }
  
  return res.data
})

export default axios

/*
//원소스
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { localGet } from './index'
import config from '~/config'


// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localGet('token') || ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    ElMessage.error('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) ElMessage.error(res.data.message)
    if (res.data.resultCode == 419) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }

  return res.data.data
})

export default axios
*/