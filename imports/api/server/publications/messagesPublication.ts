// imports/api/server/publications/messagesPublication.ts
import { Meteor } from 'meteor/meteor';
import { MessagesCollection } from '/imports/api/collections/messages';
import type { Message } from '/imports/api/collections/messages';

// The 'this' context in a publication function is of type Meteor.Publication
// We can be more explicit if needed, or rely on Meteor's typings.
Meteor.publish('messages.all', function publishAllMessages(): Mongo.Cursor<Message> | void {
  if (!this.userId) {
    // If you just want to signal readiness without sending data:
    // this.ready();
    // return;
    // Or, to explicitly return an empty cursor of the correct type if no data is allowed:
    return MessagesCollection.find({ _id: 'nonexistent' }); // Query that returns no results
  }

  // Publish messages, sorted by newest first, limit to 50 (example)
  return MessagesCollection.find({}, { sort: { createdAt: -1 }, limit: 50 });
});