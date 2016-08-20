document.body.onload=function(){
  var url="wellContentRequest";
  $.getJSON(url,function(data){
    // alert("data received:"+data.testVariable);
    var element=document.createElement("h1");
    var node=document.createTextNode(data.testVariable);
    element.appendChild(node);
    document.getElementById("wellContent").appendChild(element);
  });
};
