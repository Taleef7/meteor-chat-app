// client/main.js
import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';
import './main.css';

Meteor.startup(() => {
  new App({
    target: document.getElementById('app') // Or your actual target ID from main.html
  });
});