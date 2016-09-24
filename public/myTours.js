document.body.onload=function(){
var url="checkMyTours";

$.getJSON(url,function(data){

  var invites=data["invites"];
  var ownTours=data["ownTours"];
  // alert("check");
    var element,elementHeading,elementNode,elementBody,elementBodyNode,elementCheckBox;
    var uid,name,email;
    if(invites!=0)
    {
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
          elementCheckBox=document.createElement("input");
          elementCheckBox.setAttribute("type","checkbox");
          elementCheckBox.style.marginLeft="400px";
          elementCheckBox.setAttribute("name",uid);

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
    if(ownTours!=0)
    {
      /*
      <div class="row">
        <div class="col-sm-6 col-md-4">
          <!-- <div class="thumbnail"> -->
            <img src="images/image3.jpg" alt="tour" style="width:175px;height:150px;">
            <!-- <div class="caption"> -->
              <h3>Thumbnail label</h3>
              <p>...</p>
              <p><a href="#" class="btn btn-primary" role="button">Button</a></p>
            <!-- </div> -->
          <!-- </div> -->
        </div>
      </div>

      this is the structure that we need to build

      */
      var element,elementNode;
      for (var key in data)
      {
        
      }

    }
    if(invites==0&&ownTours==0)
    {

    }
});

};
