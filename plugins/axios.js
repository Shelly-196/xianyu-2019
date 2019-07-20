import {Message} from "element-ui"
// 第一个参数是nuxt对象
export default ({$axios,redirect})=>{
    $axios.onError(err=>{
        // console.log(err.response,'axios拦截处理错误')
        const {statusCode,message} = err.response.data
        if(statusCode===400){
            Message.error(message)
        }
        // 拦截401及403错误请求
        if(statusCode===401||statusCode===403){
            redirect('/user/login')
        }
    })
}