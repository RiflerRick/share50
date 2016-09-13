document.body.onload=function(){
  // alert("helloworld");
  var url="friendList";
  $.getJSON(url,function(data){
    //so this will finally give us the list of all our friends that we would like to invite
    //if there are no friends in the list then obviously we will say that there were no friends to invite
    if(data["elements"]==0)
    {
      var element=document.createElement("div");
      element.setAttribute("class","alert alert-info");
      var node=document.createTextNode("Seems you are yet to make friends, you may however enjoy alone!!!")
      var elementButton=document.createElement("a");
      elementButton.setAttribute("role","button");
      elementButton.setAttribute("class","btn btn-warning");
      elementButton.setAttribute("onclick","goBack()");
      elementButton.style.display="block";
      elementButton.style.margin="auto";
      elementButton.style.width="300px";
      var buttonNode=document.createTextNode("Create Party");
      elementButton.appendChild(buttonNode);
      element.appendChild(node);
      element.appendChild(elementButton);
      document.getElementById("content").appendChild(element);

    }
    else {
      var element=document.createElement("div");
      // element.setAttribute("class","alert alert-info");
      // var node=document.createTextNode("Seems you are yet to make friends, you may however enjoy alone!!!")

      var panels,panelHeader,panelBody,nodeHeader,nodeBody,panelButton,panelButtonNode,hrefValue;
      for (var key in data)
      {


        if(key.substring(0,4).localeCompare("name")==0)
        {
          // alert("name is :"+data[key]);
          panels=document.createElement("div");
          panels.setAttribute("class","panel panel-default");
          panelHeader=document.createElement("div");
          panelHeader.setAttribute("class","panel-heading");
          panelHeader.style.fontSize="15pt";
          panelBody=document.createElement("div");
          panelBody.style.fontSize="8pt";
          panelBody.setAttribute("class","panel-body");
          nodeHeader=document.createTextNode(data[key]);
        }
        else if(key.substring(0,5).localeCompare("email")==0)
        {
          // alert("email is"+data[key]);
          nodeBody=document.createTextNode(data[key]);
          panelButton=document.createElement("a");
          panelButton.setAttribute("role","button");
          panelButton.setAttribute("class","btn btn-primary");
          panelButton.setAttribute("onclick","hide()");
          hrefValue="sendInvitation?email="+data[key];
          panelButton.setAttribute("href",hrefValue);
          panelButton.style.float="right";
          // panelButton.style.position="absolute";
          panelButtonNode=document.createTextNode("Invite");
          panelButton.appendChild(panelButtonNode);

          panelHeader.appendChild(nodeHeader);
          panelBody.appendChild(nodeBody);
          panels.appendChild(panelHeader);
          panels.appendChild(panelBody);
          panelBody.appendChild(panelButton);
          element.appendChild(panels);
        }



      }
      var button=document.createElement("a");
      button.setAttribute("role","button");
      button.setAttribute("class","btn btn-primary");
      button.setAttribute("href","createParty");
      button.style.display="block";
      button.style.width="300px";
      button.style.margin="auto";
      var buttonNode=document.createTextNode("Create Party");
      button.appendChild(buttonNode);
      document.getElementById("outerContent").appendChild(button);
      document.getElementById("content").appendChild(element);
    }
  });
};
function goBack()
{
  window.history.back();
}
