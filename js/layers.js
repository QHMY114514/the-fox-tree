let _100 = new Decimal(100);
let _16 = new Decimal(16);
let _10 = new Decimal(10);
let _9 = new Decimal(9);
let _8 = new Decimal(8);
let _7 = new Decimal(7);
let _6 = new Decimal(6);
let _5 = new Decimal(5);
let _4 = new Decimal(4);
let _3 = new Decimal(3);
let _2 = new Decimal(2);
let _1 = new Decimal(1);
let _0 = new Decimal(0);

function pow2(pow) {
    return _2.pow(new Decimal(pow))
}

addLayer("a", {
    name: "进度",
    symbol: "🏅",
    resource: "进度",
    color: "#AA7BF2",
    row: "side",
    tooltip: "",
    position: 0,
    layerShown() { return true },
    infoboxes: {
        introBox: {
            title: "进度",
            body() { return "这里是你所达成的所有进度<br>也许有一些隐藏的特殊成就在等你发现?" },
        },
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "吸光吸热",
            tooltip: "购买线粒体",
            done() { return hasUpgrade("0", 11) },
            unlocked() { return true },
        },
        12: {
            name: "我要裂了",
            tooltip: "购买中心体",
            done() { return hasUpgrade("0", 14) },
            unlocked() { return true },
        },
        13: {
            name: "我裂开了",
            tooltip: "一分为二,你的故事从这里开始",
            done() { return player[1].points.gte(2) },
            unlocked() { return true },
        },
        14: {
            name: "垃圾升级",
            tooltip: "购买捕食.搞什么鬼,怎么有这种升级",
            done() { return hasUpgrade("0", 22) },
            unlocked() { return true },
        },
        15: {
            name: "★错怪你了",
            tooltip: "抱歉长官刚刚没认出你<br>★线粒体和纤毛加成捕食",
            done() { return hasMilestone("1", 4) },
            unlocked() { return true },
        },
        //特殊成就
        991: {
            name: "Fox Style",
            tooltip: "使用狐狸主题",
            done() { return options.theme == "fox" },
            unlocked() { return true },
        },
        992: {
            name: "Never Gonna Give You Up",
            tooltip: "你被骗了!",
            done() { return player.nevergonnagiveyouup },
            unlocked() { return true },
        },
    },
    startData() {
        return {
            unlocked: true,
            points: _0
        }
    },
    tabFormat: [
        ["infobox", "introBox"],
        "blank",
        "achievements"
    ],
})

addLayer("0", {
    name: "能量",
    symbol: "🔥",
    resource: "能量",
    row: 0,
    position: 0,
    color: "#D89536",
    startData() {
        return {
            unlocked: true,
            points: _1,
            resetTime: 0
        }
    },
    update() {
        player[this.layer].points = player.points;
    },
    layerShown() { return true },
    tabFormat: [
        "main-display",
        "blank",
        "upgrades",
    ],
    upgrades: {
        11: {
            title: "线粒体",
            description: "每秒产生<br>细胞数量^0.5/10 能量",
            effect: function () {
                return player[1].points
                    .pow(
                        (
                            _5
                                .add(hasMilestone("1", 3) ? _1 : _0)
                        ).div(_10)
                    )
                    .div(_10)
                    .mul(hasUpgrade("0", 12) ? upgradeEffect("0", 12) : _1)
                    .mul(hasUpgrade("0", 13) ? upgradeEffect("0", 13) : _1)
                    .mul(hasUpgrade("0", 21) ? upgradeEffect("0", 21) : _1)
                    .add(hasUpgrade("0", 22) ? upgradeEffect("0", 22) : _0)
            },
            effectDisplay: function () {
                return `+${format(upgradeEffect("0", 11))}`
            },
            tooltip: "",
            cost: _1,
            currencyDisplayName: "能量",
            currencyInternalName: "points",
            currencyLocation: () => player,
        },
        12: {
            title: "线粒体工厂",
            description: "能量加成自身获取",
            effect: function () {
                return (_1.add(player[this.layer].points)).log(_3).add(_1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("0", 12))}`
            },
            tooltip: "",
            cost: _2,
            currencyDisplayName: "能量",
            currencyInternalName: "points",
            currencyLocation: () => player,
            unlocked() { return hasUpgrade("0", 11) },
        },
        13: {
            title: "纤毛",
            description: "分裂时间加成能量获取",
            effect: function () {
                return (_1.add(player[this.layer].resetTime)).log(_4).add(_1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("0", 13))}`
            },
            tooltip: "",
            cost: _8,
            currencyDisplayName: "能量",
            currencyInternalName: "points",
            currencyLocation: () => player,
            unlocked() { return hasUpgrade("0", 12) },
        },
        14: {
            title: "中心体",
            description: "能量减少分裂成本",
            effect: function () {
                return (_1.add(player[this.layer].points)).log10().add(_1)
            },
            effectDisplay: function () {
                return `÷${format(upgradeEffect("0", 14))}`
            },
            tooltip: "",
            cost: new Decimal(64),
            currencyDisplayName: "能量",
            currencyInternalName: "points",
            currencyLocation: () => player,
            unlocked() { return hasUpgrade("0", 13) },
        },
        21: {
            title: "分化 I",
            description: "线粒体效率提升5倍",
            effect: function () {
                return _5
            },
            tooltip: "",
            cost: new Decimal(128),
            currencyDisplayName: "能量",
            currencyInternalName: "points",
            currencyLocation: () => player,
            unlocked() { return hasMilestone("1", 2) },
        },
        22: {
            title: "捕食",
            description: "每秒获得16能量",
            effect: function () {
                return _16
                    .mul(hasAchievement("a", 15) ? upgradeEffect("0", 12).mul(upgradeEffect("0", 13)) : _1)
            },
            effectDisplay: function () {
                return `+${format(upgradeEffect("0", 22))}`
            },
            tooltip: "",
            cost: new Decimal(1145.14),
            currencyDisplayName: "能量",
            currencyInternalName: "points",
            currencyLocation: () => player,
            unlocked() { return hasUpgrade("0", 21) },
        },
        23: {
            title: "染色体稳定性",
            description: "细胞分裂不再重置第一行升级",
            tooltip: "",
            cost: new Decimal(8192),
            currencyDisplayName: "能量",
            currencyInternalName: "points",
            currencyLocation: () => player,
            unlocked() { return hasUpgrade("0", 23) || hasUpgrade("0", 22) },
        },
        24: {
            title: "变异",
            description: "解锁DNA层",
            tooltip: "",
            cost: new Decimal(131072),
            currencyDisplayName: "能量",
            currencyInternalName: "points",
            currencyLocation: () => player,
            unlocked() { return hasUpgrade("0", 23) },
        }
    },
    doReset(resettingLayer) {
        if (resettingLayer == 1) {
            let has0_23 = hasUpgrade("0", 23);

            layerDataReset("0");

            if (has0_23) {
                player[0].upgrades.push(11, 12, 13, 14, 23);
            }
            else if (hasMilestone("1", 1)) {
                player[0].upgrades.push(11);
            }
        } else {
            layerDataReset("0");
        }
    },
    hotkeys: [
        {
            key: "a",
            description: "A: 购买所有可用的能量升级",
            onPress: () => {
                const layer = layers["0"];
                const upgradeIds = Object.keys(layer.upgrades);

                for (const id of upgradeIds) {
                    const upgrade = layer.upgrades[id];

                    if (!upgrade) continue;

                    const isUnlocked = (typeof upgrade.unlocked === 'function')
                        ? upgrade.unlocked()
                        : true;

                    if (!isUnlocked) continue;

                    if (!hasUpgrade("0", id) && canAffordUpgrade("0", id)) {
                        buyUpgrade("0", id);
                    }
                }
            },
        }
    ],
    branches: ["1", "2"]
});


