const exp = require("constants");
const { response } = require("express");
const express = require(`express`);
const rua = require(`path`);
const notes = require(`./db/db.json`)
const {uid} = require(`uid`)
const PORT = 3005;

const app = express();

// Set route to access html files
app.use(express.static(rua.join(__dirname, `public`)));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// Set path for indx
app.get(`/`, (req, res) => {
    res.sendFile(rua.join(__dirname, `public`, 'index.html'))
})

// Set path for notes
app.get(`/notes`, (req, res) => {
    res.sendFile(rua.join(__dirname, `public`, 'notes.html'))
})

//Designate notes pattern and layout from api w/ this data
app.get(`/api/notes`, (req, res) => {
    res.json(notes)
})

//Apply this output from afore data
app.post(`/api/notes`, (req, res) => {
    let notasNovo = {
        titulo:req.body.title,
        identidade: uid(),
        escrita:req.body.text 
    }

    notes.push(notasNovo)
    response.json(200)
})

//Designate code blocks for DELETE (`DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete.)
app.delete(`/api/notes/:id`, (req, res) =>{
    notes = notes.filter(note => note.identidade != req.params.id)
})

app.listen(proccess.env.PORT || 3005);
