import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const init = () => {
  const Posts = new Mongo.Collection('posts');

  Meteor.publish('posts', () => Posts.find());

  console.log('Dashboard server initiated successfully again.');
};

Meteor.startup(() => init());
