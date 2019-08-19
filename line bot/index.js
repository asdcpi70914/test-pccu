var gradeswitch = 0;
var registering = 0;
var uploadEmailing = 0;
var verificationing = 0;
var emailtrue = 0;
var emailcount = 0;
var formate = "";
var coursename = "";
var transcript = [] ;
var attenddate = ""
var attendname = ""
var Loginname = "";
var gradename = "";
var Identity = "";

//var LoginStatus = 0;
var selectgrade = 0;
var min = 100000000;
var max = 999999999;
var PW = Math.floor(Math.random()*(max-min+1))+min;
var PWcount = 0;
var linebot = require('linebot');
var express = require('express');
var request = require("request");
var getJSON = require('get-json');
var nodemailer = require('nodemailer');
var datetime = require('node-datetime');
var path = require('path');
var mysql = require('mysql')
var fs= require('fs');
var pinyin_dict_all = require("./pinyin_dict3.js")
require('events').EventEmitter.prototype._maxListeners = 100;
var bot = linebot({
  channelId:"1636236058",
  channelSecret:"efa4ffce81f86f3acf766fd65a09c610",
  channelAccessToken:"CZ7V4TpwRIQyv4q7i4/E+nKfBDPrbcXQyeSbfY+/LfQX/ywP6oxJS0KHQhxwBKeNw0o2wEzMdoIJPGIhs5gtSGd568Kxae8BKO6Y1nmdeRqKkDoOQ7EwikgIixvC6Hezp7puXSvoLaF/esZWfOTcEgdB04t89/1O/w1cDnyilFU="
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

bot.on('message', function(event) { //貼圖
  //var msg = event.message.text;
  console.log("event.message.type:"+event.message.type)
  if (event.message.type == "sticker"){
    console.log("傳貼圖的都是87")
     event.reply("不要傳貼圖").then(function(data){
  }).catch(function(error){
    console.log("error")
  });

  }
});
bot.on('message', function(event) { //使用方法
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  if(msg.indexOf("使用方法") != -1&&msg.length == 4){
     event.reply("教師先註冊為使用者，並到網頁上傳學生清單。"+'\n'+"登記成績時，先選擇要登記成績的課程，接著建立成績單，就可以開始登記成績。").then(function(data){
  }).catch(function(error){
    console.log("error")
  });

  } 
});
bot.on('message', function(event) { //學生課程
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  if(msg =="學生課程"){
          var connection = mysql.createConnection({
            host     : '35.185.170.234',
            user     : 'root',
            password : 'asdcpi14',
            database : 'line'
          });
          connection.connect();
      connection.query('Select CourseName FROM COURSE WHERE Course_ID = (select Course_ID FROM SCOURSE WHERE Student_ID = (SELECT Student_ID FROM STUDENT WHERE User_ID = ?))' ,[event.source.userId], function(err, results){
          console.log("課程")
          console.log(results.length)
        if(results.length == 1){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  }]
              }]
            }
              })
        }else if(results.length == 2){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  }]
              }]
            }
              })          
        }else if(results.length == 3){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",

              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              }]
            }
              })          
        }else if(results.length == 4){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },
                  {
                    type: "postback",
                    label: "無課程",
                    data:  "無課程"
                  },
                  {
                    type: "postback",
                    label: "無課程",
                    data:  "無課程"
                  }]
              }]
            }
              })          
        }else if(results.length == 5){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  },{
                    type: "postback",
                    label:"無課程",
                    data: "無課程"
                  }]
              }]
            }
              })          
        }else if(results.length == 6){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  },{
                    type: "postback",
                    label: results[5].CourseName,
                    data: "成績單"+results[5].CourseName
                  }]
                }]
              }
            })          
        }
      });
        connection.end();
  } //
});
bot.on('message', function(event) { //教師課程
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  var connection = mysql.createConnection({
      host : '35.185.170.234',
      user : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
  connection.connect();
  if(msg == "教師課程"){
    connection.query('Select Identity FROM Login WHERE User_ID = ?' ,[event.source.userId], function(err, results){
      console.log(results)
      Identity = results[0].Identity
      console.log("Identity"+Identity);
    });
    connection.query('Select CourseName FROM COURSE WHERE User_ID = ?' ,[event.source.userId], function(err, results){
          console.log("課程")
          console.log(results.length)
      if(Identity == "TEACHER"){    
        if(results.length == 1){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  }]
              }]
            }
              })
        }else if(results.length == 2){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  }]
              }]
            }
              })          
        }else if(results.length == 3){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              }]
            }
              })          
        }else if(results.length == 4){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },
                  {
                    type: "postback",
                    label:"無課程",
                    data:  "無課程"
                  },
                  {
                    type: "postback",
                    label: "無課程",
                    data:  "無課程"
                  }]
              }]
            }
              })          
        }else if(results.length == 5){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  },{
                    type: "postback",
                    label: "無課程",
                    data: "無課程"
                  }]
              }]
            }
              })          
        }else if(results.length == 6){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  },{
                    type: "postback",
                    label: results[5].CourseName,
                    data: "成績單"+results[5].CourseName
                  }]
                }]
              }
            })          
        }
      }else{
        event.reply("此選單為教師功能，學生請使用學生課程").then(function(data){
        }).catch(function(error){
        console.log("error")
        });
      }  
    });
    connection.end();   
  }
});
bot.on('postback', function(event) { //顯示目前課堂名稱
  var msg = event.postback.data;
  if(msg.indexOf("考成績") != -1 || msg == "選擇成績單")
    return;
  if(msg.indexOf("成績單") != -1){
  coursename = msg.replace("成績單","")
  console.log(msg)
    console.log(coursename)
  event.reply("目前課堂名稱:"+coursename).then(function(data){
  }).catch(function(error){
    console.log("error")
  });
  }
});
bot.on('postback', function(event) { //顯示目前簽到單
  var msg = event.postback.data;
  if(msg.indexOf("日期") != -1)
    return;
  if(msg.indexOf("簽到單") != -1){
  attendname = msg.replace("簽到單","")
  console.log(msg)
    console.log(coursename)
  event.reply("目前簽到單:"+attendname).then(function(data){
  }).catch(function(error){
    console.log("error")
  });
  }
});
bot.on('message', function(event) { //功能選單
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
    var msg = event.message.text;
    if(msg.indexOf("功能") != -1){
      event.reply({
      type: "template", 
      altText: "功能選單",
      template: {
      type: "carousel",
      columns: [{
            title: "帳號功能選單",
            text: "帳號功能選單",
            actions: [
                {
                    type: "message",
                    label: "註冊",
                    text: "註冊"
                },
                {
                    type: "message",
                    label: "登出",
                    text: "登出"
                },
                {
                    type: "message",
                    label: "登入狀態",
                    text: "登入狀態"
                }]
          },{
            title: "成績功能選單",
            text: "成績功能選單",
            actions: [
                {
                    type: "message",
                    label: "成績",
                    text: "成績"
                },
                {
                    type: "message",
                    label: "出缺席",
                    text: "出缺席"
                },
                {
                    type: "message",
                    label: "成績單",
                    text: "成績單"
                }]
          },{
            title: "成績功能選單",
            text: "成績功能選單",
            actions: [
                {
                    type: "message",
                    label: "建立成績單",
                    text: "建立成績單"
                },
                {
                    type: "postback",
                    label: "選擇成績單",
                    data: "選擇成績單"
                },
                {
                    type: "postback",
                    label: "成績",
                    data: "成績"
                }]
          },{
            title: "成績出缺席功能選單",
            text: "成績出缺席功能選單",
            actions: [
                {
                    type: "postback",
                    label: "前5筆",
                    data: "前5筆"
                },
                {
                    type: "postback",
                    label: "個人成績",
                    data: "個人成績"
                },
                {
                    type: "postback",
                    label: "出缺席",
                    data: "出缺席"
                }]
          },{
            title: "出缺席功能選單",
            text: "出缺席功能選單",
            actions: [
                {
                    type: "postback",
                    label: "前5筆出缺席",
                    data: "前5筆出缺席"
                },
                {
                    type: "postback",
                    label: "全部出席",
                    data: "全部出席"
                },
                {
                    type: "postback",
                    label: "全部缺席",
                    data: "全部缺席"
                }]
          }]
        }
      })
  };
});
bot.on('message', function(event) { //公車資訊
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  if(event.message.type == "text"){
    var msg = event.message.text;
    if(msg.indexOf("公車資訊") != -1){
      event.reply({
        type: 'template',
        altText: 'this is a buttons template',
        template: {
        type: 'buttons',
        //thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
        title: '公車資訊',
        text: '可以在此查詢各資訊',
        actions: [{
          type: 'postback',
          label: '往陽明山',
          data: '陽明山'
          }, {
            type: 'postback',
            label: '往劍潭',
            data: '劍潭'
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

bot.on("postback",function(event){ //往陽明山
  axios.get("https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/%E7%B4%855?$select=StopName%2CEstimateTime%2CStopID&$filter=RouteID%20eq%20'10821'%20and%20%20Direction%20eq%20'0'%20and%20StopID%20eq%20'11123'%20or%20StopID%20eq%20'11127'&$top=40&$format=JSON", {
    headers: getAuthorizationHeader(),
    }).then(function(response){
      var msg = event.postback.data;
      var replyMsg = "";
      var pccu = "";
      var pccu1 = "";
      if(msg.indexOf("陽明山") != -1){
          if(response.data[1].EstimateTime <= 60){
            pccu = response.data[1].StopName.Zh_tw + " :即將抵達"
          }
          else if(response.data[1].EstimateTime > 60){
            min = Math.floor(response.data[1].EstimateTime/60)+ "分鐘";
            pccu = response.data[1].StopName.Zh_tw+min+" :";
          }
          else if(response.data[1].StopStatus == 1){
             pccu = response.data[1].StopName.Zh_tw +": 尚未發車";
          }
          if(response.data[0].EstimateTime <= 60){
            pccu1 = response.data[0].StopName.Zh_tw +": 即將抵達"
          }
          else if(response.data[0].EstimateTime > 60){
            min = Math.floor(response.data[0].EstimateTime/60)+ "分鐘";
            pccu1 = response.data[0].StopName.Zh_tw+min +" :";
          }
          else if(response.data[0].StopStatus == 1){
             pccu1 = response.data[0].StopName.Zh_tw +": 尚未發車";
          }
        replyMsg = "往陽明山"+"\n"+"紅5:"+"\n"+pccu+"\n"+pccu1;
         axios.get("https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/260?$filter=Direction%20eq%20%270%27%20and%20%20StopID%20eq%20%2739145%27%20or%20StopID%20eq%20%2739142%27%20or%20StopID%20eq%20%2739032%27%20%20or%20StopID%20eq%20%2739029%27&$top=100&$format=JSON", { // 欲呼叫之API網址(此範例為台鐵車站資料)
        headers: getAuthorizationHeader(),
        }).then(function(response){
            var pccu260 = "";
            var pccu2601 = "";
            var pccu2602 = "";
            var pccu2603 = "";
          if(response.data[0].EstimateTime <= 60){
            pccu260 = "捷運劍潭站(中山) : 即將抵達"
          }
          else if(response.data[0].EstimateTime > 60){
            min = Math.floor(response.data[0].EstimateTime/60) + "分鐘";
            pccu260 = "捷運劍潭站(中山) : "+min;
          }
          else if(response.data[0].StopStatus == 1){
             pccu260 = "捷運劍潭站(中山) : 尚未發車";
          }
          else if(response.data[1].StopStatus == 3){
             pccu260 = "捷運劍潭站(中山) : 末班車已過";
          }

          if(response.data[1].EstimateTime <= 60){
            pccu2601 = "捷運劍潭站(中山) : 即將抵達"
          }
          else if(response.data[1].EstimateTime > 60){
            min = Math.floor(response.data[1].EstimateTime/60) + "分鐘";
            pccu2601 = "捷運士林站(中山) : "+min;
          }
         else if(response.data[1].StopStatus == 1){
             pccu2601 = "捷運士林站(中山) : 尚未發車";
          }
          else if(response.data[1].StopStatus == 3){
             pccu2601 = "捷運士林站(中山) : 末班車已過";
          }

          if(response.data[2].EstimateTime <= 60){
            pccu2602 = "捷運劍潭站(中山) : 即將抵達"
          }
          else if(response.data[2].EstimateTime > 60){
            min = Math.floor(response.data[2].EstimateTime/60) + "分鐘";
            pccu2602 = "捷運劍潭站(中山) : "+min;
          }
          else if(response.data[2].StopStatus == 1){
             pccu2602 = "捷運劍潭站(中山) : 尚未發車";
          }
          else if(response.data[2].StopStatus == 3){
             pccu2602 = "捷運劍潭站(中山) : 末班車已過";
          }

          if(response.data[3].EstimateTime <= 60){
            pccu2603 = "捷運士林站(中山) : 即將抵達"
          }
          else if(response.data[3].EstimateTime > 60){
            min = Math.floor(response.data[3].EstimateTime/60) + "分鐘";
            pccu2603 = "捷運士林站(中山) : "+min;
          }
         else if(response.data[3].StopStatus == 1){
             pccu2603 = "捷運士林站(中山) : 尚未發車";
          }
          else if(response.data[3].StopStatus == 3){
             pccu2603 = "捷運士林站(中山) : 末班車已過";
          }
          replyMsg2 = replyMsg+"\n"+"260區:"+"\n"+pccu260+"\n"+pccu2601+"\n"+"260:"+"\n"+pccu2602+"\n"+pccu2603;
        event.reply(replyMsg2).then(function(data){
          console.log(replyMsg2);
          }).catch(function(error){
          console.log("error")
        });
      });
    }
  });
});
bot.on("message",function(event){ //天氣資訊
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  var replyMsg1 = "";
  if(msg.indexOf("天氣資訊") != -1){
      axios.get("https://mobi.pccu.edu.tw/weather.json", {
      }).then(function(response){
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
bot.on("postback",function(event){ //往劍潭
  var msg = event.postback.data;
  var replyMsg = "";
  if(msg.indexOf("劍潭") != -1){
     axios.get("https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/%E7%B4%855?$select=StopName%2CEstimateTime%2CStopID&$filter=RouteID%20eq%20'10821'%20and%20%20Direction%20eq%20'1'%20%20and%20StopID%20eq%20'11073'%20or%20StopID%20eq%20'58228'&$top=40&$format=JSON", { // 欲呼叫之API網址(此範例為台鐵車站資料)
  headers: getAuthorizationHeader(),
  }).then(function(response){
      var pccu = "";
                if(response.data[0].EstimateTime <= 60){
            pccu = "文化大學 : 即將抵達"
          }
          else if(response.data[0].EstimateTime > 60){
            min = Math.floor(response.data[0].EstimateTime/60) + "分鐘";
            pccu = "文化大學 : "+min;
          }
          else if(response.data[0].StopStatus == 1){
             pccu = "文化大學 : 尚未發車";
          }
          if(response.data[1].EstimateTime <= 60){
            pccu1 = "文化大學一 : 即將抵達"
          }
          else if(response.data[1].EstimateTime > 60){
            min = Math.floor(response.data[1].EstimateTime/60) + "分鐘";
            pccu1 = "文化大學一 : "+min;
          }
          else if(response.data[1].StopStatus == 1){
             pccu1 = "文化大學一 : 尚未發車";
          }
          replyMsg = "往劍潭"+"\n"+"紅5:"+"\n"+pccu+"\n"+pccu1;
 axios.get("https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/260?$filter=Direction%20eq%20%271%27%20and%20StopID%20eq%20%2739185%27%20or%20StopID%20eq%20%2739097%27%20&$top=100&$format=JSON", { // 欲呼叫之API網址(此範例為台鐵車站資料)
  headers: getAuthorizationHeader(),
  }).then(function(response){
      var pccu260 = "";
      var pccu2601 = "";
        if(response.data[0].EstimateTime <= 60){
            pccu260 = "文化大學 : 即將抵達"
          }
          else if(response.data[0].EstimateTime > 60){
            min = Math.floor(response.data[0].EstimateTime/60) + "分鐘";
            pccu260 = "文化大學 : "+min;
          }
          else if(response.data[0].StopStatus == 1){
             pccu260 = "文化大學 : 尚未發車";
          }
          else if(response.data[1].StopStatus == 3){
             pccu260 = "末班車已過";
          }
          if(response.data[1].EstimateTime <= 60){
            pccu2601 = "文化大學 : 即將抵達"
          }
          else if(response.data[1].EstimateTime > 60){
            min = Math.floor(response.data[1].EstimateTime/60) + "分鐘";
            pccu2601 = "文化大學 : "+min;
          }
          else if(response.data[1].StopStatus == 1){
             pccu2601 = "文化大學 : 尚未發車";
          }
          else if(response.data[1].StopStatus == 3){
             pccu2601 = "末班車已過";
          }
          replyMsg2 = replyMsg+"\n"+"260區:"+"\n"+pccu260+"\n"+"260:"+"\n"+pccu2601;
    event.reply(replyMsg2).then(function(data){
    console.log(replyMsg2);
    }).catch(function(error){
        console.log("error")
      });
      });
  });
  }
});
bot.on("message",function(event){ //學校公告
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  var replyMsg1 = "";
  if(msg.indexOf("學校公告") != -1){
    axios.get("http://mobi.pccu.edu.tw/DataAPI/announcement/", {
    }).then(function(response){
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
var attend_names = [["liú","jiā","háo"],
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
// var names2 = [["姓名","成績"],
//        ["劉家豪",""],
//        ["陳宇庭",""],
//        ["呂宜璟",""],
//        ["劉逸",""],
//        ["林峻禾",""],
//        ["郭先旻",""],
//        ["楊宗翰",""],
//        ["陳庭萱",""],
//        ["林冠中",""],
//        ["朱芷萱",""],
//        ["張仲華",""],
//        ["黃柏翰",""],
//        ["方本正",""],
//        ["張易誠",""],
//        ["許詠智",""],
//        ["王嘉誠",""],
//        ["陳聖文",""],
//        ["莊明諺",""],
//        ["謝宇逸",""],
//        ["蘇祈合",""],
//        ["邱奕瑋",""],
//        ["陳敬汶",""],
//        ["高浩軒",""],
//        ["關宇翔",""],
//        ["李權益",""],
//        ["張家銘",""],
//        ["吳沛彥",""],
//        ["鄭稚儒",""],
//        ["黃威仁",""],
//        ["盧宏曜",""],
//        ["黃國豪",""],
//        ["郭三泰",""],
//        ["王奕傑",""],
//        ["彭子豪",""],
//        ["葉丞瑋",""],
//        ["李昀昇",""],
//        ["許高祥",""],
//        ["呂彥恩",""],
//        ["林茗琮",""],
//        ["林柏任",""],
//        ["葉瀚中",""],
//        ["蔡杰恩",""],
//        ["徐人凱",""],
//        ["陳弈",""],
//        ["林昕承",""],
//        ["洪靖博",""],
//        ["黃俊凱",""],
//        ["呂紹豪",""],
//        ["龔鈺翔",""],
//        ["楊昇達",""],
//        ["劉于脩",""],
//        ["楊兆凱",""],
//        ["林宏峻",""],
//        ["陳柏睿",""],
//        ["林志謙",""],
//        ["吳駿溢",""],
//        ["潘永倫",""],
//        ["蔡佳佑",""]]

var attend_Ary = [["姓名","出缺席"],
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

var names = [];
var names2 = [["姓名","成績"]];
//var attend_Ary = [["姓名","出缺席"]];
    //重複輸入紀錄
var repin = [];

var number = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20",
  "21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40",
  "41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60",
  "61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80",
  "81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100"];

var number_ch1 = ["零","一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九",
  "二十","二十一","二十二","二十三","二十四","二十五","二十六","二十七","二十八","二十九",
  "三十","三十一","三十二","三十三","三十四","三十五","三十六","三十七","三十八","三十九",
  "四十","四十一","四十二","四十三","四十四","四十五","四十六","四十七","四十八","四十九",
  "五十","五十一","五十二","五十三","五十四","五十五","五十六","五十七","五十八","五十九",
  "六十","六十一","六十二","六十三","六十四","六十五","六十六","六十七","六十八","六十九",
  "七十","七十一","七十二","七十三","七十四","七十五","七十六","七十七","七十八","七十九",
  "八十","八十一","八十二","八十三","八十四","八十五","八十六","八十七","八十八","八十九",
  "九十","九十一","九十二","九十三","九十四","九十五","九十六","九十七","九十八","九十九","一百"];

var number_ch2 = ["零","一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九",
  "二十","二一","二二","二三","二四","二五","二六","二七","二八","二九",
  "三十","三一","三二","三三","三四","三五","三六","三七","三八","三九",
  "四十","四一","四二","四三","四四","四五","四六","四七","四八","四九",
  "五十","五一","五二","五三","五四","五五","五六","五七","五八","五九",
  "六十","六一","六二","六三","六四","六五","六六","六七","六八","六九",
  "七十","七一","七二","七三","七四","七五","七六","七七","七八","七九",
  "八十","八一","八二","八三","八四","八五","八六","八七","八八","八九",
  "九十","九一","九二","九三","九四","九五","九六","九七","九八","九九","一百"];

var number_Piny1 = ["líng","yī","èr","sān","sì","wǔ","liù","qī","bā","jiǔ","shí","shí yī","shí èr","shí sān","shí sì","shí wǔ","shí liù","shí qī","shí bā","shí jiǔ",
  "èr shí","èr shí yī","èr shí èr","èr shí sān","èr shí sì","èr shí wǔ","èr shí liù","èr shí qī","èr shí bā","èr shí jiǔ",
  "sān shí","sān shí yī","sān shí èr","sān shí sān","sān shí sì","sān shí wǔ","sān shí liù","sān shí qī","sān shí bā","sān shí jiǔ",
  "sì shí","sì shí yī","sì shí èr","sì shí sān","sì shí sì","sì shí wǔ","sì shí liù","sì shí qī","sì shí bā","sì shí jiǔ",
  "wǔ shí","wǔ shí yī","wǔ shí èr","wǔ shí sān","wǔ shí sì","wǔ shí wǔ","wǔ shí liù","wǔ shí qī","wǔ shí bā","wǔ shí jiǔ",
  "liù shí","liù shí yī","liù shí èr","liù shí sān","liù shí sì","liù shí wǔ","liù shí liù","liù shí qī","liù shí bā","liù shí jiǔ",
  "qī shí","qī shí yī","qī shí èr","qī shí sān","qī shí sì","qī shí wǔ","qī shí liù","qī shí qī","qī shí bā","qī shí jiǔ",
  "bā shí","bā shí yī","bā shí èr","bā shí sān","bā shí sì","bā shí wǔ","bā shí liù","bā shí qī","bā shí bā","bā shí jiǔ",
  "jiǔ shí","jiǔ shí yī","jiǔ shí èr","jiǔ shí sān","jiǔ shí sì","jiǔ shí wǔ","jiǔ shí liù","jiǔ shí qī","jiǔ shí bā","jiǔ shí jiǔ","yī bǎi"];

var number_Piny2 = ["líng","yī","èr","sān","sì","wǔ","liù","qī","bā","jiǔ","shí","shí yī","shí èr","shí sān","shí sì","shí wǔ","shí liù","shí qī","shí bā","shí jiǔ",
  "èr shí","èr yī","èr èr","èr sān","èr sì","èr wǔ","èr liù","èr qī","èr bā","èr jiǔ",
  "sān shí","sān yī","sān èr","sān sān","sān sì","sān wǔ","sān liù","sān qī","sān bā","sān jiǔ",
  "sì shí","sì yī","sì èr","sì sān","sì sì","sì wǔ","sì liù","sì qī","sì bā","sì jiǔ",
  "wǔ shí","wǔ yī","wǔ èr","wǔ sān","wǔ sì","wǔ wǔ","wǔ liù","wǔ qī","wǔ bā","wǔ jiǔ",
  "liù shí","liù yī","liù èr","liù sān","liù sì","liù wǔ","liù liù","liù qī","liù bā","liù jiǔ",
  "qī shí","qī yī","qī èr","qī sān","qī sì","qī wǔ","qī liù","qī qī","qī bā","qī jiǔ",
  "bā shí","bā yī","bā èr","bā sān","bā sì","bā wǔ","bā liù","bā qī","bā bā","bā jiǔ",
  "jiǔ shí","jiǔ yī","jiǔ èr","jiǔ sān","jiǔ sì","jiǔ wǔ","jiǔ liù","jiǔ qī","jiǔ bā","jiǔ jiǔ","yī bǎi"];

var attend_ch = ["遲到","有到","有來","沒到","沒來","未到","出席","缺席"];
var attend_Piny = ["chí dào","yǒu dào","yǒu lái","méi dào","méi lái","wèi dào","chū xí","quē xí"];

var record = [];
var record_attend = [];


bot.on('message', function(event) {
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  msg = event.message.text;
    if(msg.indexOf("成績") != -1 && msg.length == 2){
      event.reply({
        type: 'template',
        altText: 'this is a buttons template',
        template: {
        type: 'buttons',
        //thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',選擇成績單
        title: '學生成績清單',
        text: '師生可以透過此選單來查看成績',
        actions: [{
          type: 'postback',
          label: '成績',
          data: '成績'
          },{type: 'postback',
          label: '前5筆',
          data: '前5筆'
          },{type: 'postback',
          label: '個人成績',
          data: '個人成績'
          },{type: 'postback',
          label: '選擇成績單',
          data: '選擇成績單'
          }]
        }
      })
    } // //成績選單
})

function ArrayReverse(inarray){            //陣列反轉
      var r_ary = [];
      for(var i = inarray.length ; i > 0 ; i--){
        r_ary.push(inarray[i-1]);
      }
      return r_ary;
}

function Last_N_in(inarray,n){           //前N筆紀錄
      var last_N = [];
      if(inarray.length < n)
        n = inarray.length;
      for(var i = 0 ; i < n ; i++){
        last_N.push(inarray[i]);
      }
      return last_N;
}

function PersonRecord(instr){            //個人每筆輸入資料
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

function setupGrades(names,instr,event){
      var month = 1,day = 1;
      var num_strset = instr.indexOf("建立");
      var num_strgrade = instr.indexOf("成績");
      var num_num = instr.indexOf("號");
      var num_month = instr.indexOf("月");
      var num_today1 = instr.indexOf("今天");
      var num_today2 = instr.indexOf("今日");
      var a_instr,b_instr;
       
      if(num_today1 != -1 || num_today2 != -1){
        var tname;
        
        var Today = new Date();
        month = (Today.getMonth()+1);
        day = Today.getDate();

        if(num_today1 != -1){
          tname = instr.substring(num_today1+2,num_strgrade);
        }else{
          tname = instr.substring(num_today2+2,num_strgrade);
        }

        if(num_strset != -1 && num_strgrade != -1){
          names2[0][1] = month.toString()+"/"+day.toString()+tname+"成績";
          event.reply("建立成功").then(function(data){
            }).catch(function(error){
              console.log("error")
            });
          return;
        }
        
      }
      if(num_strset != -1 && num_strgrade != -1){
        
        a_instr = instr.substring(0,num_month);
        b_instr = instr.substring(num_month,instr.length);
        
        for(var i = number.length-1 ; i >= 0 ; i--){
          if(a_instr.indexOf(number[i]) != -1){
            month = number[i];
            break;
          }
          if(a_instr.indexOf(number_ch1[i]) != -1){
            month = number[i];
            break;
          }
          if(a_instr.indexOf(number_ch2[i]) != -1){
            month = number[i];
            break;
          }
        }
        for(var i = number.length-1 ; i >= 0 ; i--){
          if(b_instr.indexOf(number[i]) != -1){
            day = number[i];
            break;
          }
          if(b_instr.indexOf(number_ch1[i]) != -1){
            day = number[i];
            break;
          }
          if(b_instr.indexOf(number_ch2[i]) != -1){
            day = number[i];
            break;
          }
        }

        

        if(num_num != -1){
          var tname = instr.substring(num_num+1,num_strgrade);
          names2[0][1] = month.toString()+"/"+day.toString()+tname+"成績";
          event.reply("建立成功").then(function(data){
            }).catch(function(error){
              console.log("error")
            });
        }else{
          var tname = instr.substring(num_strgrade-2,num_strgrade);
          names2[0][1] = month.toString()+"/"+day.toString()+tname+"成績";
          event.reply("建立成功").then(function(data){
            }).catch(function(error){
              console.log("error")
            });
        }        
      }     
}

var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'asdcpi70914@gmail.com',
        pass: 'asdcpi4249103',
      },
  });
// function sendEmail(addressee,PW){
//   var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//         user: 'asdcpi70914@gmail.com',
//         pass: 'asdcpi14',
//       },
//   });
//   var mailOptions = {
//     from: 'asdcpi70914@gmail.com',
//     to: addressee,
//     subject: 'line bot 驗證碼',
//     text: '驗證碼為:'+ PW,
//   };
//   console.log("sPW:"+PW);
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log(error);
//     }else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// }

function Update (name,grade,TranscriptName){
  var connection = mysql.createConnection({
            host     : '35.185.170.234',
            user     : 'root',
            password : 'asdcpi14',
            database : 'line'
        });
        var aaaa = name;
        var bbbb = grade;
        var TranscriptName = TranscriptName;
        connection.connect();
          connection.query('UPDATE Grade SET Grade = ? WHERE Student_ID = (select Student_ID from STUDENT where Sname = ?) and Transcript_ID = (SELECT Transcript_ID FROM Transcript WHERE TranscriptName = ?)' ,[bbbb,aaaa,TranscriptName], function(err, results) {
            if (err) {
              throw err;
          }
         console.log("資料已修改");
        });
        connection.end();
}

function Insert (name,grade,formate){
  var Sname = name;
  //var Grade = Number(grade);
  var Grade = grade.toString();
  var TranscriptName = formate;
  var dt = datetime.create();
  var date = dt.format('y-m-d H:M:S');
  var connection = mysql.createConnection({
        host     : '35.185.170.234',
        user     : 'root',
        password : 'asdcpi14',
        database : 'line'
    });
    connection.connect();
    connection.query('UPDATE Grade SET Grade = ? , GDATE = ? where Student_ID = (select Student_ID from STUDENT where Sname = ?) AND Transcript_ID = (SELECT Transcript_ID FROM Transcript WHERE TranscriptName = ?)',[Grade,date,name,TranscriptName], function(err, results) {
          if (err) {
            throw err;
         }
         console.log("資料已輸入");
      });

    // connection.query('INSERT INTO Grade (Transcript_ID,Student_ID,Grade,Course_ID,GDATE) VALUES ((SELECT Transcript_ID FROM Transcript WHERE TranscriptName = ?),(SELECT Student_ID FROM STUDENT WHERE Sname = ?),?,(Select Course_ID FROM COURSE WHERE CourseName = ?),?)',[TranscriptName,Sname,Grade,coursename,date], function(err, results) {
    //       if (err) {
    //         throw err;
    //      }
    //      console.log("資料已輸入");
    //   });

    // connection.query('INSERT INTO '+formate+' (Sname,Grade) VALUES (?,?)',[Sname,Grade], function(err, results) {
    //       if (err) {
    //         throw err;
    //      }
    //      console.log("資料已輸入");
    //   });
    connection.end();
}

function Attend(names,instr,event){
	console.log("Attend內")
  var a_instr,b_instr;                //輸入分割成名字和出席狀態2部分
  var attendstatus = "";                   //出席狀態
  var pinyinstr = toPinyin(instr);
  console.log(pinyinstr)
  var dt = datetime.create();
  var date = dt.format('y-m-d H:M:S');
  for(var i = attend_ch.length-1 ; i >= 0 ; i--){
    var num = instr.indexOf(attend_ch[i]);
    var num2 = instr.indexOf(attend_Piny[i]);     //["遲到","有到","有來","沒到","沒來","未到","出席","缺席"]
    if(num != -1){
      a_instr = instr.substring(0,num);
      b_instr = instr.substring(num,instr.length);
      attendstatus = b_instr;
      if(i == 1 || i == 2 || i == 6){
        attendstatus = attend_ch[6];
        console.log(attendstatus)
      }else if(i == 3 || i == 4 || i == 5 || i == 7){
        attendstatus = attend_ch[7];
        console.log(attendstatus)
      }else if( i == 0){
        attendstatus = attend_ch[0];
        console.log(attendstatus)
      }
    }
    if(num2 != -1){
      a_instr = instr.substring(0,num2);
      b_instr = pinyinstr.substring(num2,instr.length);
      attendstatus = b_instr;
      if(i == 1 || i == 2 || i == 6){
        attendstatus = attend_ch[6];
        console.log(attendstatus)
      }else if(i == 3 || i == 4 || i == 5 || i == 7){
        attendstatus = attend_ch[7];
        console.log(attendstatus)
      }else if( i == 0){
        attendstatus = attend_ch[0];
        console.log(attendstatus)
      }
    }

  }

  if(typeof(a_instr) == "undefined" && typeof(b_instr) == "undefined"){
        console.log("undefined OK !!");
        return;
  }
	console.log(a_instr)
	console.log(b_instr)
  var targetPerson = Attend_names_cmp_instr(a_instr)
  console.log(targetPerson)
  var connection = mysql.createConnection({
        host     : '35.185.170.234',
        user     : 'root',
        password : 'asdcpi14',
        database : 'line'
      });
      connection.connect();
      console.log("connect");
  if(targetPerson.length == 1 && attendname == "" && coursename == ""){
      connection.query('Select CourseName FROM COURSE WHERE User_ID = ?' ,[event.source.userId], function(err, results){
        console.log("課程")
        console.log(results.length)
        if(results.length == 1){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  }]
              }]
            }
              }])
        }else if(results.length == 2){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  }]
              }]
            }
              }])          
        }else if(results.length == 3){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              }]
            }
              }])          
        }else if(results.length == 4){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },
                  {
                    type: "postback",
                    label:"無課程",
                    data:  "無課程"
                  },
                  {
                    type: "postback",
                    label: "無課程",
                    data:  "無課程"
                  }]
              }]
            }
              }])          
        }else if(results.length == 5){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  },{
                    type: "postback",
                    label: "無課程",
                    data: "無課程"
                  }]
              }]
            }
              }])          
        }else if(results.length == 6){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  },{
                    type: "postback",
                    label: results[5].CourseName,
                    data: "成績單"+results[5].CourseName
                  }]
                }]
              }
            })          
        }
      });
  connection.end();
  }else if(targetPerson.length == 1 && attendname == "" && coursename != ""){
        connection.query('Select TranscriptName FROM Transcript WHERE Course_ID = (SELECT Course_ID FROM COURSE WHERE CourseName = ?) and TranscriptType = ?' ,[coursename,"簽到表"], function(err, results){
          console.log("簽到單")
          console.log(results.length)
          if(results.length == 1){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  }]
              }]
            }
              }])
          }else if(results.length == 2){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  }]
              }]
            }
              }])          
          }else if(results.length == 3){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "簽到單"+results[2].TranscriptName
                  }]
              }]
            }
              }])          
          }else if(results.length == 4){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "簽到單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "簽到單"+results[3].TranscriptName
                  },
                  {
                    type: "postback",
                    label: "無簽到單",
                    data:  "無簽到單"
                  },
                  {
                    type: "postback",
                    label: "無簽到單",
                    data:  "無簽到單"
                  }]
              }]
            }
              }])          
          }else if(results.length == 5){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "簽到單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "簽到單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: "無簽到單",
                    data: "無簽到單"
                  },{
                    type: "postback",
                    label: "無簽到單",
                    data: "無簽到單"
                  }]
              }]
            }
              }])          
          }else if(results.length == 6){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "簽到單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "簽到單"+results[4].TranscriptName
                  },{
                    type: "postback",
                    label: results[5].TranscriptName,
                    data: "簽到單"+results[5].TranscriptName
                  }]
                }]
              }
            }])          
          }
        });
        connection.end();
    }
    else if(targetPerson.length == 1 && attendname != "" && coursename != ""){
    if(attend_Ary[targetPerson[0]+1][1] == ""){ //此人出缺席還未輸入過，輸入出缺席
      attend_Ary[targetPerson[0]+1][1] = attendstatus;
      var recordStr_attend;
      //recordStr_attend = attend_Ary[targetPerson[0]+1][0]+"    "+attendstatus;     
      

      if(attendstatus == ""){
            recordStr_attend = attend_Ary[targetPerson[0]+1][0]+"    " + attendstatus;    //儲存每筆紀錄
      }else if(attendstatus == "出席"){
            recordStr_attend = attend_Ary[targetPerson[0]+1][0]+"    " + String.fromCodePoint(9989);
            connection.query('Insert INTO Attend (Transcript_ID,Student_ID,Attend,Course_ID,GDATE) VALUES ((SELECT Transcript_ID FROM Transcript WHERE TranscriptName = ?),(SELECT Student_ID FROM STUDENT WHERE Sname = ?),?,(Select Course_ID FROM COURSE WHERE CourseName = ?),?)' ,[attendname,attend_Ary[targetPerson[0]+1][0],attend_Ary[targetPerson[0]+1][1],coursename,date], function(err, results){ 
          if(err){
            throw err
           }   
          console.log("新增出缺席紀錄")
        });
        connection.end(); 
      }else if(attendstatus == "缺席"){
            recordStr_attend = attend_Ary[targetPerson[0]+1][0]+"    " + String.fromCodePoint(10060);
        connection.query('Insert INTO Attend (Transcript_ID,Student_ID,Attend,Course_ID,GDATE) VALUES ((SELECT Transcript_ID FROM Transcript WHERE TranscriptName = ?),(SELECT Student_ID FROM STUDENT WHERE Sname = ?),?,(Select Course_ID FROM COURSE WHERE CourseName = ?),?)' ,[attendname,attend_Ary[targetPerson[0]+1][0],attend_Ary[targetPerson[0]+1][1],coursename,date], function(err, results){ 
          if(err){
            throw err
           }   
          console.log("新增出缺席紀錄")
        });
        connection.end(); 
      }else if(attendstatus == "遲到"){
            recordStr_attend = attend_Ary[targetPerson[0]+1][0]+"    " + String.fromCodePoint(128311);
        connection.query('Insert INTO Attend (Transcript_ID,Student_ID,Attend,Course_ID,GDATE) VALUES ((SELECT Transcript_ID FROM Transcript WHERE TranscriptName = ?),(SELECT Student_ID FROM STUDENT WHERE Sname = ?),?,(Select Course_ID FROM COURSE WHERE CourseName = ?),?)' ,[attendname,attend_Ary[targetPerson[0]+1][0],attend_Ary[targetPerson[0]+1][1],coursename,date], function(err, results){ 
          if(err){
            throw err
           }   
          console.log("新增出缺席紀錄")
        }); 
      connection.end();
      }
      record_attend.push(recordStr_attend);
      //ArrayReverse(record_attend);

      event.reply([{ type: 'text', text: "已輸入:"+attend_Ary[targetPerson[0]+1][0]+attend_Ary[targetPerson[0]+1][1]}]).then(function(data){
            console.log("輸入出缺席");
            }).catch(function(error){
            console.log("error")
          });
    }else if(attend_Ary[targetPerson[0]+1][1] != ""){
      var attendtemp = attend_Ary[targetPerson[0]+1][1];
      attend_Ary[targetPerson[0]+1][1] = attendstatus;
      var recordStr_attend;
            if(attendstatus == ""){
            recordStr_attend = attend_Ary[targetPerson[0]+1][0]+"    " + attendstatus;    //儲存每筆紀錄
      }else if(attendstatus == "出席"){
            recordStr_attend = attend_Ary[targetPerson[0]+1][0]+"    " + String.fromCodePoint(9989);
        connection.query('UPDATE Attend Set Attend = ? ,GDATE = ? WHERE Student_ID = (SELECT Student_ID FROM STUDENT WHERE Sname = ?) and Transcript_ID = (SELECT Transcript_ID FROM Transcript WHERE TranscriptName = ?)' ,[attend_Ary[targetPerson[0]+1][1],date,attendname,attend_Ary[targetPerson[0]+1][0],coursename], function(err, results){ 
          if(err){
            throw err
           }   
          console.log("新增出缺席紀錄")
        }); 
      }else if(attendstatus == "缺席"){
            recordStr_attend = attend_Ary[targetPerson[0]+1][0]+"    " + String.fromCodePoint(10060);
        connection.query('UPDATE Attend Set Attend = ? ,GDATE = ? WHERE Student_ID = (SELECT Student_ID FROM STUDENT WHERE Sname = ?) and Transcript_ID = (SELECT Transcript_ID FROM Transcript WHERE TranscriptName = ?)' ,[attend_Ary[targetPerson[0]+1][1],date,attendname,attend_Ary[targetPerson[0]+1][0],coursename], function(err, results){ 
          if(err){
            throw err
           }   
          console.log("新增出缺席紀錄")
        }); 
      }else if(attendstatus == "遲到"){
            recordStr_attend = attend_Ary[targetPerson[0]+1][0]+"    " + String.fromCodePoint(128311);
        connection.query('UPDATE Attend Set Attend = ? ,GDATE = ? WHERE Student_ID = (SELECT Student_ID FROM STUDENT WHERE Sname = ?) and Transcript_ID = (SELECT Transcript_ID FROM Transcript WHERE TranscriptName = ?)' ,[attend_Ary[targetPerson[0]+1][1],date,attendname,attend_Ary[targetPerson[0]+1][0],coursename], function(err, results){ 
          if(err){
            throw err
           }   
          console.log("新增出缺席紀錄")
        }); 
      }
      record_attend.push(recordStr_attend);
      
      event.reply([{ type: 'text', text: "原輸入:"+attend_Ary[targetPerson[0]+1][0]+attendtemp},
        { type: 'text', text: "已修改:"+attend_Ary[targetPerson[0]+1][0]+attend_Ary[targetPerson[0]+1][1]}]).then(function(data){
            console.log("修改出缺席");
            }).catch(function(error){
            console.log("error")
          });
    }
  } 
}
function compare(names,instr,event){              //成績
  if(instr.length > 8)
    return;
  var a_instr,b_instr;                //輸入分割成名字和分數2部分
  var fraction;                   //分數
  var pinyinstr = toPinyin(instr);
  if(instr.length < 3)
    return;
      for(var i = number.length-1 ; i >= 0 ; i--){
          var num = instr.indexOf(number[i]);
          var num2 = instr.indexOf(number_ch1[i]);
          var num3 = instr.indexOf(number_ch2[i]);
          var num4 = pinyinstr.indexOf(number_Piny1[i]);
          var num5 = pinyinstr.indexOf(number_Piny2[i]);
          if(num != -1){                               //全數字
              a_instr = instr.substring(0,num);
              b_instr = instr.substring(num,instr.length);
              fraction = number[i];
            break;
          }
          if(num2 != -1){                             //全中文有十
              a_instr = instr.substring(0,num2);
              b_instr = instr.substring(num2,instr.length);
              fraction = number[i];
            break;
          }
          if(num3 != -1){                             //全中文無十
              a_instr = instr.substring(0,num3);
              b_instr = instr.substring(num3,instr.length);
              fraction = number[i];
            break;
          }
          if(num4 != -1){                             //拼音有十
            var front_instr = pinyinstr.substring(1,num4);
            var count = 0;
            while(front_instr.indexOf(" ") != -1){
              count++;
              front_instr = front_instr.substring(front_instr.indexOf(" ")+1,front_instr.length);
            }
            // var j;
            // for( j = 0; front_instr.indexOf(" ") != -1 ; j++){
            //   front_instr = front_instr.substring(front_instr.indexOf(" ")+1,front_instr.length)
            // }
            a_instr = instr.substring(0,count);
            //b_instr = instr.substring(count,instr.length);
            fraction = number[i];
            break;
          }
          if(num5 != -1){                             //拼音無十
            var front_instr = pinyinstr.substring(1,num5);
            var count = 0;
            // var j;
            // for( j = 0; front_instr.indexOf(" ") != -1 ; j++){
            //   front_instr = front_instr.substring(front_instr.indexOf(" ")+1,front_instr.length)
            // }
            while(front_instr.indexOf(" ") != -1){
              count++;
              front_instr = front_instr.substring(front_instr.indexOf(" ")+1,front_instr.length);
            }
            a_instr = instr.substring(0,count);
            //b_instr = instr.substring(count,instr.length);
            fraction = number[i];
            break;
          }
      }
      //console.log("a_instr:"+a_instr);
      //console.log("b_instr:"+b_instr);
      //console.log("fraction:"+fraction);
      //console.log("typeof(a_instr)"+typeof(a_instr));
      if(typeof(a_instr) == "undefined" && typeof(b_instr) == "undefined"){
        console.log("undefined OK");
        return;
      }
      //console.log("undefined error");
      //var inname = toPinyin(a_instr);
      //var a_inname,b_inname,c_inname,d_inname;
      //document.form1.answer.value = inname;
      //document.form1.a1.value = fraction;
      var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
      });
      connection.connect();
      console.log("connect");
      var ans = names_cmp_instr(a_instr)
      console.log("formate:"+formate);
      console.log("ans1:"+ans); 
      if(ans.length !=0 && gradeswitch ==0 && formate == ""&&coursename!=""){
        gradeswitch = 1;
    connection.query('SELECT TranscriptName FROM Transcript WHERE Course_ID = (SELECT Course_ID FROM COURSE WHERE CourseName = ?)',[coursename], function(err, results) {
         if (err) {
           throw err;
        }
        console.log(results)
        console.log("results.length()"+results.length)
        for(var x in results){
          transcript[x] = results[x].TranscriptName;
          //console.log("transcript:"+transcript[x]);
        }
        if(results.length == 1){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  }]
                }]
              }
            }])
        }else if(results.length == 2){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  }]
                }]
              }
            }])         
        }else if(results.length == 3){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
                }]
              }
            }])          
        }else if(results.length == 4){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  },
                  {
                    type: "postback",
                    label: "無成績單",
                    data:  "無成績單"
                  },
                  {
                    type: "postback",
                    label: "無成績單",
                    data:  "無成績單"
                  }]
              }]
            }
              }])          
        }else if(results.length == 5){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "成績單"+results[4].TranscriptName
                  },{
                    type: "postback",
                    label: "無成績單",
                    data: "無成績單"
                  }]
              }]
            }
               }])         
        }else if(results.length == 6){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "成績單"+results[4].TranscriptName
                  },{
                    type: "postback",
                    label: results[5].TranscriptName,
                    data: "成績單"+results[5].TranscriptName
                  }]
                }]
              }
           }])          
        }
    });    
      return;
  }else if(ans.length !=0 && formate == ""&&coursename!=""){
        var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
   });
   connection.connect();
   console.log("connect");
    connection.query('SELECT TranscriptName FROM Transcript WHERE Course_ID = (SELECT Course_ID FROM COURSE WHERE CourseName = ?)',[coursename], function(err, results) {
         if (err) {
           throw err;
        }
        console.log(results)
        console.log("results.length()"+results.length)
        for(var x in results){
          transcript[x] = results[x].TranscriptName;
          //console.log("transcript:"+transcript[x]);
        }
        if(results.length == 1){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "成績單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇成績單",
                text: "成績單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  }]
                }]
              }
            }])
        }else if(results.length == 2){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "成績單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇成績單",
                text: "成績單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  }]
                }]
              }
            }])         
        }else if(results.length == 3){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
                }]
              }
            }])          
        }else if(results.length == 4){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  }]
              }]
            }
              }])          
        }else if(results.length == 5){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "成績單"+results[4].TranscriptName
                  }]
              }]
            }
               }])         
        }else if(results.length == 6){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "成績單"+results[4].TranscriptName
                  },{
                    type: "postback",
                    label: results[5].TranscriptName,
                    data: "成績單"+results[5].TranscriptName
                  }]
                }]
              }
           }])          
        }
    });
      return;  
      }else if(ans.length !=0 && gradeswitch ==0){
      //   gradeswitch = 1;
      //   event.reply("登記成績功能開啟").then(function(data){
      //     }).catch(function(error){
      //   console.log("error")
        
      // });
      //   compare(names,instr,event);
        event.reply("登記成績功能未開啟，請輸入'登記成績'開啟功能").then(function(data){
          }).catch(function(error){
        console.log("error")
      });
          return;
      }
     connection.end();  

        var innameL = a_instr.length;
        console.log("ans2:"+ans);
        // SG = SELECT(names2[ans[0]+1][0],formate).length;
        // console.log("SG:"+SG);
      // if(typeof(ans) == 'number'){
      //  document.getElementById("myTable").rows[1].cells[ans+1]. innerHTML = fraction;
      // }
      //alert(typeof(ans))
      //alert(ans)
      //alert(ans)
   //names2[ans[0]+1][1] = "" 
  if(ans.length == 1){ //名單中只找到一人; 
    if(names2[ans[0]+1][1] == ""){ //此人成績還未輸入過，輸入成績
            names2[ans[0]+1][1] = fraction;
            recordStr = names2[ans[0]+1][0]+"    "+fraction;     //儲存每筆紀錄
            record.push(recordStr);
            ArrayReverse(record);
          Insert(names2[ans[0]+1][0],fraction,formate);
          }
    else{
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
    }
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

    function Attend_names_cmp_instr(instr){          //搜尋名單
      var ary = new Array(attend_names.length);
      var inname = toPinyin(instr);
      var a_inname = toPinyin(instr.substring(0,1));
      var b_inname = toPinyin(instr.substring(1,2));
      var c_inname = toPinyin(instr.substring(2,3));
      var inary = [a_inname,b_inname,c_inname];
      var nnn=[];
      //var d_inname = toPinyin(instr.substring(3,4));
      

      for(var row = 0 ; row < attend_names.length ; row++){    //比分初始化
        ary[row] = new Array(4);
        for(var col = 0 ; col < 4 ; col++){
          ary[row][col] = 0;
          //document.write(ary[row][col]);
        }
        //document.write(" ");
      }
      //var allpoint[],alp=0;
      for(var row = 0 ; row < attend_names.length ; row++){    //比對名字拼音
        for(var col = 0 ; col < 3 ; col++){
          if(attend_names[row][col] == inary[col]){
            ary[row][col] = ary[row][col]+1;
            ary[row][3] = ary[row][3]+1;
            
          }else{

                var testname,testin;
                for(var trow = 0 ; trow < array.length ; trow++){
                  // if(trow==35)
                  //  continue;

                  for(var tcol = 0 ; tcol < array[trow].length ; tcol++){
                    
                    if(array[trow][tcol] == inary[col]){
                      testin = array[trow][0];
                      
                      break;
                    }
                  }
                }

                for(var trow = 0 ; trow < array.length ; trow++){
                  // if(trow==35)
                  //  continue;
                  
                  for(var tcol = 0 ; tcol < array[trow].length ; tcol++){

                    if(array[trow][tcol] == attend_names[row][col]){
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
      
      var nn=[0,0,0,0];                 //
      for(var row = 0 ; row < attend_names.length ; row++){    //統計比分
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

      var nn2=[],nn3=[];                      //多個比分2的位置
      var nn2_num=0,nn3_num=0,nn2_temp=0;
      for(var row = 0 ; row < attend_names.length ; row++){    //回傳結果
        if(ary[row][3] == 3 && nn[3] == 1){
          nnn[0] = row;
          return nnn;
        // }else if(ary[row][3] >= 2){
        //  var tx = Math.max.apply(null, allpoint);
        //  for(var i = 0 ; i < allpoint.length ; i++){
        //    if(allpoint[i] == tx){
        //      nnn[0] = i;
        //      return nnn;
        //    }
        //  }
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
        //  nnn[0] = row;
        //  return nnn;
        // }else if(ary[row][3] == 1 && nn[1] > 1){
        //  nn3[nn3_num] = row;
        //  nn3_num++;
        // }
      }

      // if(nn2_num != 0 && nn[2] > 1){
      //  //nn[2]=0;
      //  nnn = nn2;
      // }
      
      // if(nn3_num != 0 && nn[1] > 1){
      //  //nn[2]=0;
      //  nnn = nn3;
      // }

      return nnn;
      
      
      // for(var row = 0 ; row < names.length ; row++){
      //  //ary[row] = new Array(4);
      //  for(var col = 0 ; col < 4 ; col++){
      //    //ary[row][col] = 0;
      //    document.write(ary[row][col]);
      //  }
      //  document.write(" ");
      // }
      
      //document.write(ary[0][3]);
}
function names_cmp_instr(instr){          //搜尋名單
      var ary = new Array(names.length);
      var inname = toPinyin(instr);
      var a_inname = toPinyin(instr.substring(0,1));
      var b_inname = toPinyin(instr.substring(1,2));
      var c_inname = toPinyin(instr.substring(2,3));
      var inary = [a_inname,b_inname,c_inname];
      var nnn=[];
      //var d_inname = toPinyin(instr.substring(3,4));
      

      for(var row = 0 ; row < names.length ; row++){    //比分初始化
        ary[row] = new Array(4);
        for(var col = 0 ; col < 4 ; col++){
          ary[row][col] = 0;
          //document.write(ary[row][col]);
        }
        //document.write(" ");
      }
      //var allpoint[],alp=0;
      for(var row = 0 ; row < names.length ; row++){    //比對名字拼音
        for(var col = 0 ; col < 3 ; col++){
          if(names[row][col] == inary[col]){
            ary[row][col] = ary[row][col]+1;
            ary[row][3] = ary[row][3]+1;
            
          }else{

                var testname,testin;
                for(var trow = 0 ; trow < array.length ; trow++){
                  // if(trow==35)
                  //  continue;

                  for(var tcol = 0 ; tcol < array[trow].length ; tcol++){
                    
                    if(array[trow][tcol] == inary[col]){
                      testin = array[trow][0];
                      
                      break;
                    }
                  }
                }

                for(var trow = 0 ; trow < array.length ; trow++){
                  // if(trow==35)
                  //  continue;
                  
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
      
      var nn=[0,0,0,0];                 //
      for(var row = 0 ; row < names.length ; row++){    //統計比分
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

      var nn2=[],nn3=[];                      //多個比分2的位置
      var nn2_num=0,nn3_num=0,nn2_temp=0;
      for(var row = 0 ; row < names.length ; row++){    //回傳結果
        if(ary[row][3] == 3 && nn[3] == 1){
          nnn[0] = row;
          return nnn;
        // }else if(ary[row][3] >= 2){
        //  var tx = Math.max.apply(null, allpoint);
        //  for(var i = 0 ; i < allpoint.length ; i++){
        //    if(allpoint[i] == tx){
        //      nnn[0] = i;
        //      return nnn;
        //    }
        //  }
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
        //  nnn[0] = row;
        //  return nnn;
        // }else if(ary[row][3] == 1 && nn[1] > 1){
        //  nn3[nn3_num] = row;
        //  nn3_num++;
        // }
      }

      // if(nn2_num != 0 && nn[2] > 1){
      //  //nn[2]=0;
      //  nnn = nn2;
      // }
      
      // if(nn3_num != 0 && nn[1] > 1){
      //  //nn[2]=0;
      //  nnn = nn3;
      // }

      return nnn;
      
      
      // for(var row = 0 ; row < names.length ; row++){
      //  //ary[row] = new Array(4);
      //  for(var col = 0 ; col < 4 ; col++){
      //    //ary[row][col] = 0;
      //    document.write(ary[row][col]);
      //  }
      //  document.write(" ");
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
           // function getGradeByDB(){
//   var connection = mysql.createConnection({
//         host     : '35.185.170.234',
//         user     : 'root',
//         password : 'asdcpi14',
//         database : 'line'
//     });
//     connection.connect();
//     connection.query('SELECT * FROM '+ formate , function(err, results) {
//       console.log("SELECT ");
//           if (err) {
//             throw err;
//          }

//          for(var x in results){
//       for(var y = 0 ; y < names2.length ; y++){
//         if(names2[y][0] == results[x].Sname){
//           names2[y][1] = results[x].Grade;
//           break;
//         }
//       }
//       console.log("讀取完成");
//     }
         
//       });
    
    
    
//     connection.end();
// }

function getGradeByDB(transcriptName){
  var connection = mysql.createConnection({
        host     : '35.185.170.234',
        user     : 'root',
        password : 'asdcpi14',
        database : 'line'
    });
    connection.connect();
    connection.query('select Sname,Grade from STUDENT,Grade,Transcript where TranscriptName = ? AND STUDENT.Student_ID = Grade.Student_ID AND Transcript.Transcript_ID = Grade.Transcript_ID;',[transcriptName], function(err, results) {
      console.log("SELECT ");
          if (err) {
            throw err;
         }
        names = [];
        names2 = [["姓名","成績"]];
         for(var x in results){
          names.push(toPinyin_ary(results[x].Sname));
          var t = [results[x].Sname,results[x].Grade];
          names2.push(t);
          console.log(names2[x]);
          //names2[x+1][0] = results[x].Sname;
          //names2[x+1][1] = results[x].Grade;

        }
      
      console.log("讀取完成");
    
         
      });
    
    connection.end();
}

function Display_all_attend(){
   var display_str = attend_Ary[0][0] + "        " + attend_Ary[0][1] + "\n";
   var num_space = attend_Ary[0][1].length;
   var space = "";
   for(var j = 0 ; j < num_space ; j++){
      space = space+" ";
   }
   for (var i = 1; i < attend_Ary.length; i++) {
      if(i==attend_Ary.length-1){
        if(attend_Ary[i][0].length == 2){
          //display_str = display_str + attend_Ary[i][0] + "        " + space + attend_Ary[i][1];
          if(attend_Ary[i][1] == ""){
            display_str = display_str + attend_Ary[i][0] + "        " + space + attend_Ary[i][1];
          }else if(attend_Ary[i][1] == "出席"){
            display_str = display_str + attend_Ary[i][0] + "        " + space + String.fromCodePoint(9989);
          }else if(attend_Ary[i][1] == "缺席"){
            display_str = display_str + attend_Ary[i][0] + "        " + space + String.fromCodePoint(10060);
          }else if(attend_Ary[i][1] == "遲到"){
            display_str = display_str + attend_Ary[i][0] + "        " + space + String.fromCodePoint(128311);
          }
        }else{
          //display_str = display_str + attend_Ary[i][0] + "    " + space + attend_Ary[i][1];
          if(attend_Ary[i][1] == ""){
            display_str = display_str + attend_Ary[i][0] + "    " + space + attend_Ary[i][1];
          }else if(attend_Ary[i][1] == "出席"){
            display_str = display_str + attend_Ary[i][0] + "    " + space + String.fromCodePoint(9989);
          }else if(attend_Ary[i][1] == "缺席"){
            display_str = display_str + attend_Ary[i][0] + "    " + space + String.fromCodePoint(10060);
          }else if(attend_Ary[i][1] == "遲到"){
            display_str = display_str + attend_Ary[i][0] + "    " + space + String.fromCodePoint(128311);
          }
        }
      }else{
          //display_str = display_str + attend_Ary[i][0] + "        " + space + attend_Ary[i][1] + "\n";
        if(attend_Ary[i][0].length == 2){
          if(attend_Ary[i][1] == ""){
            display_str = display_str + attend_Ary[i][0] + "        " + space + attend_Ary[i][1] + "\n";
          }else if(attend_Ary[i][1] == "出席"){
            display_str = display_str + attend_Ary[i][0] + "        " + space + String.fromCodePoint(9989) + "\n";
          }else if(attend_Ary[i][1] == "缺席"){
            display_str = display_str + attend_Ary[i][0] + "        " + space + String.fromCodePoint(10060) + "\n";
          }else if(attend_Ary[i][1] == "遲到"){
            display_str = display_str + attend_Ary[i][0] + "        " + space + String.fromCodePoint(128311) + "\n";
          }
        }else{
          //display_str = display_str + attend_Ary[i][0] + "    " + space + attend_Ary[i][1] + "\n";
          if(attend_Ary[i][1] == ""){
            display_str = display_str + attend_Ary[i][0] + "    " + space + attend_Ary[i][1] + "\n";
          }else if(attend_Ary[i][1] == "出席"){
            display_str = display_str + attend_Ary[i][0] + "    " + space + String.fromCodePoint(9989) + "\n";
          }else if(attend_Ary[i][1] == "缺席"){
            display_str = display_str + attend_Ary[i][0] + "    " + space + String.fromCodePoint(10060) + "\n";
          }else if(attend_Ary[i][1] == "遲到"){
            display_str = display_str + attend_Ary[i][0] + "    " + space + String.fromCodePoint(128311) + "\n";
          }
        }
      }
   }
   return display_str;
  }

function Display_all(){
   var display_str = names2[0][0] + "        " + names2[0][1] + "\n";
   var num_space = names2[0][1].length;
   var space = "";
   for(var j = 0 ; j < num_space ; j++){
      space = space+" ";
   }
   for (var i = 1; i < names2.length; i++) {
      if(i==names2.length-1){
        if(names2[i][0].length == 2)
          display_str = display_str + names2[i][0] + "        " + space + names2[i][1];
        else
          display_str = display_str + names2[i][0] + "    " + space + names2[i][1];
      }else{
        if(names2[i][0].length == 2)
          display_str = display_str + names2[i][0] + "        " + space + names2[i][1] + "\n";
        else
          display_str = display_str + names2[i][0] + "    " + space + names2[i][1] + "\n";
      }
   }
   console.log("Display_all have");
   return display_str;
  }

function Display(inarray){
  var display_str = names2[0][0] + "        " + names2[0][1] + "\n";
  var num_space = names2[0][1].length;
   var space = "";
   for(var j = 0 ; j < num_space+1 ; j++){
      space = space+" ";
   }
  for (var i = 0; i < inarray.length; i++) {
    if(i==inarray.length-1){
      var inner_temp = inarray[i];
      inner_temp = inner_temp.replace(" ",space);
      if(inner_temp.indexOf(" ") == 2){
        inner_temp = inner_temp.replace(" ","     ");
      }
      display_str = display_str + inner_temp;
    }else{
      var inner_temp = inarray[i];
      inner_temp = inner_temp.replace(" ",space);
      if(inner_temp.indexOf(" ") == 2){
        inner_temp = inner_temp.replace(" ","     ");
      }
      display_str = display_str + inner_temp + "\n";
    }
   }
   return display_str;
}

function Display_attend(inarray){
  var display_str = attend_Ary[0][0] + "        " + attend_Ary[0][1] + "\n";
  var num_space = attend_Ary[0][1].length;
   var space = "";
   for(var j = 0 ; j < num_space+1 ; j++){
      space = space+" ";
   }
  for (var i = 0; i < inarray.length; i++) {
    if(i==inarray.length-1){
      var inner_temp = inarray[i];
      inner_temp = inner_temp.replace(" ",space);
      if(inner_temp.indexOf(" ") == 2){
        inner_temp = inner_temp.replace(" ","     ");
      }
      display_str = display_str + inner_temp;
    }else{
      var inner_temp = inarray[i];
      inner_temp = inner_temp.replace(" ",space);
      if(inner_temp.indexOf(" ") == 2){
        inner_temp = inner_temp.replace(" ","     ");
      }
      display_str = display_str + inner_temp + "\n";
    }
   }
   return display_str;
}
var ag = [];
var testname = "";
//a[0]="";

bot.on("message",function(event){ //註冊及成績輸入
  msg = event.message.text;
  console.log(event)

  var replyMsg2 = "";
  if( event.message.type == 'sticker' || event.message.type == 'image' ||msg.length <= 3 ||msg.indexOf("A")!= -1 || msg == "成績" || msg == "功能" || msg == "個人成績" || msg == "使用方法" || msg == "教師課程" || msg == "學生課程" || msg == "公車資訊"  || msg == "天氣資訊"  || msg == "登記完成" || msg == "學校公告" || msg == "登入狀態" || msg.indexOf("@") != -1 || msg == "修改信箱" || msg == PW || registering == 1 || uploadEmailing == 1 || msg == "圖片" || msg == "表情" || msg == "出缺席")
    return;
   var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
   });
   connection.connect();
        connection.query('SELECT LoginStatus,Identity From Login Where User_ID = ?',[event.source.userId], function(err, results) {
         if (err) {
           throw err;
        }
        console.log("登入")
        console.log(results[0])
        if(results[0].LoginStatus == 0){
           event.reply("尚未登入，無法使用此功能").then(function(data){
          console.log("尚未登入，無法使用此功能");
          }).catch(function(error){
          console.log("error")
        });
        }else if(results[0].LoginStatus == 1 && results[0].Identity == "STUDENT"){
          event.reply("此功能只開放給老師使用").then(function(data){
          console.log("此功能只開放給老師使用");
          }).catch(function(error){
          console.log("error")
          }); 
        }else{
    if(msg.indexOf("管理網頁") != -1 || msg.indexOf("網頁管理") != -1){
      event.reply("http://35.201.225.0:5000/login").then(function(data){
          }).catch(function(error){
        console.log("error")
      });
    }   
    else if(msg.indexOf("建立") != -1 && msg.indexOf("成績") != -1){
            var num_strset = msg.indexOf("建立");
            var num_strgrade = msg.indexOf("成績");
  if(coursename == ""){
    connection.query('Select CourseName FROM COURSE WHERE User_ID = ?' ,[event.source.userId], function(err, results){
          console.log("課程")
          console.log(results.length)
      if(results.length == 1){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  }]
              }]
            }
              }])
      }else if(results.length == 2){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  }]
              }]
            }
              }])          
      }else if(results.length == 3){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              }]
            }
              }])          
      }else if(results.length == 4){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  }]
              }]
            }
              }])          
      }else if(results.length == 5){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  }]
              }]
            }
              }])          
      }else if(results.length == 6){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  },{
                    type: "postback",
                    label: results[5].CourseName,
                    data: "成績單"+results[5].CourseName
                  }]
                }]
              }
            })          
      }
    });
  }else{
      event.reply({
          type: 'template',
          altText: 'this is a buttons template',
          template: {
          type: 'buttons',
          //thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
          title: '考試日期',
          text: '請選擇考試日期',
          actions: [{
          type: 'datetimepicker',
          label: '選擇小考日期',
          data: '小考',
          mode: "date"
          },{
          type: 'datetimepicker',
          label: '選擇大考日期',
          data: '大考',
          mode: "date"
            }]
          }
        })
    }
      }else{
    //if(gradeswitch == 1){
          ag = compare(names,msg,event);
          bg = Attend(names,msg,event);
          // console.log("a外")
          // console.log(ag);
          // console.log(typeof(ag))
          // console.log("b外")
          // console.log(bg);
          // console.log(typeof(bg))
    //}
    //console.log(a);
    // if(a == "已覆蓋"){
 
    //   replyMsg2 = "已覆蓋";
    //   event.reply(replyMsg2).then(function(data){
    //          }).catch(function(error){
    //        console.log("error")
    //      });
    //    }
    //    else if(a == "音差太多,查無此人"){
    //     replyMsg2 = "音差太多,查無此人";
    //  event.reply(replyMsg2).then(function(data){
    //          }).catch(function(error){
    //        console.log("error")
    //      });
    //    }
      }
    }
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
              Update(names2[ag[1]][0],names2[ag[1]][1],formate);
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
              Update(names2[ag[1]][0],names2[ag[1]][1],formate);
        event.reply([{ type: 'text', text: "已取消修改"},
               { type: 'text', text: "現在成績:"+names2[ag[1]][0]+names2[ag[1]][1]}]).then(function(data){
            }).catch(function(error){
            console.log("error")
          });
      }
      });

    
  //}
}

