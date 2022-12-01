const yargs = require('yargs')
const pkg = require("./package.json")
const {addNote, printNotes, removeNotes} = require("./notes.controller");

yargs.version(pkg.version)

yargs.command({
    command: "add",
    describe: "Add new note to the List",
    builder: {
        title: {
            type: "string",
            describe: "Note title",
            demandOption: true
        }
    },
    handler({title}) {
        addNote(title)
    }
})

yargs.command({
    command: "remove",
    describe: "Remove note by id",
    builder: {
        id: {
            type: "string",
            describe: "Note unique id",
            demandOption: true
        }
    },
    async handler({id}) {
        await removeNotes(id)
}})

yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler() {
        await printNotes()
    }
})

yargs.parse()