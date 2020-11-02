import { Template } from 'meteor/templating';
import { ReactiveDict }  from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import './body.html';
import './task.js';

//Add state dictionary to the body
Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

//Helpers for Body. Used to pass data from JS to templates
Template.body.helpers({
    //tasks() - Returns all tasks from tasks.js (Tasks mongoDB collection)
    tasks() {
        const instance = Template.instance(); //get the instance of the template
        //If the state is hideCompleted, we want to hide the completed tasks, so:
        if(instance.state.get('hideCompleted')) {
            return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}}); //Find only the entries that are not checked, sorted by the createdAt attribute, ascending
        }
        return Tasks.find({}, {sort: {createdAt: -1}}); //Returns all items in Tasks Collection, sorted by the createdAt attribute, ascending
    },
    //incompleteCount() - Counts how many tasks are yet to be completed
    incompleteCount() {
        return Tasks.find({checked: {$ne: true}}).count();
    }
});

//Events for body
Template.body.events({
    //When submit is performed on anything with class "new-task"
    'submit.new-task'(event) {
        event.preventDefault(); //Prevent browser from refreshing
        console.log(event); //Log the target object to console for inspection

        const target = event.target; //Get the target object of the event
        const text = target.text.value; //Get the text from the target object

        //Insert the task into the MongoDB Tasks Collection
        Tasks.insert({
            text, //The text
            createdAt: new Date(), //The time it was submitted
        });

        target.text.value = ''; //Clear the form after inserted
    },
    //When the hide completed tasks box is checked/unchecked
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
});