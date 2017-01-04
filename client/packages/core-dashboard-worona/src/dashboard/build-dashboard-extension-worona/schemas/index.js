import { schema } from 'normalizr';

export const packages = new schema.Entity('packages', {}, { idAttribute: 'name' });
export const arrayOfPackages = new schema.Array(packages);
