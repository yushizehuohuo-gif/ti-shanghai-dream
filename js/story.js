// ==========================================
// story.js — 剧情数据
// "我要打上海TI" 文字互动游戏
// ==========================================

const StoryData = {

  // ==========================================
  // 第一章：梦的起点
  // ==========================================

  'ch1_s1_start': {
    id: 'ch1_s1_start',
    chapter: 1,
    title: '天梯冲分',
    type: 'choice',
    text: '屏幕右下角弹出一条消息——\n\n"TI15 上海站，中国区海选报名已开启。"\n\n你的手指停在键盘上。\n\nRank 排名：国服前200。英雄池深不见底。天梯分一路飙升。\n\n朋友们说你疯了。爸妈说你不务正业。但你知道，这可能是唯一的机会。\n\n上海。TI。那个所有DOTA玩家梦寐以求的舞台，这次就在家门口。\n\n你没有犹豫太久。\n\n但出发之前，你需要想清楚一件事——你是一个怎样的选手？',
    choices: [
      {
        text: '绝活哥——我有三个英雄练到了极致，谁来都不怕',
        next: 'ch1_s2_hero_pool',
        effects: { '实力': 8, '心态': -3 },
        flavor: '"绝活就是自信。" 你默默点头。影魔、卡尔、水人——这三板斧，够用了。',
      },
      {
        text: '全能手——我什么都能打，团队需要什么我玩什么',
        next: 'ch1_s2_hero_pool',
        effects: { '实力': 3, '团队': 8, '人气': 3 },
        flavor: '"补位也是一种实力。" 你不挑位置，不抢资源，队友都愿意跟你排。',
      },
      {
        text: '指挥官——我的操作不是最强的，但我的指挥是最清晰的',
        next: 'ch1_s2_hero_pool',
        effects: { '心态': 8, '团队': 5, '实力': -2 },
        flavor: '"DOTA不是一个人的游戏。" 你从路人局就开始指挥，胜率说明一切。',
      },
    ],
    on_enter: {},
  },

  'ch1_s2_hero_pool': {
    id: 'ch1_s2_hero_pool',
    chapter: 1,
    title: '英雄池',
    type: 'choice',
    text: '决定了风格，接下来你需要确定自己的位置和英雄池。\n\nDOTA的五个位置各有千秋——1号位carry全场，2号位掌控节奏，3号位抗压开路，4/5号位默默奉献。\n\n你翻开自己的英雄记录。过去三个月的数据不会骗人。\n\n你最擅长的位置是？',
    choices: [
      {
        text: '1号位（Carry）——给我资源，40分钟后我带你们赢',
        next: 'ch1_s3_teammate',
        effects: { '实力': 5, '心态': 3 },
        flavor: 'PA暴击的声音，是你听过最美的旋律。',
      },
      {
        text: '2号位（Mid）——中路是我的地盘，节奏由我掌控',
        next: 'ch1_s3_teammate',
        effects: { '实力': 5, '人气': 3 },
        flavor: '中路对决，是DOTA最纯粹的博弈。你享受这种一对一的压迫感。',
      },
      {
        text: '3号位（Offlane）——我不怕死，只要队友能赢',
        next: 'ch1_s3_teammate',
        effects: { '心态': 5, '团队': 3 },
        flavor: '劣势路的每一分钱都是拿命换的。但你从不抱怨。',
      },
      {
        text: '4/5号位（Support）——团队的眼睛和盾牌',
        next: 'ch1_s3_teammate',
        effects: { '团队': 8, '人气': 3 },
        flavor: '插眼、拉野、救人。辅助是DOTA里最不显眼、但最重要的角色。',
      },
    ],
  },

  'ch1_s3_teammate': {
    id: 'ch1_s3_teammate',
    chapter: 1,
    title: '第一个队友',
    type: 'choice',
    text: '一个人打不了TI。你需要队友。\n\n你在天梯里认识了不少人，但真正能一起打比赛的，只有那么几个。\n\n这天晚上，你的好友列表里弹出一条私聊——\n\n"听说你要打海选？带我一个。"\n\n发消息的人叫阿杰，你的老队友。三年前你们一起拿过城市赛冠军，后来他因为学业退出了。现在他毕业了，想再试一次。\n\n你看着这条消息，心情复杂。阿杰的操作比以前更好了，但他的心态......',
    choices: [
      {
        text: '拉他入队——老队友的默契比什么都重要',
        next: 'ch1_s4_intro',
        effects: { '团队': 12, '心态': 3 },
        flavor: '"行。明天训练室见。" 你敲下回复。有些信任不需要理由。',
      },
      {
        text: '先试训——一起打几把天梯看看状态再说',
        next: 'ch1_s4_intro',
        effects: { '团队': 5, '实力': 5 },
        flavor: '"先打几把，看看你手生了没。" 谨慎不是不信任，而是对梦想负责。',
      },
      {
        text: '婉拒——抱歉，我已经有队伍了',
        next: 'ch1_s4_intro',
        effects: { '心态': -3, '人气': 5 },
        flavor: '你撒了个谎。不是不想带他，而是你需要一个更强的阵容。这个决定让你心里有些不安，但TI不等人。',
      },
    ],
  },

  'ch1_s4_intro': {
    id: 'ch1_s4_intro',
    chapter: 1,
    title: '第一次线下赛',
    type: 'choice',
    text: '两周后。你站在城市网吧赛的门口。\n\n这里和你想象的不太一样——狭小的空间，嘈杂的键盘声，几个穿着队服的年轻人正在热身。\n\n"就这？" 阿杰在你身后笑了，"跟我们以前打的差不多。"\n\n但实际上，这是你第一次以"冲击TI"为目标参加的比赛。虽然只是一场小型网吧赛，但冠军能拿到海选的直接邀请名额。\n\n赛前，主办方发来了对手的资料——一支本地知名的半职业队，中单是国服前50。\n\n你的手心微微出汗。',
    choices: [
      {
        text: '赛前研究对手录像，制定战术',
        next: 'ch1_s4_reaction',
        effects: { '实力': 8, '团队': 5 },
        flavor: '你看完了对手最近20场的录像。他们的中单喜欢拿影魔，辅助的眼位习惯你也摸清了。',
      },
      {
        text: '放松心态，正常发挥就行',
        next: 'ch1_s4_reaction',
        effects: { '心态': 8, '实力': 3 },
        flavor: '"越紧张越容易失误。" 你戴上耳机，放了一首熟悉的歌。',
      },
      {
        text: '和队友开个短会，统一战术思路',
        next: 'ch1_s4_reaction',
        effects: { '团队': 10, '心态': 5 },
        flavor: '五个人围在一起，在餐巾纸上画出BP思路。阿杰说："稳了。"',
      },
    ],
  },

  // --- Reaction Test: BKB timing ---
  'ch1_s4_reaction': {
    id: 'ch1_s4_reaction',
    chapter: 1,
    title: '第一次线下赛 · 决胜团战',
    type: 'reaction',
    text: '比赛打到第42分钟。\n\n比分焦灼。双方各破一路高地。\n\n你操控着英雄在中路带线，余光扫到小地图——敌方五人全部消失。\n\n"小心！他们开雾了！" 阿杰的声音在耳机里炸开。\n\n下一秒，敌方斧王跳刀切入！闪烁的红光在你屏幕边缘炸开——\n\n你需要立刻开启BKB！',
    challenge: {
      mode: 'click_target',
      difficulty: 'tutorial',
      time_limit: 3500,
      flavor_success: 'BKB完美开启！魔免的金光笼罩你的英雄，斧王的吼叫被完全抵挡。你反手开启撒旦，三杀！全场沸腾！',
      flavor_fail: 'BKB晚了一步...你被斧王吼住。但阿杰的凤凰及时变蛋——"下波我保你，别急！" 烈阳炙烤下，敌方被迫撤退。',
      effects_success: { '实力': 8, '心态': 5 },
      effects_fail: {},
      next_success: 'ch1_s4_win',
      next_fail: 'ch1_s4_saved',
    },
  },

  'ch1_s4_win': {
    id: 'ch1_s4_win',
    chapter: 1,
    title: '首战告捷',
    type: 'choice',
    text: '"NICE——！！！"\n\n阿杰摘下耳机，一拳锤在桌上。教练从身后冲过来抱住你们。\n\n你们赢了。\n\n不仅赢了这场比赛，而且是以2:0横扫了本地最强的半职业队。\n\n网吧里的其他玩家都围了过来。有人在拍照，有人在喊"牛逼"。\n\n你坐在椅子上，盯着屏幕上的胜利画面。手心全是汗。\n\n"这只是开始。" 你对自己说。\n\n但接下来的路，远比这场网吧赛艰难得多。海选的报名截止日期就在下周。你们需要一个正式队名，需要稳定的训练场地，需要更多队友......\n\n或者说，需要一笔赞助。',
    choices: [
      {
        text: '趁热打铁，立刻注册队伍，报名海选',
        next: 'ch1_s5_ending',
        effects: { '心态': 5, '人气': 3 },
        flavor: '"别等了，现在就报名。" 你说。梦想不等人。',
      },
      {
        text: '先找赞助——没有资金支持走不远',
        next: 'ch1_s5_ending',
        effects: { '人气': 8, '团队': -3 },
        flavor: '"我们需要一个老板。" 你说。但找赞助意味着训练要停一停。',
      },
    ],
  },

  'ch1_s4_saved': {
    id: 'ch1_s4_saved',
    chapter: 1,
    title: '有惊无险',
    type: 'choice',
    text: '好险。\n\n如果不是阿杰的凤凰极限变蛋，这波团可能就翻了。\n\n你深吸一口气。BKB的时机差了一点点——这是大赛经验不足的表现。但队友没有怪你。\n\n"没事，下波我站你旁边。" 阿杰拍了拍你的肩膀。\n\n接下来的比赛，你们稳扎稳打，利用前期的经济优势慢慢推掉了对手的基地。\n\n2:1。赢了。但赢得不漂亮。\n\n你心里清楚，这种失误在海选里会被无限放大。真正的强队不会给你第二次机会。\n\n回去的路上，阿杰说："明天开始，每天加练两小时团战反应。我陪你。"\n\n你点点头。',
    choices: [
      {
        text: '接受阿杰的建议，加练反应和团战配合',
        next: 'ch1_s5_ending',
        effects: { '实力': 8, '团队': 5, '心态': 3 },
        flavor: '"好，明天早上九点，训练室见。" 你把这句话设成了手机锁屏。',
      },
      {
        text: '先报名再说——一边打一边练',
        next: 'ch1_s5_ending',
        effects: { '心态': 5, '人气': 3 },
        flavor: '"时间不等人，先上车再说。" 你打开了海选报名页面。',
      },
    ],
  },

  // Chapter 1 ending / transition
  'ch1_s5_ending': {
    id: 'ch1_s5_ending',
    chapter: 1,
    title: '出海口',
    type: 'choice',
    text: '夜深了。\n\n你坐在训练室里，盯着天花板上闪烁的灯管。\n\n阿杰已经回去了。其他队友也在群里道了晚安。但你睡不着。\n\n手机屏幕上，海选报名确认邮件静静地躺着——\n\n"您的队伍已成功报名TI15中国区海选赛。"\n\n一千多支队伍。只有四个能走到上海。\n\n你闭上眼。脑海里闪过今天的比赛画面——BKB的金光、阿杰的凤凰、胜利那一刻的吼声。\n\n这只是一个开始。刀塔的路还很长。\n\n但你已经迈出了第一步。\n\n——第一章 完——',
    choices: [
      {
        text: '继续征程 → 第二章',
        next: 'ch2_s1_tryout',
        effects: {},
        flavor: '新的挑战在前方等待着。',
      },
    ],
    on_enter: { '心态': 5 },
  },

  // ==========================================
  // 第二章：刀塔江湖
  // ==========================================

  'ch2_s1_tryout': {
    id: 'ch2_s1_tryout',
    chapter: 2,
    title: '战队试训',
    type: 'choice',
    text: '海选报名后的第三天，你收到了一封邮件。\n\n"致未来的TI选手：我们在寻找有潜力的队员。周六下午两点，银河网咖三楼。带上你的键盘。"\n\n发件人是"银河战队"——本地小有名气的半职业队，去年打进了海选前100。\n\n阿杰看到邮件，眼睛亮了："银河啊！他们的三号位在国服排前50。"\n\n周六，你背着外设包走进银河网咖。训练室里已经坐了四个人。墙上贴着TI历届冠军海报——从NaVi到Spirit，从Wings到LGD。\n\n"坐。" 教练指了指中间的位置，"先打一把训练赛。"',
    choices: [
      {
        text: '拿出最自信的英雄，展示个人实力',
        next: 'ch2_s1_puzzle',
        effects: { '实力': 5, '人气': 3 },
        flavor: '你锁定了信仰英雄。教练在背后微微点头。',
      },
      {
        text: '先观察队友习惯，配合他们的节奏',
        next: 'ch2_s1_puzzle',
        effects: { '团队': 8, '心态': 3 },
        flavor: '你不急着表现。好的团队需要理解，不是个人秀。',
      },
    ],
  },

  'ch2_s1_puzzle': {
    id: 'ch2_s1_puzzle',
    chapter: 2,
    title: '战队试训 · 阵容答辩',
    type: 'puzzle',
    text: '训练赛结束后，教练把你单独叫到战术板前。\n\n"刚才那把我看了。操作没问题。但我要考你一个东西——战术理解。"\n\n他用记号笔圈出四个英雄。\n\n"如果我们拿潮汐三号位、莱恩四号位、飞机一号位、术士五号位。第五个英雄选谁？"',
    challenge: {
      mode: 'lineup_puzzle',
      difficulty: 'easy',
      context: '我方阵容：潮汐猎人(3)、莱恩(4)、矮人直升机(1)、术士(5)。缺2号位中单。对方阵容偏脆皮法师。',
      options: [
        { id: 'A', text: '影魔 — 高爆发法系中单', correct: false, reason: '影魔太脆，和阵地战体系不搭。' },
        { id: 'B', text: '帕克 — 灵活先手中单', correct: false, reason: '不错但不是最佳，缺少推进能力。' },
        { id: 'C', text: '龙骑士 — 肉盾推进中单', correct: true, reason: '完美！配合潮汐团控+飞机AOE+术士续航，标准阵地推进体系。' },
        { id: 'D', text: '祈求者 — 万能中单', correct: false, reason: '卡尔太吃资源，和飞机节奏冲突。' },
      ],
      flavor_correct: '教练眼睛一亮："好理解！龙骑配飞机，中期推进无敌。试训通过——你留下。"',
      flavor_wrong: '教练笑了："有自己的想法，难得。不过我们缺的不是爆发——来，我给你讲讲这套体系的逻辑..."',
      effects_correct: { '实力': 8, '团队': 10 },
      effects_wrong: { '团队': 5 },
      next_correct: 'ch2_s2_stream',
      next_wrong: 'ch2_s2_stream',
    },
  },

  'ch2_s2_stream': {
    id: 'ch2_s2_stream',
    chapter: 2,
    title: '岔路口',
    type: 'choice',
    text: '入队后的第一个月，你面临一个抉择。\n\n训练赛安排得很满——每天下午两点到晚上十点。但阿杰提议晚上再加练两小时。\n\n同时，你的直播平台发来消息：最近你的天梯对局观看人数涨了，平台愿意给推荐位。如果好好经营，一个月能多几千块收入。\n\n但一天只有24小时。训练、直播、休息——你只能选两个。',
    choices: [
      {
        text: '全力训练——关掉直播，和队友死磕战术',
        next: 'ch2_s3_rival',
        effects: { '实力': 10, '团队': 5, '人气': -5 },
        flavor: '你关掉了OBS。屏幕上只剩下DOTA2。教练说："这才是职业态度。"',
      },
      {
        text: '训练+直播兼顾——白天训练，晚上直播',
        next: 'ch2_s3_rival',
        effects: { '人气': 10, '实力': 3, '心态': -3 },
        flavor: '直播间人数慢慢涨到三位数。但你也开始频繁打哈欠。',
      },
      {
        text: '主攻直播——用个人品牌吸引更好的战队',
        next: 'ch2_s3_rival',
        effects: { '人气': 15, '实力': -3, '团队': -5 },
        condition: null,
        flavor: '"职业选手也要会经营自己。" 你的粉丝群里多了一百个人。教练不太高兴。',
      },
    ],
  },

  'ch2_s3_rival': {
    id: 'ch2_s3_rival',
    chapter: 2,
    title: '宿敌登场',
    type: 'choice',
    text: '城市赛八强战。\n\n你坐在电脑前，对面的ID让你心头一紧——"ShadowBlade"。\n\n他是这个城市另一个天才中单。你们在天梯交手过17次，你赢9次，他赢8次。每次打完，聊天框里都会留下一句"gg，下次见"。\n\n今天不是天梯。今天是淘汰赛。输了就回家。\n\n赛前握手时，他冲你笑了笑："好久不见。"\n\n你深吸一口气，走向对战房。',
    choices: [
      {
        text: '主动换路——避开他的强势对线，打运营',
        next: 'ch2_s3_solo',
        effects: { '团队': 8, '心态': 5, '实力': -2 },
        flavor: '"这把我不走中，换去劣势路。" 队友们愣了一下，然后点头。',
      },
      {
        text: '正面刚——中路对线，谁怂谁是狗',
        next: 'ch2_s3_solo',
        effects: { '实力': 8, '心态': 2, '人气': 5 },
        flavor: '你选择留在中路。这就是你一直想要的——和最强的对手，打最纯粹的1v1。',
      },
    ],
  },

  'ch2_s3_solo': {
    id: 'ch2_s3_solo',
    chapter: 2,
    title: '宿敌 · 天梯Solo',
    type: 'reaction',
    text: '中路对线进行到第8分钟。\n\n你和ShadowBlade的补刀数几乎一模一样。河道神符刷新——隐身符！\n\n你磕下神符，绕到他的侧翼。他还在补刀，似乎没有察觉。\n\n手指悬停在技能键上。这是你全场最好的单杀机会——',
    challenge: {
      mode: 'rapid_click',
      difficulty: 'normal',
      time_limit: 4000,
      target_clicks: 12,
      flavor_success: '技能全中！一血！ShadowBlade在公屏打出"..."。观众席爆发出欢呼声。',
      flavor_fail: '他反应太快了！魔棒+仙灵火极限逃生。但这一波逼出了他的所有补给，你占据了线优。',
      effects_success: { '实力': 10, '心态': 5 },
      effects_fail: {},
      next_success: 'ch2_s4_major',
      next_fail: 'ch2_s4_major',
    },
  },

  'ch2_s4_major': {
    id: 'ch2_s4_major',
    chapter: 2,
    title: '第一次大赛',
    type: 'choice',
    text: '你们赢了ShadowBlade的队。闯入城市赛四强。\n\n这是你第一次站在有观众的比赛舞台上——虽然观众只有两百多人，但舞台灯光是真实的，解说声音是真实的。\n\n"下一场，对手是去年的城市赛冠军。他们的核心是一号位——天梯前30的Carry。"\n\n教练在休息室摊开战术板。\n\n"我们要针对他。问题是——怎么针对？"',
    choices: [
      {
        text: 'Ban掉他的绝活英雄，逼他玩不擅长的',
        next: 'ch2_s4_item',
        effects: { '实力': 5, '团队': 3 },
        flavor: '"Ban水人、TB、小娜迦。我们看看他还有什么。" 教练点头。',
      },
      {
        text: '围绕中路打开局面，前期打穿他们',
        next: 'ch2_s4_item',
        effects: { '实力': 8, '心态': 3 },
        flavor: '"他们的一号位再强，前期没空间也白搭。" 你决定以我为主。',
      },
    ],
  },

  'ch2_s4_item': {
    id: 'ch2_s4_item',
    chapter: 2,
    title: '第一次大赛 · 出装决策',
    type: 'puzzle',
    text: '比赛进入中期。双方经济持平。\n\n敌方一号位已经做出了狂战斧，正在飞速刷钱。你们必须在接下来的关键团战中取得优势，否则会被他的装备碾压。\n\n你现在有3800金币。商店页面打开着。\n\n这个时间点，出什么装备最能影响战局？',
    challenge: {
      mode: 'item_build',
      difficulty: 'normal',
      context: '当前时间：22分钟。敌方一号位有狂战斧正在发育，敌方三号位有跳刀先手。你们需要在中期团战中打赢。你是二号位中单。',
      options: [
        { id: 'A', text: '黑皇杖(BKB) — 魔免保证稳定输出', correct: true, reason: '22分钟BKB是完美的Timing！有了BKB不怕跳刀先手，中期团战可以站桩输出。' },
        { id: 'B', text: '黯灭 — 减甲提升爆发', correct: false, reason: '输出装没错，但这个时间点没有BKB会被跳刀先手秒掉，输出再高也打不出来。' },
        { id: 'C', text: '林肯法球 — 防先手技能', correct: false, reason: '林肯只能挡一个技能，对面多个先手英雄时效果有限，不如BKB全面。' },
        { id: 'D', text: '辉耀 — 持续AOE伤害', correct: false, reason: '辉耀太贵了，等你憋出来对面大哥已经六神了。这个时间点需要的是即时战力。' },
      ],
      flavor_correct: 'BKB在手！你带领队伍在中路打出一波0换4的完美团战。解说在耳机里大喊："BKB的Timing太好了！"',
      flavor_wrong: '教练在身后轻声道："这个时间点，BKB的优先级是最高的。没有魔免，你输出再高也站不住。"',
      effects_correct: { '实力': 8, '心态': 5 },
      effects_wrong: { '实力': 3 },
      next_correct: 'ch2_s5_crisis',
      next_wrong: 'ch2_s5_crisis',
    },
  },

  'ch2_s5_crisis': {
    id: 'ch2_s5_crisis',
    chapter: 2,
    title: '团队危机',
    type: 'choice',
    text: '四强赛输了。1:2。\n\n其实打得不错——面对去年的冠军，你们拿下了第一局。但后面两局，差距开始显现。\n\n回训练室的路上，没人说话。\n\n到了门口，阿杰突然把外设包摔在椅子上。\n\n"我打不了了。"\n\n所有人都愣住了。\n\n"我女朋友说了，再这样天天训练到半夜，就分手。而且她说的对——我们真的能打到TI吗？一千多支队伍，就四个名额。"\n\n空气凝固了。',
    choices: [
      {
        text: '"你想走就走。但我不会停。"——坚持自己的路',
        next: 'ch3_s1_signup',
        effects: { '心态': 10, '团队': -8, '人气': 3 },
        flavor: '你的话很冷。但阿杰听完后，沉默了很久。他没有走。',
      },
      {
        text: '"打完这个赛季再说。就三个月。"——说服他留下',
        next: 'ch3_s1_signup',
        effects: { '团队': 8, '心态': 5, '实力': -3 },
        flavor: '"三个月。如果到时候还是看不到希望，我们一起退。" 阿杰抬起头，点了点。',
      },
      {
        text: '"行。我理解。"——接受现实，重新找人',
        next: 'ch3_s1_signup',
        effects: { '心态': -5, '人气': 5, '团队': -3 },
        flavor: '你拍了拍他的肩膀。有些不舍，但你尊重他的选择。战队需要重新洗牌。',
      },
    ],
    on_enter: { '心态': -5 },
  },

  // ==========================================
  // 第三章：海选之路
  // ==========================================

  'ch3_s1_signup': {
    id: 'ch3_s1_signup',
    chapter: 3,
    title: '海选报名',
    type: 'choice',
    text: 'TI15中国区海选赛。一千两百多支队伍。四个晋级名额。\n\n你坐在电脑前，看着报名页面倒数第二行的空白——"战队名"。\n\n阿杰凑过来："得取个有气势的名字。"\n\n队友们七嘴八舌——"龙之队"、"破晓"、"天梯亡者"...\n\n你盯着屏幕，想起了训练室的墙上那张Wings战队的海报。2016年，五个无名少年从海选一路杀到TI冠军。\n\n"他们当时战队名也很普通。" 你说。\n\n名字不重要。重要的是——你们准备好了吗？',
    choices: [
      {
        text: '取个简单有力的名字，专注比赛',
        next: 'ch3_s2_group',
        effects: { '心态': 5, '团队': 5 },
        flavor: '"就叫\'逐日\'吧。" 你在报名表上打下两个字。追逐TI的太阳。',
      },
      {
        text: '设计一个有梗的名字，吸引关注',
        next: 'ch3_s2_group',
        effects: { '人气': 10, '团队': -2 },
        flavor: '"\'低保户战队\'怎么样？" 队友们笑得前仰后合。这个名字确实容易被记住。',
      },
    ],
  },

  'ch3_s2_group': {
    id: 'ch3_s2_group',
    chapter: 3,
    title: '海选小组赛',
    type: 'choice',
    text: '海选小组赛。BO1循环，每组四队，只有第一能晋级。\n\n你们被分在了C组。除了你们，还有两支本地网吧队，以及——\n\n一支由退役职业选手组建的"老兵队"。他们的中单是三年前的TI四强选手。虽然退役了，但经验碾压在场所有人。\n\n"这怎么打？" 队友的声音有点慌。\n\n你翻开对阵表。第一场就是打老兵队。赢了，士气大振。输了，后面两场压力会非常大。',
    choices: [
      {
        text: '全力以赴打第一场——拿老兵队立威',
        next: 'ch3_s2_roshan',
        effects: { '实力': 5, '心态': -3, '人气': 5 },
        flavor: '"第一场就是决赛。" 你活动了一下手腕。不管对面是谁。',
      },
      {
        text: '保守策略——放掉第一场，确保赢后面两场',
        next: 'ch3_s2_roshan',
        effects: { '心态': 5, '实力': -2, '团队': 3 },
        flavor: '"老兵队的弱点在体力。我们前面稳一点，后面的队我们随便赢。"',
      },
    ],
  },

  'ch3_s2_roshan': {
    id: 'ch3_s2_roshan',
    chapter: 3,
    title: '海选小组赛 · Roshan团',
    type: 'reaction',
    text: '小组赛最后一场。你们和老兵队各赢两场，这一战决定谁出线。\n\n比赛进入第35分钟，双方僵持。Roshan刷新了。\n\n"必须拿下这个盾！" 阿杰标记了Roshan坑。\n\n五个人摸黑进入Roshan区域。视野里一片漆黑——老兵队可能也在附近。\n\nRoshan还剩最后一丝血。突然，敌方视野暴露——他们就在高坡上！\n\n抢盾时机——现在！',
    challenge: {
      mode: 'timing',
      difficulty: 'normal',
      timing_zone: [0.72, 0.88],
      flavor_success: '时机完美！你在Roshan倒下的一瞬间按下技能，抢到了不朽之守护！老兵队被迫撤退。',
      flavor_fail: '差了一点...但老兵队也没抢到！双方各退一步，你们利用兵线优势推掉了中路高地。',
      effects_success: { '实力': 10, '心态': 5 },
      effects_fail: {},
      next_success: 'ch3_s3_darkhorse',
      next_fail: 'ch3_s3_darkhorse',
    },
  },

  'ch3_s3_darkhorse': {
    id: 'ch3_s3_darkhorse',
    chapter: 3,
    title: '黑马对手',
    type: 'choice',
    text: '你们出线了。C组第一。\n\n下一轮对手的名单发过来时，所有人都沉默了。\n\n"YouthStorm"——赛前没人听说过这个名字。但这支队伍在小组赛里以全胜战绩出线，场均29分钟碾压对手。\n\n你连夜翻出他们的录像。五个人，操作不算顶尖，但配合默契得吓人——像是训练了一整年的职业队。\n\n"他们是从哪冒出来的？" 阿杰挠头。\n\n你又看了一遍录像，发现了一个细节——他们在前10分钟的打法和30分钟后完全不同，像是两个队伍。',
    choices: [
      {
        text: '深入研究他们的录像，制定针对战术',
        next: 'ch3_s3_intel',
        effects: { '实力': 5, '团队': 5 },
        flavor: '你熬了一夜，把他们每场的眼位画在纸上。发现了——他们辅助的眼位习惯有规律。',
      },
      {
        text: '相信自己的直觉和临场发挥',
        next: 'ch3_s3_intel',
        effects: { '心态': 8, '实力': 2 },
        flavor: '"看过录像就够了，看太多反而影响判断。" 你选择相信自己的临场感觉。',
      },
    ],
  },

  'ch3_s3_intel': {
    id: 'ch3_s3_intel',
    chapter: 3,
    title: '黑马对手 · 真假情报',
    type: 'puzzle',
    text: '赛前，教练递给你一份"情报"。\n\n"有人给我发了这个——YouthStorm的训练赛记录。但我觉得......有些不对劲。"\n\n你翻开情报。上面写着：YouthStorm的中单不擅长影魔，辅助不会玩陈，一号位只会刷不会打架。\n\n但你昨晚看了他们的录像——中单影魔打了三场全胜，辅助陈的传送时机堪称完美。\n\n这份情报和录像完全矛盾。是烟雾弹吗？',
    challenge: {
      mode: 'intel_verify',
      difficulty: 'normal',
      context: '你手上有两种信息：①匿名情报说对方中单不会影魔、辅助不会陈。②你自己的录像分析显示对方中单影魔全胜、辅助陈操作精准。你相信哪个？',
      options: [
        { id: 'A', text: '相信自己的录像分析——情报是烟雾弹', correct: true, reason: '你的判断是对的！录像不会骗人。这份情报是他们故意放出的烟雾弹，想让你Ban错英雄。' },
        { id: 'B', text: '相信匿名情报——录像可能是刻意表演', correct: false, reason: '录像样本量足够大，三场全胜不可能是演出来的。情报来源不明，可信度极低。' },
        { id: 'C', text: '两个都信——做两手准备', correct: false, reason: '在有限的BP时间里，你必须做出选择。半信半疑只会让自己犹豫。' },
        { id: 'D', text: '两个都不信——全凭感觉打', correct: false, reason: '在DOTA比赛里，没有情报是最差的选择。你已经有了确凿的录像数据，应该相信它。' },
      ],
      flavor_correct: '你的判断完全正确。Ban掉他们的陈后，对方辅助明显慌乱了。这确实是一份烟雾弹。教练拍了拍你："幸好你看过录像。"',
      flavor_wrong: '教练叹了口气："他们故意放出假情报，就是想让你怀疑自己。记住——录像从不说谎。下次相信你亲眼看到的。"',
      effects_correct: { '实力': 8, '心态': 5 },
      effects_wrong: { '心态': 3 },
      next_correct: 'ch3_s4_finals',
      next_wrong: 'ch3_s4_finals',
    },
  },

  'ch3_s4_finals': {
    id: 'ch3_s4_finals',
    chapter: 3,
    title: '海选决赛',
    type: 'choice',
    text: '海选赛打到最后一轮。128强。\n\n赢下这一场，你们就进入海选前64，拿到预选赛的门票。输了，今年的TI之路到此为止。\n\n对手是一支从预选掉下来的职业二队——"Thunder青年队"。\n\n对面五个人穿着统一队服。身后有教练，有分析师，有赞助商。\n\n而你们，队服是拼多多买的。教练就是阿杰在看台上举着手机录影。\n\n但DOTA这个游戏，在比赛开始之前，永远不知道谁会赢。',
    choices: [
      {
        text: '拿自己最擅长的阵容——打熟悉的体系',
        next: 'ch3_s4_dualtest',
        effects: { '团队': 8, '心态': 5 },
        flavor: '"打我们练了一百遍的东西。" 你相信熟悉的体系比针对对手更重要。',
      },
      {
        text: '研究对手弱点，用针对阵容出奇制胜',
        next: 'ch3_s4_dualtest',
        effects: { '实力': 8, '人气': 3 },
        flavor: '"他们的四号位是突破口。" 你制定了一套专门针对对方辅助的战术。',
      },
    ],
  },

  'ch3_s4_dualtest': {
    id: 'ch3_s4_dualtest',
    chapter: 3,
    title: '海选决赛 · 双重考验',
    type: 'reaction',
    text: '决胜局。BO1，一战定生死。\n\n比赛拖到了55分钟。双方各破两路。你买出圣剑——这是你最后的赌注。\n\n中路河道，十人遭遇。\n\n圣剑的光芒笼罩着你的英雄。这一波，赢就出线，输就回家。\n\n屏幕边缘红光闪烁——对方斧王跳刀切入！同时小地图上，他们的影魔绕后了——\n\n你需要做出瞬间判断：先杀谁？',
    challenge: {
      mode: 'sequence',
      difficulty: 'normal',
      time_limit: 5000,
      sequence: ['mid', 'bot'],
      flavor_success: '正确的目标选择！你秒掉影魔后转身集火斧王，一波2换5！圣剑还在！',
      flavor_fail: '目标顺序乱了...但阿杰的虚空假面完美大招罩住了两人！极限翻盘！',
      effects_success: { '实力': 12, '心态': 8 },
      effects_fail: { '团队': 8 },
      next_success: 'ch3_s4_bp',
      next_fail: 'ch3_s4_bp',
    },
  },

  'ch3_s4_bp': {
    id: 'ch3_s4_bp',
    chapter: 3,
    title: '海选决赛 · BP博弈',
    type: 'puzzle',
    text: '比赛进入BP阶段。对手先Ban先选。\n\n他们前两手Ban掉了你的影魔和水人——显然是研究过你。\n\n现在轮到你们Ban人。你需要选择Ban掉对方哪个核心英雄。\n\n对方一号位在之前的比赛里分别用过：虚空假面(2场全胜)、恐怖利刃(1场)、美杜莎(1场输)。\n\n他们的体系明显围绕一号位展开。',
    challenge: {
      mode: 'bp_deduce',
      difficulty: 'normal',
      context: '对方先Ban先选。他们已Ban影魔+水人。你需要Ban一个英雄。对方一号位数据：虚空假面2场全胜（KDA 9.2），恐怖利刃1场（KDA 5.1），美杜莎1场（输了，KDA 2.1）。对方很明显想拿虚空假面。',
      options: [
        { id: 'A', text: 'Ban虚空假面 — 他们最稳的英雄', correct: true, reason: '正确！虚空假面2场全胜KDA爆炸，是他们的绝对核心。Ban掉后他们只能拿TB或美杜莎，胜率明显下降。' },
        { id: 'B', text: 'Ban恐怖利刃 — 防止后期幻象带线', correct: false, reason: 'TB虽然强但对方只用过一场，不是首选。Ban一个出场率低的英雄等于浪费Ban位。' },
        { id: 'C', text: 'Ban美杜莎 — 她后期一打五', correct: false, reason: '美杜莎他们用了一场就输了，说明不擅长。Ban她等于帮对方排除错误选项。' },
        { id: 'D', text: '不Ban核心，Ban他们的辅助英雄', correct: false, reason: '对方的体系核心是一号位，BP应该优先限制核心。Ban辅助影响太小。' },
      ],
      flavor_correct: 'Ban掉虚空后，对方明显犹豫了。最后他们选了TB——你早就准备好了针对TB的阵容。BP阶段你已经赢了。',
      flavor_wrong: '对方秒选虚空假面。虽然意料之中，但你没有足够准备来应对。教练说："下次记住——BP就是心理战，封住对方最强的一张牌。"',
      effects_correct: { '实力': 8, '团队': 5 },
      effects_wrong: { '实力': 2 },
      next_correct: 'ch3_s5_sponsor',
      next_wrong: 'ch3_s4_eliminated',
    },
  },

  'ch3_s4_eliminated': {
    id: 'ch3_s4_eliminated',
    chapter: 3,
    title: '海选止步',
    type: 'choice',
    text: '输了。\n\nBO1的残酷就在于此——没有第二次机会。\n\n你坐在电脑前，看着"GG"两个字。队友们默默收拾外设。\n\n阿杰走过来，把手放在你肩上。\n\n"我们打到128强了。一千多支队伍，我们排进了前10%。" 他说。\n\n你看着屏幕上对手庆祝的画面。不甘心。非常不甘心。\n\n但阿杰说的对。这不是失败——这是起点。\n\n明年。你对自己说。明年一定要打进预选。',
    choices: [
      {
        text: '不甘心，但明年一定要打回来',
        next: 'ch5_alt_retire',
        effects: { '心态': 10, '实力': 5 },
        flavor: '"明年TI16。" 你把这个目标写在了训练室的墙上。',
        condition: { 'mentality': 30 },
      },
      {
        text: '累了...也许这条路不适合我',
        next: 'end_regret',
        effects: { '心态': -5 },
        flavor: '你关掉了DOTA2。桌面上，TI的报名邮件还没删。',
      },
    ],
    on_enter: { '心态': -10 },
  },

  'ch3_s5_sponsor': {
    id: 'ch3_s5_sponsor',
    chapter: 3,
    title: '赞助商抉择',
    type: 'choice',
    text: '海选前64。你们做到了。\n\n消息传开后，第一个联系你的人不是记者——是一个电竞俱乐部的经理。\n\n"逐日战队吗？我们想赞助你们。"\n\n他开出的条件不错：每月补贴、训练基地、统一的队服和设备。但有一个要求——你们需要搬到另一个城市，和他们旗下其他队员一起训练。\n\n这意味着你要离开现在的城市。离开你的训练室，你的生活习惯。\n\n阿杰有些犹豫。另一个队友直接说"不行"。\n\n但你知道，业余队和职业队的差距，很大程度上就是资源的差距。',
    choices: [
      {
        text: '接受赞助——搬去新基地，走职业化道路',
        next: 'ch4_s1_analysis',
        effects: { '实力': 5, '团队': -3, '人气': 8, '心态': -3 },
        flavor: '"职业选手，就该走职业的路。" 你签下了合同。新基地的电脑配置让你流口水。',
      },
      {
        text: '拒绝赞助——保持独立，按自己的方式打',
        next: 'ch4_s1_analysis',
        effects: { '心态': 8, '团队': 5, '人气': -5 },
        flavor: '"我们打到现在靠的是默契，不是赞助商。" 你把合同推了回去。经理的脸上写满了意外。',
      },
      {
        text: '谈条件——接受赞助但保留自主权',
        next: 'ch4_s1_analysis',
        effects: { '团队': 5, '人气': 5, '心态': 3 },
        flavor: '"我们可以接受赞助，但训练安排、阵容决定——必须由我们自己说了算。" 经理犹豫了一下，点头了。',
        condition: { 'mentality': 55, 'popularity': 45 },
        lockedText: '（需要更坚定的心态和一定的人气基础）',
      },
    ],
  },

  // ==========================================
  // 第四章：预选之巅
  // ==========================================

  'ch4_s1_analysis': {
    id: 'ch4_s1_analysis',
    chapter: 4,
    title: '预选赛制分析',
    type: 'puzzle',
    text: '预选赛抽签结果出来了。你们被分在B组。\n\n教练把对阵表贴在白板上："六支队伍，双败淘汰。前两名晋级TI中国区预选决赛。"\n\n你的目光扫过对手名单——两支海选上来的队伍，三支职业二队。\n\n"还有一支，上届TI的参赛队伍——从预选打上来的黑马。" 教练的声音沉了下来。\n\n你需要制定赛前策略。',
    challenge: {
      mode: 'map_read',
      difficulty: 'normal',
      context: 'B组六队：你们、A队(海选)、B队(职业二队)、C队(职业二队)、D队(职业二队)、E队(上届TI队伍)。赛制是双败淘汰。E队是最大热门。最好的赛程策略是什么？',
      options: [
        { id: 'A', text: '研究败者组对手——做好两线作战准备', correct: false, reason: '还没打就考虑败者组，心态上已经输了。' },
        { id: 'B', text: '全力准备首轮——一场一场打', correct: true, reason: '正确！双败赛制最重要的是第一场。赢了进入胜者组，赛程压力减半。' },
        { id: 'C', text: '主要研究E队——他们是唯一威胁', correct: false, reason: '专注E队没错，但首轮如果输了就要连赢三场才能晋级。' },
        { id: 'D', text: '研究所有对手——平均分配精力', correct: false, reason: '时间有限，平均分配等于没有重点。' },
      ],
      flavor_correct: '教练点头："思路清晰。双败赛制，胜者组的每一场都价值连城。先打好首轮。"',
      flavor_wrong: '教练摇头："别想那么远。双败赛制最重要的是首轮——赢了你就在胜者组。"',
      effects_correct: { '实力': 5, '心态': 5 },
      effects_wrong: { '心态': 3 },
      next_correct: 'ch4_s2_bp',
      next_wrong: 'ch4_s2_bp',
    },
  },

  'ch4_s2_bp': {
    id: 'ch4_s2_bp',
    chapter: 4,
    title: 'BP博弈',
    type: 'puzzle',
    text: '胜者组决赛。对手的BP以诡诈著称。\n\n他们Ban了影魔和潮汐猎人。Ban潮汐这个选择让人意外——潮汐通常不在优先Ban位。\n\n除非——他们想拿什么怕团控的阵容？',
    challenge: {
      mode: 'bp_deduce',
      difficulty: 'normal',
      context: '对方Ban了影魔和潮汐猎人。他们先选。Ban潮汐透露了什么？潮汐的团控克制什么体系？',
      options: [
        { id: 'A', text: '他们想拿召唤物推进体系', correct: false, reason: '召唤推进怕的是AOE清兵，不是团控。' },
        { id: 'B', text: '他们想拿机动性强的打架阵容', correct: true, reason: '正确！Ban潮汐是为了防止团控克制他们的灵活性。准备带沉默的反手。' },
        { id: 'C', text: '他们想拿四保一阵容', correct: false, reason: '四保一不怕团控——有救人英雄。' },
        { id: 'D', text: '虚晃一枪——没有特别意图', correct: false, reason: '预选赛级别，每个Ban位都有意图。' },
      ],
      flavor_correct: '你猜对了。对方第一手Pick帕克——果然是机动阵容。你立刻选下沉默术士反制。对方教练表情变了。',
      flavor_wrong: '判断错了方向。对方拿下狼人——是推进体系。教练低声说："Ban潮汐是因为怕团控打断推进。学到了。"',
      effects_correct: { '实力': 10, '团队': 5, '心态': 5 },
      effects_wrong: { '实力': 3 },
      next_correct: 'ch4_s3_bracket',
      next_wrong: 'ch4_s3_bracket',
    },
  },

  'ch4_s3_bracket': {
    id: 'ch4_s3_bracket',
    chapter: 4,
    title: '胜者组/败者组',
    type: 'choice',
    text: '预选赛打到了最关键的时刻。\n\n你们在胜者组惜败，掉入了败者组。现在只剩下最后一次机会——再输一场，TI之旅终止。\n\n更衣室里，气氛压抑得能拧出水来。\n\n有人敲了敲门。是对面队伍的教练。\n\n"打得不错。" 他说，"你们的思路是好的。但你们太紧张了。最后那波团，如果先处理辅助，结果可能不一样。"\n\n说完他就走了。',
    choices: [
      {
        text: '把压力变成动力——最后一场放开打',
        next: 'ch4_s3_clutch',
        effects: { '心态': 10, '团队': 5 },
        flavor: '"都已经这样了，还有什么好怕的？" 你站起来，用力拍了拍手。',
      },
      {
        text: '冷静分析上一场的失误，调整战术',
        next: 'ch4_s3_clutch',
        effects: { '实力': 8, '团队': 3 },
        flavor: '你打开录像，0.5倍速回看最后一波团。找到了——是视野问题。',
      },
    ],
    on_enter: { '心态': -5 },
  },

  'ch4_s3_clutch': {
    id: 'ch4_s3_clutch',
    chapter: 4,
    title: '败者组 · 团战目标',
    type: 'reaction',
    text: '败者组决赛。赢了就进TI预选决赛。\n\n比赛第38分钟，关键团战在Roshan坑爆发。\n\n敌方五人抱团推进。你的视野里同时出现了三个关键目标——\n\n敌方一号位在侧翼输出、五号位在插眼、三号位跳刀CD刚转好。\n\n一瞬间的判断，决定这场团战的方向。',
    challenge: {
      mode: 'sequence',
      difficulty: 'normal',
      time_limit: 4500,
      sequence: ['bot', 'mid', 'top'],
      flavor_success: '目标优先级完美！先秒辅助破视野，再杀中单断节奏，最后处理一号位。0换5！',
      flavor_fail: '击杀顺序混乱，但你们硬是靠装备优势打出了3换4。残胜也是胜！',
      effects_success: { '实力': 12, '团队': 8 },
      effects_fail: { '团队': 5 },
      next_success: 'ch4_s4_bo3',
      next_fail: 'ch4_s4_bo3',
    },
  },

  'ch4_s4_bo3': {
    id: 'ch4_s4_bo3',
    chapter: 4,
    title: '生死BO3',
    type: 'choice',
    text: '预选决赛。BO3。\n\n1:1，决胜局。\n\nBP阶段，对方最后一手亮出了米波——全场骚动。\n\n"米波？他们在训练赛里从来没选过。" 教练的声音有点紧。',
    choices: [
      {
        text: '相信自己的英雄池——拿最擅长的对位英雄',
        next: 'ch4_s4_finaltest',
        effects: { '实力': 8, '心态': 5 },
        flavor: '"米波怕AOE和沉默。我拿痛苦之源。" 你的应对思路清晰。',
      },
      {
        text: '针对米波——选克制阵容',
        next: 'ch4_s4_finaltest',
        effects: { '实力': 3, '团队': 8 },
        flavor: '"拿撼地神牛+术士。团战把他们融了。" 用团队配合弥补英雄熟练度。',
      },
    ],
  },

  'ch4_s4_finaltest': {
    id: 'ch4_s4_finaltest',
    chapter: 4,
    title: '生死BO3 · 双考验',
    type: 'reaction',
    text: '决胜局第48分钟。\n\n基地只剩下最后一座兵营。对面米波六神装，正在拆门牙塔。\n\n"买活！全部买活！" 阿杰声音沙哑。\n\n你买活了。跳刀切入的瞬间，必须BKB+撒旦同时开启——',
    challenge: {
      mode: 'click_target',
      difficulty: 'normal',
      time_limit: 2500,
      flavor_success: 'BKB完美时机！你在米波的网中站稳脚跟。撒旦一开，吸血如虹——基地守住了！反击！',
      flavor_fail: 'BKB慢了一瞬...但队友撼地神牛的回音击炸到了四人！米波被控住了！抓住了转瞬即逝的机会！',
      effects_success: { '实力': 10, '心态': 10 },
      effects_fail: { '团队': 8 },
      next_success: 'ch4_s5_qualified',
      next_fail: 'ch4_s5_qualified',
    },
  },

  'ch4_s5_qualified': {
    id: 'ch4_s5_qualified',
    chapter: 4,
    title: '出线',
    type: 'choice',
    text: '赢了！！！\n\n你双手离开键盘，浑身发抖。\n\n屏幕上，敌方基地爆炸。队友们尖叫着扑到你身上。教练在角落里摘下眼镜擦眼泪。\n\n你们做到了。从网吧赛走到TI中国区预选出线。拿到了飞往上海的机票。\n\n手机疯狂震动。ShadowBlade发来两个字："牛逼。"\n\n你的妈妈："儿子，我看到新闻了。为你骄傲。"\n\n你放下手机，看着窗外。上海。TI。你来了。',
    choices: [
      {
        text: '庆祝一晚，然后全力备战TI',
        next: 'ch5_s1_arrival',
        effects: { '心态': 8, '团队': 3 },
        flavor: '这一夜，你们在路边摊吃到凌晨三点。阿杰说："我这辈子值了。" 你说："还早呢。"',
      },
      {
        text: '立刻开始研究TI对手',
        next: 'ch5_s1_arrival',
        effects: { '实力': 5, '人气': 3, '心态': -2 },
        flavor: '你只喝了半杯可乐。打开电脑，开始下载TI对手的比赛录像。',
      },
    ],
    on_enter: { '心态': 10, '人气': 10 },
  },

  // ==========================================
  // 第五章：上海之战
  // ==========================================

  'ch5_s1_arrival': {
    id: 'ch5_s1_arrival',
    chapter: 5,
    title: '抵达上海',
    type: 'choice',
    text: '飞机降落在浦东机场。\n\nTI的Logo无处不在——金色盾牌，血红色背景。大堂里，欧洲队伍穿着潮牌聊天，东南亚队伍围在一起看手机，北美那边有个人好像是Sumail——\n\n你掐了自己一下。不是在做梦。\n\n"我们的房间在18楼。" 阿杰跑过来，"可以看到黄浦江！"\n\n明天就是小组赛。今晚你还有时间。',
    choices: [
      {
        text: '去训练室热身——保持手感',
        next: 'ch5_s2_groups',
        effects: { '实力': 5, '心态': 2 },
        flavor: 'TI的训练室配置是你见过最好的。240Hz显示器，专业电竞椅。',
      },
      {
        text: '和队友出去走走——感受上海的氛围',
        next: 'ch5_s2_groups',
        effects: { '心态': 8, '团队': 5 },
        flavor: '你们在外滩吹着江风。阿杰突然说："如果我们真的夺冠了...会怎么样？"',
      },
      {
        text: '研究小组赛对手的录像',
        next: 'ch5_s2_groups',
        effects: { '实力': 8, '心态': -3 },
        flavor: '你看到了一个细节——那支欧洲队的辅助在劣势局会心态崩盘。',
      },
    ],
  },

  'ch5_s2_groups': {
    id: 'ch5_s2_groups',
    chapter: 5,
    title: '小组赛',
    type: 'puzzle',
    text: 'TI小组赛首战——一支东南亚战队。\n\n他们的打法独特：15分钟准时抱团推塔，不给对手发育空间。\n\n"节奏太快了。" 教练在战术板上画着时间线。\n\n你必须决定：跟上他们的节奏打前期，还是拖后期靠装备取胜？',
    challenge: {
      mode: 'item_build',
      difficulty: 'normal',
      context: '对手15分钟必抱团推进。你是中单，通常出装：瓶子→鞋→第一件大件。面对快节奏需要调整。',
      options: [
        { id: 'A', text: '跳过瓶子，直接出战鼓——15分钟有战力', correct: true, reason: '正确！战鼓提供移速攻速，15分钟刚好有战斗力，不会掉队。' },
        { id: 'B', text: '正常出装——辉耀憋后期', correct: false, reason: '等你辉耀做出来比赛可能已经结束了。' },
        { id: 'C', text: '出跳刀——先手抓人打断节奏', correct: false, reason: '跳刀没属性，团战站不住。' },
        { id: 'D', text: '出梅肯斯姆——团队恢复', correct: false, reason: '你是中单不是辅助，出梅肯浪费输出潜力。' },
      ],
      flavor_correct: '战鼓在14分钟做出！对手15分钟抱团时，你们的战斗力丝毫不落下风。东南亚队明显没想到。',
      flavor_wrong: '对手14分钟就推到了高地。教练说："打东南亚队伍不能按常规节奏来。"',
      effects_correct: { '实力': 8, '心态': 5 },
      effects_wrong: { '实力': 3 },
      next_correct: 'ch5_s3_mainstage',
      next_wrong: 'ch5_s3_mainstage',
    },
  },

  'ch5_s3_mainstage': {
    id: 'ch5_s3_mainstage',
    chapter: 5,
    title: '主舞台首秀',
    type: 'reaction',
    text: '小组赛出线。下一个通知让所有人说不出话——\n\n"下一场比赛：主舞台。"\n\nTI主舞台。两万观众。聚光灯比太阳还亮。全球几百万人在看直播。\n\n你走上舞台的时候腿在发抖。耳机戴上，世界安静了。\n\n比赛开始。第一波兵线交汇——敌方中单先手出击！',
    challenge: {
      mode: 'click_target',
      difficulty: 'normal',
      time_limit: 2200,
      flavor_success: '完美避开先手，反手打出优势！两万观众的欢呼穿透隔音耳机。无法形容。',
      flavor_fail: '被先手了！但辅助瞬间给到关键技能——"我在！" 这种默契只有训练了上千遍才会有。',
      effects_success: { '实力': 8, '心态': 8, '人气': 5 },
      effects_fail: { '团队': 8, '人气': 3 },
      next_success: 'ch5_s4_playoffs',
      next_fail: 'ch5_s4_playoffs',
    },
  },

  'ch5_s4_playoffs': {
    id: 'ch5_s4_playoffs',
    chapter: 5,
    title: '淘汰赛',
    type: 'choice',
    text: 'TI淘汰赛。一场定生死。\n\n你们打进了前六——超出所有人预期。国内媒体开始报道："从海选到TI六强——逐日战队的奇迹之旅。"\n\n但更衣室里没人提"已经很好了"。\n\n"我们来这里不是为了六强。" 阿杰站起来。\n\n下一场对手是欧洲区冠军。对方队长在采访中说："逐日？不错的队伍。但我们来上海是为了冠军。"',
    choices: [
      {
        text: '用行动回应——在比赛中证明自己',
        next: 'ch5_s4_finalpush',
        effects: { '实力': 8, '心态': 8 },
        flavor: '"他们来上海是为了冠军。但我们也是。" 你说。',
      },
      {
        text: '在采访中正面回应——提高士气',
        next: 'ch5_s4_finalpush',
        effects: { '人气': 10, '心态': 3 },
        flavor: '你在摄像机前说："我们不是来当配角的。" 这句话登上了热搜。',
      },
    ],
  },

  'ch5_s4_finalpush': {
    id: 'ch5_s4_finalpush',
    chapter: 5,
    title: '淘汰赛 · 最后一搏',
    type: 'reaction',
    text: '对阵欧洲冠军。第三局。60分钟。\n\n双方都出了圣剑。\n\n敌方核心暴露了一瞬间的位置——在收线，队友不在。\n\n单杀他，一波推平基地。但如果你被反杀——圣剑会掉。\n\n手指悬在跳刀键上——',
    challenge: {
      mode: 'timing',
      difficulty: 'hard',
      timing_zone: [0.75, 0.90],
      flavor_success: '正确时机跳入！秒杀！圣剑没有掉落——一波推平欧洲冠军的基地！全场起立！',
      flavor_fail: '时机差了一点——但队友的远程技能补上了伤害！圣剑保住了！解说嘶吼："这是什么极限配合！！"',
      effects_success: { '实力': 15, '心态': 10 },
      effects_fail: { '团队': 10 },
      next_success: 'ch5_s5_finals',
      next_fail: 'ch5_s5_finals',
    },
  },

  'ch5_s5_finals': {
    id: 'ch5_s5_finals',
    chapter: 5,
    title: '总决赛',
    type: 'reaction',
    text: 'TI15 上海站 总决赛。\n\n对面是卫冕冠军。\n\n场馆坐满了。妈妈坐在第三排，举着"儿子加油"的手写牌子。\n\n第25分钟关键团战。卫冕冠军展示了为什么他们是冠军——完美的技能衔接，你方瞬间倒下三人。\n\n只剩你和阿杰。两人面对五人推进。\n\n高地塔见底。门牙塔。基地。\n\n——你买活了。\n\n跳刀CD转好。敌方五人在拆基地。这是最后的反击——',
    challenge: {
      mode: 'click_target',
      difficulty: 'hard',
      time_limit: 2000,
      flavor_success: '跳刀切入！BKB开启！五个人中间炸出完美输出——三杀！阿杰接控——敌方团灭！翻盘！！！整个场馆地震了！',
      flavor_fail: '跳入敌阵打出全部输出。倒下了，但阿杰抢到了不朽盾！买活！再战！基地剩最后一丝血——守住了！全场呐喊震耳欲聋！',
      effects_success: { '实力': 15, '心态': 15, '人气': 20 },
      effects_fail: { '团队': 15, '人气': 15 },
      next_success: 'ch6_ending',
      next_fail: 'ch6_ending',
    },
  },

  // ==========================================
  // 替代路线：未出线
  // ==========================================

  'ch5_alt_retire': {
    id: 'ch5_alt_retire',
    chapter: 5,
    title: '新的方向',
    type: 'choice',
    text: '海选止步后，你回到了正常的生活。但DOTA不会离开你。\n\n这段逐梦之旅虽然没能走到终点，但路上的风景——那些并肩作战的深夜、赢下比赛的狂喜、失败后的不甘——都是真实的。\n\n你打开电脑，看着DOTA2图标。接下来该走哪条路？',
    choices: [
      {
        text: '转型解说——用另一种方式留在赛场',
        next: 'end_caster',
        effects: { '人气': 10, '心态': 5 },
        flavor: '你开始在网上做比赛复盘。观众说："这个解说的理解很深。"',
      },
      {
        text: '成为教练——把经验传授给后来者',
        next: 'end_coach',
        effects: { '实力': 5, '团队': 10 },
        flavor: '一支新的海选队伍联系了你："我们需要一个懂战术的人。"',
      },
      {
        text: '开直播——和水友一起享受DOTA',
        next: 'end_streamer',
        effects: { '人气': 15, '心态': 5 },
        flavor: '直播间标题改成："前TI海选选手，在线教DOTA。"',
      },
      {
        text: '继续打——明年从头再来',
        next: 'end_retry',
        effects: { '心态': 10, '实力': 5 },
        flavor: '"一次失败而已。" 你重新打开了DOTA2。',
      },
    ],
  },

  // ==========================================
  // 第六章：终章 — 10个结局
  // ==========================================

  'ch6_ending': {
    id: 'ch6_ending',
    chapter: 6,
    title: '命运的分岔',
    type: 'choice',
    text: '比赛结束了。\n\n你站在舞台上，灯光照得睁不开眼。\n\n这一段旅程——从天梯冲分到TI赛场——每一个选择都在塑造今天的你。\n\n最终结局，取决于你走过的路。',
    choices: [
      {
        text: '（根据你的旅程决定最终结局）',
        next: 'ch6_routing',
        effects: {},
      },
    ],
  },

  'ch6_routing': {
    id: 'ch6_routing',
    chapter: 6,
    title: '',
    type: 'choice',
    text: '',
    choices: [
      { text: '.', next: 'end_champion', effects: {}, condition: { 'skill': 85, 'mentality': 80, 'teamwork': 90 } },
      { text: '.', next: 'end_runnerup', effects: {}, condition: { 'skill': 75, 'mentality': 65, 'teamwork': 70 } },
      { text: '.', next: 'end_top4', effects: {}, condition: { 'skill': 65, 'teamwork': 60 } },
      { text: '.', next: 'end_darkhorse', effects: {}, condition: { 'skill': 60 } },
      { text: '.', next: 'end_legend', effects: {}, condition: { '_playthrough': 3, '_allEndings': true }, ngPlus: true },
      { text: '.', next: 'end_runnerup', effects: {} },
    ],
  },

  'end_champion': {
    id: 'end_champion', chapter: 6, title: '终章', type: 'ending', endingId: 1,
    endingIcon: '🏆', endingTitle: '上海之王', endingRarity: '传说',
    endingText: '你捧起了冠军神盾。\n\n金色的盾牌比想象中重得多。历届冠军的名字刻在上面——NaVi、Alliance、Wings、OG、Spirit...\n\n现在，你们的名字也在上面了。\n\n阿杰在旁边哭得稀里哗啦。教练难得笑了。\n\n你想起第一次在网吧打线下赛的场景——那个手抖的少年。\n\n如果那时候选择了放弃，就没有今天的这一刻。\n\n上海。TI。冠军。\n\n你终于可以说出那句话了——\n\n"我打上海TI了。我赢了。"',
    text: '', choices: [],
  },

  'end_runnerup': {
    id: 'end_runnerup', chapter: 6, title: '终章', type: 'ending', endingId: 2,
    endingIcon: '🥈', endingTitle: '咫尺之遥', endingRarity: '稀有',
    endingText: '决赛输了。但你们打到了决赛。一支从海选杀上来的队伍站在TI总决赛舞台上——本身就是奇迹。\n\n亚军的奖杯也很重。\n\n阿杰说："明年。明年把它换成金色的。"\n\n你笑了。"好。明年TI16。"\n\n遗憾吗？有一点。但更多的是骄傲。\n\n你们让所有人看到了——梦想这个东西，只要你不放弃它，它就不会放弃你。',
    text: '', choices: [],
  },

  'end_top4': {
    id: 'end_top4', chapter: 6, title: '终章', type: 'ending', endingId: 3,
    endingIcon: '🥉', endingTitle: '四强荣耀', endingRarity: '稀有',
    endingText: '四强。\n\n差了两步。但这两步，比从零到四强还要遥远。\n\n教练走过来："我们比预想的多走了很远。"\n\n当你走出场馆，一群粉丝围了上来。一个小男孩问："明年还打吗？"\n\n你蹲下来："打。一定打。"\n\n不是因为不甘心。而是这条路——你已经爱上了。',
    text: '', choices: [],
  },

  'end_darkhorse': {
    id: 'end_darkhorse', chapter: 6, title: '终章', type: 'ending', endingId: 4,
    endingIcon: '🌟', endingTitle: '黑马奇迹', endingRarity: '稀有',
    endingText: '没人想到你们能走到这里。包括你们自己。\n\n从城市网吧赛到TI赛场，每一步都像在悬崖上走钢丝。但你们走下来了。\n\n回顾这段旅程，最重要的不是操作——\n\n而是在最艰难的时候，你们没有散。\n\n阿杰说："其实我那次说想走的时候，差点就真走了。"\n\n"为什么没走？" 你问。\n\n他想了想："因为你说你想打上海TI。我觉得你不是在说大话。"\n\n有时，一句真心的梦想，就是最好的凝聚力。',
    text: '', choices: [],
  },

  'end_caster': {
    id: 'end_caster', chapter: 6, title: '终章', type: 'ending', endingId: 5,
    endingIcon: '📺', endingTitle: '解说新星', endingRarity: '常见',
    endingText: '你不再坐在选手席上。但你坐在了解说台上。\n\n第一次解说时紧张得要命。但当你开始分析团战——那些你曾经亲身经历过的场面——话就自然流出来了。\n\n弹幕从"这人谁啊"变成了"讲得真好"。\n\nTI16的解说名单里，有了你的名字。\n\n虽然不是以选手身份重返TI——但解说台，也是赛场的一部分。\n\n你的声音，将被数百万人听到。',
    text: '', choices: [],
  },

  'end_coach': {
    id: 'end_coach', chapter: 6, title: '终章', type: 'ending', endingId: 6,
    endingIcon: '🎓', endingTitle: '冠军教头', endingRarity: '常见',
    endingText: '三年后。\n\n你站在训练室里，面对五个年轻人。他们的眼神和当年的你一模一样。\n\n"教练，你觉得我们能打到TI吗？"\n\n你笑了。这个问题，你也问过自己。\n\n"能。" 你说，"但前提是——你们得相信自己。"\n\n一年后，这支队伍打进了TI预选。\n\n你没能以选手身份举起冠军神盾。但你的弟子可以。\n\n这或许是另一种圆满。',
    text: '', choices: [],
  },

  'end_streamer': {
    id: 'end_streamer', chapter: 6, title: '终章', type: 'ending', endingId: 7,
    endingIcon: '🌊', endingTitle: '主播之路', endingRarity: '常见',
    endingText: '直播间人数突破一万。\n\n弹幕刷得飞快——"这人以前打过海选！" "什么时候复出？"\n\n你一边操作一边回答："复出？我现在不是在打吗？"\n\n确实，你还在打DOTA。每天都在打。只是没有了比赛的紧张，没有了胜负的沉重。纯粹的快乐。\n\n有一次弹幕问："后悔当初没有继续打职业吗？"\n\n你想了想："不后悔。因为每条路都有它的风景。"',
    text: '', choices: [],
  },

  'end_retry': {
    id: 'end_retry', chapter: 6, title: '终章', type: 'ending', endingId: 8,
    endingIcon: '🔄', endingTitle: '明年再来', endingRarity: '常见',
    endingText: '训练室墙上那张目标白纸上，"TI15 上海"旁边加了一行新字——"TI16"。\n\n阿杰推门进来："准备好了吗？"\n\n"早就准备好了。"\n\nDOTA这个游戏最神奇的地方就是——只要你不卸载它，它就永远不会放弃你。\n\n新的赛季。新的天梯。新的海选。\n\n和去年不同的是——今年，你知道这条路该怎么走了。',
    text: '', choices: [],
  },

  'end_regret': {
    id: 'end_regret', chapter: 6, title: '终章', type: 'ending', endingId: 9,
    endingIcon: '💔', endingTitle: '遗憾退场', endingRarity: '常见',
    endingText: '很久以后。你在B站刷到一个视频——"那些年的天才少年，现在怎么样了？"\n\n弹幕飘过："可惜了。" "他其实很厉害的。" "如果当时..."\n\n你关掉了视频。\n\n如果当时——这句话你在心里重复了无数遍。\n\n但你已经不再是那个可以通宵训练的少年了。生活推着你往前走。\n\n不过偶尔，你还是会打开游戏。选影魔。走中路。\n\n仿佛什么都没变过。',
    text: '', choices: [],
  },

  'end_legend': {
    id: 'end_legend', chapter: 6, title: '终章', type: 'ending', endingId: 10,
    endingIcon: '🔮', endingTitle: '传奇不灭', endingRarity: '隐藏',
    endingText: '屏幕暗了下来。\n\n一行字缓缓浮现——\n\n"在你的每一个选择里，都有一个不同的故事。"\n\n"有些故事里你是冠军，有些故事里你选择了另一条路。"\n\n"但不论结局如何——你曾经追过梦。"\n\n"你曾经说过那句——\'我要打上海TI。\'"\n\n"而这句话本身——就是一个传奇。"\n\n谢谢你，玩家。\n\n天梯还在继续。海选还在继续。梦想也在继续。\n\n——THE END——',
    text: '', choices: [],
  },
};

// If the last choice has next: null, go back to start screen
// (Handled in engine)
