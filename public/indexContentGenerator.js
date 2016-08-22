document.body.onload=function(){
document.getElementById('contentIsFilled').style.visibility="hidden";
//alert("hello:"+titleValue);

    // alert("hello:"+document.getElementById("contentIsFilled").value);
    if(document.getElementById("contentIsFilled").innerHTML==0)
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
