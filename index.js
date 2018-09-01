var linebot = require('linebot');
var express = require('express');
var request = require("request");
var getJSON = require('get-json');
var path = require('path');
var fs= require('fs');
var mysql = require('mysql');
var pinyin_dict_all = require("./pinyin_dict3.js")
var dt = new Date();
require('events').EventEmitter.prototype._maxListeners = 100;
var bot = linebot({
  channelId:"1564803662",
  channelSecret:"3f13593deab6b469ca88c258be7562e8",
  channelAccessToken:"gDw6ceHuZKIxwvFg720tlcB5A6Pm0AA/Qn7IA1M5pD68w1Lw1JKeIDDc7Kul3M+uu45zG3AJp1jX9WM5iiilJG0Aw7lW+Z7D4IJf9nstcNTAmdRcwDjLMkFSZFtaEeTYgk3kySvleqoL7J1Q6pjOMQdB04t89/1O/w1cDnyilFU="
});

/**
 * 拼音库，来源于[在线汉语字典](http://zi.artx.cn/zi/)
 * 在 pinyin_dict_all_old.js 基础上增加了酿、铽等21个汉字，add by @liuxianan
 */
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

 bot.on('message', function(event) {
  if(event.message.type == "text"){
    var msg = event.message.text;
    if(msg.indexOf("學校資訊") != -1){
      event.reply({
        type: 'template',
        altText: 'this is a buttons template',
        template: {
        type: 'buttons',
        //thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
        title: '學校資訊',
        text: '可以在此查詢各資訊',
        actions: [{
          type: 'postback',
          label: '紅5(陽明山)',
          data: '陽明山'
          }, {
            type: 'postback',
            label: '紅5(劍潭)',
            data: '劍潭'
          },{
            type: 'postback',
            label: '天氣',
            data: '天氣'
          },{
            type: 'postback',
            label: '公告',
            data: '公告'
          }]
        }
      })
    }
  };
});
const axios = require('axios');
const jsSHA = require('jssha');

const getAuthorizationHeader = function() {
  var AppID = '63de21f4eef246b68964d718ef54284d';
  var AppKey = 'VTmUKW57n1H57UuCykCItwPlasA';

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

  return { 'Authorization': Authorization, 'X-Date': GMTString};
}

bot.on("postback",function(event){
axios.get("http://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/%E7%B4%855?$select=RouteName%2CStopName%2CEstimateTime&$filter=RouteID%20eq%20'10821'%20and%20Direction%20eq%20'1'&$top=10&$skip=1&$format=JSON", { // 欲呼叫之API網址(此範例為台鐵車站資料)
  headers: getAuthorizationHeader(),
})
.then(function(response){
      var msg = event.postback.data;
      var replyMsg = "";

  if(response.data[1].Direction == 0 ){
  a = response.data[1].RouteName.Zh_tw + "(往陽明山)" ;
}
else{
  a = response.data[1].RouteName.Zh_tw + "(往劍潭)";
  }

  if(response.data[2].Direction == 0 ){
  b = response.data[2].RouteName.Zh_tw + "(往陽明山)";
}
else{
  b = response.data[2].RouteName.Zh_tw + "(往劍潭)";
  }


  if(response.data[3].Direction == 0){
  c = response.data[3].RouteName.Zh_tw + "(往陽明山)";
}
else{
  c = response.data[3].RouteName.Zh_tw + "(往劍潭)";
 }


  if(response.data[4].Direction == 0 ){
  d = response.data[4].RouteName.Zh_tw + "(往陽明山)";
}
else{
  d = response.data[4].RouteName.Zh_tw + "(往劍潭)";
  }


  if(response.data[0].Direction == 0){
  e = response.data[0].RouteName.Zh_tw + "(往陽明山)";
}
else{
  e = response.data[0].RouteName.Zh_tw + "(往劍潭)";
  }

if(response.data[1].EstimateTime < 60){
f = "即將抵達" + response.data[1].StopName.Zh_tw;
}
else{
min = Math.floor(response.data[1].EstimateTime/60) + "分鐘";
f = "還有" + min + "抵達" + response.data[1].StopName.Zh_tw;
}
if(response.data[2].EstimateTime < 60){
g = "即將抵達" + response.data[2].StopName.Zh_tw;
}
else{
min = Math.floor(response.data[2].EstimateTime/60) + "分鐘";
g = "還有" + min + "抵達" + response.data[2].StopName.Zh_tw;
}
if(response.data[3].EstimateTime < 60){
h = "即將抵達" + response.data[3].StopName.Zh_tw;
}
else{
min = Math.floor(response.data[3].EstimateTime/60) + "分鐘";
h = "還有" + min + "抵達" + response.data[3].StopName.Zh_tw;
}
if(response.data[4].EstimateTime < 60){
i = "即將抵達" + response.data[4].StopName.Zh_tw;
}
else{
min = Math.floor(response.data[4].EstimateTime/60) + "分鐘";
i = "還有" + min + "抵達" + response.data[4].StopName.Zh_tw;
}
if(response.data[0].EstimateTime < 60){
j = "即將抵達" + response.data[0].StopName.Zh_tw;
}
else{
min = Math.floor(response.data[0].EstimateTime/60) + "分鐘";
j = "還有" + min + "抵達" + response.data[0].StopName.Zh_tw;
}
      if(msg.indexOf("劍潭") != -1){
          replyMsg  = a+"\n"+f+"\n"+b+"\n"+g+"\n"+c+"\n"+h+"\n"+d+"\n"+i+"\n"+e+"\n"+j;
      }

    event.reply(replyMsg).then(function(data){
          console.log(replyMsg);

          }).catch(function(error){
        console.log("error")
      });
 	});
});

bot.on("postback",function(event){
         var msg = event.postback.data;
      var replyMsg1 = "";
    if(msg.indexOf("天氣") != -1){
    	axios.get("https://mobi.pccu.edu.tw/weather.json", { // 欲呼叫之API網址(此範例為台鐵車站資料)
})
.then(function(response){
    var replyMsg1 = "";
    	// // body=toString(body);
      // console.log(typeof(body))
        // var newbody=body.substring(1);
        //  //console.log(body.substring(1)) // Print the json response
        // var obj = JSON.parse(newbody);
        var newbody=response.data.substring(1);
        obj = JSON.parse(newbody)
//         console.log(typeof obj)
// console.log(obj[0].Location)
      replyMsg1 ="氣溫: "+obj[0].Tempature+"℃"+"\n"+"濕度: "+obj[0].Humidity+"%"+"\n"+"風向: "+obj[0].WindDirection+"\n"+"累積雨量: "+obj[0].RainFall+"%"+"\n"+"天氣情況: "+obj[0].WeatherDesciption;
      event.reply(replyMsg1).then(function(data){
          console.log(replyMsg1);
          }).catch(function(error){
        console.log("error")
      		});
    	});
	}
});

