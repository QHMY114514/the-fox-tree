let modInfo = {
	name: "狐狸树",
	id: "the-fox-tree",
	author: "乾狐离光",
	pointsName: "能量",
	modFiles: ["layers.js", "tree.js"],

	discordName: "乾狐离光的官网",
	discordLink: "https://qhlg.flime.top/",
	initialStartPoints: new Decimal(1), // 用于硬重置和新玩家
	offlineLimit: 0,  // 离线时间限制（小时）
}

// 在num和name中设置版本号
let VERSION = {
	num: "0.0",
	name: "只是细胞"
}

let changelog = `<h1>更新日志:</h1><br>
	<h3>v0.0 | 2025/6/14</h3><br>
	更新了基础游戏内容`

let winText = `恭喜!你已经击败了这个游戏,但是你可以继续游玩它`

// 如果在Layer内添加了新函数，并且这些函数在被调用时会产生效果，请在此处添加它们
var doNotCallTheseFunctionsEveryTick = []

function getStartPoints() {
	return new Decimal(modInfo.initialStartPoints)
}

// 决定是否显示点数/秒
function canGenPoints() {
	return true
}

// 计算点数/秒！
function getPointGen() {
	if (!canGenPoints())
		return new Decimal(0)

	let gain = hasUpgrade(0, 11) ?
		upgradeEffect(0, 11)
		.add(hasUpgrade("0", 22) ? upgradeEffect("0", 22) : _0)
		: new Decimal(0)
	return gain
}

// 你可以在此添加应该存入"player"并保存的非图层相关变量，以及默认值
function addedPlayerData() {
	return {
		//新闻
		news: {
			index: 0,
			text: "",
			charIndex: 0,
			lastUpdate: 0,
			isRotating: false
		},
		//隐藏成就
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

function getNewsList() {
	return [
		"欢迎来到狐狸树 Made by QHLG",
		"我们听说这里有一个新闻,但突然发现有新闻这件事就是新闻",
		"乾狐离光的网站地址在https://qhlg.flime.top",
		"＜spin＞哈里路大旋风!＜/spin＞",
		"乾狐离光不是💰️🦊🍐🌟也不是雀魂老狗更不是清华理工",
		"你在挂机的时候也在看我吗?",
		"开发者模式已启动,您的游戏速度已提升1e1e4514倍!",
		"为什么要写新闻条来掩饰自己没什么内容(恼)",
		"我们有一点狐币,狐币可以压成石头,石头里有一只狐狸",
		"这就叫实力,这就叫背景,这就叫狐狸,狐狸怎么叫?",
		'let jrrp = 101; let jrrptext = "你的运气爆表了!";',
		"There is nobody called Fox. Go to the other side.",
		"如果你付出了你应该付出的,你就会获得你需要的",
		"·",
		` <input type="button" value="点击我" onclick="alert('你被骗了!');player.nevergonnagiveyouup=true"/>点击这个按钮获得10000000000000000000000000000狐币`,
		"其实疯狂点击新闻栏可以为你提供一个速度加成",
		"Ciallo～(∠・ω<)⌒☆",
		"I just wanna JUMP~ JUMP~ JUMP~ JUMP~ JUMP~ JUMP~ JUMP~ JUMP~",
		"使用狐狸主题,使用狐狸主题谢谢喵!",
		"我不想让你关闭新闻栏,所以没做这个按钮,绝对不是懒得做",
		"为什么gta6还没做出来,因为现在正在美国加州等地进行线下公测()"
	]
}

function updateNewsDisplay() {
	if (!player.news) return;

	const newsList = getNewsList();
	const currentNews = newsList[player.news.index];

	if (!player.news.isRotating) {
		player.news.text = getNextCharacter(currentNews, 0);
		player.news.charIndex = 1;
		player.news.isRotating = true;
		player.news.lastUpdate = Date.now();
		player.news.completeTime = 0;
		return;
	}

	const now = Date.now();
	const timeDiff = now - player.news.lastUpdate;

	if (timeDiff >= 125) {
		const charsToAdd = Math.floor(timeDiff / 125);
		let newCharIndex = player.news.charIndex;

		for (let i = 0; i < charsToAdd && newCharIndex < currentNews.length; i++) {
			newCharIndex = getNextCharIndex(currentNews, newCharIndex);
		}

		player.news.charIndex = Math.min(newCharIndex, currentNews.length);
		player.news.text = currentNews.substring(0, player.news.charIndex);
		player.news.lastUpdate = now;

		if (player.news.charIndex >= currentNews.length && player.news.completeTime === 0) {
			player.news.completeTime = now;
		}

		if (player.news.completeTime > 0 && now - player.news.completeTime >= 5000) {
			const oldIndex = player.news.index;
			do {
				player.news.index = Math.floor(Math.random() * newsList.length);
			} while (oldIndex == player.news.index);
			player.news.isRotating = false;
			player.news.completeTime = 0;
		}
	}

	function getNextCharIndex(text, currentIndex) {
		if (currentIndex >= text.length) return currentIndex;

		if (text[currentIndex] === '<') {
			const endIndex = text.indexOf('>', currentIndex);
			return endIndex === -1 ? text.length : endIndex + 1;
		}

		return currentIndex + 1;
	}

	function getNextCharacter(text, startIndex) {
		const endIndex = getNextCharIndex(text, startIndex);
		return text.substring(startIndex, endIndex);
	}
}

