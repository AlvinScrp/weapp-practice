module.exports = {
	"origin": "https://test.miniprogram.com",
	"entry": "/index",
	"router": {
		"inde": [
			{
				"regexp": "^\\/index(?:\\/)?$",
				"options": "i"
			}
		],
		"userconsole": [
			{
				"regexp": "^\\/userconsole(?:\\/)?$",
				"options": "i"
			}
		],
		"storageconsole": [
			{
				"regexp": "^\\/storageconsole(?:\\/)?$",
				"options": "i"
			}
		],
		"databaseguide": [
			{
				"regexp": "^\\/databaseguide(?:\\/)?$",
				"options": "i"
			}
		],
		"deployfunctions": [
			{
				"regexp": "^\\/deployfunctions(?:\\/)?$",
				"options": "i"
			}
		],
		"chooselib": [
			{
				"regexp": "^\\/chooselib(?:\\/)?$",
				"options": "i"
			}
		]
	},
	"generate": {
		"worker": "common/workers"
	},
	"runtime": {
		"subpackagesMap": {},
		"tabBarMap": {},
		"usingComponents": {}
	},
	"pages": {
		"userconsole": {
			"extra": {
				"navigationBarTitleText": "用户管理指引"
			}
		},
		"storageconsole": {
			"extra": {
				"navigationBarTitleText": "文件存储指引"
			}
		},
		"databaseguide": {
			"extra": {
				"navigationBarTitleText": "数据库指引"
			}
		},
		"deployfunctions": {
			"extra": {
				"navigationBarTitleText": "部署云函数"
			}
		},
		"chooselib": {
			"extra": {
				"navigationBarTitleText": "选择基础库"
			}
		},
		"index": {}
	},
	"redirect": {
		"notFound": "index",
		"accessDenied": "index"
	},
	"optimization": {}
}