bot.on("message",function(event){ //開啟成績登記功能
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  //console.log("msg:"+msg)
  if( msg == "登記成績" && formate == ""){
    gradeswitch = 1;    
  var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
   });
   connection.connect();
   console.log("connect");
   connection.query('show tables', function(err, results) {
         if (err) {
           throw err;
        }
        console.log(results)
        console.log("results.length()"+results.length)
        for(var x in results){
          transcript[x] = results[x].Tables_in_line;
          //console.log("transcript:"+transcript[x]);
        }
        event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
                 type: 'template',
                  altText: 'this is a buttons template',
                  template: {
                  type: 'buttons',
                  //thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
                    title: '請選擇成績單',
                    text: '請選擇成績單?',
                    actions: [{
                      type: 'postback',
                      label: results[0].Tables_in_line,
                      data: results[0].Tables_in_line
                    },{
                      type: 'postback',
                      label: results[1].Tables_in_line,
                      data: results[1].Tables_in_line
                    },{
                      type: 'postback',
                      label: results[2].Tables_in_line,
                      data: results[2].Tables_in_line
                    },{
                      type: 'postback',
                      label: results[3].Tables_in_line,
                      data: results[3].Tables_in_line
                    }]
                  }
                }])
     });
     connection.end();   
      return;  
      } 
});

