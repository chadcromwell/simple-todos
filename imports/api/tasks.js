/*
* MongoDB Collection of tasks
*/
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');