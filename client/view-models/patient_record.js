Template.patient_record.rendered = function () {
	$('#company').select2();
	$('#company2').select2();
	$('#hmo').select2();
	$('#hmo2').select2();
	$('#sex').select2();
	$('#sex2').select2();
	$('#civil_status').select2();
	$('#civil_status2').select2();
	$('#birthday').datetimepicker({
		format : "YYYY/MM/DD"
	});
	$('#birthday2').datetimepicker({
		format : "YYYY/MM/DD"
	});
};

Template.patient_record.created = function(){
	$('#patient_search').focus();
	Session.set('patient_keyword', {});
	Session.set('pai_id', '');
}

Template.patient_record.destroyed = function () {
	Session.set('pai_id', '');
};

Template.patient_record.events({
	'submit #npa_form': function(e,t){
		e.preventDefault();
		form = {};
		$.each($('#npa_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		form['civil_status'] = $('#civil_status').val();
		form['company'] = $('#company').val();
		form['hmo'] = $('#hmo').val();
		form['sex'] = $('#sex').val();
		form['timestamp'] = moment().format('YYYY/MM/DD');

		error = patient_insert(form);

		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'submit #pai_form': function(e,t){
		e.preventDefault();
		id = $('#pai_id').val();
		form = {};
		$.each($('#pai_form').serializeArray(), function(){
			form[this.name] = this.value;
		});
		error = patient_update(id,form);
		if(error){
			console.log(error);
		}else{
			console.log("Success!");
		}
	},
	'click #remove_patient': function(e,t){
		e.preventDefault();
		id = $('#pai_id').val();
		patient_delete(id);
	},
	'mouseover .tr_hover, click .tr_hover': function(e,t){
		$(':focus').blur();
		var id = $(e.target).parent().attr('id');
		if(id){
			Session.set('pai_id', id);
			the_patient = patients.findOne(Session.get('pai_id'));
			$('#sex2').select2('val', the_patient.sex);
			$('#company2').select2('val', the_patient.company);
			$('#hmo2').select2('val', the_patient.hmo);
			$('#civil_status2').select2('val', the_patient.civil_status);
		}
	},
	'keyup #patient_search, keydown #patient_search': function(e,t){
		q = e.target.value;
		if (q == '') {
			Session.set('patient_keyword', {});
		}else{
			var ik = {$or: [{patient_id:{$regex: q,$options: "i"}},{patient_name:{$regex: q,$options: "i"}}]};
			Session.set('patient_keyword', ik);
		}
	}
});

Template.patient_record.patients = function(){
	return patients.find( Session.get('patient_keyword'),{sort:{patient_id:1}});
}

Template.patient_record.hmos = function(){
	return hmos.find({},{sort:{hmo_id: 1}});
}

Template.patient_record.companies = function(){
	return companies.find({},{sort:{company_id:1}});
}

//Template helpers
Template.patient_record.helpers({
	current_patient: function(){
		the_patient = patients.findOne(Session.get('pai_id'));
		return the_patient;
	}
});

//Generic functions
function patient_insert(doc){
	patients.insert(doc,function(error,id){
		if(error){
			return error
		}
	});
}

function patient_update(id,modifiers){
	patients.update({_id:id}, modifiers, function(error,ids){
		if(error){
			return error
		}
	});
}

function patient_delete(id){
	patients.remove({_id: id}, function(error){
		if(error){
			console.log(error);
		}
	});
}