$(document).ready(function() {

 	//var orgsUrl = 'data/orgs.json';  
	var orgsUrl = 'getOrgs.php';

	$.ajax({
	    type : 'GET',
	    url : orgsUrl,
	    success : function(data) {
	    	data = jQuery.parseJSON(data);
		    for(var i = 0; i < data.length; i++) {
			    console.log(data[i]);
			    var item = $('<div class="org" data-oid="' + data[i].OID + '">');
			    var container = $('<div class="org-container">');
			    
			    container.append('<img class="logo" src="' + data[i].Logo + '" alt="" />');
			    
			    var caption = $('<div class="org-caption">');
			    caption.append('<h3>' + data[i].Name + '</h3>'); 
				caption.append('<p>' + data[i].Description + '</p>');
				caption.append('<a target="_blank" href="' + data[i].Link + '" >Visit Site</a>');
				
				container.append(caption);
				
				var bottom = $('<div class="bottom">');
				bottom.append('<h4 class="skip"><i class="fa fa-arrow-left"></i> Skip</h4><h4 class="donate">Donate <i class="fa fa-arrow-right"></i></h4>');
				bottom.append('<h4 class="donations" data-rating="' + data[i].Rating + '">Donations: ' + data[i].Rating + '</h4>');
				
				container.append(bottom);
				
				item.append(container);
				$('#org-holder').append(item);
		    }
		    
		    $("#org-holder").swiperight(function() {  
		      next(1);
		    });
		    $(".donate").click(function() {  
		      next(1);
		    });  
		   $("#org-holder").swipeleft(function() {  
		      next(-1);  
		   });
		   $(".skip").click(function() {  
		      next(-1);  
		   });  
		    			
	    }
	});

	
	
 
	    
}); 


function next(direction) {
	
	function slideOrgs() {
		var orgs = $('.org');
		orgs.eq(0).animate(
		animateDirection, 
		500, 
		function(){
		  orgs.eq(0).animate({
		    'margin-top' : '-150%'
		  }, 200, function() {
		  	var removedOrg = orgs.eq(0).remove().css('margin-top', 'auto').css('left', 'auto').css('right', 'auto').css("opacity", 1);
		  	$('#org-holder').append(removedOrg);
		  	removedOrg.find('.donate').click(function(){
			  	 next(1);
		  	});
		  	removedOrg.find('.skip').click(function(){
			  	 next(-1);
		  	});
		  });
		}
	);
	}
	
	if(direction > 0) {
		var animateDirection = {"left" : '100%', "opacity" : 0};
		$.ajax({
	    type : 'POST',
	    url : 'donate.php',
	    data : 'UID:0,OID:' + $('.org').eq(0).attr('data-oid') + ',Rating:' + (parseInt($('.org').eq(0).find('.donations').eq(0).attr('data-rating')) + 1),
	    success : function(data) {
				var orgs = $('.org');
				orgs.eq(0).find('.donations').eq(0).html("Donations: " + (parseInt(orgs.eq(0).find('.donations').eq(0).attr('data-rating')) + 1));
				orgs.eq(0).find('.donations').eq(0).attr('data-rating', parseInt(orgs.eq(0).find('.donations').eq(0).attr('data-rating')) + 1);
				var timeoutID = window.setTimeout(slideOrgs, 200);
		},
		error : function() {
			alert('error');
		}
		});
	} else {
		var animateDirection = {
			"right" : '100%',
			"opacity" : 0};
		slideOrgs();
	}
	
}