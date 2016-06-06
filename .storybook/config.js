import { configure } from '@kadira/storybook';
import '../worona-dashboard-client/themes/chess-theme/style.sass';

function loadStories() {
  require('../worona-dashboard-client/themes/chess-theme/components/elements/stories/button.js');
  require('../worona-dashboard-client/themes/chess-theme/components/elements/stories/input.js');
}

configure(loadStories, module);
