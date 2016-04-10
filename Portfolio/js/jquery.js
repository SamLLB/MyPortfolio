$(document).ready(function() {

	// Listen for internal link click
	$(document).on("click", "a", (function(e){
		var $this = $(this);
		var $thisName = $this.data('name');
		var $wrapBoxName = $(".wrapBox").data('name');
		var $loadURL = $thisName + ".php";

		// Check to see if link is internal
		if ($thisName) {
			e.preventDefault();
			// Don't do anything if clicked link is already displayed
			if ($thisName === $wrapBoxName) {
				return;
			}
			// prevent multiple clicks
			$this.data('requestRunning', true);

			// Ajax data to change page
			$.ajax({
				url: '../' + $loadURL,
				type: 'POST',
				dataType: 'html',
			})
			.success(function(data) {
				$(".wrapBox").fadeOut("slow", function() {
					$(".wrapBox").html(data);
					$(".wrapBox").fadeIn("slow");
				});
			})
			.fail(function() {
				console.log("error");
			})
			// Turn off multiple clicks listener
			// Update .wrapBox data-name
			.complete(function() {
				$this.data("requestRunning", false);
				$(".wrapBox").data("name", $thisName);
			});
		}
	})
	);

	// Contact form validation
	$(document).on("click", "#sendMessage", function() {

		function isEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
		}

		var errorMessage = "";
		var successMessage = "<p>*Your message has been sent.</p>";

		if ($("#name").val().trim() === "") {
			errorMessage += "<p>*Please enter your name.</p>";
		}

		if (isEmail($("#email").val()) === false) {
			errorMessage += "<p>*Please enter a valid email address.</p>";
		}

		if ($("#messageInput").val().trim() === "") {
			errorMessage += "<p>*Please enter a message.</p>";
		}

		if (errorMessage !== "") {
			$(".messageStatus").html(errorMessage).css("color", "red").fadeIn(400);
		}

		if (errorMessage === "") {
			$(".messageStatus").html(successMessage).css("color", "green").fadeIn(400);
		}

	});


});