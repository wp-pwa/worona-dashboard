import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
  createAccount(name, email, password) {
    check(name, String);
    check(email, String);
    check(password, String);
    const userId = Accounts.createUser({ email, password });
    if (userId) {
      Meteor.users.update(userId, { $set: { name } });
    }
    Meteor._sleepForMs(5000);
    return userId;
  },
});
