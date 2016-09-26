document.body.onload=function(){

var url="checkMyParties";
$.getJSON(url,function(data){

  window.setTimeout(function(){

    var invites=data["invites"];
    var ownParties=data["ownParties"];
    // alert("check");
      var element,elementHeading,elementNode,elementBody,elementBodyNode,elementCheckBox,elementCheckBoxNode;
      var uid,name,email,pid;
      if(invites!=0)
      {
        document.getElementById("wellContent").style.display="block";
        element=document.createElement("div");
        element.setAttribute("class","alert alert-info");
        elementNode=document.createTextNode("Friends who wanted you to accompany them");
        element.appendChild(elementNode);
        document.getElementById("wellContent").appendChild(element);
        for (var key in data)
        {
          // alert("data now is in process");
          // alert("data is: "+data[key]);
          if(key.substring(0,3).localeCompare("own")==0)
          break;
          if(key.substring(0,3).localeCompare("uid")==0)
          uid=data[key];
          if(key.substring(0,3).localeCompare("pid")==0)
          pid=data[key];
          if(key.substring(0,4).localeCompare("name")==0)
          name=data[key];
          if(key.substring(0,5).localeCompare("email")==0)
          {
            email=data[key];
            element=document.createElement("div");
            element.setAttribute("class","panel panel-primary");
            elementHeading=document.createElement("div");
            elementHeading.setAttribute("class","panel-heading");
            elementBody=document.createElement("div");
            elementBody.setAttribute("class","panel-body");
            elementNode=document.createTextNode(name);
            elementBodyNode=document.createTextNode(email);
            elementCheckBox=document.createElement("a");
            elementCheckBox.setAttribute("role","button");
            elementCheckBox.setAttribute("class","btn btn-primary");
            elementCheckBox.setAttribute("href","acceptPartyRequest?uid="+uid+"&pid="+pid);
            elementCheckBox.style.marginLeft="400px";
            elementCheckBoxNode=document.createTextNode("Check out");
            elementCheckBox.appendChild(elementCheckBoxNode);

            //now the linking

            elementBody.appendChild(elementBodyNode);
            elementBody.appendChild(elementCheckBox);

            elementHeading.appendChild(elementNode);
            element.appendChild(elementHeading);
            element.appendChild(elementBody);

            document.getElementById("wellContent").appendChild(element);
          }
        }
      }
      if(ownParties!=0)
      {
        document.getElementById("partyDiv").style.display="block";
        var element,elementNode;
        element=document.createElement("div");
        element.setAttribute("class","alert alert-info");
        elementNode=document.createTextNode("My Parties");
        element.appendChild(elementNode);
        document.getElementById("partyDiv").appendChild(element);

        var elementRow,elementCol,elementImage,heading,headingContent,inner,innerContent,buttonElement,buttonNode,partition;
        var dest,dateJ,dateR,description,pid;
        var i=0;
        for (var key in data)
        {
          if(i%2==0)
          {
            elementRow=document.createElement("div");
            elementRow.setAttribute("class","row");
            document.getElementById("partyDiv").appendChild(elementRow);

            /*partition=document.createElement("div");
            partition.style.width:"5px";
            document.getElementById("partyDiv").appendChild(partition);*/
          }
          if(key.substring(0,3).localeCompare("pid")==0)
          {
            pid=data[key];
          }
          if(key.substring(0,4).localeCompare("dest")==0)
          {
            dest=data[key];

          }
          if(key.substring(0,7).localeCompare("dateOfJ")==0)
          {
            dateJ=data[key];
            dateJ=dateJ.substring(0,10);
          }
          if(key.substring(0,7).localeCompare("dateOfR")==0)
          {
            dateR=data[key];
            dateR=dateR.substring(0,10);
          }
          if(key.substring(0,4).localeCompare("desc")==0)
          {
            i++;
            description=data[key];
            elementCol=document.createElement("div");
            elementCol.setAttribute("class","col-sm-6 col-sm-6");
            elementImage=document.createElement("img");
            elementImage.setAttribute("src","images/image2.jpg");
            elementImage.style.width="250px";
            elementImage.style.width="300px";
            heading=document.createElement("h3");
            headingContent=document.createTextNode(dest);
            inner=document.createElement("p");
            innerContent=document.createTextNode("journey:"+dateJ+"; \n return:"+dateR+"\n "+description);
            buttonElement=document.createElement("a");
            buttonElement.setAttribute("class","btn btn-primary");
            buttonElement.setAttribute("href","openParty?pid="+pid);
            buttonElement.setAttribute("role","button");
            buttonNode=document.createTextNode("Check out");

            //now the linking

            buttonElement.appendChild(buttonNode);
            heading.appendChild(headingContent);
            inner.appendChild(innerContent);

            elementCol.appendChild(elementImage);
            elementCol.appendChild(heading);
            elementCol.appendChild(inner);
            elementCol.appendChild(buttonElement);

            elementRow.appendChild(elementCol);
          }

        }

      }
      if(invites==0&&ownParties==0)
      {
        document.getElementById("partyDiv").style.display="block";
        var element=document.createElement("div");
        element.setAttribute("class","alert alert-warning");
        var elementNode=document.createTextNode("You do not seem to party a lot...You should actually get involved");
        element.appendChild(elementNode);
        document.getElementById("partyDiv").appendChild(element);
      }

  },250);//1000 miliseconds later page loads


});

};