bot.on("message",function(event){ //開啟成績登記功能
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  //console.log("msg:"+msg)
  if( msg == "成績登記" && formate == ""){
    gradeswitch = 1;
    
  var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
   });
   connection.connect();
   console.log("connect");
   connection.query('show tables', function(err, results) {
         if (err) {
           throw err;
        }
        console.log(results)
        console.log("results.length()"+results.length)
        for(var x in results){
          transcript[x] = results[x].Tables_in_line;
          //console.log("transcript:"+transcript[x]);
        }
        event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
                 type: 'template',
                  altText: 'this is a buttons template',
                  template: {
                  type: 'buttons',
                  //thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
                    title: '請選擇成績單',
                    text: '請選擇成績單?',
                    actions: [{
                      type: 'postback',
                      label: results[0].Tables_in_line,
                      data: results[0].Tables_in_line
                    },{
                      type: 'postback',
                      label: results[1].Tables_in_line,
                      data: results[1].Tables_in_line
                    },{
                      type: 'postback',
                      label: results[2].Tables_in_line,
                      data: results[2].Tables_in_line
                    },{
                      type: 'postback',
                      label: results[3].Tables_in_line,
                      data: results[3].Tables_in_line
                    }]
                  }
                }])
     });
     connection.end();   
      return;  
      }
});

