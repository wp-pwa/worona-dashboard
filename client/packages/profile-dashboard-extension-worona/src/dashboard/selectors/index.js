export const getNameAndEmail = state => {
  const email = state.profile.user.emails[0].address;
  const name = state.profile.user.profile.name;
  return { email, name };
};
