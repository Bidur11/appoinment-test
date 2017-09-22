// Custom JavaScript Document

// getAppointments() function will be used to serach the items from database...
function getAppointments() {
			
			var search_item = $("#search").val();
			
						jQuery.ajax({
							 url:'/cgi-bin/getAppoinment.pl',
							 type: "post",
							 data: {search_item:search_query},
							 success: function(result){
								
								 $("#details").empty();
								 $(".notice").empty();
								 	 var to_append = '';
									 
									 var result1 = jQuery.parseJSON(result);
									 
									  $.each(JSON.parse(result), function( i, result2 ) {
										  
										  console.log(result2);
										 
										  to_append = to_append+'<tr><td>'+result2['date']+'</td><td>'+result2['time']+'</td><td>'+result2['description']+'</td></tr>';
										  
										  });

									 $(to_append).appendTo('#details'); 
								 
								
							},
							error:function(){
								console.log("Sorry, something went wrong. Please try again later.");
							}                
				
			});
			
			
		}
		
		
		
//Only excute after loading all the domain on the page...
$(document).ready(function(){
	
	
	// Display add form when clicked on new button event
    $("#new").click(function(){
        $("#new").hide();
		$("#add").show();
    });
	
	
	
	// Cancel add form event...
	$("#cancel").click(function(){
		
		 $("#add").hide();		
		 $("#new").show();
		 $('#app-form').trigger("reset");
		
	});
	
	
	//validating date
	var todayDate = new Date().toISOString().slice(0,10);
	$("#date").attr("min", todayDate);
	
	
	//After form validation call ajax
	 $("#app-form").validate({ 
	 //validation rules...
			rules: {   
			
				date: {
					
					required: true,
				},
				        
				time: {
					required: true,
					
				},
				desc: {
					required:  true
				}
			},
			messages: {
				 date: "Please, Enter date",
				 time: "Please, Enter time.",
    			 desc: "Please, Enter description.",
			},
			errorElement : 'div',
			errorLabelContainer: '.alert-danger',
			
			submitHandler: function(form) {
				   
		//request ajax call to the server...
				jQuery.ajax({
							 url:'/cgi-bin/appoinment.pl',
							 type: "post",
							 data: $(form).serialize(),
							success: function(result){
								
								
								   $(".alert-success").fadeIn(500).delay(500).fadeOut(1000);
								   $("#add").hide();
								   $("#new").show();	
								   $('#app-form').trigger("reset");
								
								
							},
							error:function(){
								console.log("Sorry, something went wrong. Please try again later.");
							}                
				
			});       
		  }
		});
	
});

