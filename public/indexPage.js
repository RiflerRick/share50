


//------------------------------------------------------------JSON requests end here-----------------------------------------------------

document.body.onload=function(){

    /*webshims.setOptions('waitReady', false);
    webshims.setOptions('forms-ext', {types: 'date'});
    webshims.polyfill('forms forms-ext');*/


  // alert("hello");
  //this file will check for events on that day, so very simply it will send an ajax request to the server to fetch information whether
  //any event is on that day or not, if it is then the user should be able to post various photos, videos and the like into that day.
  var dateToday=new Date();//there is a class named Date in js that has getter functions to get the day, month and year
  var day=dateToday.getDate();
  var month=dateToday.getMonth()+1;//since jan is 0
  var year=dateToday.getFullYear();
  if(day<10) {
    day='0'+day;
}

if(month<10) {
    month='0'+month;
}

//-----------------------------------------------span generator--------------------------------------------------------------

function spanGenerator(pointer)
{
  var element=document.createElement("div");
  element.setAttribute("class","well well-sm");
  element.style.marginLeft="25px";
  element.style.width="750px";
  // element.appendChild(node);
  element.style.borderRadius="2px";
  pointer.appendChild(element);
}

//-----------------------------------------------------All JSON requests will go here----------------------------------------------
//---------------------parties and tours check requests----------------------
// Check browser support
if (typeof(Storage) === "undefined") {
    // Store
    // alert("great!!!your browser supports");

    // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    alert("Browser does not local storage");
}

// alert("tours:"+sessionStorage.getItem("tours")+", parties:"+sessionStorage.getItem("parties")+",hasRequests:"+sessionStorage.getItem("hasRequests")+",hasFriends:"+sessionStorage.getItem("hasFriends"));



// var tours,parties;
var url="dateSent?day="+day+"&month="+month+"&year="+year+"&reqPage=tours";
$.getJSON(url,function(data){
  sessionStorage.setItem("tours",data.tours);
// tours=data.tours;
});
// alert("tours:"+tours);
url="dateSent?day="+day+"&month="+month+"&year="+year+"&reqPage=party";
$.getJSON(url,function(data){
sessionStorage.setItem("parties",data.parties);
});
//-------------------check friend requests--------------------------------------
// var hasRequests;
url="checkFriendReq?uid="+document.getElementById("uid").innerHTML;//send uid also
$.getJSON(url,function(data){
  // alert("hasRequests returned straight from server:"+data.hasRequests);
  sessionStorage.setItem("hasRequests",data.hasRequests);
});
//-----------------------index content generator--------------------------------
url="indexRequest?uid="+document.getElementById("uid").innerHTML;//send uid also
// var hasFriends;
$.getJSON(url,function(data){
  // alert("hasFriends returned straight from server:"+data.hasFriends);
  sessionStorage.setItem("hasFriends",data.hasFriends);
});
// alert(sessionStorage.getItem("tours"));
/*tours=sessionStorage.getItem("tours");
parties=sessionStorage.getItem("parties");
hasFriends=sessionStorage.getItem("hasFriends");
hasRequests=sessionStorage.getItem("hasRequests");*/
// alert("hasRequests:"+sessionStorage.getItem("hasRequests"));
// alert("tours:"+sessionStorage.getItem("tours")+", parties:"+sessionStorage.getItem("parties")+",hasRequests:"+sessionStorage.getItem("hasRequests")+",hasFriends:"+sessionStorage.getItem("hasFriends"));

window.setTimeout(function(){//this may be required as a last resort.
//-----------------------------------------------------Party and Tour alerts--------------------------------------------------

//this code here will send the current date to the server and the server will check if it is an event day or not.
/*
If it is an event day then the yser will be able to upload photos for that day
the date will be sent in the form of an ajax request.
*/
// var page="tours";

  //so if the date is that of an event we make a few make a few changes to the navbar of the index page saying that the person has got
  //n number of events on that day.
  // while(sessionStorage.getItem("tours")==null||sessionStorage.getItem("parties")==null||sessionStorage.getItem("hasRequests")==null||sessionStorage.getItem("hasFriends")==null){alert("null");};


  if(sessionStorage.getItem("tours")>0)//data.tours will indicate the number of tours that the person is having
  {
    //this means there is an event today
    document.getElementById("tourAlert").style.visibility="visible";
    $('#tourAlert').innerHTML="Looks like you have "+sessionStorage.getItem("tours")+ "tours"
    var element=document.createElement("button");
    element.setAttribute("class","btn btn-primary")
    element.setAttribute("href","updateTour");
    var text=document.createTextNode("Update Tour");
    element.appendChild(text);
    $('#tourAlert').appendChild(element);
  }
// page="party";
  if(sessionStorage.getItem("parties")>0)
  {
    document.getElementById("partyAlert").style.visibility="visible";
    $('#partytAlert').innerHTML="Looks like you have "+sessionStorage.getItem("parties")+ "parties"
    var element=document.createElement("button");
    element.setAttribute("class","btn btn-primary")
    element.setAttribute("href","updateParty");
    var text=document.createTextNode("Update party");
    element.appendChild(text);
    $('#partyAlert').appendChild(element);
  }

//--------------------------------------------------friend request---------------------------------------------------------------

// alert("tours:"+sessionStorage.getItem("tours")+", parties:"+sessionStorage.getItem("parties")+",hasRequests:"+sessionStorage.getItem("hasRequests")+",hasFriends:"+sessionStorage.getItem("hasFriends"));


  if(sessionStorage.getItem("hasRequests")>0)
  {
    // alert("hello hasRequests seems greater than 0");

    var textNode="You have "+sessionStorage.getItem("hasRequests")+" friend request/s.";
    var element=document.createElement("span");
    var node=document.createTextNode(textNode);
    element.style.marginLeft="250px";
    element.setAttribute("class","alert alert-info");
    element.appendChild(node);


    var buttonElement=document.createElement("a");
    node=document.createTextNode("Check out!!!");
    buttonElement.setAttribute("role","button");
    buttonElement.setAttribute("class","btn btn-primary");
    buttonElement.setAttribute("id","checkingFriendReq");
    // if($("#uid")==null){alert("oh its null");}
    var buttonElementhref="friendRequestPage?uid="+document.getElementById("uid").innerHTML;//this is the uid of the current user
    buttonElement.setAttribute("href",buttonElementhref);
    buttonElement.appendChild(node);

    element.appendChild(buttonElement);
    document.getElementById("dynComponent").appendChild(element);

  }





// --------------------------------------------------Index Content Generator-------------------------------------------------------
// alert("tours:"+sessionStorage.getItem("tours")+", parties:"+sessionStorage.getItem("parties")+",hasRequests:"+sessionStorage.getItem("hasRequests")+",hasFriends:"+sessionStorage.getItem("hasFriends"));


  if(sessionStorage.getItem("hasFriends")==0)
      {

        // document.getElementById("wellContent").innerHTML="<h1>Its time to make some friends!!!</h1>";
        // alert("hasFriends:"+sessionStorage.getItem("hasFriends"));

        spanGenerator(document.getElementById("dynComponent"));//add a span to the parent element

        /*var element=document.createElement("div");
        element.setAttribute("class","well");
        // element.appendChild(node);
        element.style.borderRadius="2px";
        document.getElementById("dynComponent").appendChild(element);*/


        var element=document.createElement("div");
        element.setAttribute("class","well")
        // element.style.position="relative";
        element.style.marginLeft="25px";
        element.style.width="750px";
        element.setAttribute("id","wellContent");
        element.appendChild(document.createTextNode("Its time to make some friends"));
        document.getElementById("dynComponent").appendChild(element);

        element=document.createElement("a");
        element.setAttribute("role","button");
        element.setAttribute("class","btn btn-primary");
        var text=document.createTextNode("Make some friends");
        element.appendChild(text);
        element.setAttribute("href","#");
        document.getElementById("wellContent").appendChild(element);
      }

// ------------------------------------------------------Search Friends------------------------------------------------------
var url;
var element;
var node,friend,val,newElement,newButton,buttonNode;

document.getElementById("searchFriends").onkeyup=function(){
  //everytime the user presses a key an event is triggeered



  if(document.getElementById("searchFriends").value!="")
  {
    // alert("friendList created");
    document.getElementById("friendList").style.visibility="visible";
    document.getElementById("friendRequest").style.visibility="visible";
      $(".friendOptions").remove();
  }
  else {
    element=document.getElementById("friendList");
    element.style.visibility="hidden";
    document.getElementById("friendRequest").style.visibility="hidden";
  }
  var value=document.getElementById("searchFriends").value;
  url="searchFriends?friend="+value+"&uid="+document.getElementById("uid").innerHTML;
  $.getJSON(url,function(data){
    var num=data.num;
    if(num>0)
    {

        for(var key in data)
        {

          if(key!="num")
          {
            if(key.substring(0,3)=="uid")
            {
              value=data[key];
              element.setAttribute("value",value);
            }
            else
            {
              element=document.createElement("option");
              element.setAttribute("class","friendOptions");
              friend=data[key];
              node=document.createTextNode(friend);
              element.appendChild(node);
              document.getElementById("friendList").appendChild(element);
            }
          }
        }
    }
    else {
      element=document.getElementById("friendList");
      element.style.visibility="hidden";
      document.getElementById("friendRequest").style.visibility="hidden";
    }
  });
};
document.getElementById("searchFriends").onkeydown=function(){
  $(".friendOptions").remove();
};



  sessionStorage.removeItem("tours");
  sessionStorage.removeItem("parties");
  sessionStorage.removeItem("hasRequests");
  sessionStorage.removeItem("hasFriends");
  // sessionStorage.setItem("");

},1000);

document.getElementById("friendRequestForm").onsubmit=function(){alert("friend request form submitted")};



};

/*document.getElementById("checkingFriendReq").onclick=function(){
};*/
