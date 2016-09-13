document.body.onload=function(){
  //-----------------since the user has actually clicked here it means we are about to show the user all the friend requests that
  //he/she has remaining
  var url="showFriendRequests?uid="+document.getElementById("uid").innerHTML;
  var element,elementBody,nameNode,emailNode,buttonElement,elementHeader;
  var name,email;
  var hrefProp,idVal;
  var i=0;
  $.getJSON(url,function(data){
    //the data will contain a friend list with names and emailAddresss
    if(data["name0"]!=null){
      // alert("name 0 is not null");

    for (var key in data)
    {

      if(key.substring(0,4)=="name")
      {
        name=data[key];


      }
      else {
        email=data[key];
        element=document.createElement("div");
        element.setAttribute("class","panel panel-default");
        elementHeader=document.createElement("div");
        elementHeader.setAttribute("class","panel-heading");
        elementBody=document.createElement("div");
        elementBody.setAttribute("class","panel-body");
        elementBody.setAttribute("id","panelBody");
        // nameNode=document.createTextNode("<h2>"+name+"</h2><br><h4>"+email+"</h4>");
        nameNode=document.createTextNode(name);
        // elementBody.innerHTML="<h2>"+name+"</h2><br><h4>"+email+"</h4>";
        elementHeader.appendChild(nameNode);
        elementHeader.style.fontSize="14pt";
        emailNode=document.createTextNode(email);
        elementBody.appendChild(emailNode);
        elementBody.style.fontSize="8pt";
        // document.getElementById("panelBody").innerHTML="<h2>"+name+"</h2><br><h4>"+email+"</h4>";
        buttonElement=document.createElement("a");
        buttonElement.setAttribute("role","button");
        buttonElement.setAttribute("class","btn btn-primary");
        buttonElement.setAttribute("onclick","reloadPage()")
        hrefProp="acceptFriendRequest?email="+email+"&uid="+document.getElementById("uid").innerHTML;
        // alert("hrefProp is:"hrefProp);
        buttonElement.setAttribute("href",hrefProp);
        idVal="id"+i.toString();
        buttonElement.setAttribute("id",idVal);
        // buttonElement.setAttribute("class","acceptFriendRequestButton");
        buttonElement.style.float="right";
        // buttonElement.style.marginRight="50px";
        nameNode=document.createTextNode("Accept");
        element.appendChild(elementHeader);
        buttonElement.appendChild(nameNode);
        elementBody.appendChild(buttonElement);
        element.appendChild(elementBody);
        document.getElementById("wellContent").appendChild(element);


      }
      i++;
    }
  }
  else {
    element=document.createElement("div");
    element.setAttribute("class","panel panel-default");
    // elementHeader=document.createElement("div");
    // elementHeader.setAttribute("class","panel-heading");
    elementBody=document.createElement("div");
    elementBody.setAttribute("class","panel-body");
    // elementBody.setAttribute("id","panelBody");
    nameNode=document.createTextNode("No more friend requests!!!");
    elementBody.appendChild(nameNode);
    element.appendChild(elementBody);
    document.getElementById("wellContent").appendChild(element);


  }
  });

};
/*function reloadPage()
{
  // alert("hey reloading page");
  location.reload(true);//reloads the page.
}*/