bot.on("postback",function(event){
axios.get("http://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/%E7%B4%855?$select=RouteName%2CStopName%2CEstimateTime&$filter=RouteID%20eq%20'10821'%20and%20Direction%20eq%20'0'&$top=10&$skip=1&$format=JSON", { // 欲呼叫之API網址(此範例為台鐵車站資料)
  headers: getAuthorizationHeader(),
})
.then(function(response){
      var msg = event.postback.data;
      var replyMsg = "";

  if(response.data[1].Direction == 0 ){
  a = response.data[1].RouteName.Zh_tw + "(往陽明山)" ;
}
else{
  a = response.data[1].RouteName.Zh_tw + "(往劍潭)";
  }

  if(response.data[2].Direction == 0 ){
  b = response.data[2].RouteName.Zh_tw + "(往陽明山)";
}
else{
  b = response.data[2].RouteName.Zh_tw + "(往劍潭)";
  }


  if(response.data[3].Direction == 0){
  c = response.data[3].RouteName.Zh_tw + "(往陽明山)";
}
else{
  c = response.data[3].RouteName.Zh_tw + "(往劍潭)";
 }


  if(response.data[4].Direction == 0 ){
  d = response.data[4].RouteName.Zh_tw + "(往陽明山)";
}
else{
  d = response.data[4].RouteName.Zh_tw + "(往劍潭)";
  }


  if(response.data[0].Direction == 0){
  e = response.data[0].RouteName.Zh_tw + "(往陽明山)";
}
else{
  e = response.data[0].RouteName.Zh_tw + "(往劍潭)";
  }

if(response.data[1].EstimateTime < 60){
f = "即將抵達" + response.data[1].StopName.Zh_tw;
}
else{
min = Math.floor(response.data[1].EstimateTime/60) + "分鐘";
f = "還有" + min + "抵達" + response.data[1].StopName.Zh_tw;
}
if(response.data[2].EstimateTime < 60){
g = "即將抵達" + response.data[2].StopName.Zh_tw;
}
else{
min = Math.floor(response.data[2].EstimateTime/60) + "分鐘";
g = "還有" + min + "抵達" + response.data[2].StopName.Zh_tw;
}
if(response.data[3].EstimateTime < 60){
h = "即將抵達" + response.data[3].StopName.Zh_tw;
}
else{
min = Math.floor(response.data[3].EstimateTime/60) + "分鐘";
h = "還有" + min + "抵達" + response.data[3].StopName.Zh_tw;
}
if(response.data[4].EstimateTime < 60){
i = "即將抵達" + response.data[4].StopName.Zh_tw;
}
else{
min = Math.floor(response.data[4].EstimateTime/60) + "分鐘";
i = "還有" + min + "抵達" + response.data[4].StopName.Zh_tw;
}
if(response.data[0].EstimateTime < 60){
j = "即將抵達" + response.data[0].StopName.Zh_tw;
}
else{
min = Math.floor(response.data[0].EstimateTime/60) + "分鐘";
j = "還有" + min + "抵達" + response.data[0].StopName.Zh_tw;
}
      if(msg.indexOf("陽明山") != -1){
          replyMsg  = a+"\n"+f+"\n"+b+"\n"+g+"\n"+c+"\n"+h+"\n"+d+"\n"+i+"\n"+e+"\n"+j;
      }

    event.reply(replyMsg).then(function(data){
          console.log(replyMsg);

          }).catch(function(error){
        console.log("error")
      });
  });
});

bot.on("postback",function(event){
         var msg = event.postback.data;
      var replyMsg1 = "";
    if(msg.indexOf("公告") != -1){
    	axios.get("http://mobi.pccu.edu.tw/DataAPI/announcement/", { // 欲呼叫之API網址(此範例為台鐵車站資料)
})
.then(function(response){
    var replyMsg1 = "";
      replyMsg1 = response.data[0].Title+"\n"+"https://ap2.pccu.edu.tw/pccupost/post/content.asp?Num="+response.data[0].SerialNo + "\n" +"\n" + response.data[1].Title+"\n"+"https://ap2.pccu.edu.tw/pccupost/post/content.asp?Num="+response.data[1]. SerialNo+ "\n" +"\n" + response.data[2].Title+"\n"+"https://ap2.pccu.edu.tw/pccupost/post/content.asp?Num="+response.data[2]. SerialNo;
      event.reply(replyMsg1).then(function(data){
          console.log(replyMsg1);

          }).catch(function(error){
        console.log("error")
      });
    });
}
});

// -----------------------------------------------------------------------------------------------------------------------------------------
// var Confirm = require('prompt-confirm');
// var confirm = new Confirm('是否覆蓋?');
// const document = dom.window.document;
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
      //document.form1.answer.value = str3;
      //return document.form1.answer.value;
      return str3;

      //str.indexOf(str2)
      //alert(str.indexOf(str2));
      //document.form1.answer.value(str.indexOf("阿"));
      //document.form1.answer.value(str.indexOf("呵"));
      //document.form1.answer.value(str.substring(13,24));
      //document.form1.answer.value = str.substring(str.indexOf(str2)+4,str.indexOf(",",str.indexOf(str2)+4));
      
      //document.form1.answer.value = str.indexOf(",",str.indexOf(str2)+4)
    }
    /*
    function getSimilar(instr){

    }
    */

// function tttPinyin(instr){
//       //pinyin_dict_all
//       str = JSON.stringify(pinyin_dict_all);        //取得拼音對照字串
//       n = instr.length;                 //取得輸入的字串長度
//       str3 = '["';
//       for (var i = 0; i < n; i++) {
//         str2 = instr[i];
//         n1 = str.indexOf(",",str.indexOf(str2)+4);
//         n2 = str.indexOf('"',str.indexOf(str2)+4);
//         if (n2 < n1)
//           n1 = n2
//         //if (i > 0)
//           str3 = str3 + '","' + str.substring(str.indexOf(str2)+4,n1);
//         //else
//         //  str3 = str3 + '"' + str.substring(str.indexOf(str2)+4,n1);
        
//       }
//       document.form1.answer.value = str3 + '"],';
//       return document.form1.answer.value;
//       //str.indexOf(str2)
//       //alert(str.indexOf(str2));
//       //document.form1.answer.value(str.indexOf("阿"));
//       //document.form1.answer.value(str.indexOf("呵"));
//       //document.form1.answer.value(str.substring(13,24));
//       //document.form1.answer.value = str.substring(str.indexOf(str2)+4,str.indexOf(",",str.indexOf(str2)+4));
      
//       //document.form1.answer.value = str.indexOf(",",str.indexOf(str2)+4)

//     }
    //名單拼音
var names = [["liú","jiā","háo"],
      ["chén","yǔ","tíng"],
       ["lǚ","yí","jǐng"],
       ["liú","yì"],
       ["lín","jùn","hé"],
       ["guō","xiān","mín"],
       ["yáng","zōng","hàn"],
       ["chén","tíng","xuān"],
       ["lín","guān","zhōng"],
       ["zhū","zhǐ","xuān"],
       ["zhāng","zhòng","huá"],
       ["huáng","bǎi","hàn"],
       ["fāng","běn","zhèng"],
       ["zhāng","yì","chéng"],
       ["xū","yǒng","zhì"],
       ["wáng","jiā","chéng"],
       ["chén","shèng","wén"],
       ["zhuāng","míng","yàn"],
       ["xiè","yǔ","yì"],
       ["sū","qí","hé"],
       ["qiū","yì","wěi"],
       ["chén","jìng","wèn"],
       ["gāo","hào","xuān"],
       ["guān","yǔ","xiáng"],
       ["lǐ","quán","yì"],
       ["zhāng","jiā","míng"],
       ["wú","pèi","yàn"],
       ["zhèng","zhì","rú"],
       ["huáng","wēi","rén"],
       ["lú","hóng","yào"],
       ["huáng","guó","háo"],
       ["guō","sān","tài"],
       ["wáng","yì","jié"],
       ["péng","zǐ","háo"],
       ["yè","chéng","wěi"],
       ["lǐ","yún","shēng"],
       ["xū","gāo","xiáng"],
       ["lǚ","yàn","ēn"],
       ["lín","míng","cóng"],
       ["lín","bǎi","rèn"],
       ["yè","hàn","zhōng"],
       ["cài","jié","ēn"],
       ["xú","rén","kǎi"],
       ["chén","yì"],
       ["lín","xīn","chéng"],
       ["hóng","jìng","bó"],
       ["huáng","jùn","kǎi"],
       ["lǚ","shào","háo"],
       ["gōng","yù","xiáng"],
       ["yáng","shēng","dá"],
       ["liú","yú","xiū"],
       ["yáng","zhào","kǎi"],
       ["lín","hóng","jùn"],
       ["chén","bǎi","ruì"],
       ["lín","zhì","qiān"],
       ["wú","jùn","yì"],
       ["pān","yǒng","lún"],
       ["cài","jiā","yòu"]]

    //資料儲存