bot.on("message",function(event){ //開啟成績登記功能
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  //console.log("msg:"+msg)
  if( msg == "登記成績"){
    gradeswitch = 1;
    event.reply("開啟登記功能").then(function(data){
          }).catch(function(error){
        console.log("error")
      });
    if(formate == ""){
  var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
   });
   connection.connect();
   console.log("connect");
   connection.query('show tables', function(err, results) {
         if (err) {
           throw err;
        }
        console.log(results)
        console.log("results.length()"+results.length)
        for(var x in results){
          transcript[x] = results[x].Tables_in_line;
          //console.log("transcript:"+transcript[x]);
        }
        event.reply([{ type: 'text', text: "尚未選擇成績單，請選擇成績單"},{
                 type: 'template',
                  altText: 'this is a buttons template',
                  template: {
                  type: 'buttons',
                  //thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
                    title: '請選擇成績單',
                    text: '請選擇成績單?',
                    actions: [{
                      type: 'postback',
                      label: results[0].Tables_in_line,
                      data: results[0].Tables_in_line
                    },{
                      type: 'postback',
                      label: results[1].Tables_in_line,
                      data: results[1].Tables_in_line
                    },{
                      type: 'postback',
                      label: results[2].Tables_in_line,
                      data: results[2].Tables_in_line
                    },{
                      type: 'postback',
                      label: results[3].Tables_in_line,
                      data: results[3].Tables_in_line
                    }]
                  }
                }])
     });
     connection.end();   
      return;  
      }}
});

