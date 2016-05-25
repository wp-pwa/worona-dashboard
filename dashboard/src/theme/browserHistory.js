import { browserHistory } from 'react-router';

// Mock browserHistory if it doesn't exist to be able to use it in tests (node).
const browserHistoryMock = browserHistory || { push: () => {} };

export { browserHistoryMock as browserHistory };
