import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function usersPublish() {
  this.autorun(() =>
    Meteor.users.find(
      { _id: this.userId },
      { fields: { _id: 1, emails: 1, profile: 1 } }
    )
  );
});