bot.on("message",function(event){ //開啟成績登記功能
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  //console.log("msg:"+msg)
  if( msg == "成績登記"){
    gradeswitch = 1;
    event.reply("開啟登記功能").then(function(data){
          }).catch(function(error){
        console.log("error")
      });
    if(formate == ""){
  var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
   });
   connection.connect();
   console.log("connect");
        connection.query('SELECT TranscriptName FROM Transcript WHERE Course_ID = (SELECT Course_ID FROM COURSE WHERE CourseName = ?)',[coursename], function(err, results) {
         if (err) {
           throw err;
        }
        console.log(results)
        console.log("results.length()"+results.length)
        for(var x in results){
          transcript[x] = results[x].TranscriptName;
          //console.log("transcript:"+transcript[x]);
        }
        if(results.length == 1){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  }]
              }]
            }
          }])
        }else if(results.length == 2){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  }]
              }]
            }
          }])         
        }else if(results.length == 3){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
                }]
              }
            }])          
        }else if(results.length == 4){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  }]
              }]
            }
              }])          
        }else if(results.length == 5){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "成績單"+results[4].TranscriptName
                  }]
              }]
            }
               }])         
        }else if(results.length == 6){
          event.reply([{ type: 'text', text: "開啟登記功能，尚未選擇成績單，請選擇成績單"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "成績單"+results[4].TranscriptName
                  },{
                    type: "postback",
                    label: results[5].TranscriptName,
                    data: "成績單"+results[5].TranscriptName
                  }]
                }]
              }
           }])          
        }
     });
     connection.end();   
      return; 
  }}
});

bot.on("message",function(event){ //關閉成績登記功能
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  //console.log("msg:"+msg)
  if( msg == "登記完成" ){
    gradeswitch = 0;
    event.reply("關閉登記功能").then(function(data){
          }).catch(function(error){
        console.log("error")
      });
  }
});

bot.on("message",function(event){ //關閉成績登記功能
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  //console.log("msg:"+msg)
  if( msg == "完成登記" ){
    gradeswitch = 0;
    event.reply("關閉登記功能").then(function(data){
          }).catch(function(error){
        console.log("error")
      });
  }
});

bot.on("message",function(event){ //顯示目前的成績單
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg = event.message.text;
  //console.log("msg:"+msg)
  if( msg == "成績單" && msg.length == 3 ){
    
    event.reply("目前選擇的成績單:"+formate).then(function(data){
          }).catch(function(error){
        console.log("error")
      });
  }
});

bot.on("postback",function(event){ //建立小考或大考成績單
  var msg4 = event.postback.data;
  var mmsg = event.postback.params;
  var studentname = [];
  console.log("mmsg:"+mmsg);
  console.log("typeof(mmsg):"+typeof(mmsg));
  console.log(coursename)
  //var replyMsg3 = "";
  if(msg4.indexOf("小考") != -1 && typeof(mmsg) !="undefined"){
    //replyMsg3 = Display_all();
    var strdate = mmsg.date.substring((mmsg.date.indexOf("-"))+1,mmsg.date.length);
    strdate = strdate.replace("-","");
    formate = coursename+strdate + "小考成績";
    //formate = names2[0][1];
    console.log(msg4)
    console.log(formate);
    console.log("coursename"+coursename);
      var connection = mysql.createConnection({
        host     : '35.185.170.234',
        user     : 'root',
        password : 'asdcpi14',
        database : 'line'
    });
    connection.connect();
    // connection.query('CREATE TABLE '+formate +' (Sname VARCHAR(255) NOT NULL, Grade INT NULL,PRIMARY KEY(Sname))', function(err, results) {
    //       if (err) {
    //         throw err;
    //      }
    //      console.log("Table Created");
    //   });
    connection.query('INSERT INTO Transcript (TranscriptType,TranscriptName,Course_ID) VALUES (?,?,(SELECT Course_ID FROM COURSE WHERE CourseName = ?))',[msg4,formate,coursename], function(err, results) {
          if (err) {
            throw err;
         }
         console.log("INSERT Table");
      });
    console.log("coursename:"+coursename); 
    
    connection.query('SELECT Sname,STUDENT.Student_ID FROM STUDENT,SCOURSE WHERE Course_ID = (SELECT Course_ID FROM COURSE WHERE CourseName = ?) AND STUDENT.Student_ID = SCOURSE.Student_ID' ,[coursename], function(err, results) {
          if (err) {
            throw err;
         }
         console.log("select Sname and Student_ID");
         var countname = 0;
         for(var x in results){
 
           studentname.push(results[x].Student_ID);
           console.log("sn:"+studentname[countname]);
           countname = countname+1;
         }

      });

    setTimeout(function(){ 
      console.log("studentname.length:"+studentname.length);
      console.log("studentname:"+studentname[0]);
        var dt = datetime.create();
        var date = dt.format('y-m-d H:M:S');
      for(var i = 0 ; i < studentname.length ; i++){
        connection.query('INSERT INTO Grade (Transcript_ID,Student_ID,Grade,Course_ID,GDATE) VALUES ((SELECT Transcript_ID FROM Transcript WHERE TranscriptName = ?),?,?,(Select Course_ID FROM COURSE WHERE CourseName = ?),?)',[formate,studentname[i],"",coursename,date], function(err, results) {
          if (err) {
            throw err;
          }
          console.log("資料已輸入");
        });
      }
      connection.end();
     }, 4000);
    
    //for(var i = 0 ; i < StudentNameAry.length ; i++){
    // connection.query('INSERT INTO Grade (Transcript_ID,Student_ID,Grade,Course_ID,GDATE) VALUES ((select Transcript_ID from Transcript where TranscriptName = ?),?,?,(SELECT Course_ID FROM COURSE WHERE CourseName = ?),?)',[formate,StudentNameAry[0],"",coursename,""], function(err, results1) {
    //       if (err) {
    //         throw err;
    //      }
    //      console.log("INSERT empty Grade");
    //   });
    //}
    

    
     event.reply("已建立:"+formate).then(function(data){
      return;
          }).catch(function(error){
        console.log("error")
      });
  

  }
  else if(msg4.indexOf("大考") != -1 && typeof(mmsg) !="undefined"){

       strdate = mmsg.date.substring((mmsg.date.indexOf("-"))+1,mmsg.date.length);
  strdate = strdate.replace("-","");
  formate = coursename+strdate + "大考成績";
  //formate = names2[0][1];
  console.log(msg4)
  console.log(formate);
  console.log("coursename"+coursename);
     var connection = mysql.createConnection({
        host     : '35.185.170.234',
        user     : 'root',
        password : 'asdcpi14',
        database : 'line'
    });
    connection.connect();
    // connection.query('CREATE TABLE '+formate +' (Sname VARCHAR(255) NOT NULL, Grade INT NULL,PRIMARY KEY(Sname))', function(err, results) {
    //       if (err) {
    //         throw err;
    //      }
    //      console.log("Table Created");
    //   });
    connection.query('INSERT INTO Transcript (TranscriptType,TranscriptName,Course_ID) VALUES (?,?,(SELECT Course_ID FROM COURSE WHERE CourseName = ?))',[msg4,formate,coursename], function(err, results) {
          if (err) {
            throw err;
         }
         console.log("INSERT Table");
      });    
    
    connection.query('SELECT Sname,STUDENT.Student_ID FROM STUDENT,SCOURSE WHERE Course_ID = (SELECT Course_ID FROM COURSE WHERE CourseName = ?) AND STUDENT.Student_ID = SCOURSE.Student_ID' ,[coursename], function(err, results) {
          if (err) {
            throw err;
         }
         console.log("select Sname and Student_ID");
         var countname = 0;
         for(var x in results){
 
           studentname.push(results[x].Student_ID);
           console.log("sn:"+studentname[countname]);
           countname = countname+1;
         }

      });

    setTimeout(function(){ 
      console.log("studentname.length:"+studentname.length);
      console.log("studentname:"+studentname[0]);
        var dt = datetime.create();
        var date = dt.format('y-m-d H:M:S');
      for(var i = 0 ; i < studentname.length ; i++){
        connection.query('INSERT INTO Grade (Transcript_ID,Student_ID,Grade,Course_ID,GDATE) VALUES ((SELECT Transcript_ID FROM Transcript WHERE TranscriptName = ?),?,?,(Select Course_ID FROM COURSE WHERE CourseName = ?),?)',[formate,studentname[i],"",coursename,date], function(err, results) {
          if (err) {
            throw err;
          }
          console.log("資料已輸入");
        });
      }
      connection.end();
     }, 4000);

      event.reply("已建立:"+formate).then(function(data){
        return;
          }).catch(function(error){
        console.log("error")
      });
  
  }      
});

