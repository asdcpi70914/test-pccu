var express = require('express'); //從local取得express
var app = express();
var postList = [
	{ id: 1, name: "", msg: "" },
	{ id: 2, name: "", msg: "" },
	{ id: 3, name: "", msg: "" }
]; 
var count = postList.length;

//檢查使用者登入狀態
var isLogin = false;
var checkLoginStatus = function(req, res){
	isLogin = false;
	if(req.signedCookies.userid && req.signedCookies.password){
		isLogin = true;
	}
};

//首頁
exports.index = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'index', {
		title : '歡迎來到 Kevin的英文教學網站', 
		loginStatus : isLogin,
		posts : postList
	});	
};

//留言板
exports.newentry = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'newentry', {
		title : '留言板', 
		loginStatus : isLogin,
	});	
};

//列出留言
var entries = [];
app.locals.entries = entries;
exports.doNewentry = function(req, res){
	if (!req.body.title || !req.body.body) {
		res.status(400).send("Entries must have a title and a body.");
		return; 
	}

	entries.push({
    title: req.body.title,
    content: req.body.body,
    published: new Date()
	});
  
  return res.redirect("/board");
};

//留言
exports.board = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'board', {
		title : '留言內容', 
		loginStatus : isLogin,
		entries: app.locals.entries,
	});	
};

//國小文法
exports.ele = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'ele', {
		title : '國小文法', 
		loginStatus : isLogin,
	});	
};

//基本疑問詞
var fqwArray=[{
  "name": "What",
  "mean": "什麼",
  "where": "用來詢問事物，後面可加上名詞，以縮小詢問範圍。",
  "example": "what do you do ?",
},
{
  "name": "Who",
  "mean": "誰",
  "where": "用來詢問人。",
  "example": "Who is she ?",
},
{
  "name": "When",
  "mean": "何時",
  "where": "用來詢問時間。",
  "example": "When does he go to school ?",
},
{
  "name": "Why",
  "mean": "為什麼",
  "where": "用來詢問原因、理由。",
  "example": "Why are you late ?",
},
{
  "name": "Which",
  "mean": "哪裡",
  "where": "用來詢問特定範圍的某ㄧ對象。",
  "example": "Which sport do you like ?",
},
{
  "name": "Where",
  "mean": "哪一個",
  "where": "用來詢問地點、場所。",
  "example": "Where are you ?",
},
{
  "name": "How",
  "mean": "如何",
  "where": "用來詢問情況、方式。",
  "example": "How are you ?",
}];
exports.fqw = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'fqw', {
		title : '基本疑問詞', 
		loginStatus : isLogin,
		fqwArray:fqwArray,
	});	
};

var fesArray=[{
  "sen": "主詞+動詞",
  "example": "He swims.　他平常有在游泳。",
  "explain": "一般來說,句子最重要的兩個部分就是主詞和動詞,這兩者好比人類的頭和心臟，缺一不可。",
  "compare": "",
},
{
  "sen": "主詞+動詞+受詞",
  "example": "Tony bought a cell phone.　湯尼買了一隻手機。",
  "explain": "以上例句若變成「湯尼買了」句子的意思便不完整了,對吧？而「手機」這種承受動詞的人事物就叫做「受詞」。",
  "compare": "",
},
{
  "sen": "主詞+動詞+補語",
  "example": "She is a teacher.　她是老師。",
  "explain": "這類型的動詞,因為本身不具意義,只是把主詞和補語畫上等號,所以我們叫它「連綴動詞」,意思就是連繫前後者,讓它們產生關係。",
  "compare": "第三種句型和第二種很像,差別只在「受詞」和「補語」,以第二種句型的例句為例,省略「手機」你至少還知道做動作的人是湯尼,而他買了一樣東西,只是不知道買了什麼。但第三種句型的動詞完全沒有意義，它是「Be 動詞」,中文翻譯成「是」。",
},
{
  "sen": "主詞+動詞+受詞+受詞",
  "example": " I gave you a book.　我給你一本書。",
  "explain": "「給」的動作一定要包含兩個名詞–給誰？給什麼東西？於是乎,後面就很自然需要兩個受詞,否則句子的意思就不完整了,而這種動詞基本上都含有「給予」的意思,所以我們叫它「授與動詞」。",
  "compare": "第四種乍看之下和第二種很像,都是「主詞 + 動詞 + 受詞」,差別是在第四種比第二種多了一個受詞,原因是這類型的動詞必須牽涉到兩個人事物。",
},
{
  "sen": "主詞+動詞+受詞+補語",
  "example": "I believe her a teacher.　我相信她是老師。",
  "explain": "套用剛剛學過的第三種句型,我們可以得知–第五種句型的補語,其實就是為了「補充說明」受詞的狀況,就這麼簡單！因為它是補充受詞的狀況,所以我們可以叫它「受詞補語」,來和第三種句型直接補充主詞狀況的補語做區別。",
  "compare": "如果說第四種句型和第二種句型很像,那麼講到第五種句型你會聯想到啥？當然是也有「補語」的第三種句型囉！沒錯,它們是有關係的。",
}];
//五大基本句型
exports.fes = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'fes', {
		title : '五大基本句型', 
		loginStatus : isLogin,
		fesArray:fesArray,
	});	
};

