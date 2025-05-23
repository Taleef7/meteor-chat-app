// server/main.ts
import { Meteor } from 'meteor/meteor';

// Import collections, publications, and methods to ensure they are loaded by the server
import '/imports/api/collections/messages'; // Loads the collection definition
import '/imports/api/server/publications/messagesPublication'; // Registers the publication
import '/imports/api/server/methods/messagesMethods'; // Registers the methods

Meteor.startup(async () => {
  console.log('Meteor server (TypeScript) started and message APIs loaded.');
  // You can add some initial seed data for messages here for testing if MessagesCollection is empty
  // if (await MessagesCollection.find().countAsync() === 0) {
  //   MessagesCollection.insert({
  //     text: 'Welcome to the chat!',
  //     createdAt: new Date(),
  //     userId: 'system',
  //     username: 'System',
  //   });
  // }
});