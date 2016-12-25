(function () {
  'use strict';

  Template.currentProgressNavigation.helpers({
    getProgressNavigationData: function () {
      var companiesIcon = '/assets/images/icons/findlabel_icon_passive_small.png';
      var valueIcon = '/assets/images/icons/value_icon_passive_small.png';
      var designTemplatesIcon = 'assets/images/icons/choose_design_passive_small.png';
      var designsIcon = '/assets/images/icons/design_icon_passive_small.png';
      var checkoutIcon = '/assets/images/icons/donate_icon_passive_small.png';
      var progressNavigationData = {};

      var subURL = Router.current().route.getName();

      if (subURL === 'companies') {
        companiesIcon = '/assets/images/icons/findlabel_icon_active_small.png';
      }

      if (subURL === 'value') {
        valueIcon = '/assets/images/icons/value_icon_active_small.png';
      }

      if(subURL === 'designTemplates') {
        designTemplatesIcon = '/assets/images/icons/choose_design_active_small.png';
      }

      if (subURL === 'designs') {
        designsIcon = '/assets/images/icons/design_icon_active_small.png';
      }

      if (subURL === 'checkout') {
        checkoutIcon = '/assets/images/icons/donate_icon_active_small.png';
      }

      progressNavigationData.companies = companiesIcon;
      progressNavigationData.value = valueIcon;
      progressNavigationData.designTemplates = designTemplatesIcon;
      progressNavigationData.designs = designsIcon;
      progressNavigationData.checkout = checkoutIcon;

      progressNavigationData.companyName = Session.get('companyName$');
      progressNavigationData.voucherValue = Session.get('voucherValue$');
      return progressNavigationData;
    },
    getCompanyName: function () {
      return Bonbeo.getCompanyName();
    },
    getValueOfVoucher: function () {
      return Bonbeo.getValueOfVoucher();
    }
  });
}());
