/* eslint-disable no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Client as PostmarkClient } from 'postmark';
import { privateCreateSite } from '../sites/private';

Meteor.methods({
  createAccount(name, email, password) {
    check(name, String);
    check(email, String);
    check(password, String);

    if (process.env.NODE_ENV === 'development') Meteor._sleepForMs(2000);

    const userId = Accounts.createUser({ email, password });

    if (userId) {
      Meteor.users.update(userId, { $set: { profile: { name, lastSiteNumber: -1 } } });
    }

    privateCreateSite({ name: 'Demo', url: 'https://demo.worona.org', userId, isEditable: false });

    return userId;
  },
  forgotPasswordByEmail({ email }) {
    const user = Meteor.users.findOne({ 'emails.0.address': email });
    if (!user) return new Meteor.Error('email-doesnt-exist');
    const userId = user._id;
    const token = Random.secret();
    const when = new Date();
    const tokenRecord = {
      token,
      email,
      when,
    };
    Meteor.users.update(userId, {
      $set: {
        'services.password.reset': tokenRecord,
      },
    });
    // before passing to template, update user object with new token
    Meteor._ensure(user, 'services', 'password').reset = tokenRecord;

    const client = new PostmarkClient(Meteor.settings.postmark.serverKey);
    const sendEmailWithTemplate = Meteor.wrapAsync(client.sendEmailWithTemplate, client);

    const res = sendEmailWithTemplate({
      From: 'support@worona.org',
      TemplateId: 1287034,
      To: email,
      TemplateModel: {
        name: user.profile.name,
        action_url: `https://dashboard.worona.org/recover-password?token=${tokenRecord.token}`,
      },
    });

    return res;
  },
});
