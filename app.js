const fs = require('fs');
const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes')

titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}

bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}

var argv = yargs
.command('add', 'Add a new note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'List all notes')
.command('read', 'Read a note', {
  title: titleOptions
})
.command('remove', 'Remove a note', {
  title: titleOptions
})
.help()
.argv
var command = process.argv[2];

if(command === 'add') {

  var note = notes.addNote(argv.title, argv.body)

  try {
    notes.printNote(note)
  } catch(e) {
    console.log("Title already exist's");
  }

} else if (command === 'list') {

  allNotes = notes.getAll()

  console.log(`Total of ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.printNote(note))

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
