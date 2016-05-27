import * as t from '../actiontypes';

export const themeLoadRequested = name => ({ type: t.THEME_LOAD_REQUESTED, name });
export const themeLoadSucceed = () => ({ type: t.THEME_LOAD_SUCCEED });
export const themeLoadFailed = error => ({ type: t.THEME_LOAD_FAILED, error });

export const extensionLoadRequested = name => ({ type: t.EXTENSION_LOAD_REQUESTED, name });
export const extensionLoadSucceed = () => ({ type: t.EXTENSION_LOAD_SUCCEED });
export const extensionLoadFailed = error => ({ type: t.EXTENSION_LOAD_FAILED, error });
