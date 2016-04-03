
jQuery(document).ready(function() {
	

    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });
    
    /*
        Form
    */
    $('.registration-form fieldset:first-child').fadeIn('slow');
    
    $('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    var validateEmail = function(){
        var email = $('input[name="form-email"]');
        if( email.val() == "" ) {
            email.addClass('input-error');
            return false;
        } else {
            email.removeClass('input-error');
            return true;
        }
    }

    // next step
    $('.registration-form .btn-next').on('click', function() {
    	var parent_fieldset = $(this).parents('fieldset');
    	var next_step = true;
    	
    	parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function() {
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
    			next_step = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
    	if( next_step ) {
    		parent_fieldset.fadeOut(400, function() {
	    		$(this).next().fadeIn();
	    	});
    	}
    	
    });
    
    // submit
    $('.registration-form').on('submit', function(e) {
        if(!validateEmail()){
            e.preventDefault();
            return false;
        }

        var request = {
            questions : [],
            email: ""
        }

        var form = $(this)
    	form.find('input[type="radio"]:checked').each(function() {
            var questionName = $(this).parents('.form-bottom').prev().find("p");

            request.questions.push({
                question: questionName.text(),
                answer: $(this).val()
            })
    	});

        request.email = $(this).find('input[name="form-email"]').val();
    	
        $.ajax({
          url: "http://advice-demo.bestboyelectric.io/api/advice",
          type: "POST",
          data: JSON.stringify(request),
          contentType: "application/json",
          success: function(data, status){
            $('#message').css('display','block');
            $('#message').addClass("alert-info");
            $('#message').removeClass("alert-danger");
            $('#message').text("Thank you for submitting your answers!");
          },
          error: function(data, status, error){
            $('#message').css('display','block');
            $('#message').addClass("alert-danger");
            $('#message').removeClass("alert-info");
            $('#message').text("Internal error. Can't submit your response. Please try again later.");
          },
          dataType: "json"
        });

        return false;
    });
    
    
});
