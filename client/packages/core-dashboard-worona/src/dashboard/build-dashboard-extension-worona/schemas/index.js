import { Schema, arrayOf } from 'normalizr';

export const packages = new Schema('packages', { idAttribute: 'name' });
export const arrayOfPackages = arrayOf(packages);
