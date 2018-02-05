console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes')

var argv = yargs.argv
var command = process.argv[2];
console.log(`Command: ${command}`);

if(command === 'add') {

  var note = notes.addNote(argv.title, argv.body)

  try {
    notes.printNote(note)
  } catch(e) {
    console.log("Title already exist's");
  }

} else if (command === 'list') {

  notes.getAll()

} else if (command === 'read') {

  note = notes.getNote(argv.title)

  if(note) {
    notes.printNote(note)
  } else {
    console.log('Note not found');
  }

} else if (command === 'remove') {

  var removed = notes.removeNote(argv.title)

  var result = removed ? 'Note was removed!' : 'Note not found.'
  console.log(result);

} else {
  console.log('Command not recognized');
}
