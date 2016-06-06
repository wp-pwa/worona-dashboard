/* eslint-disable consistent-return */
import { MongoClient } from 'mongodb';

const state = {
  db: null,
};

export const connect = (url, done) => {
  if (state.db) return done();

  MongoClient.connect(url, (err, db) => {
    if (err) return done(err);
    state.db = db;
    return done();
  });
};

export const get = () => state.db;

export const close = done => {
  if (state.db) {
    state.db.close(err => {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};
