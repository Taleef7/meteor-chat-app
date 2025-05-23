// client/main.ts
import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';
import './main.css';

Meteor.startup(() => {
  new App({
    target: document.getElementById('app') as HTMLElement, // Added type assertion
  });
});