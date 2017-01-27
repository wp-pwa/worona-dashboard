import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { privateCreateSite } from '../sites/private';

Meteor.methods({
  createAccount(name, email, password) {
    check(name, String);
    check(email, String);
    check(password, String);

    if (process.env.NODE_ENV === 'development') Meteor._sleepForMs(2000);

    const userId = Accounts.createUser({ email, password });

    if (userId) {
      Meteor.users.update(userId, { $set: { profile: { name } } });
    }

    privateCreateSite({ name: 'Demo', url: 'https://demo.worona.org', userId });

    return userId;
  },
});
