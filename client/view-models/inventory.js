Template.inventory.rendered = function () {
	$('#ii_purchase_date').datetimepicker({
		format : "YYYY/MM/DD"
	});
	$('#ni_purchase_date').datetimepicker({
		format : "YYYY/MM/DD"
	});
};

Template.inventory.created = function(){	
	$('#inventory_search').focus();
	Session.set('inventory_keyword', {});
}

Template.inventory.destroyed = function () {
	Session.set('ii_id', '');
};

Template.inventory.events({
	'submit #ni_form': function(e,t){
		e.preventDefault();
		form = {};
		$.each($('#ni_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		form['timestamp'] = moment().format('YYYY/MM/DD');

		error = inventory_insert(form);

		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'submit #ii_form': function(e,t){
		e.preventDefault();
		id = $('#ii_id').val();
		form = {};
		$.each($('#ii_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		error = inventory_update(id,form);
		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'click #remove_item': function(e,t){
		e.preventDefault();
		id = $('#ii_id').val();
		inventory_delete(id);
	},
	'mouseover .tr_hover, click .tr_hover': function(e,t){
		$(':focus').blur();
		var id = $(e.target).parent().attr('id');
		if(id){
			Session.set('ii_id', id);
		}
	},
	'keyup #inventory_search, keydown #inventory_search': function(e,t){
		q = e.target.value;
		if (q == '') {
			Session.set('inventory_keyword', {});
		}else{
			var ik = {$or: [{sku:{$regex: q,$options: "i"}},{item_description:{$regex: q,$options: "i"}}]};
			Session.set('inventory_keyword', ik);
		}
	}
});

Template.inventory.items = function(){
	return inventory.find( Session.get('inventory_keyword'),{sort:{sku:1}});
}


//Template helpers
Template.inventory.helpers({
	current_item: function(){
		return inventory.findOne(Session.get('ii_id'));
	}
});

//Generic functions
function inventory_insert(doc){
	inventory.insert(doc,function(error,id){
		if(error){
			return error
		}
	});
}

function inventory_update(id,modifiers){
	inventory.update({_id:id}, modifiers, function(error,ids){
		if(error){
			return error
		}
	});
}

function inventory_delete(id){
	inventory.remove({_id: id}, function(error){
		if(error){
			console.log(error);
		}
	});
}