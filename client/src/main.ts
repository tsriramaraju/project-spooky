import { setUpFrame } from './layout/frame';
import { setUpStream } from './utils/setupStream';

export const channel = setUpStream();
setUpFrame('#app');
