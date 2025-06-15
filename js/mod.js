let modInfo = {
	name: "睡觉树",
	id: "the-sleep-tree",
	author: "乾狐离光",
	pointsName: "梦境",
	modFiles: ["layers.js", "tree.js"],

	discordName: "乾狐离光的官网",
	discordLink: "https://qhlg.flime.top/",
	initialStartPoints: new Decimal(0), // 用于硬重置和新玩家
	offlineLimit: 24,  // 离线时间限制（小时）
}

// 在num和name中设置版本号
let VERSION = {
	num: "0.0",
	name: ""
}

let changelog = `<h1>更新日志:</h1><br>
	<h3>v0.0 | 2025/6/16</h3><br>
	更新了基础游戏内容`

let winText = `恭喜!你已经击败了这个游戏,但是你可以继续游玩它`

// 如果在Layer内添加了新函数，并且这些函数在被调用时会产生效果，请在此处添加它们
var doNotCallTheseFunctionsEveryTick = []

function getStartPoints() {
	return new Decimal(modInfo.initialStartPoints)
}

// 决定是否显示点数/秒
function canGenPoints() {
	return isSleep()
}

// 计算点数/秒！
function getPointGen() {
	if (!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1).div(new Decimal(600)).mul(timeSpeed())
	return gain
}

// 你可以在此添加应该存入"player"并保存的非图层相关变量，以及默认值
function addedPlayerData() {
	return {
		// 时间
		gameTime: new Decimal(0),
		sleeptime: new Decimal(21600),
		// 新闻
		news: {
			index: 0,
			text: "",
			charIndex: 0,
			lastUpdate: 0,
			isRotating: false
		},
		// 隐藏成就
		nevergonnagiveyouup: false
	}
}

// 在页面顶部显示新闻
var displayNews = [
	function () {
		return player.news ? player.news.text : getNewsList()[0];
	}
];

// 在页面顶部显示额外内容
var displayThings = [
	"作者QQ 1550187725 欢迎反馈bug!"
]

// 决定游戏何时"结束"
function isEndgame() {
	return player.points.gte(new Decimal("1e1e1000"))
}

// 后面是次要内容！

// 背景样式，可以是函数
var backgroundStyle = {
}

// 如果有内容可能被长时间tick破坏，可以修改这个值
function maxTickLength() {
	return (3600)
}

// 如果需要修复旧版本存档的数值膨胀问题，使用此函数。如果版本早于修复该问题的版本，
// 你可以用此函数限制他们当前的资源。
function fixOldSave(oldVersion) {
}
