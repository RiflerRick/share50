/*
This is the controller that actually has the entry point code of project.In any express application, there are basically three main files in the
directory, the first one is called the app.js which contains the code for the entry point(routing and so on) of the application and project, the node
modules sub dir which contains the modules for express and any other modules that we have installed using npm for instance and package.json
package.json is a file that contains the dependencies. When you install express using npm package.json is not created. We need to create package.json
file (see documentation of node for that) automatically or manually. After this if we delete node modules dir, we can simply install express by command
'node install' and using the package.json file it is gonna install express and create node modules directory for us again.

The package.json file can be created using the command 'npm init' in our node command line.
*/
var express=require('express');//includes express module.
var path=require('path');//includes path modules
var helper=require('helper.js');//custom directory for a few helper functions.
var chalk=require('chalk');
// var session=require('express-session');//this is actually for the session storage for the user.
var session=require('express-session');//this is using the mozilla library or module called express-sessions.
var mysql=require('mysql');
var escape=require('html-escape');//this is just for escaping special characters.
var passHash=require('password-hash');//this module will be required for hashing the password into the table.
var bodyParser=require('body-parser');//for handling post requests we need to use body parser.

var app=express();//making an instance of express module and we can call various functions from within express using app.<function name>
var server=app.listen(1337,function(){
  console.log("listening at port 1337");
});//listening at port 1337

var connection=mysql.createConnection({
  host:'localhost',
  user:'riflerRick',
  password:'share50_123',
  database:'share50'
});

connection.connect(function(err){
  if(err)
  {
    console.error('error connecting to the database: '+err.stack);
    //this will also show the error.
  }

  else {
      console.log("connection established successfully");
  }
});
/*
This is the database integration part of the application.
host is by default localhost, username and password must match with those running on the server and database must be defined.
port number for mysql server is set by default 3306 which is also the default port number set by this library.
*/

app.set('view engine','ejs');//this is for a plugin support for express.there are various technologies that we can plugin into our application
/*
A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a
template file with actual values,and transforms the template into an HTML file sent to the client.
This approach makes it easier to design an HTML page.

The use of this is similar to the concept of rendering views.
we can do app.set('view engine','pug');//pug is a template engine for express.
we can now write our render function in the following way:
app.get('/',function(req,res){res.render('index',{title:'Hey',message:'Hello there!!!'})});

Now inside the index.pug file we can simply use title and message as variables and it will be replaced with their corresponding values rendered
with the render function in the controller.
*/

//our code here is setting the view engine or template engine to 'ejs'


app.use(express.static(path.join(__dirname,'public')));//middleware


//app.use(app.Router);//here this simply means that we are using routes.
//app.use(cookieParser());

/*
Middleware is just code that you inject into the request-response lifecyle of our application.
It just means that you are telling the server to do something in between when the request is sent by the client and the reponse is
generated by the server.
*/

/*
In our code this tells us that if we have a static request that comes in then go ahead and assume it lives in the public directory.
Here static content simply means images, css, js that are directly being used by the views or web pages.
*/

//another middleware. This time its about sessions...
app.use(session({
  cookieName:'session',
  secret:'myShare50WorldBeatsOnThisLineDoNotTamper',
  duration:30*60*1000,
  activeDuration:5*60*1000
}));



//this is the middleware that sets up cookies for the user(client side).
/*
genid it is a new generated session id
cookieName is the name given to every cookie.
secret is a string that is used to encrypt the cookie. meanwhile the library internally will encrypt and decrypt the secret so that the
cookie remains safe in the user's browser.
the duration is the time(in ms) that the cookie will remain active
activeDuration is the time(in ms) that the cookie will remain active after the the user has clicked has reloaded the page.
*/

app.use(bodyParser());
/*
This is the middleware that will be required for the purpose of form handling and post request handling.
*/




app.get('/',function(req,res){
  /*console.log('Cookies:',req.cookies);
  now this is important here because if we get a session that had been set already then we must redirect the user to the index page
  and not the landing page.
  If however the session data does not exist we can redirect the user to the landing page.
  */
  var userId;
  if(req.session&&req.session.email)//this simply checks if the session exists...
  {
    console.log(chalk.blue("/ GET:session found"));//DEBUG

    //so we need to pass both the email and the id to index the user
    connection.query("SELECT * FROM users WHERE email=?",[req.session.email],function(err, results,fields){
      userId=results[0].uid;
    });
    var param={};
    param["email"]=req.session.email;
    param["uid"]=userId;
    helper.renderPage(res,connection,'index',param);
    console.log(chalk.blue("/ GET:index page rendered..."));
  }
  else
  {
    console.log(chalk.blue("/ GET:no session found"));//DEBUG
    console.log(chalk.blue("/ GET:landing page being rendered"));
    res.render('landing');
  }
});

app.get('/emailCheck',function(req,res){
  //this function is for ajax checking whether the email that was entered by the user actually exists
  var jsonRes;
  console.log(chalk.blue("/emailCheck GET:ajax emailCheck request made."));//DEBUG
  var email=req.query.email;

      connection.query('SELECT * FROM users WHERE email=?',[email],function(err,results,fields){
        if(Object.keys(results).length>0){
          //turns out that results is an object that has key value pairs here.
          
          res.send(JSON.stringify({emailFound:1}));//send a json response
          console.log(chalk.green("/emailCheck GET:email found"));//DEBUG
        }
          else {

            console.log(chalk.green("/emailCheck GET:no emails found"));//DEBUG
            res.send(JSON.stringify({emailFound:0}));//send a json response

          }

      });


});