var names2 = [["姓名","成績"],
       ["劉家豪",""],
       ["陳宇庭",""],
       ["呂宜璟",""],
       ["劉逸",""],
       ["林峻禾",""],
       ["郭先旻",""],
       ["楊宗翰",""],
       ["陳庭萱",""],
       ["林冠中",""],
       ["朱芷萱",""],
       ["張仲華",""],
       ["黃柏翰",""],
       ["方本正",""],
       ["張易誠",""],
       ["許詠智",""],
       ["王嘉誠",""],
       ["陳聖文",""],
       ["莊明諺",""],
       ["謝宇逸",""],
       ["蘇祈合",""],
       ["邱奕瑋",""],
       ["陳敬汶",""],
       ["高浩軒",""],
       ["關宇翔",""],
       ["李權益",""],
       ["張家銘",""],
       ["吳沛彥",""],
       ["鄭稚儒",""],
       ["黃威仁",""],
       ["盧宏曜",""],
       ["黃國豪",""],
       ["郭三泰",""],
       ["王奕傑",""],
       ["彭子豪",""],
       ["葉丞瑋",""],
       ["李昀昇",""],
       ["許高祥",""],
       ["呂彥恩",""],
       ["林茗琮",""],
       ["林柏任",""],
       ["葉瀚中",""],
       ["蔡杰恩",""],
       ["徐人凱",""],
       ["陳弈",""],
       ["林昕承",""],
       ["洪靖博",""],
       ["黃俊凱",""],
       ["呂紹豪",""],
       ["龔鈺翔",""],
       ["楊昇達",""],
       ["劉于脩",""],
       ["楊兆凱",""],
       ["林宏峻",""],
       ["陳柏睿",""],
       ["林志謙",""],
       ["吳駿溢",""],
       ["潘永倫",""],
       ["蔡佳佑",""]]

    //重複輸入紀錄
    var repin = [];

    var number = ["100","99","98","97","96","95","94","93","92","91","90","89","88","87","86","85","84","83","82","81",
             "80","79","78","77","76","75","74","73","72","71","70","69","68","67","66","65","64","63","62","61",
             "60","59","58","57","56","55","54","53","52","51","50","49","48","47","46","45","44","43","42","41",
             "40","39","38","37","36","35","34","33","32","31","30","29","28","27","26","25","24","23","22","21",
             "20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1","0"];

    var record = [];


