export const state =()=>({
    infoData:{
        seat_infos:{}
    },
    // 计算总价
    sumPrice:0
})
export const mutations = {
    // 设置机票信息
    setInfoData(state,data){
        state.infoData=data
    },
    setSumPrice(state,price){
        state.sumPrice=price
    }
}
export const actions = {}