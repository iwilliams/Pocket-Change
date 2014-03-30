$(document).ready(function() {

	var orgsUrl = 'data/orgs.json'; 
/* 	var orgsUrl = 'getOrgs.php'; */

	$.ajax({
	    type : 'GET',
	    url : orgsUrl,
	    success : function(data) {
		    for(var i = 0; i < data.length; i++) {
			    console.log(data[i]);
			    var item = $('<div class="org">');
			    item.append('<img class="logo" src="' + data[i].Logo + '" alt="" />');
			    
			    var caption = $('<div class="org-caption">');
			    caption.append('<h1>' + data[i].Name + '</h1>'); 
				caption.append('<p>' + data[i].Description + '</p>');
				
				item.append(caption);
				$('#org-holder').append(item);
		    }			
	    }
	});

	
	
 
	   $("#org-holder").swiperight(function() {  
		  next(1);
		});  
	   $("#org-holder").swipeleft(function() {  
	      next(-1);  
	   });  
}); 

function next(direction) {
	if(direction > 0) {
		var animateDirection = {"left" : '100%'};
	} else {
		var animateDirection = {"right" : '100%'};
	}
	var orgs = $('.org');
	orgs.eq(0).animate(
		animateDirection, 
		500, 
		function(){
		  orgs.eq(0).animate({
		    'margin-top' : '-150%'
		  }, 500, function() {
		  	$('#org-holder').append(orgs.eq(0).remove().css('margin-top', 'auto'));
		    $('#org-holder').append(orgs.eq(0).remove().css('left', 'auto'));
		    $('#org-holder').append(orgs.eq(0).remove().css('right', 'auto'));
		  });
		}
	);
	
}