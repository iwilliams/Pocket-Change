$(document).ready(function() {

/* 	var orgsUrl = 'data/orgs.json';  */
	var orgsUrl = 'getOrgs.php';

	$.ajax({
	    type : 'GET',
	    url : orgsUrl,
	    success : function(data) {
	    	data = jQuery.parseJSON(data);
		    for(var i = 0; i < data.length; i++) {
			    console.log(data[i]);
			    var item = $('<div class="org" data-oid="' + data[i].OID + '">');
			    item.append('<img class="logo" src="' + data[i].Logo + '" alt="" />');
			    
			    var caption = $('<div class="org-caption">');
			    caption.append('<h1>' + data[i].Name + '</h1>'); 
				caption.append('<p>' + data[i].Description + '</p>');
				caption.append('<a target="_blank" href="http://' + data[i].Link + '" >Visit Site</a>');
				caption.append('<h2 class="donations" data-rating="' + data[i].Rating + '">Donations: ' + data[i].Rating + '</h2>');
				
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
	
	function slideOrgs() {
		var orgs = $('.org');
		orgs.eq(0).animate(
		animateDirection, 
		500, 
		function(){
		  orgs.eq(0).animate({
		    'margin-top' : '-150%'
		  }, 500, function() {
		  	$('#org-holder').append(orgs.eq(0).remove().css('margin-top', 'auto').css('left', 'auto').css('right', 'auto').css("opacity", 1));
		    /*
$('#org-holder').append(orgs.eq(0).remove().css('left', 'auto'));
		    $('#org-holder').append(orgs.eq(0).remove().css('right', 'auto'));
*/
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