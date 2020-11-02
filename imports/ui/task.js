import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

//TASK TEMPLATE
Template.task.events({
    //When toggle-checked class is clicked
    'click .toggle-checked'() {
        //Invert the checked property of the task
        Tasks.update(this._id, {
            $set: { checked: !this.checked },
        });
    },
    //If delete class is clicked
    'click .delete'() {
        Tasks.remove(this._id); //Remove the task from the Collection
    },
});