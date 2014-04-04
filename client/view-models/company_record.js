Template.company_record.rendered = function () {
	$('#ci_date_joined').datetimepicker({
		format : "YYYY/MM/DD"
	});
	$('#nc_date_joined').datetimepicker({
		format : "YYYY/MM/DD"
	});	
};

Template.company_record.created = function(){
	$('#company_search').focus();
	Session.set('company_keyword', {});
}

Template.company_record.destroyed = function () {
	Session.set('ci_id', '');
};

Template.company_record.events({
	'submit #nc_form': function(e,t){
		e.preventDefault();
		form = {};
		$.each($('#nc_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		form['timestamp'] = moment().format('YYYY/MM/DD');

		error = company_insert(form);

		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'submit #ci_form': function(e,t){
		e.preventDefault();
		id = $('#ci_id').val();
		form = {};
		$.each($('#ci_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		error = company_update(id,form);
		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'click #remove_company': function(e,t){
		e.preventDefault();
		id = $('#ci_id').val();
		company_delete(id);
	},
	'mouseover .tr_hover, click .tr_hover': function(e,t){
		$(':focus').blur();
		var id = $(e.target).parent().attr('id');
		if(id){
			Session.set('ci_id', id);
		}
	},
	'keyup #company_search, keydown #company_search': function(e,t){
		q = e.target.value;
		if (q == '') {
			Session.set('company_keyword', {});
		}else{
			var ik = {$or: [{company_id:{$regex: q,$options: "i"}},{company_name:{$regex: q,$options: "i"}}]};
			Session.set('company_keyword', ik);
		}
	}
});

Template.company_record.companies = function(){
	return companies.find( Session.get('company_keyword'),{sort:{company_id:1}});
}

//Template helpers
Template.company_record.helpers({
	current_company: function(){
		return companies.findOne(Session.get('ci_id'));
	}
});

//Generic functions
function company_insert(doc){
	companies.insert(doc,function(error,id){
		if(error){
			return error
		}
	});
}

function company_update(id,modifiers){
	companies.update({_id:id}, modifiers, function(error,ids){
		if(error){
			return error
		}
	});
}

function company_delete(id){
	companies.remove({_id: id}, function(error){
		if(error){
			console.log(error);
		}
	});
}