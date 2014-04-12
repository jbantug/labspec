Template.professional_record.created = function(){	
	$('#professional_search').focus();
	Session.set('professional_keyword', {});
}

Template.professional_record.destroyed = function () {
	Session.set('pi_id', '');
};

Template.professional_record.events({
	'submit #np_form': function(e,t){
		e.preventDefault();
		form = {};
		$.each($('#np_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		form['timestamp'] = moment().format('YYYY/MM/DD');

		error = professional_insert(form);

		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'submit #pi_form': function(e,t){
		e.preventDefault();
		id = $('#pi_id').val();
		form = {};
		$.each($('#pi_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		error = professional_update(id,form);
		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'click #remove_record': function(e,t){
		e.preventDefault();
		id = $('#pi_id').val();
		professional_delete(id);
	},
	'mouseover .tr_hover, click .tr_hover': function(e,t){
		$(':focus').blur();
		var id = $(e.target).parent().attr('id');
		if(id){
			Session.set('pi_id', id);
		}
	},
	'keyup #professional_search, keydown #professional_search': function(e,t){
		q = e.target.value;
		if (q == '') {
			Session.set('professional_keyword', {});
		}else{
			var ik = {$or: [{ps_id:{$regex: q,$options: "i"}},{ps_name:{$regex: q,$options: "i"}},{service:{$regex: q,$options: "i"}},{ps_fee:{$regex: q,$options: "i"}}]};
			Session.set('professional_keyword', ik);
		}
	}
});

Template.professional_record.pro_service = function(){
	return pro_services.find( Session.get('professional_keyword'),{sort:{sku:1}});
}


//Template helpers
Template.professional_record.helpers({
	current_pro: function(){
		return pro_services.findOne(Session.get('pi_id'));
	}
});

//Generic functions
function professional_insert(doc){
	pro_services.insert(doc,function(error,id){
		if(error){
			return error
		}
	});
}

function professional_update(id,modifiers){
	pro_services.update({_id:id}, modifiers, function(error,ids){
		if(error){
			return error
		}
	});
}

function professional_delete(id){
	pro_services.remove({_id: id}, function(error){
		if(error){
			console.log(error);
		}
	});
}