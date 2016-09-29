document.body.onload=function(){
  // alert('ajax check');
var url="openTourCheckPics";
$.getJSON(url,function(data){
  //data is obviously the response
  //from the data we only get the src files and we simply show them
  //first ofcourse is the number of such images.

  var num=data["num"];//no of images
  var i=0;
  var rowElement,colElement,link,image;
  if(num>0)
  {
    for (var key in data)
    {
      if(key.substring(0,3).localeCompare("src")==0)
      {
        if(i%2==0)
        {
          rowElement=document.createElement("div");
          rowElement.setAttribute("class","row");
          document.getElementById("wellContent").appendChild(rowElement);
        }

        colElement=document.createElement("div");
        colElement.setAttribute("class","col-xs-6 col-md-6");
        link=document.createElement("a");
        link.setAttribute("href","");
        image=document.createElement("img");
        image.style.width="300px";
        image.style.height="200px";
        image.setAttribute("src",data[key]);
        image.setAttribute("alt","image");

        //now the linking
        colElement.appendChild(image);
        rowElement.appendChild(colElement);

        i++;
      }

    }
    // document.getElementByTagName("img").style.width="200px";
    // document.getElementByTagName("img").style.height="150px";
  }
  else {
    var element=document.createElement("div");
    element.setAttribute("class","alert alert-warning");
    var strongElement=document.createElement("strong");
    var strongNode=document.createTextNode("Upload images and share with friends");
    strongElement.appendChild(strongNode);
    element.appendChild(strongElement);
    document.getElementById("wellContent").appendChild(element);
  }

});
};
