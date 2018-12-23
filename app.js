var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();
var multer = require('multer')
var fs = require('fs');
var mysql = require('mysql')
var CsvReadableStream = require('csv-reader');
var AutoDetectDecoderStream = require('autodetect-decoder-stream');
var data = {}
var data1 = {}
var data2 = {}
var data3 = {}
var id = ""
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
"use strict";

require("dotenv").config();

const line_login = require("line-login");
const session = require("express-session");
const session_options = {
    secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    resave: false,
    saveUninitialized: false
}
app.use(session(session_options));

app.get("/",function(request, response) {
    response.render("login");
})

const login = new line_login({
    channel_id: process.env.LINE_LOGIN_CHANNEL_ID,
    channel_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    callback_url: process.env.LINE_LOGIN_CALLBACK_URL
});


app.get("/auth", login.auth());


app.get("/callback", login.callback(
    (req, res, next, token_response,url) => {
    var connection = mysql.createConnection({
      host     : '35.185.170.234',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
   connection.connect();
   console.log("connect");  
   id = token_response.id_token.sub
  connection.query('Insert Into LoginHTML(Lname,User_ID,LoginStatus) VALUES (?,?,?)',[token_response.id_token.name,token_response.id_token.sub,1], function(err, results) {
         if (err) {
           return;
        }
          console.log("資料已修改");
        });
  connection.end();
        res.render("form1");
         console.log(token_response)
        console.log(token_response.id_token.sub)
    },(req, res, next, error) => {

        res.status(400).json(error);
    }
));
var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads')
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

app.get('/',function(req,res){
  console.log(req.body.name);
  res.render(__dirname + '/views/form1.ejs');
})

app.post('/', upload.single('upload'), (req, res, next) => {
  console.log(req.file.originalname);
  var path = 'uploads/'+req.file.originalname;
  console.log(path);
  var str = req.file.originalname
  var text = str.split(" ")
  var length = text[4].indexOf("_")
  var text1 = text[4].substring(0,length)
  console.log(text[3]);
  console.log(text1);
var inputStream = fs.createReadStream(path,'utf8');
    var connection = mysql.createConnection({
      host     : '35.221.225.212',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
   connection.connect();
   console.log("connect");
inputStream
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        // console.log('A row arrived: ', row);
        // console.log(row[3])
        // console.log(row[2])
   connection.query('Insert Into STUDENT(Sname,Student_ID) VALUES (?,?)',[row[3],row[2]], function(err, results) {
         if (err) {
           throw err;
        }
          console.log("資料已修改");
        });
       // setTimeout(function(){
  var str = req.file.originalname
  var text = str.split(" ")
  // var length = text[4].indexOf("_")
  // var text1 = text[4].substring(0,length)
  // console.log(text[2]);
  // console.log(text);
  var i = 3
  while(text[i] == ""){
    // console.log("------------")
    i++;
    var j = i
  }
  console.log(text[j]);
   connection.query('Insert Into SCOURSE(Student_ID,COURSE_ID) VALUES (?,?)',[row[2],text[j]], function(err, results) {
         if (err) {
           throw err;
        }

          console.log("資料已修改");
        });  
       //  },3500) 
     })    
    .on('end', function (data) {
        console.log('No more rows!');
    });   
                  res.render(__dirname + '/views/form1.ejs');
})

app.get("/form1", function(request, response) {
   var connection = mysql.createConnection({
      host     : '35.185.170.234',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
   connection.connect();
   console.log("connect");  
    connection.query('SELECT LoginStatus FROM LoginHTML WHERE User_ID = ?',[id], function(err, results) {
         if (err) {
           throw err;
        }
        data3.user = results
          response.render("form1",{data3:data3.user});
        });
  connection.end();  
}); 
app.get("/index", function(request, response,next) {
  response.render("index")
}); 
app.get("/index1", function(request, response) {
  response.render("index1");
});
app.post("/index2", function(request, response,next) {
  console.log(request.body.text)
  var course = request.body.text
  console.log("course:"+course)
  data1.user = course
   var connection = mysql.createConnection({
      host     : '35.221.225.212',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
  connection.connect();
  connection.query('SELECT TranscriptName FROM Transcript Where Course_ID = (SELECT Course_ID FROM COURSE Where CourseName = ?)',[course],function(err, results) {
         if (err) {
         }
          console.log("--------------------")
          console.log(results);
          data.user = results
          response.render("index2",{data:data.user,data1:data1.user})
        });
  connection.end();
    // setTimeout(function(){
    //   response.render("index2",{data:data.user,data1:data1.user})
    // },1100)
});
app.post("/update", function(request, response,next) {
  data1.user = request.body.text3;
  data2.user = request.body.text2;
  var connection = mysql.createConnection({
      host     : '35.221.225.212',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
  connection.connect();
  connection.query('Select Grade From Grade WHERE Student_ID = (select STUDENT.Student_ID from STUDENT where Sname = ?)',[request.body.text2],function(err, results) {
         if (err) {
         }
          console.log("--------------------")
          console.log(results);
          data.user = results
        });
  connection.query('UPDATE Grade SET Grade = ? WHERE Student_ID = (select STUDENT.Student_ID from STUDENT where Sname = ?)',[request.body.text3,request.body.text2],function(err, results) {
         if (err) {
         }
          console.log("--------------------")
          console.log(results);
          response.render("update",{data:data.user,data1:data1.user,data2:data2.user})
        });
  connection.end();
    // setTimeout(function(){
    //   response.render("update",{data:data.user,data1:data1.user,data2:data2.user})
    // },1100)
});

app.post("/index3", function(request, response) {
  test = request.body.test
  time = request.body.time
  classname = request.body.classname
  console.log(typeof(test))
  console.log(typeof(time))
  year = time.substring(0,time.search("-"))
  time = time.replace(year+"-","")
  time1 = time.replace("-","")
  console.log(test)
  console.log(time1)
  console.log(classname)
  time1 = time1+test+"成績";
    var connection = mysql.createConnection({
      host     : '35.221.225.212',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
   connection.connect();
   console.log("connect");
 connection.query('INSERT INTO Transcript (TranscriptTpye,TranscriptName,Course_ID) VALUES (?,?,(select Course_ID FROM COURSE Where CourseName = ?))',[test,time1,classname], function(err, results) {
          if (err) {
            throw err;
         }
         console.log("INSERT Table");
      });  
    connection.end();
  response.render("index3");
});
var data = {};
var status = ""

app.get("/index4", function(request, response,next) {

  response.render("index4")
});

app.post("/delete", function(request, response,next) {
  data1.user = request.body.text;
  var connection = mysql.createConnection({
      host     : '35.221.225.212',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
  connection.connect();
  connection.query('SELECT TranscriptName FROM Transcript Where Course_ID = (SELECT Course_ID FROM COURSE Where CourseName = ?)',[request.body.text],function(err, results) {
         if (err) {
         }
          console.log("--------------------")
          console.log(results);
          data.user = results
          response.render("delete",{data:data.user,data1:data1.user})
        });
    // setTimeout(function(){
    //   response.render("delete",{data:data.user,data1:data1.user})
    // },1100)
});

  app.post("/index5", function(request, response,next) {
    console.log("--------------------")
    console.log(request.body.text)
    console.log(request.body.transcript)
    console.log(request.body.text1)   
    var connection = mysql.createConnection({
      host     : '35.221.225.212',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
   connection.connect();
   console.log("connect");
   //SELECT TranscriptName FROM Transcript Where Course_ID = (SELECT Course_ID FROM COURSE Where CourseName = ?,data1:data1.user}
   connection.query('delete from Grade where Student_ID = (select Student_ID FROM STUDENT Where Sname = ?) and Transcript_ID = (select Transcript_ID from Transcript where TranscriptName = ?) ',[request.body.text1,request.body.transcript],function(err, results) {
         if (err) {
          console.log("DELETE fail");
         }
          console.log("--------------------")
          console.log("DELETE FINISH");
        });
  connection.end();
  response.render("index5")
});
app.get("/insert", function(request, response,next) {

     response.render("insert")
}); 
app.post("/insert1", function(request, response,next) {
      data1.user = request.body.text
  var connection = mysql.createConnection({
      host     : '35.221.225.212',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
  connection.connect();
  connection.query('SELECT TranscriptName FROM Transcript Where Course_ID = (SELECT Course_ID FROM COURSE Where CourseName = ?)',[request.body.text],function(err, results) {
         if (err) {
         }
          console.log("--------------------")
          console.log(results);
          data.user = results
          response.render("insert1",{data:data.user,data1:data1.user})
        });
  connection.end();
    //   setTimeout(function(){
    //   response.render("insert1",{data:data.user,data1:data1.user})
    // },1200)
}); 
   

  app.post("/insert2", function(request, response,next) {
    var day = new Date()
    today = day.getFullYear()+"-"+(day.getMonth()+1)+"-"+day.getDate()+" "+day.getHours()+":"+day.getMinutes()+":"+day.getSeconds()
    console.log("--------------------")
    console.log(today)
    var course = request.body.text
    var transcript = request.body.transcript
    var name = request.body.text2
    var grade = request.body.text3
    console.log(course)
    console.log(transcript)
    console.log(name)
    console.log(grade)

    var connection = mysql.createConnection({
      host     : '35.221.225.212',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
   connection.connect();
   console.log("connect");
   //SELECT TranscriptName FROM Transcript Where Course_ID = (SELECT Course_ID FROM COURSE Where CourseName = ?,data1:data1.user}
   connection.query('INSERT INTO Grade (Transcript_ID, Student_ID,Grade, Course_ID,GDATE) VALUES ((select Transcript_ID from Transcript where TranscriptName = ?),(select Student_ID from STUDENT where Sname = ?),?,(select Course_ID from COURSE where CourseName = ?),?);',[transcript,name,grade,course,today],function(err, results) {
         if (err) {
          data.user = false
         }
         else{
          data.user = true
          console.log("--------------------")
          console.log("INSERT FINISH");
          response.render("insert2",{data:data.user})
          }
        });
  connection.end();
  // setTimeout(function(){
  //     response.render("insert2",{data:data.user})
  //   },1100)
});

app.get("/select", function(request, response,next) {

     response.render("select")
}); 
app.post("/select2", function(request, response,next) {
  data1.user = request.body.text;
  var connection = mysql.createConnection({
      host     : '35.221.225.212',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
  connection.connect();
  connection.query('SELECT TranscriptName FROM Transcript Where Course_ID = (SELECT Course_ID FROM COURSE Where CourseName = ?)',[request.body.text],function(err, results) {
         if (err) {
         }
          console.log("--------------------")
          console.log(results);
          data.user = results
           response.render("select2",{data:data.user,data1:data1.user})
        });
  connection.end();
    //   setTimeout(function(){
    //   response.render("select2",{data:data.user,data1:data1.user})
    // },1200)
});

app.post("/select3", function(request, response,next) {
  var connection = mysql.createConnection({
      host     : '35.221.225.212',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
  connection.connect();
  connection.query('SELECT Student_ID,Grade FROM Grade Where Course_ID = (SELECT Course_ID FROM COURSE Where CourseName = ?) ',[request.body.text],function(err, results) {
         if (err) {
         }
          console.log("--------------------")
          console.log(results);
          data.user = results
          response.render("select3",{data:data.user})
        });
  connection.end();
    //   setTimeout(function(){
    //   response.render("select3",{data:data.user})
    // },1200)
}); 

 app.post("/update2", function(request, response,next) {
    console.log("update2")
    console.log(request)

    var connection = mysql.createConnection({
      host     : '35.221.225.212',
      user     : 'root',
      password : 'asdcpi14',
      database : 'line'
  });
  connection.connect();
  connection.query('Select Sname From STUDENT WHERE Student_ID = ?',[request.body.id0],function(err, results) {
         if (err) {
         }
          console.log("--------------------")
          console.log(results);
          data.user = results
            response.render("update2",{data:data.user,data1:request.body.grade})
        });
});

app.use(function(request, response) {
  response.status(404).render("404");
});

// http.createServer(app).listen(3000, function() {
//   console.log("Guestbook app started on port 3000.");
// });
app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening to ${process.env.PORT || 5000}...`);
});
