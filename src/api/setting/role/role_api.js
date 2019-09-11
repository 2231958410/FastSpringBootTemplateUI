import request from '@/utils/request'

//获取列表
export function fetchList(query) {
    return request({
        url: '/setting/role/page',
        method: 'get',
        params: query
    })
}

//加载菜单树
export function getMenuTree() {
    return request({
        url: 'setting/menus/tree',
        method: 'get',
    })
}
//获取menuid By roleid
export function getMeunidByRoleid(id) {
    return request({
        url: 'setting/menus/getmenubyid/' + id,
        method: 'get'
    })
}
//保存角色菜单id
export function updateMenu(roleid,checkd_menuids,half_menuids){
	    return request({
	    url: 'setting/menus/updateMenuRole',
	    method: 'put',
	    params: {
			roleid: roleid,
			checkedmenuids: checkd_menuids,
			halfmenuids: half_menuids
		}
	})
}

//查找数据
export function getObj(id) {
    return request({
        url: '/setting/role/' + id,
        method: 'get'
    })
}

//添加数据
export function addObj(obj) {
    return request({
        url: '/setting/role',
        method: 'post',
        data: obj
    })
}

//删除数据
export function delObj(id) {
    return request({
        url: '/setting/role/' + id,
        method: 'delete'
    })
}

//更新数据
export function putObj(obj) {
    return request({
        url: '/setting/role',
        method: 'put',
        data: obj
    })
}