bot.on("message",function(event){ // 顯示目前課程
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg4 = event.message.text;
  var replyMsg3;
  if(msg4.indexOf("顯示課程") != -1){
  var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
   });
   connection.connect();
   console.log("connect");
   connection.query('SELECT * FROM COURSE', function(err, results) {
         if (err) {
           throw err;
        }
        replyMsg3 = results[0].Teachername;
        console.log("results define:"+typeof(results));
        console.log("results[0] define:"+typeof(results[0]));
        console.log("results[0].Teachername define:"+typeof(results[0].Teachername));
        console.log("results[0].CourseName define:"+typeof(results[0].CourseName));
        console.log("results[0].COURSE_ID define:"+typeof(results[0].COURSE_ID));
        console.log("Table Created");
        event.reply(results[0].Teachername+" "+results[0].CourseName+" "+results[0].COURSE_ID).then(function(data){
         }).catch(function(error){
       console.log("error")
     });
     });
     
   
 
 console.log("replyMsg3:"+replyMsg3);
     // event.reply(replyMsg3).then(function(data){
     //     }).catch(function(error){
     //   console.log("error")
     // });
     connection.end();
   }      
});

bot.on("message",function(event){ // 顯示資料表
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg4 = event.message.text;
  var replyMsg3 = "";
  if(msg4.indexOf("顯示資料表") != -1){
  var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
   });
   connection.connect();
   console.log("connect");
   connection.query('show tables', function(err, results) {
         if (err) {
           throw err;
        }
        //replyMsg3 = results[0];
        console.log("Object.keys():"+Object.keys(results));
        console.log("results define:"+typeof(results));
        console.log("results[0] define:"+typeof(results[0]));
        //console.log("results[0].Teachername define:"+typeof(results[0].Teachername));
        //console.log("results[0].CourseName define:"+typeof(results[0].CourseName));
        //console.log("results[0].COURSE_ID define:"+typeof(results[0].COURSE_ID));
        console.log(results)
        console.log("results.length()"+results.length)
        for(var x in results){
          console.log(x);
        }
        console.log("Table Created");
        for(var x in results){
          if(x == results.length-1)
            replyMsg3 = replyMsg3+results[x].Tables_in_line;
          else
            replyMsg3 = replyMsg3+results[x].Tables_in_line+"\n";
          }
               console.log(replyMsg3);
          //console.log("資料表:"+results[x].Tables_in_line);
             event.reply(replyMsg3).then(function(data){
         }).catch(function(error){
       console.log("error")
     });
    
        console.log(replyMsg3);
     //    event.reply(results[0].Tables_in_line).then(function(data){
     //     }).catch(function(error){
     //   console.log("error")
     // });
     });
     
   
 
 console.log("replyMsg3:"+replyMsg3);
     // event.reply(replyMsg3).then(function(data){
     //     }).catch(function(error){
     //   console.log("error")
     // });
     connection.end();
   }      
});

bot.on("postback",function(event){
  var msg = event.postback.data;
  //console.log("msg:"+msg)
  if( msg == "選擇成績單" ){
    gradeswitch = 1;
  var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
   });
   connection.connect();
   console.log("connect");
  if(coursename == ""){
    connection.query('Select CourseName FROM COURSE WHERE User_ID = ?' ,[event.source.userId], function(err, results){
          console.log("課程")
          console.log(results.length)
        if(results.length == 1){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  }]
              }]
            }
              }])
        }else if(results.length == 2){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  }]
              }]
            }
              }])          
        }else if(results.length == 3){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              }]
            }
              }])          
        }else if(results.length == 4){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  }]
              }]
            }
              }])          
        }else if(results.length == 5){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  }]
              }]
            }
              }])          
        }else if(results.length == 6){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  },{
                    type: "postback",
                    label: results[5].CourseName,
                    data: "成績單"+results[5].CourseName
                  }]
                }]
              }
            })          
        }
    });
  }
  else{
    connection.query('SELECT TranscriptName FROM Transcript WHERE Course_ID = (SELECT Course_ID FROM COURSE WHERE CourseName = ?)',[coursename], function(err, results) {
         if (err) {
           throw err;
        }
        console.log(results)
        console.log("results.length()"+results.length)
        for(var x in results){
          transcript[x] = results[x].TranscriptName;
          //console.log("transcript:"+transcript[x]);
        }
        if(results.length == 1){
          event.reply([{ type: 'text', text: "請選擇成績單"},{
            type: "template", 
            altText: "成績單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇成績單",
                text: "成績單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  }]
              }]
            }
          }])
        }else if(results.length == 2){
          event.reply([{ type: 'text', text: "請選擇成績單"},{
            type: "template", 
            altText: "成績單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇成績單",
                text: "成績單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  }]
              }]
            }
          }])         
        }else if(results.length == 3){
          event.reply([{ type: 'text', text: "請選擇成績單"},{
            type: "template", 
            altText: "成績單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇成績單",
                text: "成績單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
                }]
              }
            }])          
        }else if(results.length == 4){
          event.reply([{ type: 'text', text: "請選擇成績單"},{
            type: "template", 
            altText: "成績單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇成績單",
                text: "成績單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  }]
              }]
            }
              }])          
        }else if(results.length == 5){
          event.reply([{ type: 'text', text: "請選擇成績單"},{
            type: "template", 
            altText: "成績單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇成績單",
                text: "成績單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "成績單"+results[4].TranscriptName
                  }]
              }]
            }
               }])         
        }else if(results.length == 6){
          event.reply([{ type: 'text', text: "請選擇成績單"},{
            type: "template", 
            altText: "成績單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇成績單",
                text: "成績單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "成績單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "成績單"+results[4].TranscriptName
                  },{
                    type: "postback",
                    label: results[5].TranscriptName,
                    data: "成績單"+results[5].TranscriptName
                  }]
                }]
              }
           }])          
        }
    });
  }
     connection.end();   
      return;  
      }
});

bot.on('postback', function(event) {
  var msg3 = event.postback.data;
  if(msg3.indexOf(transcript[0]) != -1){
    console.log("replyMsg3+results[x].Tables_in_line")
    formate = transcript[0];
    names2[0][1] = formate;
    event.reply([{ type: 'text', text: "選擇完成"},
               { type: 'text', text: "現在成績單:"+transcript[0]}]).then(function(data){
            }).catch(function(error){
            console.log("error")
          });
        getGradeByDB(names2[0][1]);
      }
      if(msg3.indexOf(transcript[1]) != -1){
        console.log("replyMsg3+results[x].Tables_in_line")
        formate = transcript[1];
        names2[0][1] = formate;
        //getGradeByDB();
        event.reply([{ type: 'text', text: "選擇完成"},
               { type: 'text', text: "現在成績單:"+transcript[1]}]).then(function(data){
            }).catch(function(error){
            console.log("error")
          });
        getGradeByDB(names2[0][1]);
      }
      if(msg3.indexOf(transcript[2]) != -1){
        console.log("replyMsg3+results[x].Tables_in_line")
        formate = transcript[2];
        names2[0][1] = formate;
        //getGradeByDB();
        event.reply([{ type: 'text', text: "選擇完成"},
               { type: 'text', text: "現在成績單:"+transcript[2]}]).then(function(data){
            }).catch(function(error){
            console.log("error")
          });
            getGradeByDB(names2[0][1]);
      }
      if(msg3.indexOf(transcript[3]) != -1){
        console.log("replyMsg3+results[x].Tables_in_line")
        formate = transcript[3];
        names2[0][1] = formate;
        //getGradeByDB();
        event.reply([{ type: 'text', text: "選擇完成"},
               { type: 'text', text: "現在成績單:"+transcript[3]}]).then(function(data){
            }).catch(function(error){
            console.log("error")
          });
            getGradeByDB(names2[0][1]);
      }
});

bot.on("postback",function(event){
  var msg4 = event.postback.data;
  var replyMsg3 = "";
  console.log("橙橙橙");
  if(msg4.indexOf("成績") != -1 && msg4.length == 2){
    console.log("績績績");
    replyMsg3 = Display_all();
    console.log("橙橙橙123");
    console.log("replyMsg3:"+replyMsg3);
    // event.reply(replyMsg3).then(function(data){
    // }).catch(function(error){
    //   console.log("error")
    // });
    event.reply([{ type: 'text', text: replyMsg3}]).then(function(data){
            }).catch(function(error){
            console.log("error")
          });
  }      
});

bot.on("postback",function(event){
  var msg6 = event.postback.data;
  var replyMsg4 = "";
  if(msg6.indexOf("前5筆") != -1 && msg6.length == 3){
  replyMsg4 = Display(Last_N_in(ArrayReverse(record),5));
      event.reply(replyMsg4).then(function(data){
          }).catch(function(error){
        console.log("error")
      });
    }      
});


// bot.on('postback', function(event) {
//   var login1 = event.postback.data;
//     if(login1.indexOf("老師Email") != -1){
//       event.reply("請輸入老師E-mail").then(function(data){
//             console.log("請輸入老師E-mail");
//             }).catch(function(error){
//             console.log("error")
//           });
//             return;
//           }
//     var connection = mysql.createConnection({
//        host     : '35.185.170.234',
//        user     : 'root',
//        password : 'asdcpi14',
//        database : 'line'
//     });
//     connection.connect();
//     console.log("connect");
//      connection.query('Insert Into TEACHER(Tname,User_ID) VAULES (?,?)',[login,event.source.userId], function(err, results) {
//          if (err) {
//            throw err;
//         }    
//   });
//      connection.end();
// });

// bot.on('postback', function(event) {
//   var login1 = event.postback.data;
//     if(login1.indexOf("學生Email") != -1){
//       event.reply("請輸入學生E-mail").then(function(data){
//             console.log("請輸入學生E-mail");
//             }).catch(function(error){
//             console.log("error")
//           });
//             return;
//           }
//     var connection = mysql.createConnection({
//        host     : '35.185.170.234',
//        user     : 'root',
//        password : 'asdcpi14',
//        database : 'line'
//     });
//     connection.connect();
//     console.log("connect");
//      connection.query('Insert Into STUDENT(Sname,Student_ID,User_ID) VAULES (?,?,?)',[login,"",event.source.userId], function(err, results) {
//          if (err) {
//            throw err;
//         }    
//   });
//      connection.end();
// });
bot.on('message', function(event) {
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var logout = event.message.text;
  if(logout.indexOf("登入狀態") != -1){
    var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
    });
    connection.connect();
    console.log("connect");
    connection.query('SELECT Lname,Email,LoginStatus From Login Where User_ID = ?',[event.source.userId], function(err, results1) {
         if (err) {
          return;
          //throw err;
        }
        //console.log(results1[0].LoginStatus)
        if(results1.length == 0){
          event.reply("您尚未註冊").then(function(data){
            console.log("您尚未註冊");
            }).catch(function(error){
            console.log("error")
          });
          return;
        }
        
        if(typeof(results1[0].LoginStatus) == "undefined")
          return;

        if(results1[0].LoginStatus == 0 ){
          event.reply("您尚未登入").then(function(data){
            console.log("您尚未登入");
            }).catch(function(error){
            console.log("error")
          });
            return;
        }else{
          event.reply([{ type: 'text', text: "目前登入中"},{ type: 'text', text: "登入者:"+results1[0].Lname},{ type: 'text', text: "信箱:"+results1[0].Email}]).then(function(data){
            console.log("目前登入中");
            }).catch(function(error){
            console.log("error")
          });
        }
        
    });
    connection.end();
  }
});

bot.on('message', function(event) {
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var logout = event.message.text;
  if(logout.indexOf("登入") != -1 && logout.length == 2){
    var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
    });
    connection.connect();
    console.log("connect");
    connection.query('SELECT Verification From Login Where User_ID = ?',[event.source.userId], function(err, results1) {
         if (err) {
           throw err;
        }
        console.log(results1[0].Verification)
        if(results1[0].Verification == 0 ){
          event.reply("您尚未輸入驗證碼").then(function(data){
            console.log("您尚未輸入驗證碼");
            }).catch(function(error){
            console.log("error")
          });
            return;
        }
        else{
          connection.query('UPDATE Login SET LoginStatus = ? WHERE User_ID = ?',['1',event.source.userId], function(err, results2) {
            if (err) {
              throw err;
            }
            event.reply("歡迎回來 Line bot").then(function(data){
              console.log("歡迎回來 Line bot");
              }).catch(function(error){
              console.log("error")
            });
            return;
          });
        }
    });
  }
});

bot.on('message', function(event) {
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var logout = event.message.text;
  if(logout.indexOf("登出") != -1 && logout.length == 2){
    var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
    });
    connection.connect();
    console.log("connect");
    connection.query('UPDATE Login SET LoginStatus = ? WHERE User_ID = ?',['0',event.source.userId], function(err, results) {
         if (err) {
           throw err;
        }
          console.log("資料已修改");
        });
    connection.end();
        event.reply("已登出").then(function(data){
          console.log("已登出");
          }).catch(function(error){
          console.log("error")
        });
  } 
});

bot.on('message', function(event) {
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var login = event.message.text;
    if(login.indexOf("註冊") != -1 && login.length == 2 && registering == 0){
      event.reply("請輸入學生/老師姓名").then(function(data){
            console.log("請輸入學生/老師姓名");
            }).catch(function(error){
            console.log("error")
          });
    registering = 1;
    PW = Math.floor(Math.random()*(max-min+1))+min;;
  }
  else if(registering == 1 && login.length <= 4){
              Loginname = login;
               var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
    });
    connection.connect();
    console.log("connect");
     connection.query('Insert Into Login(Lname,User_ID,LoginStatus,Verification) VALUES (?,?,?,?)',[login,event.source.userId,"0","0"], function(err, results) {
         if (err) {
           event.reply("此ID已經註冊過了").then(function(data){
            console.log("此ID已經註冊過了");
            }).catch(function(error){
            console.log("error")
          });;
            registering = 0;
        }
        else{    
            event.reply("請輸入學生(@ulive.pccu.edu.tw)或(@g.pccu.edu.tw)/老師(@faculty.pccu.edu.tw)E-mail，輸入到@後一位即可").then(function(data){
            console.log("請輸入學生/老師E-mail");
            }).catch(function(error){
            console.log("error")
          });
        }
       });
     connection.end();    
  }
});

