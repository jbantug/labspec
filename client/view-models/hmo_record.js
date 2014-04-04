Template.hmo_record.rendered = function () {
	$('#hi_date_joined').datetimepicker({
		format : "YYYY/MM/DD"
	});
	$('#nh_date_joined').datetimepicker({
		format : "YYYY/MM/DD"
	});	
};


Template.hmo_record.created = function(){
	$('#hmo_search').focus();
	Session.set('hmo_keyword', {});
}

Template.hmo_record.destroyed = function () {
	Session.set('hi_id', '');
};

Template.hmo_record.events({
	'submit #nh_form': function(e,t){
		e.preventDefault();
		form = {};
		$.each($('#nh_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		form['timestamp'] = moment().format('YYYY/MM/DD');

		error = hmo_insert(form);

		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'submit #hi_form': function(e,t){
		e.preventDefault();
		id = $('#hi_id').val();
		form = {};
		$.each($('#hi_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		error = hmo_update(id,form);
		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'click #remove_hmo': function(e,t){
		e.preventDefault();
		id = $('#hi_id').val();
		hmo_delete(id);
	},
	'mouseover .tr_hover, click .tr_hover': function(e,t){
		$(':focus').blur();
		var id = $(e.target).parent().attr('id');
		if(id){
			Session.set('hi_id', id);
		}
	},
	'keyup #hmo_search, keydown #hmo_search': function(e,t){
		q = e.target.value;
		if (q == '') {
			Session.set('hmo_keyword', {});
		}else{
			var ik = {$or: [{hmo_id:{$regex: q,$options: "i"}},{hmo_name:{$regex: q,$options: "i"}}]};
			Session.set('hmo_keyword', ik);
		}
	}
});

Template.hmo_record.hmos = function(){
	return hmos.find( Session.get('hmo_keyword'),{sort:{hmo_id:1}});
}

//Template helpers
Template.hmo_record.helpers({
	current_hmo: function(){
		return hmos.findOne(Session.get('hi_id'));
	}
});

//Generic functions
function hmo_insert(doc){
	hmos.insert(doc,function(error,id){
		if(error){
			return error
		}
	});
}

function hmo_update(id,modifiers){
	hmos.update({_id:id}, modifiers, function(error,ids){
		if(error){
			return error
		}
	});
}

function hmo_delete(id){
	hmos.remove({_id: id}, function(error){
		if(error){
			console.log(error);
		}
	});
}