const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk");
const {green} = require("chalk");
const {epilog} = require("yargs");

const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {
    try {
        const notes = await getNotes()

        const note = {
            title,
            id: Date.now().toString()
        }

        notes.push(note)
        await fs.writeFile(notesPath, JSON.stringify(notes))
        console.log(chalk.bgGreen("Note was added!"))
    } catch (error) {
        console.error(error)
    }


}

async function getNotes() {
    try {
        const notes = await fs.readFile(notesPath, {encoding: "utf-8"})
        return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
    } catch (error) {
        console.error(error)
    }
}

async function printNotes() {
    try {
        const notes = await getNotes()

        console.log(chalk.bgBlue("There is the List of notes:"))
        await notes.forEach(note => console.log(chalk.blue(note.id), chalk.green(note.title)))
    } catch (error) {
        console.error(error)
    }
}

async function updateNote({id, title}) {
    try {
        const notes = await getNotes()

        const note = notes.find(item => item.id === id)
        if (note) {
            note.title = title
        }

        await fs.writeFile(notesPath, JSON.stringify(notes))
    } catch (error) {
        console.error(error)
    }

}

async function removeNotes(id) {
    try {

        const notes = await getNotes()

        const removedNote = notes.filter(el => String(el.id) !== String(id))

        await fs.writeFile(notesPath, JSON.stringify(removedNote))
        console.log(chalk.red(`Note with ${id} was removed`))
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    addNote, getNotes, removeNotes, updateNote
}