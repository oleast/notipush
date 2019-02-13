# Webpush as a service

## Note that this project serves mostly as a proof of concept for sending webpush notifications. It is by most standards not production ready, and should be handeled with a grain of salt.

This project is built as a microservice which sends webpush notifications. It has apublic API for users to register their devices and control their settings, and a private API for other authenticated services to schedule notifications and create other resources.

## API

### Public

All routes in the public API require a valid `Bearer` token set in the `authentication` header of the request.
This token must be valid for a user of Onlineweb4.

#### `post: /public/subscribe`:
Used to register a client with the push service.

Requires a body of type: `PushSubscription`:

``` typescript
type PushSubscription = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};
```

#### `post: /public/unsubscribe`:
Same as subscribe, but unsubscribes.

#### `get: /public/user-channels`:
Get all the channels the user subscribes to.

#### `post: /public/user-channels`:
Set the channels the user subscribes to.

Requires a body of type `string[]`. As a list of all the channel names a user subscribes to. This will currently overwrite any previous configuration.

#### `get: /public/channels`:
Get all the available channels a user can subscribe to.

### Private

All routes in the private API require a valid `Bearer` token set in the `authentication` header of the request.
This token is distrubuted only to trusted services, and will not be available to users.

#### `post: /private/create-notification`:
Create/schedule a notification to users or channels.

Requires a body of type `Notification`:

``` typescript
/**
 * Note that options with a questionmark (?) are optional unless otherwise specified.
 */
type Notification = {
  /**
   * Send to either users or a channel.
   * Channels are used if both are specified.
   * If none are specified, none will get any notification.
   */
  users?: string[]; // list of usernames from OW4. Should convert to ID.
  channel?: string; // Can send to a single channel. Specify channelName.

  /* ISO DateTime with timezone */
  sendTime: string; // The time the notification will be sent. Currently has to be in the future.
  title: string; // String which will be displayed at the top of the notification.
  body: string; // Rest of the text in the notification.
  tag?: string; // Identifier. Notification with the same tag removes the previous one.
  image?: string; // Large image to display, like article or event image.
  icon?: string; // Small image to display, like application icon. Default is OWF icon.
  requireInteraction?: boolean; // ?
  renotify?: boolean; // ?
  silent?: boolean; // ?
  /* ISO DateTime with timezone */
  timestamp?: string; // ? The timestamp of the notification. Default is Date.now().
  url?: string; // The URL to open when the notification is clicked.
  actions: Array<{ // List of actions/buttons to appear in the notification.
    action: string; // ID, used to identify which button was clicked. Will need to be implemented in serviceworker.
    title: string; // The text displayed in the button.
    icon?: string; // Icon displayed in the button.
  }>;
};

```

Read more about the notification type: https://web-push-book.gauntface.com/demos/notification-examples/

#### `post: /private/channels`:
Get all the channels the user subscribes to.
