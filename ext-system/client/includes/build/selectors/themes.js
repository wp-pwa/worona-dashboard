import * as reducers from '../reducers/themes';

const themes = {};
reducers.forEach(reducer => { themes[reducer] = state => state.build.themes[reducer]; });

export default themes;
