$('#services_tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

Template.services.rendered = function () {

};

Template.services.created = function(){
	$('#service_search').focus();
	Session.set('service_keyword', {});
}

Template.services.destroyed = function () {
	Session.set('si_id', '');
};

Template.services.events({
	'submit #ns_form': function(e,t){
		e.preventDefault();
		form = {};
		$.each($('#ns_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		form['timestamp'] = moment().format('YYYY/MM/DD');

		error = service_insert(form);

		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'submit #si_form': function(e,t){
		e.preventDefault();
		id = $('#si_id').val();
		form = {};
		$.each($('#si_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		error = service_update(id,form);
		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'click #remove_service': function(e,t){
		e.preventDefault();
		id = $('#si_id').val();
		service_delete(id);
	},
	'mouseover .tr_hover, click .tr_hover': function(e,t){
		$(':focus').blur();
		var id = $(e.target).parent().attr('id');
		if(id){
			Session.set('si_id', id);
		}
	},
	'keyup #service_search, keydown #service_search': function(e,t){
		q = e.target.value;
		if (q == '') {
			Session.set('service_keyword', {});
		}else{
			var ik = {$or: [{service_id:{$regex: q,$options: "i"}},{service_name:{$regex: q,$options: "i"}}]};
			Session.set('service_keyword', ik);
		}
	}
});

Template.services.services = function(){
	return services.find( Session.get('service_keyword'),{sort:{service_id:1}});
}

//Template helpers
Template.services.helpers({
	current_service: function(){
		return services.findOne(Session.get('si_id'));
	}
});

//Generic functions
function service_insert(doc){
	services.insert(doc,function(error,id){
		if(error){
			return error
		}
	});
}

function service_update(id,modifiers){
	services.update({_id:id}, modifiers, function(error,ids){
		if(error){
			return error
		}
	});
}

function service_delete(id){
	services.remove({_id: id}, function(error){
		if(error){
			console.log(error);
		}
	});
}