bot.on('message', function(event) {
	msg = event.message.text;
    if(msg.indexOf("成績") != -1){
      event.reply({
        type: 'template',
        altText: 'this is a buttons template',
        template: {
        type: 'buttons',
        //thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
        title: '學生成績清單',
        text: '師生可以透過此選單來查看成績',
        actions: [{
          type: 'postback',
          label: '成績',
          data: '成績'
          },{type: 'postback',
          label: '前5筆',
          data: '前5筆'
          }]
        }
      })
    }
})

    function ArrayReverse(inarray)            //陣列反轉
    {
      var r_ary = [];
      for(var i = inarray.length ; i > 0 ; i--){
        r_ary.push(inarray[i-1]);
      }
      return r_ary;
      
    }

    function Last_N_in(inarray,n)           //前N筆紀錄
    {
      var last_N = [];
      if(inarray.length < n)
        n = inarray.length;
      for(var i = 0 ; i < n ; i++){
        last_N.push(inarray[i]);
      }
      return last_N;
    }

    function PersonRecord(instr)            //個人每筆輸入資料
    {
      var personrecord = [];
      var number = names_cmp_instr(instr);
      var instr_name = names2[number[0]+1][0];
      for(var k = 0 ; k < record.length ; k++){
        var a_instr,b_instr;
        var tempstr = record[k];                    
        for(var i = 0 ; i < names2.length ; i++){
          var num = tempstr.indexOf(names2[i][0]);
          if(num != -1){
            a_instr = tempstr.substring(0,names2[i][0].length);
            if(a_instr == instr_name){
              personrecord.push(record[k]);
              break;
            }
            //b_instr = instr.substring(num,record[k].length);
            //fraction2 = number[i];
            //break;
          }
        }
      }

      //a = record.indexOf(instr_name);
      // document.getElementById("aaa2").value = personrecord;
      // document.getElementById("aaa6").value = ArrayReverse(personrecord);
      // document.getElementById("aaa5").value = Last_N_in(ArrayReverse(personrecord),2);
      return personrecord;
    }




    function compare(names,instr,event){              //成績
		var a_instr,b_instr;                //輸入分割成名字和分數2部分
		var fraction;                   //分數
		if(instr.length < 3)
			return;
    	for(var i = 0 ; i < number.length ; i++){
        	var num = instr.indexOf(number[i]);
        	if(num != -1){
          		a_instr = instr.substring(0,num);
          		b_instr = instr.substring(num,instr.length);
          		fraction = number[i];
          	break;
        	}
    	}
      //var inname = toPinyin(a_instr);
      //var a_inname,b_inname,c_inname,d_inname;
      //document.form1.answer.value = inname;
      //document.form1.a1.value = fraction;
   		var ans = names_cmp_instr(a_instr)
      	var innameL = a_instr.length;
      	console.log(ans);
      // if(typeof(ans) == 'number'){
      //  document.getElementById("myTable").rows[1].cells[ans+1]. innerHTML = fraction;
      // }
      //alert(typeof(ans))
      //alert(ans)
      //alert(ans)
      	if(ans.length == 1){              //名單中只找到一人
        	if(names2[ans[0]+1][1] == ""){        //此人成績還未輸入過，輸入成績    
          // document.getElementById("myTable").rows[1].cells[ans[0]+1].innerHTML = fraction;
        	 	names2[ans[0]+1][1] = fraction;
        	 	recordStr = names2[ans[0]+1][0]+"    "+fraction;     //儲存每筆紀錄
        	 	record.push(recordStr);
          // document.getElementById("answer").value = record;
        	 	ArrayReverse(record);
        	 	                 //反轉紀錄
          // document.getElementById("aaa3").value = ArrayReverse(record); //反轉紀錄顯示
          // document.getElementById("aaa4").value = Last_N_in(ArrayReverse(record),3); //前3筆紀錄顯示
          //alert(repin.length);
        	}else{
//				bot.on('message', function(event) {
					//var msg = event.message.text;
					console.log(instr)
					if(instr.length < 3)
						return;
			  		for(var i = 0 ; i < number.length ; i++){
        				var num = instr.indexOf(number[i]);
    	    			if(num != -1){
    		    			var c_instr = instr.substring(0,num);
    		    			var d_instr = instr.substring(num,instr.length);
    	    				fraction = number[i];
          					break;
        				}
    				}
					// console.log(innameL);
					var j = 0;
					if(c_instr.length == 3){
						var name4 = " "+names[j][0]+" "+names[j][1]+" "+names[j][2];
					}
					else if(c_instr.length == 2){
						var name4 = " "+names[j][0]+" "+names[j][1];
					}
					var msg2 = toPinyin(instr);
					//console.log(msg2);
					//console.log(name4);
					while(msg2.indexOf(name4) == -1){
						j++;
						if(c_instr.length == 3){
							var name4 = " "+names[j][0]+" "+names[j][1]+" "+names[j][2];
						}
						else if(c_instr.length == 2){
							var name4 = " "+names[j][0]+" "+names[j][1];
						}
						if(msg2.indexOf(name4) != -1){
							break;
						}
					}
    				// 
					msg3 = toPinyin(a_instr);
					c_instr = toPinyin(c_instr)
					// console.log(event);
					// console.log("------");
					// console.log(event.message.text);
					// console.log("--------------");
					// console.log("msg2:"+msg2)
					// console.log("msg3:"+msg3)
					// console.log("name4:"+name4)
					
    				if(msg2.indexOf(name4) != -1 && msg3 == c_instr){
    					//console.log("測試"+names2[ans[0]+1][0]+names2[ans[0]+1][1]);
    					// event.reply("已有輸入成績:"+names2[ans[0]+1][0]+names2[ans[0]+1][1]).then(function(data){
	        //  			}).catch(function(error){
	       	// 			console.log("error")
	     			// 	});
    					var egg = '是';
    					event.reply([{ type: 'text', text: "已有輸入成績:"+names2[ans[0]+1][0]+names2[ans[0]+1][1]},{
    	 				   type: 'template',
    					    altText: 'this is a buttons template',
    					    template: {
    					    type: 'buttons',
    					    //thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
    					    	title: '修改學生成績',
    					    	text: '此學生成績已登記,是否修改?',
    					    	actions: [{
        							type: 'postback',
        							label: egg,
        							data: egg
        						},{
        							type: 'postback',
        							label: '否',
        							data: '否'
        						}]
        					}
      					}])
      					var temp2 = [];
      					temp2[0] = "修改";
      					temp2[1] = ans[0]+1;
      					temp2[2] = names2[ans[0]+1][1];
						temp2[3] = fraction;
      					return temp2;
      					//console.log(temp2);
    				}
    	// 			console.log(event);
					// console.log("========");
					// event.message.text = "666";
					// console.log(event.message.text);
					// console.log("=================");
					// console.log("T上names2[ans[0]+1][1]:"+names2[ans[0]+1][1])
					// console.log("T上fraction:"+fraction.toString())
					// var temp = [];
					// temp[0] = names2[ans[0]+1][1];
					// temp[1] = fraction;
					// console.log("T下names2[ans[0]+1][1]:"+names2[ans[0]+1][1])
					// console.log("T下fraction:"+fraction.toString())
					// bot.on('postback', function(event) {
					// 	msg3 = event.postback.data;

					// 	// console.log("msg2:"+msg2)
					// 	// console.log("msg3:"+msg3)
					// 	// console.log("name4:"+name4)
					// 	// console.log("-=-=-=-=-=-=-")
						
					// 	// console.log(event.postback.data)
					// 	if(msg3.indexOf("是") != -1){
					// 		// document.getElementById("myTable").rows[1].cells[ans[0]+1].innerHTML = fraction;
					// 		console.log("是改前names2[ans[0]+1][1]:"+names2[ans[0]+1][1])
					// 		console.log("是改前fraction:"+fraction)
				 //            names2[ans[0]+1][1] = fraction;				            
				 //            recordStr = names2[ans[0]+1][0]+"    "+fraction;     //儲存每筆紀錄
				 //            console.log("是改後names2[ans[0]+1][1]:"+names2[ans[0]+1][1])
					// 		console.log("是改後fraction:"+fraction)
				 //            record.push(recordStr);
				 //            // document.getElementById("answer").value = record;
				 //            ArrayReverse(record);                 //反轉紀錄
				 //            event.reply("已覆蓋").then(function(data){
     //      					}).catch(function(error){
     //    					console.log("error")
     //  						});
				 //            // document.getElementById("aaa3").value = ArrayReverse(record); //反轉紀錄顯示
				 //            // document.getElementById("aaa4").value = Last_N_in(ArrayReverse(record),3); //前3筆紀錄顯示  
				 //  	// 		event.reply({
					// 		// 	"type": "template",
					// 		// 	"altText": "this is a confirm template",
					// 		// 	"template": {
				 //  	// 				"type": "confirm",
				 //  	// 				"text": "是否覆蓋?",
				 //  	// 				"actions": [{
				 //   //      				"type": "postback",
				 //   //      				"label": "是",
				 //   //      				"data": "是"
				 //   //  				},{
				 //   //      				"type": "postback",
				 //   //      				"label": "否",
				 //   //      				"data": "否"
				 //   //    				}]
					// 		// 	}
					// 		// })
					// 	}
					// 	if(msg3.indexOf("否") != -1){
					// 		console.log("否改前names2[ans[0]+1][1]:"+names2[ans[0]+1][1])
					// 		console.log("否改前temp[0]:"+temp[0])
				 //            names2[ans[0]+1][1] = temp[0];				            
				 //            recordStr = names2[ans[0]+1][0]+"    "+temp[0]     //儲存每筆紀錄
				 //            record.push(recordStr);
				 //            console.log("否改後names2[ans[0]+1][1]:"+names2[ans[0]+1][1])
					// 		console.log("否改後temp[0]:"+temp[0])
				 //            // document.getElementById("answer").value = record;
				 //            ArrayReverse(record);                 //反轉紀錄
				 //            event.reply("已取消覆蓋").then(function(data){
     //      					}).catch(function(error){
     //    					console.log("error")
     //  						});
				 //            // document.getElementById("aaa3").value = ArrayReverse(record); //反轉紀錄顯示
				 //            // document.getElementById("aaa4").value = Last_N_in(ArrayReverse(record),3); //前3筆紀錄顯示  

					// 	}
     //    				// if(event.postback.data == "是"){    //此人成績已輸入過，檢查是否覆蓋
			  //        //    	// document.getElementById("myTable").rows[1].cells[ans[0]+1].innerHTML = fraction;
				 //        //     names2[ans[0]+1][1] = fraction;				            
				 //        //     recordStr = names2[ans[0]+1][0]+"    "+fraction;     //儲存每筆紀錄
				 //        //     record.push(recordStr);
				 //        //     // document.getElementById("answer").value = record;
				 //        //     ArrayReverse(record);                 //反轉紀錄
				 //        //     // document.getElementById("aaa3").value = ArrayReverse(record); //反轉紀錄顯示
				 //        //     // document.getElementById("aaa4").value = Last_N_in(ArrayReverse(record),3); //前3筆紀錄顯示  
			  //        //    return "已覆蓋";   
     //    				// }else{
     //    				// 	return;   
     //        //           //不覆蓋，不動作
     //    				// }
    	// 			});
    			//});
			}
        //alert(names2[ans[0]+1][0])
        // document.form1.selection.value = "";
		}else if(ans.length > 1){           //名單中找到多人，回傳給使用者選擇
        	var str_select ="";

        	for(var i = 0; i < ans.length ; i++){
         		var l = i+1;
         		str_select = str_select + l.toString() + "." + names2[ans[i]+1][0] + " ";
        	}
        	//return str_select;
    	}else{
               //名單中找不到與輸入音相近的人
 			//return '音差太多,查無此人'; 
 			event.reply("音差太多,查無此人").then(function(data){
	         	}).catch(function(error){
	       		console.log("error")
	     		});
    	}
    	event.reply("輸入的成績:"+names2[ans[0]+1][0]+names2[ans[0]+1][1]).then(function(data){
	    }).catch(function(error){
	    console.log("error")
	    });
	}

    function names_cmp_instr(instr){					//搜尋名單
			var ary = new Array(names.length);
			var inname = toPinyin(instr);
			var a_inname = toPinyin(instr.substring(0,1));
			var b_inname = toPinyin(instr.substring(1,2));
			var c_inname = toPinyin(instr.substring(2,3));
			var inary = [a_inname,b_inname,c_inname];
			var nnn=[];
			//var d_inname = toPinyin(instr.substring(3,4));
			

			for(var row = 0 ; row < names.length ; row++){		//比分初始化
				ary[row] = new Array(4);
				for(var col = 0 ; col < 4 ; col++){
					ary[row][col] = 0;
					//document.write(ary[row][col]);
				}
				//document.write(" ");
			}
			//var allpoint[],alp=0;
			for(var row = 0 ; row < names.length ; row++){		//比對名字拼音
				for(var col = 0 ; col < 3 ; col++){
					if(names[row][col] == inary[col]){
						ary[row][col] = ary[row][col]+1;
						ary[row][3] = ary[row][3]+1;
						
					}else{

          			var testname,testin;
          			for(var trow = 0 ; trow < array.length ; trow++){
          				// if(trow==35)
          				// 	continue;

          				for(var tcol = 0 ; tcol < array[trow].length ; tcol++){
          					
          					if(array[trow][tcol] == inary[col]){
          						testin = array[trow][0];
          						
          						break;
          					}
          				}
          			}

          			for(var trow = 0 ; trow < array.length ; trow++){
          				// if(trow==35)
          				// 	continue;
          				
          				for(var tcol = 0 ; tcol < array[trow].length ; tcol++){

          					if(array[trow][tcol] == names[row][col]){
          						testname = array[trow][0];
          						break;
          					}
          				}
          				
          			}

          			if(testname == testin){
          				ary[row][col] = ary[row][col]+0.9;
            			ary[row][3] = ary[row][3]+0.9;
          			}else{
          				var row1=0,col1=0,row2=0,col2=0;
          				for(var trow = 0 ; trow < array2.length ; trow++){
          					//document.getElementById("aaa87").value = trow;
          					for(var tcol = 0 ; tcol < array2[trow].length ; tcol++){
          						if(array2[trow][tcol] == testname){
          							row1 = trow;
          							col1 = tcol;
          							break;
          						}
          					}
          				}
          				for(var trow = 0 ; trow < array2.length ; trow++){
          					for(var tcol = 0 ; tcol < array2[trow].length ; tcol++){
          						if(array2[trow][tcol] == testin){
          							row2 = trow;
          							col2 = tcol;
          							break;
          						}
          					}
          				}
          				if(row1 == row2){
          					ary[row][col] = ary[row][col]+(0.9-(Math.abs(col1-col2)*0.1));
          					ary[row][3] = ary[row][3]+(0.9-(Math.abs(col1-col2)*0.1));
          				}
          				break;
          			}
          			}
					//document.write(names[row][col])
					//document.write("棒")
					//document.write(inary[col])
				}
				//allpoint[alp] = ary[row][3];
				//alp++;
				//document.write(" ");
				//document.getElementById("aaa87").value = allpoint[0];
			}
			//document.getElementById("aaa87").value = ary;
			//return ary;
			
			var nn=[0,0,0,0];									//
			for(var row = 0 ; row < names.length ; row++){		//統計比分
				if(ary[row][3] == 3){
					nn[3]++;
				}else if(ary[row][3] >= 2){
					nn[2]++;
				}else if(ary[row][3] >= 1){
					nn[1]++;
				}else{
					nn[0]++;
				}
			}

			var nn2=[],nn3=[];											//多個比分2的位置
			var nn2_num=0,nn3_num=0,nn2_temp=0;
			for(var row = 0 ; row < names.length ; row++){		//回傳結果
				if(ary[row][3] == 3 && nn[3] == 1){
					nnn[0] = row;
					return nnn;
				// }else if(ary[row][3] >= 2){
				// 	var tx = Math.max.apply(null, allpoint);
				// 	for(var i = 0 ; i < allpoint.length ; i++){
				// 		if(allpoint[i] == tx){
				// 			nnn[0] = i;
				// 			return nnn;
				// 		}
				// 	}
				}else if(ary[row][3] >= 2 && nn[2] == 1 && nn[3] == 0){
					nnn[0] = row;
					return nnn;
				}else if(ary[row][3] >= 2 && nn[2] > 1){
					if(ary[row][3] > nn2_temp)
						nn2_temp = ary[row][3];
					nnn[0] = row;
					//nn2[nn2_num] = row;
					//nn2_num++;

				}//else if(ary[row][3] == 1 && nn[1] == 1){
				// 	nnn[0] = row;
				// 	return nnn;
				// }else if(ary[row][3] == 1 && nn[1] > 1){
				// 	nn3[nn3_num] = row;
				// 	nn3_num++;
				// }
			}

			// if(nn2_num != 0 && nn[2] > 1){
			// 	//nn[2]=0;
			// 	nnn = nn2;
			// }
			
			// if(nn3_num != 0 && nn[1] > 1){
			// 	//nn[2]=0;
			// 	nnn = nn3;
			// }

			return nnn;
			
			
			// for(var row = 0 ; row < names.length ; row++){
			// 	//ary[row] = new Array(4);
			// 	for(var col = 0 ; col < 4 ; col++){
			// 		//ary[row][col] = 0;
			// 		document.write(ary[row][col]);
			// 	}
			// 	document.write(" ");
			// }
			
			//document.write(ary[0][3]);
		}
    //names_cmp_instr("我是誰");

  //names_cmp_instr("我是誰");
		var array2 = [
						["ya","ye","yan","wa","yue","yuan"],
						["yin","ying","wen","weng","yun","yong"],
						["wai","wei","wan"],
						["yang","wang"],
						["yao","you","wo"]];
		var array = [
					 ["ba","bā","bá","bǎ","bà"],
					 ["bo","bō","bó","bǒ","bò"],
					 ["bai","bāi","bái","bǎi","bài"],
					 ["bei","bēi","běi","bèi"],
					 ["bao","bāo","báo","bǎo","bào"],
					 ["ban","bān","bǎn","bàn"],
					 ["ben","bēn","běn","bèn"],
					 ["bang","bāng","bǎng","bàng"],
					 ["beng","bēng","béng","běng","bèng"],
					 ["bi","bī","bí","bǐ","bì"],
					 ["bie","biē","bié","biě","biè"],
					 ["biao","biāo","biǎo","biào"],
					 ["bian","biān","biǎn","biàn"],
					 ["bin","bīn","bìn"],
					 ["bing","bīng","bǐng","bìng"],
					 ["bu","bū","bú","bǔ","bù"],
					 ["pa","pā","pá","pà"],
					 ["po","pō","pó","pǒ","pò"],
					 ["pai","pāi","pái","pěi","pài"],
					 ["pei","pēi","péi","pò","pèi"],
					 ["pao","pāo","páo","pǎo","pào"],
					 ["pou","pōu","póu","pǒu","pǒu"],
					 ["pan","pān","pán","pǎn","pàn"],
					 ["pan","pēn","pén","běn","pēn"],
					 ["pang","pāng","páng","pǎng","pàng"],
					 ["peng","pēng","péng","pěng","pèng"],
					 ["pi ","pī","pí","pǐ","pì"],
					 ["pie ","piē","piě","piè"],
					 ["piao","piāo","piáo","piǎo","piào"],
					 ["pian","piān","pián","piǎn","piàn"],
					 ["pin","pàn","pín","pǐn","pìn"],
					 ["ping","pīng","píng","pǐng","pìng"],
					 ["pu","pū","pú","pǔ","pù"],
					 ["ma","mā","má","mǎ","mà"],
					 ["mo","mō","mó","mǒ","mò"],
					 ["me","mē","mé","mě","mè"],
					 ["mai","mái","mǎi","mài"],
					 ["mei","méi","měi","mèi"],
					 ["mao","māo","máo","mǎo","mào"],
					 ["mou","móu","mǒu","mòu"],
					 ["man","mǎn","mán","mǎn","màn"],
					 ["men","mèn","mén","mèn","mèn"],
					 ["mang","máng","mǎng","màng"],
					 ["meng","mēng","méng","měng","mèng"],
					 ["mi","mī","mí","mǐ","mì"],
					 ["mie","miē","miě","miè"],
					 ["miao","miāo","miáo","miǎo","miào"],
					 ["miu","miū","miù"],
					 ["mian","mián","miǎn","miàn"],
					 ["min","mín","mǐn"],
					 ["ming","míng","mǐng","mìng"],
					 ["mu","mú","mǔ","mù"],
					 ["fa","fā","fá","fǎ","fà"],
					 ["fo","fó"],
					 ["fei","fēi","féi","fěi","fèi"],
					 ["fou","fóu","fǒu"],
					 ["fan","fān","fán","fǎn","fàn"],
					 ["fen","fēn","fén","fěn","fèn"],
					 ["fang","fāng","fáng","fǎng","fàng"],
					 ["feng","fēng","féng","fěng","fèng"],
					 ["fu","fū","fú","fǔ","fù"],
					 ["da","dā","dá","dǎ","dà"],
					 ["de","dé"],
					 ["da","dài","dài","dài"],
					 ["dei","děi"],
					 ["dao","dāo","dáo","dǎo","dào"],
					 ["dou","dōu","dǒu","dòu"],
					 ["dan","dān","dǎn","dàn"],
					 ["dang","dāng","dǎng","dàng"],
					 ["deng","dēng","děng","dèng"],
					 ["di","dī","dí","dǐ","dì"],
					 ["die","diē","dié","diè"],
					 ["diao","diāo","diǎo","diào"],
					 ["diu","diū"],
					 ["dian","diān","diǎn","diàn"],
					 ["ding","dīng","dǐng","dìng"],
					 ["du","dū","dú","dǔ","dù"],
					 ["duo","duō","duó","duǒ","duò"],
					 ["dui","duī","duì"],
					 ["duan","duān","duǎn","duàn"],
					 ["dun","dūn","dǔn","dùn"],
					 ["dong","dōng","dǒng","dòng"],
					 ["ta","tā","tǎ","tà"],
					 ["te","tè","tè"],
					 ["ta","tāi","tái","tài"],
					 ["tao","tāo","táo","tǎo","tào"],
					 ["tou","tōu","tóu","tǒu","tòu"],
					 ["tan","tān","tán","tǎn","tàn"],
					 ["tang","tāng","táng","tǎng","tàng"],
					 ["teng","tēng","téng"],
					 ["ti","tī","tí","tǐ","tì"],
					 ["tie","tiē","tiě","tiè"],
					 ["tiao","tiāo","tiáo","tiǎo","tiào"],
					 ["tian","tiān","tián","tiǎn","tiàn"],
					 ["ting","tīng","tíng","tǐng","tìng"],
					 ["tu","tū","tú","tǔ","tǔ"],
					 ["tuo","tuō","tuó","tuǒ","tuò"],
					 ["tui","tuī","tuí","tuǐ","tuì"],
					 ["tuan","tuān","tuán","tuǎn","tuàn"],
					 ["tun","tūn","tún","tǔn","tuì"],
					 ["tong","tōng","tóng","tǒng","tòng"],
					 ["na","nā","ná","nǎ","nà"],
					 ["ne","nē","nè"],
					 ["nai","nái","nǎi","nài"],
					 ["nei","něi","nèi"],
					 ["nao","nāo","náo","nǎo","nào"],
					 ["nou","nóu","nǒu","nòu"],
					 ["nan","nān","nán","nǎn","nán"],
					 ["nen","nēn","nèn"],
					 ["nang ","nāng","náng","nǎng","nàng"],
					 ["neng","néng","nèng"],
					 ["ni","ní","nǐ","nì"],
					 ["nie","niē","nié","niè"],
					 ["niao","niǎo","niào"],
					 ["niu","niū","niú","niǔ","niǜ"],
					 ["nian","niān","nián","niǎn","niàn"],
					 ["nin","nín","nǐn"],
					 ["niang","niáng","niàng"],
					 ["ning","níng","nǐng","nìng"],
					 ["nu","nú","nǔ","nù"],
					 ["nuo","nuó","nuǒ","nuò"],
					 ["nuan","nuǎn"],
					 ["nong","nóng","nǒng","nòng"],
					 ["nu","nǚ","nǜ"],
					 ["nue","nüè"],
					 ["la","lā","lá","lǎ","là"],
					 ["le","lē","lè"],
					 ["lai","lái","lài"],
					 ["lei","lēi","léi","lěi","lèi"],
					 ["lao","lāo","láo","lǎo","lào"],
					 ["lou","lōu","lóu","lǒu","lòu"],
					 ["lan","lān","lán","lǎn","làn"],
					 ["lang","lāng","láng","lǎng","làng"],
					 ["leng ","léng","lěng","lèng"],
					 ["li","li","lí","lǐ","lì"],
					 ["lia","liǎ"],["lie","liē","liě","liè"],
					 ["liao","liāo","liáo","liǎo","liào"],
					 ["liu","liū","liú","liǔ","liù"],
					 ["lian","lián","liǎn","liàn"],
					 ["lin","lín","lín","lǐn","lìn"],
					 ["liang","liáng","liǎng","liàng"],
					 ["ling","līng","líng","lǐng","lìng"],
					 ["lu","lū","lú","lǔ","lù"],
					 ["luo","luō","luó","luǒ","luò"],
					 ["luan","luán","luǎn","luàn"],
					 ["lun","lūn","lún","lǔn","lùn"],
					 ["long","lōng","lóng","lǒng","lòng"],
					 ["lu","lǘ","lǚ","lǜ"],["lue","lüè"],
					 ["luan","luán","luán"],
					 ["ga","gā","gá","gà"],
					 ["ge","gē","gé","gé","gè"],
					 ["gai","gāi","gǎi","gài"],
					 ["gei","gěi"],
					 ["gao","gāo","gǎo","gào"],
					 ["gou","gōu","gǒu","gòu"],
					 ["gan","gān","gǎn","gàn"],
					 ["gen","gēn","gén","gèn","gèn"],
					 ["gang","gāng","gǎng","gàng"],
					 ["geng","gēng","gěng","gèn"],
					 ["gu","gū","gú","gǔ","gù"],
					 ["gua","guā","guǎ","guà"],
					 ["guo","guō","guó","guǒ","guò"],
					 ["guai","guāi","guǎi","guài"],
					 ["gui","guī","guǐ","guì"],
					 ["guan","guān","guǎn","guān"],
					 ["gun","gūn","gǔn","gùn"],
					 ["guang","guāng","guǎng","guàng"],
					 ["gong","gōng","gǒng","gòng"],
					 ["ka","kā","kǎ","kà"],
					 ["ke","kē","ké","kě","kè"],
					 ["kai","kāi","kǎi","kài"],
					 ["kao","kāo","kǎo","kào"],
					 ["kou","kǒu","kòu"],
					 ["kan","kān","kǎn","kàn"],
					 ["ken","kěn","kèn"],
					 ["keng","kēng","kěng"],
					 ["ku","kū","kǔ","kù"],
					 ["kua","kuā","kuǎ","kuà"],
					 ["kuo","kuǒ","kuò"],
					 ["kuai","kuāi","kuǎi","kuài"],
					 ["kui","kuī","kuí","kuǐ","kuì"],
					 ["kuan","kuān","kuǎn"],
					 ["kun","kūn","kǔn","kùn"],
					 ["kuang","kuāng","kuáng","kuǎng","kuàng"],
					 ["kong","kōng","kǒng","kòng"],
					 ["ha","hā","há","hǎ","hà"],
					 ["he","hē","hé","hè"],
					 ["hai","hāi","hái","hǎi","hài"],
					 ["hei","hēi","hěi","hèi"],
					 ["hao","hāo","háo","hǎo","hào"],
					 ["hou","hōu","hóu","hǒu","hòu"],
					 ["han","hān","hán","hǎn","hàn"],
					 ["hen","hén","hěn","hèn"],
					 ["hang","hāng","háng","hǎng","hàng"],
					 ["heng","hēng","héng","hèng"],["hu","hū","hú","hǔ","hù"],
					 ["hua","huā","huá","huà"],
					 ["huo","huō","huó","huǒ","huò"],
					 ["huai","huái","huài"],
					 ["hui","huī","huí","huǐ","huì"],
					 ["huan","huān","huán","huǎn","huàn"],
					 ["hun","hūn","hún","hǔn","hùn"],
					 ["huang","huāng","huáng","huǎng","kuàng"],
					 ["hong","hōng","hóng","hōng","hòng"],
					 ["ji","jī","jí","jī","jì"],
					 ["jia","jiā","jiā","jiǎ","jià"],
					 ["jie","jiē","jié","jiě","jiè"],
					 ["jiao","jiāo","jiáo","jiǎo","jiào"],
					 ["jiu","jiū","jiǔ","jiù"],
					 ["jian","jiān","jiǎn","jiàn"],
					 ["jin","jīn","jǐn","jìn"],
					 ["jiang","jiāng","jiǎng","jiàng"],
					 ["jing","jīng","jǐng","jìng"],
					 ["ju","jū","jú","jǔ","jù"],
					 ["jue","juē","jué","juě","jué"],
					 ["juan","juān","juǎn","juàn"],
					 ["jun","jūn","jǔn","jùn"],
					 ["jiong","jiōng","jiǒng","jiòng"],
					 ["qi","qī","qí","qǐ","qì"],
					 ["qia","qiā","zhòu","qià"],
					 ["qie","qiē","qié","qiě","qiè"],
					 ["qiao","qiāo","qiáo","qiǎo","qiào"],
					 ["qiu","qiū","qiú","qiǔ"],
					 ["qian","qiān","qián","qiǎn","qiàn"],
					 ["qin","qīn","qín","qǐn","qìn"],
					 ["qiang","qiāng","qiáng","qiǎng","qiāng"],
					 ["qing","qīng","qíng","qǐng","qìng"],
					 ["qu","qū","qú","qǔ","qù"],
					 ["que","quē","qué","què"],
					 ["quan","quān","quán","quǎn","quàn"],
					 ["qun","qūn","qún"],
					 ["qiong","qiōng","qióng","qiǒng"],
					 ["xi","xī","xī","xǐ","xì"],
					 ["xia","xiā","xiá","xiǎ","xià"],
					 ["xie","xiē","xié","xiě","xiè"],
					 ["xiao","xiāo","xiáo","xiǎo","xiào"],
					 ["xiu","xiū","xiǔ","xiù"],
					 ["xian","xiān","xián","xiǎn","xiàn"],
					 ["xin","xīn","xín","xǐn","xìn"],
					 ["xiang","xiāng","xiáng","xiǎng","xiàng"],
					 ["xing","xīng","xíng","xǐng","xìng"],
					 ["xu","xū","xú","xū","xù"],
					 ["xue","xuē","xué","xuě","xué"],
					 ["xuan","xuān","xuán","xuǎn","xuàn"],
					 ["xun","xūn","xún","xùn"],
					 ["xiong","xiōng","xióng","xiòng"],
					 ["zhi","zhī","zhí","zhī","zhì"],
					 ["zha","zhā","zhá","zhǎ","zhà"],
					 ["zhe","zhē","zhé","zhě","zhè"],
					 ["zhai","zhāi","zhái","zhǎi","zhài"],
					 ["zhei"],["zhao","zhāo","zhuó","zhǎo","zhào"],
					 ["zhou","zhōu","zhóu","zhǒu","zhòu"],
					 ["zhan","zhān","zhǎn","zhàn"],
					 ["zhen","zhēn","zhěn","zhèn"],
					 ["zhang","zhāng","zhǎng","zhàng"],
					 ["zheng","zhēng","zhěng","zhèng"],
					 ["zhu","zhū","zhú","zhǔ","zhù"],
					 ["zhua","zhuā","zhuǎ"],
					 ["zhuo","zhuō","zhuó"],
					 ["zhuai","zhuāi","zhuǎi","zhuài"],
					 ["zhui","zhuī","zhuǐ","zhuì"],
					 ["zhuan","zhuān","zhuǎn","zhuàn"],
					 ["zhun","zhūn","zhǔn","zhùn"],
					 ["zhuang","zhuāng","zhuǎng","zhuàng"],
					 ["zhong","zhōng","zhǒng","zhòng"],
					 ["chi","chī","chí","chǐ","chì"],
					 ["cha","chà","chá","chǎ","chà"],
					 ["che","chē","chě","chè"],
					 ["chai","chāi","chái","chǎi","chài"],
					 ["chao","chāo","cháo","chǎo","chào"],
					 ["chou","chōu","chóu","chǒu","chòu"],
					 ["chan","chān","chán","chǎn","chàn"],
					 ["chen","chēn","chén","chěn","chèn"],
					 ["chang","cāng","cáng"],
					 ["cheng","chēng","chéng","chěng","chèng"],
					 ["chu","chū","chú","chǔ","chù"],
					 ["chuo","chuō","chuò"],
					 ["chuai","chuāi","chuái","chuǎi","chuài"],
					 ["chui","chuī","chuí","chuì"],
					 ["chuan","chuān","chuán","chuǎn","chuàn"],
					 ["chun","chūn","chún","chǔn"],
					 ["chuang","chuāng","chuáng","chuǎng","chuàng"],
					 ["chong","chōng","chóng","chǒng","chòng"],
					 ["shi","shī","shí","shǐ","shì"],
					 ["sha","shā","shá","shǎ","shā"],
					 ["she","shē","shé","shě","shè"],
					 ["shai","shāi","shǎi","shài"],
					 ["shei","shéi"],
					 ["shao","shāo","sháo","shǎo","shào"],
					 ["shou","shōu","shú","shǒu","shòu"],
					 ["shan","shān","shǎn","shàn"],
					 ["shen","shēn","shén","shěn","shèn"],
					 ["shang","shāng","shǎng","shàng"],
					 ["sheng","shēng","shéng","shěng","shèng"],
					 ["shu","shū","shū","shǔ","shù"],
					 ["shua","shuā","shuǎ","shuà"],
					 ["shuo","shuō","shuò"],
					 ["shuai","shuāi","shuǎi","shuài"],
					 ["shui","shuí","shuǐ","shuì"],
					 ["shuan","shuān","shuàn"],
					 ["shun","shǔn","shùn"],
					 ["shuang","shuāng","shuǎng","shuàng"],
					 ["ri","rì"],
					 ["re","ré","rě","rè"],
					 ["rao","ráo","rǎo","rào"],
					 ["rou","róu","rǒu","ròu"],
					 ["ran","rán","rǎn"],
					 ["ren","rén","rěn","rèn"],
					 ["rang","ráng","rǎng","ràng"],
					 ["reng","rēng","réng","rěng","rèng"],
					 ["ru","rú","rǔ","rù"],
					 ["ruo","ruó","ruò"],
					 ["rui","ruí","ruǐ","ruì"],
					 ["ruan","ruán","ruǎn"],
					 ["run","rūn","rún","rùn"],
					 ["rong","róng","rǒng"],
					 ["zi","zī","zǐ","zì"],
					 ["za","zā","zá","zǎ"],
					 ["ze","zé","zě","zè"],
					 ["zai","zāi","zǎi","zài"],
					 ["zei","zéi"],
					 ["zao","zāo","záo","zǎo","zào"],
					 ["zou","zōu","zǒu","zòu"],
					 ["zan","zān","zán","zǎn","zàn"],
					 ["zen","zān","zěn","zèn"],
					 ["zang","zāng","zǎng","zàng"],
					 ["zeng","zēng","zèng"],
					 ["zu","zū","zú","zǔ","zù"],
					 ["zuo","zuō","zuó","zuǒ","zuò"],
					 ["zui","zuī","zuǐ","zuì"],
					 ["zuan","zuān","zuǎn","zuān"],
					 ["zun","zūn","zǔn","zùn"],
					 ["zong","zōng","zǒng","zòng"],
					 ["ci","cí","cí","cǐ","cì"],
					 ["ca","cā","cǎ","zá"],
					 ["ce","cè"],
					 ["cai","cāi","cái","cǎi","cài"],
					 ["cao","cāo","cáo","cǎo","cào"],
					 ["cou","còu"],
					 ["can","cān","cán","cǎn","càn"],
					 ["cen","cēn","cén"],
					 ["cang","cāng","cáng"],
					 ["ceng","cēng","céng","cèng"],
					 ["cu","cū","cú","cù"],
					 ["cuo","cuō","cuó","cuǒ","cuò"],
					 ["cui","cuī","cuí","cuǐ","cuì"],
					 ["cuan","cuān","cuán","cuàn"],
					 ["cun","cūn","cún","cǔn","cùn"],
					 ["cong","cōng","cóng","cǒng","còng"],
					 ["si","sī","sǐ","sì"],["sa","sā","sǎ","sà"],
					 ["se","sè"],
					 ["sai","sāi","sài"],
					 ["sao","sāo","sǎo","sào"],
					 ["sou","sōu","sǒu","sòu"],
					 ["san","sān","sǎn","sàn"],
					 ["sen","sēn"],
					 ["sang","sāng","sǎng","sàng"],
					 ["seng","sēng"],
					 ["su","sū","sú","sù"],
					 ["suo","suō","suǒ","suò"],
					 ["sui","suī","suí","suǐ","suì"],
					 ["suan","suān","suǎn","suàn"],
					 ["sun","sūn","sǔn","sùn"],
					 ["song","sōng","sǒng","sòng"],
					 ["a","ā","á","à"],
					 ["e","ē","é","ě","è"],
					 ["ai","āi","ái","ǎi","ài"],
					 ["ao","āo","áo","ǎo","ào"],
					 ["ou","ōu","ǒu","ǒu"],
					 ["an","ān","án","ǎn","àn"],
					 ["en","ēn","èn"],
					 ["ang","āng","áng","ǎng","àng"],
					 ["eng","ēng"],
					 ["er","ér","ěr","èr"],
					 ["yi","yī","yí","yǐ","yì"],
					 ["ya","yā","yá","yā","yà"],
					 ["yo","yō"],
					 ["ye","yē","yé","yě","yè"],
					 ["yai","yái"],
					 ["yao","yāo","yáo","yǎo","yào"],
					 ["you","yōu","yóu","yǒu","yòu"],
					 ["yan","yān","yán","yǎn","yàn"],
					 ["yin","yīn","yín","yǐn","yìn"],
					 ["yang","yāng","yáng","yǎng","yàng"],
					 ["ying","yīng","yíng","yǐng","yìng"],
					 ["wu","wū","wú","wǔ","wù"],
					 ["wa","wā","wá","wǎ","wà"],
					 ["wo","wō","wǒ","wò"],
					 ["wai","wāi","wài"],
					 ["wei","wēi","wéi","wěi","wéi"],
					 ["wan","wān","wán","wǎn","wàn"],
					 ["wen","wēn","wén","wěn","wèn"],
					 ["wang","wāng","wáng","wǎng","wàng"],
					 ["weng","wēng","wěng","wèng"],
					 ["yu","yū","yú","yǔ","yù"],
					 ["yue","yuē","yuè"],
					 ["yuan","yuān","yuán","yuǎn","yuàn"],
					 ["yun","yùn","yún","yǔn","yùn"],
					 ["yong","yōng","yóng","yǒng","yòng"],
					 ["ei","ēi","éi","ěi","èi"],
					 ["o","ō","ó","ò"],
					 ["xi","xī","xí","xǐ","xì"]]


