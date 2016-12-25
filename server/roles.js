



var user = [
  {name:"Admin User",email:"admin@example.com",roles:['admin']}
];

if (Meteor.users.find({email: user[0].email}).fetch == 0) {

  var id;
  id = Accounts.createUser({
    email: user[0].email,
    password: "apple1",
    profile: {name: user[0].name},
    companyId: 'zR546ZLTwJwCrSZAw'
  });

  if (user[0].roles.length > 0) {
    // Need _id of existing user record so this call must come
    // after `Accounts.createUser` or `Accounts.onCreate`
    Roles.addUsersToRoles(id, user[0].roles, 'admin-group');
  }
}