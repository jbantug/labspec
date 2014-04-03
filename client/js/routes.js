Router.configure({
	notFoundTemplate: 'not_found'
});

Router.map(function(){
	this.route('home',{
		path : '/',
		template : 'home'
	});
	this.route('login',{
		path : '/login',
		template : 'login'
	});
	this.route('patients',{
		path : '/patients',
		template : 'patient_record'
	});
	this.route('companies',{
		path : '/companies',
		template : 'company_record'
	});
	this.route('hmos',{
		path : '/hmos',
		template : 'hmo_record'
	});
	this.route('professionals',{
		path : '/professionals',
		template : 'professional_record'
	})
	this.route('inventory',{
		path : '/inventory',
		template : 'inventory'
	});
	this.route('services',{
		path : '/services',
		template : 'services'
	});
	this.route('system_configuration',{
		path : '/system_configuration',
		template : 'system_configuration'
	});
	this.route('processes',{
		path : '/processes',
		template : 'processes'
	});
	this.route('cost_calculations',{
		path  : '/cost_calculations',
		template : 'cost_calculations'
	});
	this.route('users',{
		path : '/users',
		template : 'users'
	});
	this.route('payments',{
		path  : '/payments',
		template : 'payments'
	})
	this.route('reports',{
		path : '/reports',
		template : 'reports'
	});
});