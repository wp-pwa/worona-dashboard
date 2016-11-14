import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function () {
  const self = this;
  console.log('entro en publicacion');
  // this.autorun(() => {
  if (this.userId) {
    console.log('Este es el user id:', this.userId);
    console.log('hago query');

    const handle = Meteor.users.find(
      { _id: this.userId },
      { fields: { _id: 1, emails: 1, profile: 1 } },
    ).observeChanges({
        added: function (id, fields) {
          self.added('userData', id, fields);
        },
        changed: function (id, fields) {
          self.changed('userData', id, fields);
        },
        removed: function (id) {
          self.removed('userData', id);
        },
    });
    console.log('handle:', handle);
    self.ready();
    self.onStop(function () {
      handle.stop();
    });
  }
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
