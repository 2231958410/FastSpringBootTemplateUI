import request from '@/utils/request'

//获取列表
export function fetchList(query) {
    return request({
        url: '/setting/user_role/all',
        method: 'get',
        params: query
    })
}

//查找数据
export function getObj(id) {
    return request({
        url: '/setting/user/' + id,
        method: 'get'
    })
}

//添加数据
export function addObj(obj) {
    return request({
        url: '/setting/user',
        method: 'post',
        data: obj
    })
}

//删除数据
export function delObj(id) {
    return request({
        url: '/setting/user/' + id,
        method: 'delete'
    })
}

//更新数据
export function putObj(obj) {
    return request({
        url: '/setting/user',
        method: 'put',
        data: obj
    })
}