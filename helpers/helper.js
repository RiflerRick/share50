exports.renderPage=function(res,pageName,param)//in js we do not need to give data type of formal parameters in functions
{
  res.render('header',{page:pageName});

};
