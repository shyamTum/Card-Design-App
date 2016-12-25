if (Posts.find().count() === 0) {
    Posts.insert({
        title: 'Introducing Telescope',
        url: 'http://sachagreif.com/introducing-telescope/'
    });
    Posts.insert({
        title: 'Meteor',
        url: 'http://meteor.com'
    });
    Posts.insert({
        title: 'The Meteor Book',
        url: 'http://themeteorbook.com'
    });
}

if (Companies.find().count() === 0){
    Companies.insert({
       companyName: 'H & M',
       industry: 'Mode',
       logoUrl: "/assets/images/company_logos/hm_logo.png"
    });
    Companies.insert({
        companyName: 'Douglas',
        industry: 'Kosmetik',
        logoUrl: "/assets/images/company_logos/hm_logo.png"
    });
    Companies.insert({
        companyName: 'Dinsney',
        industry: 'Kosmetik',
        logoUrl: "/assets/images/company_logos/hm_logo.png"
    });
    Companies.insert({
        companyName: 'C & A',
        industry: 'Mode',
        logoUrl: "/assets/images/company_logos/ca_logo.png"
    });
    Companies.insert({
        companyName: 'Carhard',
        industry: 'Mode',
        logoUrl: "/assets/images/company_logos/ca_logo.png"
    });
    Companies.insert({
        companyName: 'Zara',
        industry: 'Mode',
        logoUrl: "/assets/images/company_logos/ca_logo.png"
    });
    Companies.insert({
        companyName: 'Zoo',
        industry: 'Mode',
        logoUrl: "/assets/images/company_logos/ca_logo.png"
    });
}