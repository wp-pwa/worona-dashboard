import * as t from '../actiontypes';

export const themeLoadRequested = name => ({ type: t.THEME_LOAD_REQUESTED, name });
export const themeLoadSucceed = name => ({ type: t.THEME_LOAD_SUCCEED, name });
export const themeLoadFailed = error => ({ type: t.THEME_LOAD_FAILED, error });

export const extensionLoadRequested = name => ({ type: t.EXTENSION_LOAD_REQUESTED, name });
export const extensionLoadSucceed = name => ({ type: t.EXTENSION_LOAD_SUCCEED, name });
export const extensionLoadFailed = error => ({ type: t.EXTENSION_LOAD_FAILED, error });

export const extensionsLoadRequested = name => ({ type: t.EXTENSIONS_LOAD_REQUESTED, name });
export const extensionsLoadSucceed = name => ({ type: t.EXTENSIONS_LOAD_SUCCEED, name });
export const extensionsLoadFailed = error => ({ type: t.EXTENSIONS_LOAD_FAILED, error });
