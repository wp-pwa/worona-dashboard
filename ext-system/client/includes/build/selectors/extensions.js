import * as reducers from '../reducers/extensions';

const extensions = {};
reducers.forEach(reducer => { extensions[reducer] = state => state.build.extensions[reducer]; });

export default extensions;