addLayer("1", {
    name: "细胞",
    symbol: "🧫",
    resource: "细胞",
    row: 1,
    position: 0,
    color: "#ABCDEF",
    startData() {
        return {
            unlocked: false,
            points: _1
        }
    },
    layerShown() { return true },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        "upgrades",
        "milestones",
    ],
    type: "normal",
    baseResource: "能量",
    baseAmount() {
        return player.points
    },
    requires: function () {
        return _2.pow(_7)
            .div(hasUpgrade("0", 14) ? upgradeEffect("0", 14) : _1)
            .div(hasMilestone("1", 0) ? _2 : _1)
    },
    exponent: function () {
        return _1.div(_16
            .div(hasMilestone("1", 1) ? _6 : _1)
        )
    },
    canBuyMax() {
        return hasMilestone("1", 0)
    },
    milestones: {
        0: {
            requirementDescription: "2 细胞 | 第一次进化",
            effectDescription: "你现在不再是孤身一胞了!虽然现在这还没造成什么大影响...<br>但你分裂的花销减少了一半",
            done() { return player[this.layer].points.gte(2) }
        },
        1: {
            requirementDescription: "5 细胞 | 我的兄弟姐妹",
            effectDescription: "既然你现在有四个兄弟姐妹...<br>你现在可以一次性分裂多个细胞了,且分裂不再重置线粒体",
            done() { return player[this.layer].points.gte(5) }
        },
        2: {
            requirementDescription: "9 细胞 | 集群化作战",
            effectDescription: "通过细胞直接相互配合,你们很快就得到了这带来的优势<br>解锁一列新的升级",
            done() { return player[this.layer].points.gte(9) }
        },
        3: {
            requirementDescription: "25 细胞 | 25时,细胞聚集体见",
            effectDescription: "无规则堆积导致的能量获取效率降低略微削减<br>线粒体能量获取指数^0.5->^0.6",
            done() { return player[this.layer].points.gte(25) }
        },
        4: {
            requirementDescription: "50 细胞 | 行55.556里者半50",
            effectDescription: "让你的铁蹄践踏这个世界!某项升级将被大幅加强",
            done() { return player[this.layer].points.gte(50) }
        }
    },
    hotkeys: [
        {
            key: "d",
            description: "D:细胞分裂",
            onPress() { if (player[1].unlocked) doReset("1") },
            unlocked() { return hasMilestone("1", 0) }
        }
    ],
});

addLayer("2", {
    name: "DNA",
    symbol: "🧬",
    resource: "基因",
    row: 1,
    position: 1,
    color: "#77b255",
    startData() {
        return {
            unlocked: true,
            points: _0
        }
    },
    layerShown() { return hasUpgrade("0", 24) },
    tabFormat: [
        "main-display",
        "blank",
        "upgrades",
    ],
});