var express = require('express'); //從local取得express
var routes = require('./routes'); //等同於"./routes/index.js"，指定路徑返回內容，相當於MVC中的Controller
var http = require('http');
var path = require('path');
var app = express();
var partials = require('express-partials');

app.set('port', process.env.PORT || 2000);


app.set('views', path.resolve(__dirname, 'views'));//設計頁面模板位置，在views子目錄下
app.set('view engine', 'ejs');//表明要使用的模板引擎(樣板引擎，Template Engine)是ejs
app.use(partials());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());//s解析client端請求，通常是透過POST發送的內容
app.use(express.cookieParser('123456789'));//記得設定key來傳遞資訊
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}



app.get('/', routes.index);
app.get('/u/:user', routes.user);
app.post('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout );
app.get('/newentry', routes.newentry);
app.post('/newentry', routes.doNewentry);
app.get('/board', routes.board);
app.get('/ele', routes.ele);
app.get('/jun', routes.jun);
app.get('/fqw', routes.fqw);
app.get('/fes', routes.fes);
app.get('/fre', routes.fre);
app.get('/rela', routes.rela);
app.get('/relat', routes.relat);

http.createServer(app).listen(app.get('port'), function( req, res ){ 
	console.log('Express server listening on port ' + app.get('port'));
});


