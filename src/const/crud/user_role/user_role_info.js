export const tableoption = {
	index: true,
	indexLabel: 'ID',
	border: false,
	//对其方式
	align: 'center',
	//列显隐按钮
	columnBtn: true,
	dialogType:'drawer',
	dialogWidth:800,
	menuAlign: 'center',
	column: [{
			label: '用户ID',
			editDisabled: true,
			prop: 'id'
		},{
			label: '账号',
			editDisabled: true,
			prop: 'username'
		},
		{
			label: '角色名称',
			prop: 'name'
		},
		{
			label: '角色说明',
			prop: 'remark'
		}
	]
}