bot.on('message', function(event) {
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var login2 = event.message.text;

  var connection = mysql.createConnection({
       host     : '35.185.170.234',
       user     : 'root',
       password : 'asdcpi14',
       database : 'line'
  });
  connection.connect();
  console.log("connect");
    if((login2.indexOf("@u") != -1 || login2.indexOf("@g") != -1 || login2.indexOf("@f") != -1) && registering == 1 && emailtrue == 0){
      if(login2.indexOf("@u") != -1){
        console.log(login2.substring(0,login2.search("@u")))
        console.log(Loginname)
        login3 = login2.substring(0,login2.search("@u"))+"@ulive.pccu.edu.tw"
        connection.query('Update STUDENT SET User_ID = ? WHERE Student_ID = ?',[event.source.userId,login2.substring(0,login2.search("@u"))], function(err, results) {
          if (err) {
            throw err;
          }
        });
      }
      else if(login2.indexOf("@f") != -1){
        login3 = login2.substring(0,login2.search("@f"))+"@faculty.pccu.edu.tw"
        connection.query('INSERT INTO TEACHER (Tname,User_ID) VALUES (?,?)',[Loginname,event.source.userId], function(err, results) {
          if (err) {
            throw err;
          }
        });
      }
      else if(login2.indexOf("@g") != -1){
        console.log(login2.substring(0,login2.search("@g")))
        console.log(Loginname)
        login3 = login2.substring(0,login2.search("@g"))+"@g.pccu.edu.tw"
        connection.query('Update STUDENT SET User_ID = ? WHERE Student_ID = ?',[event.source.userId,login2.substring(0,login2.search("@g"))], function(err, results) {
          if (err) {
            throw err;
          }
        });
      }
      //sendEmail(login3,PW);

      var mailOptions = {
        from: 'asdcpi70914@gmail.com',
        to: login3,
        subject: 'line bot 驗證碼',
        text: '驗證碼為:'+ PW,
      };
      console.log("sPW:"+PW);
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        }else {
          console.log('Email sent: ' + info.response);
        }
      });

  //       var transporter = nodemailer.createTransport({
  //         service: 'gmail',
  //         auth: {
  //         user: 'asdcpi70914@gmail.com',
  //         pass: 'asdcpi14',
  //       },
  //   });
  // console.log(login3)
  //   var mailOptions = {
  //     from: 'asdcpi70914@gmail.com',
  //     to: login3,
  //     subject: 'line bot 驗證碼',
  //     text: '驗證碼為:'+PW,
  //   };
  //   transporter.sendMail(mailOptions, function(error, info) {
  //     if (error) {
  //       console.log(error);
  //     }else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });
    if(login2.indexOf("@u") != -1){
      connection.query('UPDATE Login SET Email = ? , PW = ? , Identity = ? WHERE User_ID = ?',[login3,PW,'STUDENT',event.source.userId], function(err, results) {
        if (err) {
          throw err;
        }
        console.log("資料已輸入");
        console.log("PW型別"+typeof(PW));
      });
    }else if(login2.indexOf("@f") != -1){
      connection.query('UPDATE Login SET Email = ? , PW = ? , Identity = ? WHERE User_ID = ?',[login3,PW,'TEACHER',event.source.userId], function(err, results) {
        if (err) {
          throw err;
        }
        console.log("資料已輸入");
        console.log("PW型別"+typeof(PW));
      });  
    }else if(login2.indexOf("@g") != -1){
      connection.query('UPDATE Login SET Email = ? , PW = ? , Identity = ? WHERE User_ID = ?',[login3,PW,'STUDENT',event.source.userId], function(err, results) {
        if (err) {
          throw err;
        }
        console.log("資料已輸入");
        console.log("PW型別"+typeof(PW));
      });  
    }
    event.reply("已傳送驗證碼，若未收到請輸入「重發驗證碼」").then(function(data){
      console.log("已傳送驗證碼");
    }).catch(function(error){
      console.log("error")
    });
    emailtrue = 1;
  }else if(login2.indexOf("@") != -1 && login2.indexOf("@u") == -1 && login2.indexOf("@f") == -1 && login2.indexOf("@g") == -1 && registering == 1 && emailtrue == 0){
    event.reply([{ type: 'text', text: "信箱格式錯誤，請重新輸入"},{ type: 'text', text: "輸入錯誤3次將取消註冊"}]).then(function(data){
      console.log("信箱格式錯誤");
    }).catch(function(error){
      console.log("error")
    });
    emailcount = emailcount+1;
  }

  if(emailcount == 3){
  var connection = mysql.createConnection({
      host     : '35.185.170.234',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
   connection.connect();
   console.log("connect");
   connection.query('DELETE FROM Login WHERE User_ID = ?',[event.source.userId], function(err, results) {
         if (err) {
           throw err;
        }
          console.log("資料已修改");
        });
  connection.end();
  event.reply("取消註冊").then(function(data){
      console.log("取消註冊");
    }).catch(function(error){
      console.log("error")
    });
   emailcount = 0;
   registering = 0;
  }
  //connection.end();
});

bot.on('message', function(event) {
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var pp = event.message.text;

  if(pp.indexOf("重發驗證碼") != -1 && registering == 1 && pp.length == 5 && emailtrue == 1){
    var connection = mysql.createConnection({
      host     : '35.185.170.234',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
    });
    connection.connect();
    var mail;
    connection.query('SELECT Lname,Email,LoginStatus From Login Where User_ID = ?',[event.source.userId], function(err, results1) {
      if (err) {
          throw err;
        }
      mail = results1[0].Email;
    });
    
    PW = Math.floor(Math.random()*(max-min+1))+min;
    connection.query('UPDATE Login SET PW = ? WHERE User_ID = ?',[PW,event.source.userId], function(err, results) {
        if (err) {
          throw err;
        }else{
          var mailOptions = {
            from: 'asdcpi70914@gmail.com',
            to: mail,
            subject: 'line bot 驗證碼',
            text: '驗證碼為:'+ PW,
          };
          console.log("sPW:"+PW);
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            }else {
              console.log('Email sent: ' + info.response);
            }
          });
          event.reply("已重新發送驗證碼").then(function(data){
            console.log("已重新發送驗證碼");
          }).catch(function(error){
            console.log("error")
          });
        }
        console.log("資料已輸入");
        console.log("PW型別"+typeof(PW));
      });
  }else if(pp.indexOf(PW) != -1 && registering == 1 && pp.length == 9 && emailtrue == 1){
    var connection = mysql.createConnection({
      host     : '35.185.170.234',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
   connection.connect();
   console.log("connect");
   connection.query('UPDATE Login SET LoginStatus = ? ,Verification = ? WHERE User_ID = ?',['1','1',event.source.userId], function(err, results) {
         if (err) {
           throw err;
        }
          console.log("資料已修改");
        });
    connection.end();
        event.reply("已登入").then(function(data){
          console.log("已登入");
          }).catch(function(error){
          console.log("error")
        });
          //LoginStatus = 1;
          registering = 0;
          PWcount = 0;
  }else if(pp.indexOf(PW) == -1 && registering == 1 && pp.length == 9 && emailtrue == 1){
  event.reply([{ type: 'text', text: "驗證碼錯誤，請重新輸入"},{ type: 'text', text: "輸入錯誤3次將取消註冊"}]).then(function(data){
      console.log("驗證碼錯誤");
    }).catch(function(error){
      console.log("error")
    });
    PWcount = PWcount+1;
  }
  if(PWcount == 3){
  var connection = mysql.createConnection({
      host     : '35.185.170.234',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
   connection.connect();
   console.log("connect");
   connection.query('DELETE FROM Login WHERE User_ID = ?',[event.source.userId], function(err, results) {
         if (err) {
           throw err;
        }
          console.log("資料已修改");
        });
    connection.end();
    event.reply("取消註冊").then(function(data){
      console.log("取消註冊");
    }).catch(function(error){
      console.log("error")
    });
    PWcount = 0;
    registering = 0;
  }
});

var tempEmail;
bot.on('message', function(event) {
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var uploadEmail = event.message.text;
  
  var connection = mysql.createConnection({
      host     : '35.185.170.234',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
   connection.connect();
   console.log("connect");
   console.log("uploadEmail:"+uploadEmail);
   console.log("event.source.userId");
   connection.query('SELECT Email,PW,Verification From Login Where User_ID = ?',[event.source.userId], function(err, results) {
    if(uploadEmail.indexOf("修改信箱") != -1 && uploadEmail.length == 4 && uploadEmailing == 0 && results[0].Verification == 1){
      event.reply([{ type: 'text', text: "現在Email:"+results[0].Email},{ type: 'text', text: "請輸入信箱(@g,@u,@f)"}]).then(function(data){
      console.log("信箱格式錯誤");
    }).catch(function(error){
      console.log("error")
    });
      uploadEmailing = 1;
      emailtrue = 0;
    }
  });

   if(uploadEmail.indexOf("重發驗證碼") != -1 && uploadEmailing == 1 && uploadEmail.length == 5 && verificationing == 1){
    // var connection = mysql.createConnection({
    //   host     : '35.185.170.234',
    //   user     : 'root',
    //   password : 'asdcpi14',
    //   database : 'line'
    // });
    // connection.connect();
    connection.query('SELECT Lname,Email,LoginStatus From Login Where User_ID = ?',[event.source.userId], function(err, results1) {
      if (err) {
          throw err;
      }else{
        PW = Math.floor(Math.random()*(max-min+1))+min;
        var mailOptions = {
            from: 'asdcpi70914@gmail.com',
            to: tempEmail,
            subject: 'line bot 驗證碼',
            text: '驗證碼為:'+ PW,
          };
          console.log("sPW:"+PW);
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            }else {
              console.log('Email sent: ' + info.response);
            }
          });
          event.reply("已重新發送驗證碼").then(function(data){
            console.log("已重新發送驗證碼");
          }).catch(function(error){
            console.log("error")
          });
      }
      
    });
  }else if(uploadEmail.indexOf(PW) != -1 && uploadEmail.length == 9 && uploadEmailing == 1 && verificationing == 1){
    console.log("tempEmail_typeof:"+typeof(tempEmail));
    console.log("tempEmail:"+tempEmail);
    connection.query('UPDATE Login SET Email = ? , PW = ? WHERE User_ID = ?',[tempEmail,PW,event.source.userId], function(err, results) {
    if (err) {
      throw err;
    }
    console.log("資料已更新");
    });
    connection.query('SELECT Email,PW,Verification From Login Where User_ID = ?',[event.source.userId], function(err, results1) {
    event.reply([{ type: 'text', text: "修改完成"},{ type: 'text', text: "現在信箱:"+results1[0].Email}]).then(function(data){
      console.log("修改完成");
    }).catch(function(error){
      console.log("error")
    });
  });
    
    uploadEmailing = 0;
    emailcount = 0;
    verificationing = 0;
  }else if(uploadEmail.indexOf(PW) == -1 && uploadEmailing == 1 && verificationing == 1){
    PWcount = PWcount+1;
    console.log("PWcount2:"+PWcount)
    event.reply([{ type: 'text', text: "驗證碼錯誤，請重新輸入"},{ type: 'text', text: "輸入錯誤3次將取消註冊"}]).then(function(data){
      console.log("驗證碼錯誤2");
    }).catch(function(error){
      console.log("error")
    });
  }
   
  if((uploadEmail.indexOf("@u") != -1 || uploadEmail.indexOf("@g") != -1 || uploadEmail.indexOf("@f") != -1) && uploadEmailing == 1){
    var uploadEmail2;
    if(uploadEmail.indexOf("@u") != -1){
        uploadEmail2 = uploadEmail.substring(0,uploadEmail.search("@u"))+"@ulive.pccu.edu.tw"
        

      }
      else if(uploadEmail.indexOf("@f") != -1){
        uploadEmail2 = uploadEmail.substring(0,uploadEmail.search("@f"))+"@faculty.pccu.edu.tw"
        
      }
      else if(uploadEmail.indexOf("@g") != -1){
        uploadEmail2 = uploadEmail.substring(0,uploadEmail.search("@g"))+"@g.pccu.edu.tw"
        
        
      }

      PW = Math.floor(Math.random()*(max-min+1))+min;
      tempEmail = uploadEmail2;
      console.log("uploadEmail2000:"+uploadEmail2)
      console.log("tempEmail000:"+tempEmail)
      var mailOptions = {
        from: 'asdcpi70914@gmail.com',
        to: uploadEmail2,
        subject: 'line bot 驗證碼',
        text: '驗證碼為:'+ PW,
      };
      console.log("sssPW:"+PW);
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        }else {
          PWcount = 0;
          event.reply("已傳送驗證碼，若未收到請輸入「重發驗證碼」").then(function(data){
          console.log("驗證碼傳送");
          }).catch(function(error){
          console.log("error")
          });
          console.log('Email sent: ' + info.response);
        }
      });
      verificationing = 1;
      
      //sendEmail(uploadEmail2,PW);

      

  //   var transporter = nodemailer.createTransport({
  //       service: 'gmail',
  //       auth: {
  //       user: 'asdcpi70914@gmail.com',
  //       pass: 'asdcpi14',
  //     },
  // });
  // console.log(uploadEmail2)
  // console.log("uploadEmailing:"+uploadEmailing);
  // var mailOptions = {
  //   from: 'asdcpi70914@gmail.com',
  //   to: uploadEmail2,
  //   subject: 'line bot 驗證碼',
  //   text: '驗證碼為:'+PW,
  // };
  // transporter.sendMail(mailOptions, function(error, info) {
  //   if (error) {
  //     console.log(error);
  //   }else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
    
  }else if(uploadEmail.indexOf("@") != -1 && uploadEmail.indexOf("@u") == -1 && uploadEmail.indexOf("@f") == -1 && uploadEmail.indexOf("@g") == -1 && uploadEmailing == 1){
    event.reply([{ type: 'text', text: "信箱格式錯誤，請重新輸入"},{ type: 'text', text: "輸入錯誤3次將取消修改"}]).then(function(data){
      console.log("信箱格式錯誤");
    }).catch(function(error){
      console.log("error")
    });
    emailcount = emailcount+1;
  }
  
  if(uploadEmailing == 1 && emailcount == 3){
    event.reply("取消修改").then(function(data){
      console.log("取消修改");
    }).catch(function(error){
      console.log("error")
    });
    uploadEmailing = 0;
    emailcount = 0;
  }
  if(uploadEmailing == 1 && PWcount == 3){
    event.reply("取消修改").then(function(data){
      console.log("取消修改");
    }).catch(function(error){
      console.log("error")
    });
    uploadEmailing = 0;
    emailcount = 0;
    PWcount = 0;
  } 
});

bot.on('postback', function(event) {
  var imagetext = event.postback.data;
  if(imagetext.indexOf("圖片") != -1 && imagetext.length == 2){
    // event.reply({
    //   type: 'image',
    //   originalContentUrl: 'https://api.reh.tw/line/bot/example/assets/images/example.jpg',
    //   previewImageUrl: 'https://api.reh.tw/line/bot/example/assets/images/example.jpg'
    // }).catch(function(error){
    //   console.log("error")
    // });
    
    console.log("圖片");
    event.reply({
      type: 'imagemap',
      baseUrl: 'https://api.reh.tw/line/bot/example/assets/images/example.jpg?',
      altText: 'this is an imagemap',
      baseSize: { height: 1040, width: 1040 },
      actions: [{
        type: 'message',
        text: '登入狀態',
        area: { x: 0, y: 0, width: 520, height: 520 }
      }, {
        type: 'message',
        text: '登入',
        area: { x: 520, y: 0, width: 520, height: 520 }
      }, {
        type: 'message',
        text: '公車資訊',
        area: { x: 0, y: 520, width: 520, height: 520 }
      }, {
        type: 'message',
        text: '登出',
        area: { x: 520, y: 520, width: 520, height: 520 }
      }]
    }).catch(function(error){
      console.log("error")
    });
  }
});

bot.on('message', function(event) {
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var emojitext = event.message.text;
  console.log(emojitext.codePointAt());
  // var speak = '';
  // for(var i = 0 ; i < emojitext.length ; i++){
  //   speak = speak+ String.fromCodePoint(emojitext[i].codePointAt());
  // }
  // event.reply(speak).then(function(data){
  //     console.log("表情succes");
  //   }).catch(function(error){
  //     console.log("error")
  //   });
  if(emojitext.indexOf("表情") != -1 && emojitext.length == 2){
    event.reply([{ type: 'text', text: String.fromCodePoint(0x1000A5)+"測試0"},{ type: 'text', text: String.fromCodePoint(0x1000A6)+"測試"},
      { type: 'text', text: String.fromCodePoint(9989)+"出席"},{ type: 'text', text: String.fromCodePoint(10060)+"缺席"},{ type: 'text', text: String.fromCodePoint(128311)+"遲到"}]).then(function(data){
      console.log("emoji succces");
    }).catch(function(error){
      console.log("error")
    });
  }
});

bot.on('message', function(event) {
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  msg = event.message.text;
    if(msg.indexOf("出缺席") != -1 && msg.length == 3){
      event.reply({
        type: 'template',
        altText: 'this is a buttons template',
        template: {
        type: 'buttons',
        //thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',選擇成績單
        title: '學生出缺席清單',
        text: '師生可以透過此選單來查看出缺席',
        actions: [{
          type: 'postback',
          label: '出缺席',
          data: '出缺席'
          },{type: 'postback',
          label: '前5筆出缺席',
          data: '前5筆出缺席'
          },{type: 'postback',
          label: '全部出席',
          data: '全部出席'
          },{type: 'postback',
          label: '全部缺席',
          data: '全部缺席'
          }]
        }
      })
    }
})