function Display_all(){
   var display_str = names2[0][0] + "      " + names2[0][1] + "\n";
   for (var i = 1; i < names2.length; i++) {
   		if(i==names2.length-1)
   			display_str = display_str + names2[i][0] + "    " + names2[i][1];
   		else
    		display_str = display_str + names2[i][0] + "    " + names2[i][1] + "\n";
   }
   return display_str;
  }

function Display(inarray){
	var display_str = names2[0][0] + "      " + names2[0][1] + "\n";
	for (var i = 0; i < inarray.length; i++) {
		if(i==inarray.length-1)
			display_str = display_str + inarray[i];
		else
     		display_str = display_str + inarray[i] + "\n";
   }
   return display_str;
}
function Sname(instr){
		var a_instr
		if(instr.length < 3)
			return;
    	for(var i = 0 ; i < number.length ; i++){
        	var num = instr.indexOf(number[i]);
        	if(num != -1){
          		a_instr = instr.substring(0,num);
          		
          	break;
        	}
    	}
    	return a_instr;
}

function Grade(instr){
		var b_instr;                //輸入分割成名字和分數2部分                  //分數
		if(instr.length < 3)
			return;
    	for(var i = 0 ; i < number.length ; i++){
        	var num = instr.indexOf(number[i]);
        	if(num != -1){
          		b_instr = instr.substring(num,instr.length);
          		
          	break;
        	}
    	}

    	return b_instr;
}

