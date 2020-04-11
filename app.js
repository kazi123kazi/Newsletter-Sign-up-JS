const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res) {
   var first=req.body.fname;
   var last=req.body.lname;
   var email=req.body.email;
var data= {
  members: [
      {
          email_address : email,
          status : "subscribed",
          merge_fields :
          {
              FNAME:first,
              LNAME:last
          }
      }
        
    ]
};


var JsonData = JSON.stringify(data);

var option= {
    url:  'https://us19.api.mailchimp.com/3.0/lists/14cb2ccf25',
    method : "POST",
    headers : {
       "Authorization" : " Kazi 3becfdd82eaea0f008922d2617f71811-us19"
    },
    body:JsonData

} ;


request(option, function(error,response,body) {
    if(error) {
        res.sendFile(__dirname+"/failure.html");
    } else {
        if(response.statusCode===200) {
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }
       
    }
});

});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.post("/success",function(req,res){
    res.redirect("/");
})

app.set( 'port', ( process.env.PORT || 3000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });
// API KEY
// 3becfdd82eaea0f008922d2617f71811-us19
//3becfdd82eaea0f008922d2617f71811-us19

// List id
// 14cb2ccf25