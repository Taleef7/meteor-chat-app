// imports/api/collections/messages.ts
import { Mongo } from 'meteor/mongo';

export interface Message {
  _id?: string;
  text: string;
  createdAt: Date;
  userId: string;
  username: string; // Denormalized for easier display
  // roomId?: string; // We can add this later if we do multiple rooms
}

// Explicitly type the collection with the Message interface
export const MessagesCollection = new Mongo.Collection<Message>('messages');