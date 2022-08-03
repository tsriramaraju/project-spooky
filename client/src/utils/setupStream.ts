import Pusher from 'pusher-js';

export const setUpStream = () => {
  const pusher = new Pusher('6992ffe6f3644c492ed5', {
    cluster: 'us2',
  });

  const channel = pusher.subscribe('my-channel');
  return channel;
};