//國中文法
exports.jun = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'jun', {
		title : '國中文法', 
		loginStatus : isLogin,
	});	
};

var freArray=[{
  "name": "always",
  "pa": "100%",
  "expamle": "I always play basketball.",
  "where": "1.be動詞後 2.一般動詞前 3.助動詞與原行動詞間 4.簡答句中,頻率副詞一律放在be動詞或是助動詞前",
},
{
  "name": "usually",
  "pa": "75%",
  "expamle": "what do you usually do ?",
  "where": "1.be動詞後 2.一般動詞前 3.助動詞與原行動詞間 4.簡答句中,頻率副詞一律放在be動詞或是助動詞前",
},
{
  "name": "often",
  "pa": "50%",
  "expamle": "I often play tennis",
  "where": "1.be動詞後 2.一般動詞前 3.助動詞與原行動詞間 4.簡答句中,頻率副詞一律放在be動詞或是助動詞前",
},
{
  "name": "sometimes",
  "pa": "25%",
  "expamle": "I sometimes play baseball on Sunday morning.",
  "where": "1.be動詞後 2.一般動詞前 3.助動詞與原行動詞間 4.簡答句中,頻率副詞一律放在be動詞或是助動詞前",
},
{
  "name": "seldom",
  "pa": "10%",
  "expamle": "I seldom go to bed before 10p.m.",
  "where": "1.be動詞後 2.一般動詞前 3.助動詞與原行動詞間 4.簡答句中,頻率副詞一律放在be動詞或是助動詞前",
},
{
  "name": "never",
  "pa": "0%",
  "expamle": "He never goes to school by bus.",
  "where": "1.be動詞後 2.一般動詞前 3.助動詞與原行動詞間 4.簡答句中,頻率副詞一律放在be動詞或是助動詞前",
}];
//頻率副詞
exports.fre = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'fre', {
		title : '頻率副詞', 
		loginStatus : isLogin,
		freArray:freArray,
	});	
};

var relaArray=[{
  "name": "Who",
  "replace": "人",
  "expamle": "The girl who is riding a tricycle is my sister. 那個正在騎三輪車的女孩是我的妹妹。",
},
{
  "name": "Which",
  "replace": "事物或動物",
  "expamle": "He has a dog which barks loudly.他有一隻狗它吠叫很大聲。",
},
{
  "name": "That",
  "replace": "有時候可以取代Who或Which",
  "expamle": "I like the watch that my father gave me.我喜歡我父親給我的手錶。",
}];
//關係代名詞
exports.rela = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'rela', {
		title : '關係代名詞', 
		loginStatus : isLogin,
		relaArray:relaArray,
	});	
};

var relatArray=[{
  "pre": "人",
  "main": "who",
  "acce": "whom",
  "all": "whose",
},
{
  "pre": "事物/動物",
  "main": "which",
  "acce": "which",
  "all": "",
},
{
  "pre": "人/事物/動物",
  "main": "that",
  "acce": "that",
  "all": "",
}];
//關係代名詞表格
exports.relat = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'relat', {
		title : '關係代名詞表格', 
		loginStatus : isLogin,
		relatArray:relatArray,
	});	
};

//註冊頁面
exports.reg = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'reg', {
		title : '註冊',
		loginStatus : isLogin
	});
};

//執行註冊
exports.doReg = function(req, res){
	if(req.body['password-repeat'] != req.body['password']){
		console.log('密碼輸入不一致。');
		console.log('第一次輸入的密碼：' + req.body['password']);
		console.log('第二次輸入的密碼：' + req.body['password-repeat']);
		return res.redirect('/reg');
	}
	else{
		//register success, redirect to index
		res.cookie('userid', req.body['username'], { path: '/', signed: true});		
		res.cookie('password', req.body['password'], { path: '/', signed: true });
		return res.redirect('/');
	}
};

//登入頁面
exports.login = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'login', {
		title : '登入',
		loginStatus : isLogin
	});
};

//執行登入
exports.doLogin = function(req, res){
	if(req.body['password-repeat'] != req.body['password']){
		console.log('密碼輸入不一致。');
		console.log('第一次輸入的密碼：' + req.body['password']);
		console.log('第二次輸入的密碼：' + req.body['password-repeat']);
		return res.redirect('/reg');
	}
	else{
		//register success, redirect to index
		res.cookie('userid', req.body['username'], { path: '/', signed: true});		
		res.cookie('password', req.body['password'], { path: '/', signed: true });
		return res.redirect('/');
	}
};

//執行登出
exports.logout = function(req, res){
	res.clearCookie('userid', { path: '/' });
	res.clearCookie('password', { path: '/' });
	return res.redirect('/');
};

//發表訊息
exports.post = function(req, res){
	var element = { id: count++, name: req.signedCookies.userid, msg: req.body['post'] };
	postList.push(element);

	return res.redirect('/');	
};

//使用者頁面
exports.user = function(req, res){
	var userName = req.params.user;
	var userPosts = [];
	
	for (var i = 0; i < postList.length; i++) { 
		if(postList[i].name == userName){
			userPosts.push(postList[i]);
		}
	}
	
	checkLoginStatus(req, res);
	res.render( 'user', {
		title : userName + '的頁面',
		loginStatus : isLogin,
		posts : userPosts
	});
	
};
