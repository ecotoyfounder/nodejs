const express = require('express')
const chalk = require("chalk");
const path = require('path')
const {addNote, getNotes, removeNotes, updateNote} = require("./notes.controller");
const {application} = require("express");

const port = 3000

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.get('/', async (req, res) => {
    try {
        res.render('index', {
            title: 'Express App',
            notes: await getNotes(),
            created: false
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/', async (req, res) => {
    try {
        await addNote(req.body.title)
        res.render('index', {
            title: 'Express App',
            notes: await getNotes(),
            created: true
        })
    } catch (error) {
        console.log(error)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        await removeNotes(req.params.id)
        res.render('index', {
            title: 'Express App',
            notes: await getNotes(),
            created: false
        })
    } catch (error) {
        console.log(error)
    }
})

app.put('/', async (req, res) => {
    try {
        await updateNote(req.body)
        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            created: false,
        });
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`))
})