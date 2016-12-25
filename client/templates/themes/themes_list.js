Template.companiesList.helpers({
    companies: function(){
        return Companies.find();
    }
});
