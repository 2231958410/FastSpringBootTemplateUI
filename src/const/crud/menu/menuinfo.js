export const tableoption = {
	index: true,
	indexLabel: 'ID',
	height: '200px',
	border: false,
	align: 'center',
	menuAlign: 'center',
	submitText: '更新',
	column: [
		{
			label: '菜单ID',
			prop: 'id',
			readonly: 'true'
		},
		{
			label: '父ID',
			prop: 'pid'
		},
		{
			label: '名称',
			prop: 'name'
		},
		{
            label: '选择图标',
            prop: 'icon',
            type: 'icon-select',
            iconList: [{
              label: '基本图标',
              list: ['el-icon-info', 'el-icon-error', 'el-icon-error', 'el-icon-success', 'el-icon-warning', 'el-icon-question']
            },{
              label: '方向图标',
              list: ['el-icon-info', 'el-icon-back', 'el-icon-arrow-left', 'el-icon-arrow-down', 'el-icon-arrow-right', 'el-icon-arrow-up']
            }, {
              label: '符号图标',
              list: ['el-icon-plus', 'el-icon-minus', 'el-icon-close', 'el-icon-check']
            },{
              label: '阿里云图标',
              list: ['iconfont icon-huanyingye', 'iconfont icon-shujuzhanshi2', 'iconfont icon-weixin1', 'iconfont icon-cuowutishitubiao', 'iconfont icon-iconset0216','iconfont icon-iconset0265','iconfont icon-quanping','iconfont icon-iframe','iconfont icon-wxbgongju','iconfont icon-biaodan','iconfont icon-qq','iconfont icon-rizhi1','iconfont icon-msnui-360','iconfont icon-tuichu','iconfont icon-souhu','iconfont icon-weixin','iconfont icon-changyonglogo27','iconfont icon-tuichuquanping','iconfont icon-qq1','iconfont icon-yanzhengma','iconfont icon-tubiao','iconfont icon-dongtai','iconfont icon-navicon','iconfont icon-liuliangyunpingtaitubiao08','iconfont icon-cuowu','iconfont icon-rizhi','iconfont icon-daohanglanmoshi02','iconfont icon-yuan','iconfont icon-bug','iconfont icon-quanxian','iconfont icon-baidu1','iconfont icon-debug','iconfont icon-shuaxin','iconfont icon-caidanguanli','iconfont icon-biaoge','iconfont icon-bofangqi-suoping','iconfont icon-yonghuguanli','iconfont icon-yonghu','iconfont icon-mima','iconfont icon-shouji','iconfont icon-jiaoseguanli','iconfont icon-suoping','iconfont icon-canshu','iconfont icon-zhongyingwen','iconfont icon-caidan','iconfont icon-zhuti']
            },]
		},
		{
			label: '排序',
			prop: 'sort'
		},
		{
			label: '连接地址',
			prop: 'path'
		},
		{
			label: '组件路径',
			prop: 'component'
		},
		{
			label: '內部菜单',
			prop: 'iframe'
		},
		{
			label: '创建时间',
			type: 'datetime',
			readonly: true,
			format: 'yyyy-MM-dd hh:mm:ss',//显示的时间格式
			prop: 'createTime'
		}
	]
}
