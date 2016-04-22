export const CONNECTED = 'connection/CONNECTED';
export const connected = () => ({
  type: CONNECTED,
});

export const DISCONNECTED = 'connection/DISCONNECTED';
export const disconnected = () => ({
  type: DISCONNECTED,
});

export const LOGOUT_SUCCEED = 'connection/LOGOUT_SUCCEED';
export const loggedOut = () => ({
  type: LOGOUT_SUCCEED,
});
