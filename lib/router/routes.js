Router.configure({
    layoutTemplate: 'appLayout',
    loadingTemplate: 'loading'
});

//client routes

Router.plugin('dataNotFound', {dataNotFoundTemplate: 'notFound'});

Router.route('/', function () {
   this.render('landingPage', 1);
});


Router.route('/value', {
  waitOn: function () {
    return [
      Subscriptions.designs,
      Subscriptions.vouchers,
      Subscriptions.images
    ];
  },
  action: function () {
    this.render('chooseValue', {
      data: {
        title: 'value',
        voucher: Bonbeo.getVoucher()
      }
    });
  }
});

Router.route('/designs', {
  waitOn: function () {
    return [
      Subscriptions.designs,
      Subscriptions.vouchers,
      Subscriptions.images
    ];
  },
  action: function (){
    this.render('designsList', {
      data: {
        title: 'designs',
        voucher: Bonbeo.getVoucher()
      }
    });
  }
});

Router.route('/designTemplates', {
  waitOn: function () {
    return [
      Subscriptions.designs,
      Subscriptions.vouchers,
      Subscriptions.images
    ];
  },
  action: function (){
    this.render('designTemplates', {
      data: {
        title: 'designs',
        voucher: Bonbeo.getVoucher()
      }
    });
  }
});


Router.route('/editor', {
  //Commenting this part out for now !! Helps routing the editor easy !!
  /*waitOn: function () {
    return [
      Subscriptions.designs,
      Subscriptions.vouchers,
      Subscriptions.images
    ];
  },
  action: */function (){
    this.render('editor', {
      data: {
        title: 'designs',
        voucher: Bonbeo.getVoucher()
      }
    });
  }
});





Router.route('/checkout', {
  waitOn: function () {
    return [
      Subscriptions.designs,
      Subscriptions.vouchers,
      Subscriptions.images
    ];
  },
  action: function () {
    this.render('checkout', {
      data: {
        title: 'checkout',
        voucher: Bonbeo.getVoucher()
      }
    });
  }
});

Router.route('/companies', {
  waitOn: function () {
    return [
      Subscriptions.designs,
      Subscriptions.vouchers,
      Subscriptions.images
    ];
  },
  template: 'companiesList',
  onBeforeAction: function () {
    AccountsEntry.signInRequired(this);
    this.next();
  },
  action: function (){
    this.render();
  }
});

//static routes
Router.route('/impressum');

Router.route('/contact', function () {
   this.render('contact');
});

Router.route('userProfile', {
  path: '/profile',
  template: 'userProfile',
  waitOn: function (){
    Subscriptions.vouchers,
    Subscriptions.roles
  }
});