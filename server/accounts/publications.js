import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function () {
  console.log('entro en publicacion');
  // this.autorun(() => {
  if (this.userId) {
    console.log('Este es el user id:', this.userId);
    console.log('hago query');
    const cursor = Meteor.users.find(
      { _id: this.userId },
      { fields: { _id: 1, emails: 1, profile: 1 } },
    );
    console.log(cursor.count());
    return cursor;
  }
  return this.ready();
});
// });

// This should work but it doesn't. Extracted from: http://docs.meteor.com/api/accounts.html#Meteor-users
// Meteor.publish("userData", function () {
//   if (this.userId) {
//     return sites.find();
//   } else {
//     this.ready();
//   }
// });
