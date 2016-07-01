import { dep } from 'worona-deps';

export const themeName = () => dep('build', 'selectors', 'theme').name;
