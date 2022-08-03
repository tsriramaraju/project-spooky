import { pusher } from "../app";

export const sendPusherEvent = (message: any, event: string) => {
  pusher.trigger("my-channel", event, {
    message,
  });
};
