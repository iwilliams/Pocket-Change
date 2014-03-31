$(document).ready(function() {

	$.event.special.swipe.durationThreshold = 500;
	$.event.special.swipe.scrollSupressionThreshold = 15;

 	var orgsUrl = 'data/orgs.json';  
	//var orgsUrl = 'getOrgs.php';

	$.ajax({
	    type : 'GET',
	    url : orgsUrl,
	    success : function(data) {
	    	//data = jQuery.parseJSON(data);
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
				bottom.append('<h5 class="skip"><i class="fa fa-arrow-left"></i> Skip</h5><h5 class="donate">Donate <i class="fa fa-arrow-right"></i></h5>');
				bottom.append('<h5 class="donations" data-rating="' + data[i].Rating + '">Donations: ' + data[i].Rating + '</h5>');
				
				container.append(bottom);
				
				item.append(container);
				$('#org-holder').append(item);
		    }
		    
		    $("#org-holder").on("swiperight", function() {  
		      next(1);
		    });
		    $(".donate").click(function() {  
		      next(1);
		    });  
		   $("#org-holder").on("swipeleft", function() {  
		      next(-1);  
		   });
		   $(".skip").click(function() {  
		      next(-1);  
		   });  
		    			
	    }
	});

	
	
 
	    
}); 

var sliding = false;


function next(direction) {

	if(!sliding) {
	
	sliding = true;
	
	function slideOrgs() {
		var orgs = $('.org');
		orgs.eq(0).animate(animateDirection, 500, 
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
			  	sliding = false;
			  });
			}
		);
	}
	
	if(direction > 0) {
		var animateDirection = {"left" : '100%', "opacity": -.5};
		$.ajax({
	    type : 'POST',
	    url : 'donate.php',
	    data : 'UID:0,OID:' + $('.org').eq(0).attr('data-oid') + ',Rating:' + (parseInt($('.org').eq(0).find('.donations').eq(0).attr('data-rating')) + 1),
	    success : function(data) {
				var orgs = $('.org');
				orgs.eq(0).find('.org-container').eq(0).css('border', '1px solid #AD9F00').css('box-shadow', '0px 0px 15px #AD9F00');
				orgs.eq(0).find('.donations').eq(0).html("<span style='display:inline;vertical-align:middle'>Donations: </span><span style='color: #AD9F00;font-weight: bold;font-size:1.5em;display:inline;vertical-align:middle;'>" + (parseInt(orgs.eq(0).find('.donations').eq(0).attr('data-rating')) + 1) + "</span>").css('margin-top', '-.25em');
				orgs.eq(0).find('.donations').eq(0).attr('data-rating', parseInt(orgs.eq(0).find('.donations').eq(0).attr('data-rating')) + 1);
				var timeoutID = window.setTimeout(slideOrgs, 400);
		},
		error : function() {
			alert('error');
		}
		});
	} else {
		var animateDirection = {
			"right" : '100%',
			"opacity": -2}
		slideOrgs();
	}
	
	}
	
}