/*function renderPage(res,pageName,param)//in js we do not need to give data type of formal parameters in functions
{
  res.render('header',{page:pageName});
  return;
}*/

app.post('/signIn',function(req,res){
  //now if the user signs in successfully then we need to check from the database whether the user exists or not...
  console.log(chalk.blue("/signIn POST:sign in request made"));//DEBUG
  var userId;
  if(req.session && req.session.email)
  {
    console.log(chalk.blue("/signIn POST:session exists"));//DEBUG
    connection.query("SELECT * FROM users WHERE email=?",[req.session.email],function(err, results,fields){
      userId=results[0].uid;
    });
    var param={};
    param["email"]=req.session.email;
    param["uid"]=userId;
    helper.renderPage(res,connection,'index',param);
  }
  else {
    console.log(chalk.blue("/signIn POST:session does not exist"));//DEBUG
    email=escape(req.body.email);
    password=escape(req.body.password);
    connection.query("SELECT * FROM users WHERE email=?",[email],function(err,results,fields){
      if(err)
      {
        console.log(chalk.red("/signIn POST:could not run query:"+err.stack));//DEBUG
      }
      else {
        console.log(chalk.green("/signIn POST:query successful"));//DEBUG
        if(passHash.verify(password,results[0].password))
        {
          //start a session and render index page
          console.log(chalk.green("/signIn POST:login successful, session started"));//DEBUG
          req.session.email=email;
          var param={};
          param["email"]=email;
          param["uid"]=results[0].uid;
          helper.renderPage(res,connection,'index',param);
        }
        else {
          console.log(chalk.red("/signIn POST:login unsuccessful, rendered loginError page"));//DEBUG
          render('loginError');//render a page called log in error
        }
      }
    });
  }

});



app.post('/signUp',function(req,res){

  console.log("/signUp POST:sign up request made");
  var userId;
  if(req.session&&req.session.email)//if session exits.
  {
    console.log(chalk.red("/signUp POST:session found"));//DEBUG
    connection.query("SELECT * FROM users WHERE email=?",[req.session.email],function(err, results,fields){
      userId=results[0].uid;
    });
    var param={};
    param["email"]=req.session.email;
    param["uid"]=userId;
    helper.renderPage(res,connection,'index',param);
    console.log(chalk.red("/signUp POST:index page rendered"));//DEBUG
  }
  else {
    //error checking
    console.log(chalk.green("/signUp POST:signUp post request made"));//DEBUG
  }

  //if the user signs up, we need to make sure that he has registered...
  //connection to the database will be made here and we will register the user...

        // console.log("connection established successfully");
        var firstName=escape(req.body.firstName);
        var lastName=escape(req.body.lastName);
        var name=firstName+" "+lastName;
        var email=escape(req.body.email);

        var date=req.body.date;
        // console.log('date:'+date);
        var month=req.body.month;
        // console.log('month:'+month);
        var year=req.body.year;

        var dob=year.toString()+"-"+month.toString()+"-"+date.toString();
        //from reading the documentation of mysql i know that date accpets yyyy-mm-dd as a string
        var gender=req.body.gender;
        var password;
        var rawPass=req.body.checkPass;
        // console.log("email is: "+email);
        // console.log("dob: "+dob);
        // console.log("password given by user: "+rawPass);
        password=passHash.generate(rawPass);
        connection.query('INSERT INTO users (name,email,dob,gender,password) VALUES (?,?,?,?,?)',[name,email,dob,gender,password],function(err,results,fields){
          var id;
          connection.query('SELECT * FROM users WHERE email=?',[email],function(err,results,fields){
            id=results[0].uid;//getting the id of the user and setting the user accordingly...
            console.log(chalk.blue("/signUp POST:user id retrieved from db:"+id));//DEBUG
          });
          //results will contain the results of the query.
          //fields will contain the information about the returned results.
          if(err)
          {
            console.log(chalk.red("/signUp POST:could not insert into database",err.stack));//DEBUG
          }
          else {

              console.log(chalk.green("/signUp POST:successfully inserted into database"));//DEBUG
              //after we get the details inside the database we need to start a session and redirect the user to the index.ejs view.
              req.session.email=email;
              console.log(chalk.green("/signUp POST:successfully added sessions and started it."));//DEBUG
              var param={};
              param["email"]=email;
              param["uid"]=id;
              helper.renderPage(res,connection,'index',param);//this function defined in helper.js actually will be used for rendering the index page
              //of the user with the account email.
              // res.render('index');

          }
        });
        //for info on queries follow:https://github.com/mysqljs/mysql#performing-queries*/


});



app.get('/logout',function(req,res){
  if(req.session&&req.session.email)
  {
    console.log(chalk.blue("/logout GET:session was found with user:"+req.session.email));//DEBUG
    req.session.destroy(function(err){//used for destroying sessions...
      if(err){
        console.log(chalk.red("/logout GET:could not destroy the session"));//DEBUG
        res.render('landing');
      }
      else {
        console.log(chalk.green("/logout GET:session was destroyed"));//DEBUG
        res.render('landing');
      }
    });
  }
  else {
    console.log(chalk.red("/logout GET:session was not found"));//DEBUG
    res.render('landing');
  }
});



/*
Another important idea here is the use of sessions and how to store them effectively...
follow:https://expressjs.com/en/resources/middleware.html
*/
