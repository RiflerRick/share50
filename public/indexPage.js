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

//this code here will send the current date to the server and the server will check if it is an event day or not.
/*
If it is an event day then the yser will be able to upload photos for that day
the date will be sent in the form of an ajax request.
*/
var url="dateSent?page=tours,day="+day+",month="+month+",year="+year;
$.getJSON(url,function(data){
  //so if the date is that of an event we make a few make a few changes to the navbar of the index page saying that the person has got
  //n number of events on that day.
  if(data.tours>0)//data.tours will indicate the number of tours that the person is having
  {
    //this means there is an event today
    document.getElementById("tourAlert").style.visibility=true;
    $('#tourAlert').innerHTML="Looks like you have "+data.tours+ "tours"
    var element=document.createElement("button");
    element.setAttribute("class","btn btn-primary")
    element.setAttribute("href","updateTour");
    var text=document.createTextNode("Update Tour");
    element.appendChild(text);
    $('#tourAlert').appendChild(element);
  }
});
var url="dateSent?page=parties,day="+day+",month="+month+",year="+year;
$.getJSON(url,function(data){
  if(data.parties>0)
  {
    document.getElementById("partyAlert").style.visibility=true;
    $('#partytAlert').innerHTML="Looks like you have "+data.parties+ "parties"
    var element=document.createElement("button");
    element.setAttribute("class","btn btn-primary")
    element.setAttribute("href","updateParty");
    var text=document.createTextNode("Update party");
    element.appendChild(text);
    $('#partyAlert').appendChild(element);
  }
  });

// --------------------------------------------------Index Content Generator-------------------------------------------------------

  var hasFriends;
    // alert("hello:"+document.getElementById("contentIsFilled").value);
    var url="indexRequest";//this is the first request to see if i have any friends or not
    //if i do then comes the next set of requests.
    $.getJSON(url,function(data){
      // if(data.hasFriends>0)
      hasFriends=data.hasFriends;
    });

    if(hasFriends==0)
    {
      document.getElementById("wellContent").innerHTML="<h1>Its time to make some friends!!!</h1>";
      var element=document.createElement("a");
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


};