var ag = [];
//a[0]="";
bot.on("message",function(event){
	msg = event.message.text;
	console.log(event)
	var replyMsg2 = "";
	if(msg.length < 3 || msg == "登記完成" || msg == "學校資訊")
		return;
		ag = compare(names,msg,event);
		console.log("a外")
		console.log(ag);
		console.log(typeof(ag))
		aaaa = Sname(msg);
		bbbb = Grade(msg);
		var data = {Sname:aaaa,Grade:bbbb}
		var data1 = {Grade:bbbb}
		var connection = mysql.createConnection({
  			host     : '104.199.190.196',
  			user     : 'root',
  			password : 'asdcpi14',
  			database : 'line'
		});
		connection.connect();
			date =dt.getMonth()+"/"+dt.getDay();
		connection.query('CREATE TABLE '+date+' (Sname VARCHAR(255) NOT NULL,GRADE INT NULL,PRIMARY KEY(Sname))', function(err, results) {
  				if (err) {
    				throw err;
 				 }
 				 console.log("Table Created");
			});
		results = connection.query('SELECT GRADE FROM'+date+'WHERE Sname = ?',aaaa);
		if(results == null){
			connection.query('INSERT INTO'+date+'SET ?',[data], function(err, results) {
  				if (err) {
    				throw err;
 				 }
 				 console.log("資料已修改");
			});
		}
		else{
			connection.query('UPDATE GRADE SET ? WhERE Sname = ?',[data1,aaaa], function(err, results) {
  				if (err) {
    				throw err;
 				 }
 				 console.log("資料已修改");
			});
		}
		connection.end();
});

