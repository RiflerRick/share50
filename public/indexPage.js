


//------------------------------------------------------------JSON requests end here-----------------------------------------------------

document.body.onload=function(){
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
if (typeof(Storage) !== "undefined") {
    // Store
    // alert("great!!!your browser supports");
    } else {
    // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    alert("Browser does not local storage");
}


var tours,parties;
var url="dateSent?day="+day+"&month="+month+"&year="+year+"&reqPage=tours";
$.getJSON(url,function(data){
  localStorage.setItem("tours",data.tours);
// tours=data.tours;
});
// alert("tours:"+tours);
url="dateSent?day="+day+"&month="+month+"&year="+year+"&reqPage=party";
$.getJSON(url,function(data){
localStorage.setItem("parties",data.parties);
});
//-------------------check friend requests--------------------------------------
var hasRequests;
url="checkFriendReq";
$.getJSON(url,function(data){
  localStorage.setItem("hasRequests",data.hasRequests);
});
//-----------------------index content generator--------------------------------
url="indexRequest";
var hasFriends;
$.getJSON(url,function(data){
  localStorage.setItem("hasFriends",data.hasFriends);
});
// alert(localStorage.getItem("tours"));
tours=localStorage.getItem("tours");
parties=localStorage.getItem("parties");
hasFriends=localStorage.getItem("hasFriends");
hasRequests=localStorage.getItem("hasRequests");
//-----------------------------------------------------Party and Tour alerts--------------------------------------------------

//this code here will send the current date to the server and the server will check if it is an event day or not.
/*
If it is an event day then the yser will be able to upload photos for that day
the date will be sent in the form of an ajax request.
*/
// var page="tours";

  //so if the date is that of an event we make a few make a few changes to the navbar of the index page saying that the person has got
  //n number of events on that day.
  if(tours>0)//data.tours will indicate the number of tours that the person is having
  {
    //this means there is an event today
    document.getElementById("tourAlert").style.visibility="visible";
    $('#tourAlert').innerHTML="Looks like you have "+tours+ "tours"
    var element=document.createElement("button");
    element.setAttribute("class","btn btn-primary")
    element.setAttribute("href","updateTour");
    var text=document.createTextNode("Update Tour");
    element.appendChild(text);
    $('#tourAlert').appendChild(element);
  }
// page="party";
  if(parties>0)
  {
    document.getElementById("partyAlert").style.visibility="visible";
    $('#partytAlert').innerHTML="Looks like you have "+parties+ "parties"
    var element=document.createElement("button");
    element.setAttribute("class","btn btn-primary")
    element.setAttribute("href","updateParty");
    var text=document.createTextNode("Update party");
    element.appendChild(text);
    $('#partyAlert').appendChild(element);
  }

//--------------------------------------------------friend request---------------------------------------------------------------

  if(hasRequests>0)
  {
    // alert("hello");

    var textNode="You have "+hasRequests+" friend request/s.";
    var element=document.createElement("span");
    var node=document.createTextNode(textNode);
    element.style.marginLeft="250px";
    element.setAttribute("class","alert alert-info");
    element.appendChild(node);


    var buttonElement=document.createElement("button");
    node=document.createTextNode("Check out!!!");
    buttonElement.setAttribute("class","btn btn-primary");
    buttonElement.setAttribute("href","friendRequestPage");
    buttonElement.appendChild(node);

    element.appendChild(buttonElement);
    document.getElementById("dynComponent").appendChild(element);

  }





// --------------------------------------------------Index Content Generator-------------------------------------------------------

  if(hasFriends==0)
      {

        // document.getElementById("wellContent").innerHTML="<h1>Its time to make some friends!!!</h1>";

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
      else {
        //if the content is not zero we need to be able to do a few things
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
      element=document.getElementById("friendList");
      element.style.visibility="visible";
      document.getElementById("friendRequest").style.visibility="visible";

      $(".friendOptions").remove();
  }
  else {
    // alert("value is now null");
    element=document.getElementById("friendList");
    element.style.visibility="hidden";

      document.getElementById("friendRequest").style.visibility="hidden";
  }


  /*var element=document.createElement("select");
  element.setAttribute("id","friendList");
  element.setAttribute("class","form-control");
  document.getElementById("searchFriends").appendChild(element);*/


  var value=document.getElementById("searchFriends").value;
  // alert("value:"+value);
  url="searchFriends?friend="+value;
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

              // alert("key is:"+key+",friend is:"+friend);
              node=document.createTextNode(friend);
              element.appendChild(node);
              document.getElementById("friendList").appendChild(element);
            }


          }
        }


    }
    else {
      /*element=document.createElement("option");
      element.setAttribute("class","friendOptions");
      element.setAttribute("name","No Results");
      node=document.createTextNode("No Results");
      element.appendChild(node);
      document.getElementById("friendList").appendChild(element);*/
      element=document.getElementById("friendList");
      element.style.visibility="hidden";
      document.getElementById("friendRequest").style.visibility="hidden";
    }
  });
};
document.getElementById("searchFriends").onkeydown=function(){
  // var dup;
  $(".friendOptions").remove();
  /*$(".friendOptions").each(function(){
    dup=$(this).value;
    $(".friendOptions").each(function(){
      if($(this).value==dup)
      $(this).remove();
    });
  });*/
};



};
