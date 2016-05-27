export const isLoadingCreator = (requested, succeed, failed) => (state = false, action) => {
  switch (action.type) {
    case requested:
      return true;
    case succeed:
    case failed:
      return false;
    default:
      return state;
  }
};

export const isLoadedCreator = (requested, succeed) => (state = false, action) => {
  switch (action.type) {
    case succeed:
      return true;
    case requested:
      return false;
    default:
      return state;
  }
};
