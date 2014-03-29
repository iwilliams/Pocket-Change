var navHeight = $('.navbar-collapse').height();

$('.navbar-collapse').on('show.bs.collapse', function(){
  
  if($(this).height() != 0){
     navHeight = $(this).height();
  }
  
  $('body').animate({
    'padding-top': parseInt($("body").css("padding-top")) + navHeight
   }, 300);
  
});

$('.navbar-collapse').on('hide.bs.collapse', function(){
  
  navHeight = $(this).height();
  
  $('body').animate({
    'padding-top': parseInt($("body").css("padding-top")) - navHeight
   }, 300);
  
});