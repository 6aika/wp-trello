jQuery(document).ready(function($){ 

	$('input[type="checkbox"]').live('change', function() {
			$.post(ajaxurl, {
				 action: 'wpt_update_lists',
				 id: $(this).attr('data-key'),
				 new: $(this).is(':checked'),
				 nonce: wp_trello.nonce
			 }, 
			function(data) {
				//console.log(JSON.stringify(data.objects));
			}, 'json');
	 });

	$('select[name="wptsettings_settings[wptsettings_helper_orgs]"]').change(function(){
		var objectid = $('option:selected', this).val();
		$('#org-id').html('');
		resetDropdown('Boards');
		resetDropdown('Lists');
		resetDropdown('Cards');
		if (objectid != '0') {
			$('#org-id').html(objectid);
			populateDropdown(objectid, 'boards');
		}
		
	 });
	 
	 $('select[name="wptsettings_settings[wptsettings_helper_boards]"]').change(function(){
		/*var objectid = $('option:selected', this).val();
		$('#board-id').html('');
		resetDropdown('Lists');
		resetDropdown('Cards');
		if (objectid != '0') {
			$('#board-id').html(objectid);
			populateCheckboxes(objectid);
		}*/
			
	 });
	 
	 function populateDropdown(id, type) {
		  $.post(ajaxurl, 
            { 	action:'wpt_get_objects', 
            	id:id, 
            	type: type,
            	nonce: wp_trello.nonce }, 
            function(data){
							new_object = 'select[name="wptsettings_settings[wptsettings_helper_' + type + ']"]';
							$(new_object).empty();
							$.each(data.objects, function(key, val) {
								if ( val.isSelected ) {
									$(new_object).append('<option value="' + key + '" selected="selected">' + val.title +'</option>');
								} else {
									$(new_object).append('<option value="' + key + '">' + val.title +'</option>');
								}
							});
							$(new_object).removeAttr('disabled');
            }
        , 'json');
        return false;
		 
	 }

	 function populateCheckboxes(id) {
		 $.post(ajaxurl, {
				 action: 'wpt_get_objects',
				 id: id,
				 type: 'checkboxlists',
				 nonce: wp_trello.nonce
			 }, 
			function(data) {
				$td = $('select[name="wptsettings_settings[wptsettings_helper_lists]"]').parent();
				$td.empty();
				$.each(data.objects, function(key, val) {
					if ( val.isShown ) {
						$td.append('<label><input type="checkbox" class="listcheckbox" data-key="'+key+'" name="wptsettings_lists['+key+']" checked="checked" />'+val.title+'</label><br>');
					} else {
						$td.append('<label><input type="checkbox" class="listcheckbox" data-key="'+key+'" name="wptsettings_lists['+key+']" />'+val.title+'</label><br>');
					}
					
				});
			}, 'json');
	 }
	 
	 function resetDropdown(type) {
		 object = 'select[name="wptsettings_settings[wptsettings_helper_' + type.toLowerCase() + ']"]';
		 len = type.length;
		 labeltype = type.substr(0, len-1);
		 idlabel = '#' + labeltype.toLowerCase() + '-id';
		 $(idlabel).html('');
		 $(object).attr('disabled', 'disabled');	
		 $(object).empty();
		 $(object).append('<option value="0">Select ' + labeltype +'</option>');		 
	 }
	 
	 $('#wpt-disconnect').live('click', function(){      
       	var r = confirm("Disconnect from Trello?");
		if (r==true) {
			$.post(ajaxurl, 
				{ 	action:'wpt_disconnect',
					nonce: wp_trello.nonce
				 }, 
				function(data){
					window.location = data.redirect;
				}
			, 'json');
		}
	});
	   
	 	 
});