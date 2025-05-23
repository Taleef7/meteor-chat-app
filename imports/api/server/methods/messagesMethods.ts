// imports/api/server/methods/messagesMethods.ts
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MessagesCollection } from '/imports/api/collections/messages';

Meteor.methods({
  // Make the method async
  async 'messages.send'(text: string): Promise<void> {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to send messages.');
    }

    // Use findOneAsync and await
    const user = await Meteor.users.findOneAsync(this.userId);
    if (!user) {
      throw new Meteor.Error('user-not-found', 'User data could not be retrieved.');
    }

    const trimmedText = text.trim();
    if (trimmedText.length === 0) {
      throw new Meteor.Error('message-empty', 'Message text cannot be empty.');
    }

    // Use insertAsync and await
    await MessagesCollection.insertAsync({
      text: trimmedText,
      createdAt: new Date(),
      userId: this.userId,
      username: user.username || (user.emails && user.emails[0].address) || 'Anonymous',
    });

    // console.log(`Message from ${user.username || user.emails?.[0]?.address}: ${trimmedText}`); // Optional
  },
});