const express = require(`express`);
const rua = require(`path`);
let notes = require(`./db/db.json`);
const {uid} = require(`uid`);
const fs = require("fs");
const PORT = process.env.PORT || 3005;

const app = express();

// Set route to access html files
app.use(express.static(rua.join(__dirname, `public`)));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set path for indx
app.get(`/`, (req, res) => {
    res.sendFile(rua.join(__dirname, `public`, 'index.html'))
});

// Set path for notes
app.get(`/notes`, (req, res) => {
    res.sendFile(rua.join(__dirname, `public`, 'notes.html'))
});

//Designate notes pattern and layout from api w/ this data
app.get(`/api/notes`, (req, res) => {
    res.json(notes)
});

//Apply this output from afore data
app.post(`/api/notes`, (req, res) => {
    let newNotes = {
        titulo:req.body.title,
        identidade: uid(),
        escrita:req.body.text 
    };

    notes.push(newNotes)
    fs.writeFile(rua.join(__dirname, "db", "db.json"), JSON.stringify(notes), src => {
        if (err) (console.log(err))
        res.json(newNotes)
    });

})

//Designate code blocks for DELETE (`DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete.)
app.delete(`/api/notes/:id`, (req, res) =>{
    notes = notes.filter(note => note.identidade !== req.params.identidade);
    res.json(notes)

    // reaFromFile(rua.join(__dirname, "db", "db.json"), JSON.stringify(notes), src => {
    //     if (err) (console.log(err))
    //     res.json(notes)
    // });

});

app.listen(PORT, () =>{
    console.log('App running')
});
