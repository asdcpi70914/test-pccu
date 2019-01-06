var pinyin_dict_all = require("./pinyin_dict3.js")

function toPinyin(instr){
    //pinyin_dict_all
    var n=0;
    str = JSON.stringify(pinyin_dict_all);        //取得拼音對照字串
    if(instr.length > 0)
        n = instr.length;              //取得輸入的字串長度
    str3 = "";                      //設一字串
    for (var i = 0; i < n; i++) {           //逐字搜尋使用者輸入的字串進行拼音轉換
        str2 = instr[i];
        n1 = str.indexOf(",",str.indexOf(str2)+4);    //有多種音
        n2 = str.indexOf('"',str.indexOf(str2)+4);    //
        if (n2 < n1)
          n1 = n2

        if(n == 1)
          str3 = str.substring(str.indexOf(str2)+4,n1);
        else
          str3 = str3 + " " + str.substring(str.indexOf(str2)+4,n1);
    }
    return str3;
}

function toPinyin_ary(instr){
    //pinyin_dict_all
    var strary = [];
    var n=0;
    str = JSON.stringify(pinyin_dict_all);        //取得拼音對照字串
    if(instr.length > 0)
        n = instr.length;              //取得輸入的字串長度
    str3 = "";                      //設一字串
    for (var i = 0; i < n; i++) {           //逐字搜尋使用者輸入的字串進行拼音轉換
        str2 = instr[i];
        n1 = str.indexOf(",",str.indexOf(str2)+4);    //有多種音
        n2 = str.indexOf('"',str.indexOf(str2)+4);    //
        if (n2 < n1)
          n1 = n2

        strary.push(str.substring(str.indexOf(str2)+4,n1));
    }
    return strary;
}

var express = require("express");
var http = require("http");
var app = express();
app.get('/Pinyin', function(req, res){
    res.send('test Pinyin');
});
app.get('/Pinyin/:id', function(req, res){
        tostr = toPinyin(req.params.id)
    res.send(tostr);
});
app.get('/Pinyin/:id/:ie', function(req, res){
        tostr = toPinyin(req.params.id)
        tostr2 = toPinyin(req.params.ie)
    res.send(tostr+"<br>"+tostr2);
});
app.get('/PinyinAry', function(req, res){
    res.send('test Pinyin');
});
app.get('/PinyinAry/:id', function(req, res){
        tostrary = toPinyin_ary(req.params.id)
    res.send(tostrary);
});
// app.get('/PinyinAry/:id/:ie', function(req, res){
//      tostrary = toPinyin_ary(req.params.id)
//      tostrary2 = toPinyin_ary(req.params.ie)
//     res.send(tostrary+tostrary2);
// });
http.createServer(app).listen(3000);
console.log('start express server\n');