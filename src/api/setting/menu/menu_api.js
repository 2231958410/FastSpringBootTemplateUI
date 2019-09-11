import request from '@/utils/request'

//获取列表
export function fetchList(query) {
    return request({
        url: '/setting/menus/page',
        method: 'get',
        params: query
    })
}


// 获取所有的菜单树
export function getMenusTree() {
  return request({
    url: '/setting/menus/tree',
    method: 'get'
  })
}

//构建菜单
export function buildMenus() {
  return request({
    url: '/setting/menus/build',
    method: 'get'
  })
}

//添加菜单
export function addObj(data) {
  return request({
    url: '/setting/menus',
    method: 'post',
    data : data
  })
}

//删除菜单
export function delObj(id) {
  return request({
    url: '/setting/menus/' + id,
    method: 'delete'
  })
}

//查找数据
export function getObj(id) {
    return request({
        url: '/setting/menus/' + id,
        method: 'get'
    })
}

//更新数据
export function putObj(obj) {
    return request({
        url: '/setting/menus',
        method: 'put',
        data: obj
    })
}
