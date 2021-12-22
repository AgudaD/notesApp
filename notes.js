const fs = require('fs');

let  fetchNotes = () => {
    try{
        return (JSON.parse(fs.readFileSync('notes.txt')));
    }catch(err){
        return []
    }
}

let addNote = (title, body) => {
    let notes = fetchNotes();

    let note = {
        title,
        body
    }

    let duplicate = notes.filter((notes) => note.title === title);
    if(duplicate.length === 0){
        notes.push(note)
        fs.writeFileSync('notes.txt', JSON.stringify(notes));

        logNote(note);
        
    }else{
        console.log("Title taken");
    }

    
    
}



let deleteNote = (title) => {
    let notes = fetchNotes();

    let filteredNotes = notes.filter((note) => note.title !== title);
     
    fs.writeFileSync('notes.txt', JSON.stringify(filteredNotes));
}

let readNote = (title) => {
    let notes = fetchNotes();

    let filteredNotes = notes.filter((note) => note.title === title)
    logNote(filteredNotes[0])
}

let listAll = () => {
    let notes = fetchNotes();
    
    notes.forEach(note => logNote(note));
}

let  logNote = (note) => {
    console.log('*****************');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    deleteNote,
    readNote,
    listAll
}



