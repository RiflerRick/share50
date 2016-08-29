document.body.onload=function(){
  if(document.getElementById("profilePic").src!="images/acc/emoticonNoFace.png")
  {
    document.getElementById("changePic").style.display="block";
    document.getElementById("picUpload").style.display="none";
  }
  document.getElementById("changePic").onclick=function(){
    document.getElementById("changePic").style.display="none";
    document.getElementById("picUpload").style.display="block";

  };
};
