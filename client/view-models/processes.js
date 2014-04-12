Template.processes.rendered = function () {
	$('#type').select2();
	$('#type2').select2();
	$('#ps_select').select2();
	$('#ps_select2').select2();
	// $('#item_select').select2();
	$('#item_select2').select2();
	$('#item_select3').select2();
};

Template.processes.created = function(){
	$('#process_search').focus();
	Session.set('process_keyword', {});
	Session.set('process_keyword2', {});
	Session.set('pi_id', '');
}

Template.processes.destroyed = function () {
	Session.set('pi_id', '');
};

Template.processes.events({
	'submit #np_form': function(e,t){
		e.preventDefault();
		form = {};
		$.each($('#np_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		form['type'] = $('#type').val();
		form['professional_services'] = $('#ps_select').val();
		form['timestamp'] = moment().format('YYYY/MM/DD');

		error = process_insert(form);

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
		error = process_update(id,form);
		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'click #remove_process': function(e,t){
		e.preventDefault();
		id = $('#pi_id').val();
		process_delete(id);
	},
	'mouseover .tr_hover, click .tr_hover': function(e,t){
		$(':focus').blur();
		var id = $(e.target).parent().attr('id');
		if(id){
			Session.set('pi_id', id);
			the_process = processes.findOne(Session.get('pi_id'));
			the_items = process_items.find({process_id: Session.get('pi_id')}).fetch();
			items_used = [];
			$.each(the_items, function(index, val) {
				items_used.push(val.sku);
			});
			$('#type2').select2('val', the_process.type);
			$('#item_select2').select2('val', items_used);
			$('#ps_select2').select2('val', the_process.professional_services);
		}
	},
	'mouseover .tr_hover2, click .tr_hover2': function(e,t){
		$(':focus').blur();
		var id = $(e.target).parent().attr('id');
		if(id){
			Session.set('pi_id2', id);
			the_process = processes.findOne(Session.get('pi_id2'));
		}
	},
	'keyup #process_search, keydown #process_search': function(e,t){
		q = e.target.value;
		if (q == '') {
			Session.set('process_keyword', {});
		}else{
			var ik = {$or: [{process_id:{$regex: q,$options: "i"}},{process_name:{$regex: q,$options: "i"}}]};
			Session.set('process_keyword', ik);
		}
	},
	'keyup #process_search2, keydown #process_search2': function(e,t){
		q = e.target.value;
		if (q == '') {
			Session.set('process_keyword2', {});
		}else{
			var ik = {$or: [{process_id:{$regex: q,$options: "i"}},{process_name:{$regex: q,$options: "i"}}]};
			Session.set('process_keyword2', ik);
		}
	},
	'click #add_item': function(e,t){
		process_items.insert({process_id: Session.get('pi_id2'), sku: $('#item_select3').val(), item_description: $('#item_select3 option:selected').text(), amount: $('#item_amount').val()});
	}
});

Template.processes.processes = function(){
	return processes.find( Session.get('process_keyword'),{sort:{process_id:1}});
}

Template.processes.processes2 = function(){
	return processes.find( Session.get('process_keyword2'),{sort:{process_id:1}});
}

Template.processes.items = function(){
	return inventory.find();
}

Template.processes.ps = function(){
	return pro_services.find();
}

Template.processes.process_items = function(){
	return process_items.find({process_id: Session.get('pi_id2')});
}

//Template helpers
Template.processes.helpers({
	current_process: function(){
		the_process = processes.findOne(Session.get('pi_id'));
		return the_process;
	},
	current_process2: function(){
		the_process = processes.findOne(Session.get('pi_id2'));
		return the_process;
	}
});

//Generic functions
function process_insert(doc){
	processes.insert(doc,function(error,id){
		if(error){
			return error
		}
	});
}

function process_update(id,modifiers){
	processes.update({_id:id}, modifiers, function(error,ids){
		if(error){
			return error
		}
	});
}

function process_delete(id){
	processes.remove({_id: id}, function(error){
		if(error){
			console.log(error);
		}
	});
}