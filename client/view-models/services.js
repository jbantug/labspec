$('#services_tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

Template.services.rendered = function () {
<<<<<<< HEAD
	$('#process_select').select2();
=======

>>>>>>> cc20340b580279c144180b746d13276193497c8d
};

Template.services.created = function(){
	$('#service_search').focus();
<<<<<<< HEAD
	$('#service_search2').focus();
	Session.set('service_keyword', {});
	Session.set('service_keyword2', {});
	Session.set('si_id', '');
	Session.set('si_id2', '');
=======
	Session.set('service_keyword', {});
>>>>>>> cc20340b580279c144180b746d13276193497c8d
}

Template.services.destroyed = function () {
	Session.set('si_id', '');
<<<<<<< HEAD
	Session.set('si_id2', '');
	Session.set('service_keyword', {});
	Session.set('service_keyword2', {});
=======
>>>>>>> cc20340b580279c144180b746d13276193497c8d
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
<<<<<<< HEAD
	'submit #pu_form': function(e,t){
		e.preventDefault();
		si = $('#pu_id').val();
		processes = $('#process_select').val();
		service_processes.insert({service_id: si, processes: processes});
	},
=======
>>>>>>> cc20340b580279c144180b746d13276193497c8d
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
<<<<<<< HEAD
	'mouseover .tr_hover2, click .tr_hover2': function(e,t){
		$(':focus').blur();
		var id = $(e.target).parent().attr('id');
		if(id){
			Session.set('si_id2', id);
		}
	},
=======
>>>>>>> cc20340b580279c144180b746d13276193497c8d
	'keyup #service_search, keydown #service_search': function(e,t){
		q = e.target.value;
		if (q == '') {
			Session.set('service_keyword', {});
		}else{
			var ik = {$or: [{service_id:{$regex: q,$options: "i"}},{service_name:{$regex: q,$options: "i"}}]};
			Session.set('service_keyword', ik);
		}
<<<<<<< HEAD
	},
	'keyup #service_search2, keydown #service_search2': function(e,t){
		q = e.target.value;
		if (q == '') {
			Session.set('service_keyword2', {});
		}else{
			var ik = {$or: [{service_id:{$regex: q,$options: "i"}},{service_name:{$regex: q,$options: "i"}}]};
			Session.set('service_keyword2', ik);
		}
=======
>>>>>>> cc20340b580279c144180b746d13276193497c8d
	}
});

Template.services.services = function(){
	return services.find( Session.get('service_keyword'),{sort:{service_id:1}});
}

<<<<<<< HEAD
Template.services.services2 = function(){
	return services.find( Session.get('service_keyword2'),{sort:{service_id:1}});
}

=======
>>>>>>> cc20340b580279c144180b746d13276193497c8d
Template.services.all_services = function(){
	return services.find();
}

Template.services.processes = function(){
	return processes.find();
}

//Template helpers
Template.services.helpers({
	current_service: function(){
		return services.findOne(Session.get('si_id'));
<<<<<<< HEAD
	},
	current_service2: function(){
		return services.findOne(Session.get('si_id2'));
=======
>>>>>>> cc20340b580279c144180b746d13276193497c8d
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