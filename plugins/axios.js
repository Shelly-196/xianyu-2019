import {Message} from "element-ui"
// 第一个参数是nuxt对象
export default ({$axios})=>{
    $axios.onError(err=>{
        // console.log(err.response,'axios拦截处理错误')
        const {statusCode,message} = err.response.data
        if(statusCode===400){
            Message.error(message)
        }
    })
}