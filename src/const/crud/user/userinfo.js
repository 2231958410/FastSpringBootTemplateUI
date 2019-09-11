export const tableoption = {
	title:'用户信息',
	index: true,
	indexLabel: 'ID',
	border: true,
	//对其方式
	align: 'center',
	//列显隐按钮
	columnBtn: true,
	dialogType:'drawer',
	dialogWidth:800,
	menuAlign: 'center',
	column: [{
			label: '账户',
			editDisabled: true,
			prop: 'username'
		},{
			label: '密码',
			editDisabled: true,
			prop: 'password'
		},
		{
			label: '邮箱',
			prop: 'email'
		},
		{
			label: '电话',
			prop: 'phone'
		},
		{
			label: '状态',
			prop: 'enabled'
		},
		{
			label: '创建时间',
			type: 'datetime',
			format: 'yyyy-MM-dd hh:mm:ss',
			display: false,
			valueFormat: 'yyyy-MM-dd hh:mm:ss',
			prop: 'createTime'
		},
		{
			label: '上一次修改时间',
			type: 'datetime',
			format: 'yyyy-MM-dd hh:mm:ss',
			display: false,
			prop: 'lastPasswordResetTime'
		}
	]
}
