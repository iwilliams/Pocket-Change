$(document).ready(function() {  
		 $("#myCarousel").swiperight(function() {  
		  $(this).carousel('prev');  
    		});  
	   $("#myCarousel").swipeleft(function() {  
	      $(this).carousel('next');  
   });  
}); 