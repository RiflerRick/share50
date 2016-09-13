var validDOL=0;
var validDOR=0;

document.body.onload=function(){
  // alert("helloworld");
var dorPointer,dolPointer,para,node;
  //----------------------------------------------alert for dor---------------------------------------------------
  dorPointer=document.getElementById("return");
  para=document.createElement("div");
  para.setAttribute("class","alert alert-danger");
  para.setAttribute("role","alert");
  para.setAttribute("id","dorAlert");
  para.style.display="none";
  node=document.createTextNode("Seems you were not careful with this date");
  para.appendChild(node);
  dorPointer.appendChild(para);
//-----------------------------------------------alert for dol------------------------------------------------------------

  dolPointer=document.getElementById("journey");
  //add a para saying that you have enetered an invalid date of leaving
  para=document.createElement("div");
  para.setAttribute("class","alert alert-danger");
  para.setAttribute("role","alert");
  para.setAttribute("id","dolAlert");
  para.style.display="none";
  node=document.createTextNode("Seems you were not careful with this date");
  para.appendChild(node);
  dolPointer.appendChild(para);

  //------------------------------------------------------------------------------------------------------------------
  var url="friendList";
  $.getJSON(url,function(data){
    //so this will finally give us the list of all our friends that we would like to invite
    //if there are no friends in the list then obviously we will say that there were no friends to invite
    if(data["elements"]==0)
    {
      var element=document.createElement("div");
      element.setAttribute("class","alert alert-info");
      var node=document.createTextNode("Seems you are yet to make friends, you may however enjoy alone!!!")
      element.appendChild(node);

      var button=document.createElement("input");
      button.setAttribute("role","button");
      // button.setAttribute("type","submit");
      button.setAttribute("value","create Party");
      button.setAttribute("class","btn btn-primary");
      // button.setAttribute("href","createTour");
      button.setAttribute("onclick","formValidate()");
      button.style.display="block";
      button.style.width="300px";
      button.style.margin="auto";
      var buttonNode=document.createTextNode("Create Party");
      button.appendChild(buttonNode);
      element.appendChild(button);
      // document.getElementById("tourForm").appendChild(element);
      document.getElementById("tourForm").appendChild(element);

    }
    else {
      var element=document.createElement("div");
      // element.setAttribute("class","alert alert-info");
      // var node=document.createTextNode("Seems you are yet to make friends, you may however enjoy alone!!!")

      var panels,panelHeader,panelBody,nodeHeader,nodeBody,panelCheck,panelCheckLabel,checkNode,hrefValue;
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
          panelCheck=document.createElement("div");
          // panelButton.setAttribute("role","button");
          panelCheck.setAttribute("class","checkbox");
          panelCheckLabel=document.createElement("input");
          panelCheckLabel.setAttribute("type","checkbox");
          panelCheckNode=document.createTextNode("Invite");//dummy
          panelCheck.style.float="right";
          panelCheckLabel.setAttribute("value","");

          panelCheckLabel.appendChild(panelCheckNode);
          panelCheck.appendChild(panelCheckLabel);

          panelHeader.appendChild(nodeHeader);
          panelBody.appendChild(nodeBody);
          panels.appendChild(panelHeader);
          panels.appendChild(panelBody);
          panelBody.appendChild(panelCheck);
          element.appendChild(panels);
        }



      }
      var button=document.createElement("input");
      button.setAttribute("role","button");
      // button.setAttribute("type","submit");
      button.setAttribute("value","create Party");
      button.setAttribute("class","btn btn-primary");
      button.setAttribute("onclick","formValidate()");
      // button.setAttribute("href","createTour");
      button.style.display="block";
      button.style.width="300px";
      button.style.margin="auto";
      var buttonNode=document.createTextNode("Create Party");
      button.appendChild(buttonNode);
      element.appendChild(button);
      document.getElementById("tourForm").appendChild(element);
    }
  });

};
function dateOfReturnValidation(){
  // alert("date of return:"+document.getElementById("dateOfReturn").value);
  var dor=document.getElementById("dateOfReturn").value;
  var dol=document.getElementById("dateOfLeaving").value;
  if(parseInt(dor.substring(0,4))<parseInt(dol.substring(0,4)))
  {
    // alert("invalid year");
    invalidDate("dor");
  }
  else if(parseInt(dor.substring(5,7))<parseInt(dol.substring(5,7)))
  {
    // alert("invalid month");
    invalidDate("dor");
  }
  else if(parseInt(dor.substring(8))<parseInt(dol.substring(8)))
  {
    // alert("invalid date");
    invalidDate("dor");
  }
  else {
    hideAlert("dor");
    validDOR=1;
  }
}
function dateOfLeavingValidation()
{
  // alert("we are at date of leave validation");
  var dol=document.getElementById("dateOfLeaving").value;
  var d=new Date();
  var year=d.getFullYear();
  var date=d.getDate();
  var month=d.getMonth()+1;
  // alert("date:"+date+",month:"+month+",year:"+year);
  // alert("date entered:"+parseInt(dol.substring(8))+",month entered:"+parseInt(dol.substring(5,7))+",year entered:"+parseInt(dol.substring(0,4)));
  if(parseInt(dol.substring(0,4))<year)
  {
    // alert("seems year is not correct");

    invalidDate("dol");

  }
  else if(parseInt(dol.substring(5,7))<month)
  {
    invalidDate("dol");

  }
  else if(parseInt(dol.substring(8))<date)
  {
    invalidDate("dol");
  }
  else {
    // alert("cool");
    hideAlert("dol");
    validDOL=1;
  }


}
function invalidDate(type){
  if(type.localeCompare("dor")==0)
  {
    validDOR=0;
    var dorPointer=document.getElementById("dorAlert");
    dorPointer.style.display="block";
  }
  else {
    validDOL=0;
    // alert("invalid date dol");
    var dolPointer=document.getElementById("dolAlert");
    // alert("dol alert:"+dolPointer);
    dolPointer.style.display="block";

  }
}
function hideAlert(type)
{
  if(type.localeCompare("dor")==0)
  {
    var dorPointer=document.getElementById("dorAlert");
    dorPointer.style.display="none";
  }
  else {
    var dolPointer=document.getElementById("dolAlert");
    dolPointer.style.display="none";
  }
}
function validateForm()
{
  if (validDOL==1&&validDOR==1)
  {
    document.getElementById("tourForm").submit();
  }
}
