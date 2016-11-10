export const getNameAndEmail = state => {
  const email = state.profile.userInfo.emails[0].address;
  const name = state.profile.userInfo.profile.name;
  return { email, name };
};
