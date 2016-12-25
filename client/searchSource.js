var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['companyName', 'industry'];

CompaniesSearch = new SearchSource('companies', fields, options);