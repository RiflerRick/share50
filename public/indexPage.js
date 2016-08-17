var fName=document.getElementById("firstName");
var lName=document.getElementById("lastName");
var email=document.getElementById("emailAddress");
var pass=document.getElementById("password");

document.getElementById("signUpLink").onclick=function(){
  //lamda function style of js
  //alert("sign up link clicked...");error checking...
  var i=1;
  while(i<=31)
  {
      var sel=document.createElement("option");
      sel.value=i;
      sel.innerHTML=i;
      //document.getElementById("<id of the element we wanna attach to...>")
      document.getElementById("selDate").appendChild(sel);
      i++;
  }
  i=1940;
  var d=new Date();//creating a date object...
  while (i<=d.getFullYear())
  {
    sel=document.createElement("option");
    sel.value=i;
    sel.innerHTML=i;
    document.getElementById("selYear").appendChild(sel);
    i++;
  }


  /*fName.setAttribute("data-toggle","tooltip");
  fName.setAttribute("data-placement","right");
  lName.setAttribute("data-toggle","tooltip");
  lName.setAttribute("data-placement","right");
  email.setAttribute("data-toggle","tooltip");
  email.setAttribute("data-placement","right");
  pass.setAttribute("data-toggle","tooltip");
  pass.setAttribute("data-placement","right");*/
  return false;
};

function attrSet(element)
{
  element.setAttribute("data-toggle","tooltip");
  element.setAttribute("data-placement","right");
}
function attrRem(element)
{
  element.removeAttribute("data-toggle");
  element.removeAttribute("data-placement");
  element.removeAttribute("title");
}


/*function test()
{
  alert("hello");
}*/
/*function dobGen()
{
  var i=1;
  while(i<=31)
  {
      var sel=document.createElement("option");
      sel.value=i;
      sel.innerHTML=i;
      //document.getElementById("<id of the element we wanna attach to...>")
      document.getElementById("selDate").appendChild(sel);
      i++;
  }
  i=1940;
  var d=new Date();//creating a date object...
  while (i<=d.getFullYear())
  {
    sel=document.createElement("option");
    sel.value=i;
    sel.innerHTML=i;
    document.getElementById("selYear").appendChild(sel);
    i++;
  }


// }*/
var firstNameCheck=0;//check variables that are set to 1 if the user has cooperated...
var lastNameCheck=0;
var emailCheck=0;
var passCheck=0;
document.getElementById("firstName").onblur=function(){//event triggered when the cursor is away from the field...
  if(document.getElementById("firstName").value=="")
  {//no name given...
    attrSet(fName);
    fName.setAttribute("title","name cannot be left blank");
    $("#firstName").tooltip("show");//jquery code for getting an element...
  }
  else if(fName.value.search(/^[a-z ]+$/)==-1)//the guy has entered anything but a name...
  {
    attrSet(fName);
    fName.setAttribute("title","Invalid name");
    $("#firstName").tooltip("show");
  }
  else {
    firstNameCheck=1;
  }
  return false;
};

document.getElementById("lastName").onblur=function(){//event triggered when the cursor is away from the field...
  if(document.getElementById("lastName").value=="")
  {//no name given...
    attrSet(lName);
    lName.setAttribute("title","name cannot be left blank");
    $("#lastName").tooltip("show");
  }
  else if(lName.value.search(/^[a-z ]+$/)==-1)//the guy has entered anything but a name...
  {
    attrSet(lName);
    lName.setAttribute("title","Invalid name");
    $("#lastName").tooltip("show");
  }
  else {
    lastNameCheck=1;
  }
  return false;
};

document.getElementById("emailAddress").onblur=function(){//event triggered when the cursor is away from the field...
  if(document.getElementById("emailAddress").value=="")
  {//no name given...
    attrSet(email);
    email.setAttribute("title","email address cannot be left blank");
    $("#emailAddress").tooltip("show");
  }
  else if(email.value.search(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)==-1)//the guy has entered anything but a name...
  {
    attrSet(email);
    email.setAttribute("title","Invalid email address");
    $("#emailAddress").tooltip("show");
  }
  else {
    emailCheck=1;
  }
  return false;

};


document.getElementById("password").onblur=function(){//event triggered when the cursor is away from the field...
  if(document.getElementById("password").value=="")
  {//no password given...
    attrSet(pass);
    pass.setAttribute("title","password cannot be left blank");
    $("#password").tooltip("show");
  }

  else {
    passCheck=1;
  }
  return false;
};

fName.onfocus=function(){//if the cursor is actually brought to focus or very simply i am bringing the cursor in the field...
  //attrRem(fName);
  attrRem(fName);
  $("#firstName").tooltip("hide");
  $("#firstName").tooltip("destroy");

  return false;
};

lName.onfocus=function(){
  //attrRem(lName);
  attrRem(lName);
  $("#lastName").tooltip("hide");
  $("#lastName").tooltip("destroy");

  return false;
};

email.onfocus=function(){
  //attrRem(email);
  attrRem(email);
  $("#emailAddress").tooltip("hide");
  $("#emailAddress").tooltip("destroy");

  return false;
};

pass.onfocus=function(){
  //attrRem(pass);
  attrRem(pass);
  $("#password").tooltip("hide");
  $("#password").tooltip("destroy");

  return false;
};

document.getElementById("signUpButton").onclick=function(){
  if (firstNameCheck==1&&lastNameCheck==1&&emailCheck==1&&passCheck==1)
  {
    document.getElementById("signUpForm").submit();//submits the form...
  }

  return false;
};
