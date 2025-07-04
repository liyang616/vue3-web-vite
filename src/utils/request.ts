import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

class HttpRequest {
  private readonly baseUrl: string
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl, // 所有的请求地址前缀部分(没有后端请求不用写)
      timeout: 80000 // 请求超时时间(毫秒)
      // withCredentials: true,// 跨域请求时发送cookies
      // headers: {
      // 设置后端需要的传参类型
      // 'Content-Type': 'application/json',
      // 'token': x-auth-token',//一开始就要token
      // 'X-Requested-With': 'XMLHttpRequest',
      // },
    }
    return config
  }

  // 请求拦截
  interceptors(instance: AxiosInstance, url: string | number | undefined) {
    instance.interceptors.request.use(
      (config) => {
        // 请求头携带token
        const token: string | undefined = Cookies.get('webtoken')
        if (token) {
          config.headers['webtoken'] = 'Bearer ' + token
        }

        // 上传接口使用multipart/form-data
        // if (config.url == '/storage/img/comUpload' || config.url == '/storage/upload') {
        //   config.headers['Content-Type'] = 'multipart/form-data'
        // }

        // get请求带个hash值, 解决cdn缓存问题
        // if (config.method == 'get') config.url = config.url + '?t=' + new Date().getTime()

        // 去除空值
        // let keyName = config.method == 'get' || config.method == 'delete' ? 'params' : 'data' // 判断是什么类型的接口取不同字段的数据
        // let old_request_data = config[keyName]
        // let requestData = {}
        // if (old_request_data)
        //   requestData = Object.keys(old_request_data)
        //     .filter((key) => old_request_data[key] !== '' && old_request_data[key] !== null && old_request_data[key] !== undefined)
        //     .reduce((acc, key) => ({ ...acc, [key]: old_request_data[key] }), {})
        // config[keyName] = requestData

        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )
    //响应拦截
    instance.interceptors.response.use(
      (res) => {
        //返回数据
        const { data } = res

        // 登录失效
        if (data.status == 2001) {
          ElMessageBox.confirm('登录失效，请重新登入', '提示', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              location.reload()
            })
            .catch(() => {})
          return
        }

        // 业务code
        if (data.status != 0) {
          // 业务异常
          ElMessage({
            message: data.message || 'Error',
            type: 'error',
            duration: 3 * 1000
          })
          return
        }
        return data
      },
      (error: any) => {
        if (error.statusCode == 401) {
          // 无权限，去401页面
          router.push('/401')
        } else if (error.statusCode == 404) {
          // 404页面
          router.push('/404')
        } else {
          // 其他异常，抛提示信息
          ElMessage({
            message: error.msg,
            type: 'error',
            duration: 3 * 1000
          })
        }
        return Promise.reject(error)
      }
    )
  }

  request(options: AxiosRequestConfig) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

const http = new HttpRequest()
export default http
