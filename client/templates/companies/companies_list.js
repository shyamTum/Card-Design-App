//Trigger search field to see all companies, when template is rendered
Template.companiesList.onRendered(function(){
  CompaniesSearch.search();
});

Template.companiesList.helpers({
  companiesSearchResults: function() {
      return CompaniesSearch.getData();
    }
});

Template.companiesList.events({
  "keyup #search-field": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    CompaniesSearch.search(text);
  }, 200)
});
