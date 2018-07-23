

$("#submit").on("click", function(){

	// Form validation
	function validateForm() {
	var isValid = true;

	//select all elements with the class form-control checks if they are empty.  If emtpy sets inValid to false.
	$('.form-control').each(function() {

		if ( $(this).val() === '' ){
			isValid = false;	
		}
			
	});

	//select all elements with the class chosen-select checks if they are empty.  If emtpy sets inValid to false.
	$('.chosen-select').each(function() {

		if( $(this).val() === ""){
			isValid = false
		}

	});

	return isValid;
	}


	// If all required fields are filled
	if (validateForm() == true)
	{

		var userData = {
			friendName: $("#name").val(),
			friendPicture: $("#photo").val(),
			surveyResults: [
			$("#Question1").val(), 
			$("#Question2").val(), 
			$("#Question3").val(), 
			$("#Question4").val(), 
			$("#Question5").val(), 
			$("#Question6").val(), 
			$("#Question7").val(), 
			$("#Question8").val(), 
			$("#Question9").val(), 
			$("#Question10").val(), 
			]
		}

		// console.log(userData);
		var currentURL = window.location.origin;

		// AJAX post to /api/friends
		$.post(currentURL + "/api/friends", userData, function(data){

			// console.log(data);
			//Loading the Modal with the response
			$("#matchName").text(data.friendName);
			$('#matchPicture').attr("src", data.friendPicture);
			$("#matchModal").modal('toggle');

		});

	}

	else {
		alert("Please fill out all fields before submitting!");
		}

    	
    	
});