bot.on("postback",function(event){
  var msg4 = event.postback.data;
  var replyMsg3 = "";
  if(msg4.indexOf("出缺席") != -1 && msg4.length == 3){
  replyMsg3 = Display_all_attend();
      event.reply(replyMsg3).then(function(data){
          }).catch(function(error){
        console.log("error")
      });
    }      
});

bot.on("postback",function(event){
  var msg4 = event.postback.data;
  var connection = mysql.createConnection({
    host     : '35.185.170.234',
    user     : 'root',
    password : 'asdcpi14',
    database : 'line'
  });
  connection.connect();
  console.log("connect");
  connection.query('Select Identity FROM Login WHERE User_ID = ?' ,[event.source.userId], function(err, results){
    Identity = results[0].Identity;
    console.log(Identity)
  });
    if(msg4.indexOf("全部出席") != -1 && msg4.length == 4 && Identity == "TEACHER"){
            if(attendname == "" && coursename == ""){   
        connection.query('Select CourseName FROM COURSE WHERE User_ID = ?' ,[event.source.userId], function(err, results){
          console.log("課程")
          console.log(results.length)
          if(results.length == 1){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  }]
              }]
            }
              }])
          }else if(results.length == 2){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 3){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 4){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 5){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 6){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  },{
                    type: "postback",
                    label: results[5].CourseName,
                    data: "成績單"+results[5].CourseName
                  }]
                }]
              }
            })          
          }
        });
        connection.end();
      }else if(attendname == "" && coursename != ""){
        connection.query('Select TranscriptName FROM Transcript WHERE Course_ID = (SELECT Course_ID FROM COURSE WHERE CourseName = ?) and TranscriptType = ?' ,[coursename,"簽到表"], function(err, results){
          console.log("簽到單")
          console.log(results.length)
          if(results.length == 1){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  }]
              }]
            }
              }])
          }else if(results.length == 2){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  }]
              }]
            }
              }])          
          }else if(results.length == 3){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "簽到單"+results[2].TranscriptName
                  }]
              }]
            }
              }])          
          }else if(results.length == 4){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "簽到單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "簽到單"+results[3].TranscriptName
                  }]
              }]
            }
              }])          
          }else if(results.length == 5){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "簽到單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "簽到單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "簽到單"+results[4].TranscriptName
                  }]
              }]
            }
              }])          
          }else if(results.length == 6){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "簽到單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "簽到單"+results[4].TranscriptName
                  },{
                    type: "postback",
                    label: results[5].TranscriptName,
                    data: "簽到單"+results[5].TranscriptName
                  }]
                }]
              }
            }])          
          }
        });
      }else if(attendname != "" && coursename != ""){
          var dt = datetime.create();
          var date = dt.format('y-m-d H:M:S');
          var an = ""
        for(var i = 1 ; i < attend_Ary.length ; i++){
          attend_Ary[i][1] = attend_ch[6];
          an = attend_Ary[i][0]
        }
        console.log("全部出席");
        event.reply("已輸入所有學生出席").then(function(data){
          }).catch(function(error){
        console.log("error")
        });
          attendname = "";
          coursename = "";
      }
    }else if(msg4.indexOf("全部出席") != -1 && msg4.length == 4 && Identity == "STUDENT"){
        console.log("!!!!!!!!!!!")
        event.reply("此功能只開放給老師使用").then(function(data){
          }).catch(function(error){
        console.log("error")
        });
    }     
});

bot.on("postback",function(event){
  var msg4 = event.postback.data;
  var connection = mysql.createConnection({
    host     : '35.185.170.234',
    user     : 'root',
    password : 'asdcpi14',
    database : 'line'
  });
  connection.connect();
  console.log("connect");
  connection.query('Select Identity FROM Login WHERE User_ID = ?' ,[event.source.userId], function(err, results){
    Identity = results[0].Identity;
  });
    if(msg4.indexOf("全部缺席") != -1 && msg4.length == 4 && Identity == "TEACHER"){
            if(attendname == "" && coursename == ""){   
        connection.query('Select CourseName FROM COURSE WHERE User_ID = ?' ,[event.source.userId], function(err, results){
          console.log("課程")
          console.log(results.length)
          if(results.length == 1){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  }]
              }]
            }
              }])
          }else if(results.length == 2){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 3){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 4){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 5){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 6){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  },{
                    type: "postback",
                    label: results[5].CourseName,
                    data: "成績單"+results[5].CourseName
                  }]
                }]
              }
            })          
          }
        });
        connection.end();
      }else if(attendname == "" && coursename != ""){
        connection.query('Select TranscriptName FROM Transcript WHERE Course_ID = (SELECT Course_ID FROM COURSE WHERE CourseName = ?) and TranscriptType = ?' ,[coursename,"簽到表"], function(err, results){
          console.log("簽到單")
          console.log(results.length)
          if(results.length == 1){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  }]
              }]
            }
              }])
          }else if(results.length == 2){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  }]
              }]
            }
              }])          
          }else if(results.length == 3){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "簽到單"+results[2].TranscriptName
                  }]
              }]
            }
              }])          
          }else if(results.length == 4){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "簽到單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "簽到單"+results[3].TranscriptName
                  }]
              }]
            }
              }])          
          }else if(results.length == 5){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "簽到單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "簽到單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "簽到單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "簽到單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "簽到單"+results[4].TranscriptName
                  }]
              }]
            }
              }])          
          }else if(results.length == 6){
          event.reply([{ type: 'text', text: "尚未選擇簽到單，請選擇簽到單"},{
            type: "template", 
            altText: "簽到單選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].TranscriptName,
                    data: "成績單"+results[0].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[1].TranscriptName,
                    data:  "成績單"+results[1].TranscriptName
                  },
                  {
                    type: "postback",
                    label: results[2].TranscriptName,
                    data:  "成績單"+results[2].TranscriptName
                  }]
              },{
                title: "請選擇簽到單",
                text: "簽到單選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].TranscriptName,
                    data: "簽到單"+results[3].TranscriptName
                  },{
                    type: "postback",
                    label: results[4].TranscriptName,
                    data: "簽到單"+results[4].TranscriptName
                  },{
                    type: "postback",
                    label: results[5].TranscriptName,
                    data: "簽到單"+results[5].TranscriptName
                  }]
                }]
              }
            }])          
          }
        });
        connection.end();
      }else if(attendname != "" && coursename != ""){
          var dt = datetime.create();
          var date = dt.format('y-m-d H:M:S');
          var an = ""
      for(var i = 1 ; i < attend_Ary.length ; i++){
        attend_Ary[i][1] = attend_ch[7];
        an = attend_Ary[i][0]
  }
      console.log("全部缺席");
      event.reply("已輸入所有學生缺席").then(function(data){
          }).catch(function(error){
        console.log("error")
      });
              attendname = "";
          coursename = "";      
    }
  }else if(msg4.indexOf("全部缺席") != -1 && msg4.length == 4 && Identity == "STUDENT"){
    console.log("!!!!!!!!!!!")
          event.reply("此功能只開放給老師使用").then(function(data){
          }).catch(function(error){
        console.log("error")
      });
  }        
});

bot.on("postback",function(event){
  var msg6 = event.postback.data;
  var mmsg = event.postback.params;
  var replyMsg4 = "";
  if(msg6.indexOf("簽到表") != -1 && msg6.length == 3){
  var strdate = mmsg.date.substring((mmsg.date.indexOf("-"))+1,mmsg.date.length);
  strdate = strdate.replace("-","");
  attenddate = strdate;
  console.log("目前日期:"+attenddate);
  event.reply("目前日期:"+attenddate).then(function(data){
          }).catch(function(error){
        console.log("error")
      });
    }      
});

bot.on("postback",function(event){
  var msg6 = event.postback.data;
  var replyMsg4 = "";
  var connection = mysql.createConnection({
    host     : '35.185.170.234',
    user     : 'root',
    password : 'asdcpi14',
    database : 'line'
  });
    connection.connect();
    console.log("connect");
    connection.query('Select Identity FROM Login WHERE User_ID = ?' ,[event.source.userId], function(err, results){
      Identity = results[0].Identity;
    });
  if(msg6 == "建立簽到表" && coursename == "" && Identity == "TEACHER"){
          connection.query('Select CourseName FROM COURSE WHERE User_ID = ?' ,[event.source.userId], function(err, results){
            console.log("課程")
            console.log(results.length)
          if(results.length == 1){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  }]
              }]
            }
              }])
          }else if(results.length == 2){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 3){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 4){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 5){
          event.reply([{ type: 'text', text: "尚未選擇課程，請選擇課程"},{
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  }]
              }]
            }
              }])          
          }else if(results.length == 6){
          event.reply({
            type: "template", 
            altText: "課程選單",
            template: {
              type: "carousel",
              columns: [{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[0].CourseName,
                    data: "成績單"+results[0].CourseName
                  },
                  {
                    type: "postback",
                    label: results[1].CourseName,
                    data:  "成績單"+results[1].CourseName
                  },
                  {
                    type: "postback",
                    label: results[2].CourseName,
                    data:  "成績單"+results[2].CourseName
                  }]
              },{
                title: "請選擇課程",
                text: "課程選單",
                actions: [
                  {
                    type: "postback",
                    label: results[3].CourseName,
                    data: "成績單"+results[3].CourseName
                  },{
                    type: "postback",
                    label: results[4].CourseName,
                    data: "成績單"+results[4].CourseName
                  },{
                    type: "postback",
                    label: results[5].CourseName,
                    data: "成績單"+results[5].CourseName
                  }]
                }]
              }
            })          
          }
        });
        connection.end();
  }else if(msg6 == "建立簽到表" && coursename != "" && Identity == "TEACHER"){ 
    event.reply([{ type: 'text', text: "尚未選擇簽到日期"},{
          type: 'template',
          altText: 'this is a buttons template',
          template: {
          type: 'buttons',
          //thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
          title: '出缺席日期',
          text: '請選擇簽到日期',
          actions: [{
          type: 'datetimepicker',
          label: '選擇簽到日期',
          data: '簽到單日期',
          mode: "date"
          }]
          }
    }])
  }else if(msg6 == "建立簽到表" && coursename != "" && Identity != "TEACHER"){
        console.log("!!!!!!!!!!!")
          event.reply("此功能只開放給老師使用").then(function(data){
          }).catch(function(error){
        console.log("error")
      });
  }      
});

bot.on("postback",function(event){
  var msg6 = event.postback.data;
  var mmsg = event.postback.params;
  var replyMsg4 = "";
  if(msg6.indexOf("簽到單日期") != -1 && msg6.length == 5){
  var strdate = mmsg.date.substring((mmsg.date.indexOf("-"))+1,mmsg.date.length);
  strdate = strdate.replace("-","");
  attenddate =coursename+strdate+"簽到表";

  console.log("目前日期:"+attenddate);
  event.reply("目前日期:"+attenddate).then(function(data){
          }).catch(function(error){
        console.log("error")
      });
  var connection = mysql.createConnection({
    host     : '35.185.170.234',
    user     : 'root',
    password : 'asdcpi14',
    database : 'line'
  });
    connection.connect();
    console.log("connect");
    connection.query('INSERT INTO Transcript (TranscriptType,TranscriptName,Course_ID) VALUES (?,?,(SELECT Course_ID FROM COURSE WHERE CourseName = ?))' ,["簽到表",attenddate,coursename], function(err, results){
    if(err){
      throw err
    }
      console.log("新增一個簽到表")
    });
    }      
});

bot.on("postback",function(event){
  var msg6 = event.postback.data;
  var replyMsg4 = "";
  if(msg6.indexOf("前5筆出缺席") != -1 && msg6.length == 6){
  replyMsg4 = Display_attend(Last_N_in(ArrayReverse(record_attend),5));
      event.reply(replyMsg4).then(function(data){
          }).catch(function(error){
        console.log("error")
      });
    }      
});

bot.on("postback",function(event){
  var msg7 = event.postback.data;
    var connection = mysql.createConnection({
    host     : '35.185.170.234',
    user     : 'root',
    password : 'asdcpi14',
    database : 'line'
  });
  connection.connect();
  console.log("connect");
   connection.query('SELECT LoginStatus From Login Where User_ID = ?',[event.source.userId], function(err, results1) {
      if(results1.length == 0){
         event.reply("您尚未註冊").then(function(data){
          }).catch(function(error){
        console.log("error")
        });
      }else if(results1[0].LoginStatus == 1){
        if(msg7 == "個人成績" && selectgrade == 0 && msg7.length == 4){
          event.reply("請輸入學號").then(function(data){
          }).catch(function(error){
            console.log("error")
          });        
        }
        else if(msg7 == "個人成績" && selectgrade == 1 && formate != "" && coursename != ""&& msg7.length == 4){
          console.log("formate"+formate)
          console.log("coursename"+coursename)
          var connection = mysql.createConnection({
            host     : '35.185.170.234',
            user     : 'root',
            password : 'asdcpi14',
            database : 'line'
          });
          connection.connect();
          console.log("connect");
          connection.query('SELECT Sname From STUDENT Where Student_ID = ?',[Student_ID], function(err, results) {
          if (err) {
            throw err;
          }
    gradename = results[0].Sname;
  });
  connection.query('SELECT Grade From Grade Where Transcript_ID = (SELECT Transcript_ID From Transcript WHERE TranscriptName = ?) and Course_ID = (SELECT Course_ID From COURSE WHERE CourseName = ?) and Student_ID = ?',[formate,coursename,Student_ID], function(err, results) {
    if (err) {
      throw err;
    }
        console.log("gradename"+formate)
        console.log("gradename"+gradename)
    console.log("grade"+results[0].Grade)
        event.reply([{ type: 'text', text:formate},
               { type: 'text', text: gradename+"分數為:"+results[0].Grade}]).then(function(data){
            }).catch(function(error){
            console.log("error")
          }); 
  selectgrade = 0; 
  coursename = "";
  formate = "";         
  });
  connection.end();
  }
  }else if(results1[0].LoginStatus == 0){
        event.reply("請先登入，才可以查看個人成績").then(function(data){
          }).catch(function(error){
            console.log("error")
          });
          selectgrade = 0   
  }
    });
        connection.end(); 
});

bot.on("message",function(event){
  if (event.message.type == 'sticker' || event.message.type == 'image')
    return;
  var msg7 = event.message.text;
  var connection = mysql.createConnection({
    host     : '35.185.170.234',
    user     : 'root',
    password : 'asdcpi14',
    database : 'line'
  });
  connection.connect();
  console.log("connect");
  if(msg7.length!=8 || msg7.indexOf("出席") != -1 || msg7.indexOf("缺席") != -1 ||msg7 == "登入" ||msg7 == "登出" ||msg7 == "登入狀態" ||msg7 == "成績" || msg7 == "建立成績單" || msg7 == "建立" || msg7 == "建立成績" || msg7 == "網頁管理" || msg7 == "管理網頁" || msg7 == "功能" || msg7 == "使用方法" || msg7 == "教師課程" || msg7 == "學生課程" || msg7 == "公車資訊"  || msg7 == "天氣資訊"  || msg7 == "登記完成" || msg == "學校公告" || msg7 == "登入狀態" || msg7.indexOf("@") != -1 || msg7 == "修改信箱" || msg7 == PW  || msg7 == "圖片" || msg7 == "表情" || msg7 == "出缺席")
    return;
    connection.query('SELECT Student_ID From STUDENT Where User_ID = ?',[event.source.userId], function(err, results1) {
          if (err) {
           //throw err;
          return;
          }
          if(msg7 == results1[0].Student_ID){
            Student_ID = results1[0].Student_ID;
            event.reply("請選擇課程及成績單(選擇課程可以使用學生課程功能，選擇成績單可以使用成績功能)").then(function(data){
              }).catch(function(error){
                console.log("error")
              });
              selectgrade = 1
          }
          else{
            event.reply("請勿冒充他人").then(function(data){
            }).catch(function(error){
            console.log("error")
            });
            selectgrade = 0;
          }
        });
  connection.end();  
});