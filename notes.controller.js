const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk");
const {green} = require("chalk");
const {epilog} = require("yargs");

const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {

    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen("Note was added!"))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: "utf-8"})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()

    console.log(chalk.bgBlue("There is the LIst of notes:"))
    notes.forEach(note => console.log(chalk.blue(note.title)))
}

module.exports = {
    addNote, printNotes
}