if(typeof(ag) == 'object'){
	var bb = ag;
	console.log(ag[0]);
	//if(ag[0] == '修改'){
		bot.on('postback', function(event) {
			msg3 = event.postback.data;
			if(msg3.indexOf("是") != -1){
				console.log("是")
	            names2[ag[1]][1] = ag[3];				            
	            recordStr = names2[ag[1]][0]+"    "+ag[3];     //儲存每筆紀錄
	            record.push(recordStr);
	            ArrayReverse(record);                 //反轉紀錄
				event.reply([{ type: 'text', text: "已修改"},
							 { type: 'text', text: "現在成績:"+names2[ag[1]][0]+names2[ag[1]][1]}]).then(function(data){
	         	}).catch(function(error){
	       		console.log("error")
	     		});   
			}
			if(msg3.indexOf("否") != -1){
				console.log("否")	

	            names2[ag[1]][1] = ag[2];				            
	            recordStr = names2[ag[1]][0]+"    "+ag[2]     //儲存每筆紀錄
	            record.push(recordStr);
	            ArrayReverse(record);                 //反轉紀錄
				event.reply([{ type: 'text', text: "已取消修改"},
							 { type: 'text', text: "現在成績:"+names2[ag[1]][0]+names2[ag[1]][1]}]).then(function(data){
	         	}).catch(function(error){
	       		console.log("error")
	     		});
			}
    	});
	//}
}
// bot.on('message',function(event){
// 	msg5 = event.message.text;
// 	if(msg5.indexOf("登記完成") != -1){
// 		var a = Display_all();
// 		fs.writeFile(__dirname + '/content.txt', a, function(err){
//      if (err) {
//           console.error(err)
//      }
// });
// 	}
// }); 

   bot.on("postback",function(event){
var msg4 = event.postback.data;
var replyMsg3 = "";
if(msg4.indexOf("成績") != -1){
	replyMsg3 = Display_all();
      event.reply(replyMsg3).then(function(data){
          }).catch(function(error){
        console.log("error")
      });
    }      
 });

   bot.on("postback",function(event){
		var msg6 = event.postback.data;
var replyMsg4 = "";
if(msg6.indexOf("前5筆") != -1){
	replyMsg4 = Display(Last_N_in(ArrayReverse(record),5));
      event.reply(replyMsg4).then(function(data){
          }).catch(function(error){
        console.log("error")
      });
    }      
 });
