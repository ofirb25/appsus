var notes = [
    {
        "id": 34702,
        "title": "lacus porttitor dui porta mi",
        "text": `quis nec consequat nunc lacus rutrum
        sed tortor id pretium pharetra
         egestas nullam dolor amet at et pulvinar`,
        "image": 34702,
        "color": "salmon",
        "proiority": 3,
        "created": Date.now()
    },
    {
        "id": 34704,
        "title": "vel malesuada donec amet lacus",
        "text": `quis nec consequat nunc lacus rutrum
        sed tortor id pretium pharetra
         egestas nullam dolor amet at et pulvinar`,
        "image": 34704,
        "color": "lightgreen",
        "proiority": 2,
        "created": Date.now()
    },
    {
        "id": 34706,
        "title": "amet dui libero tellus magna",
        "text": `quis nec consequat nunc lacus rutrum
        sed tortor id pretium pharetra
         egestas nullam dolor amet at et pulvinar`,
        "image": 34706,
        "color": "salmon",
        "proiority": 1,
        "created": Date.now()
    },
    {
        "id": 34708,
        "title": "consequat ac dolor id tempor",
        "text": `quis nec consequat nunc lacus rutrum
        sed tortor id pretium pharetra
         egestas nullam dolor amet at et pulvinar`,
        "image": 34708,
        "color": "lightblue",
        "proiority": 3,
        "created": Date.now()
    },
    {
        "id": 34710,
        "title": "OLD mi ipsum ac adipiscing massa",
        "text": `quis nec consequat nunc lacus rutrum
        sed tortor id pretium pharetra
        egestas nullam dolor amet at et pulvinar.
        quis nec consequat nunc lacus rutrum
        sed tortor id pretium pharetra
        egestas nullam dolor amet at et pulvinar`,
        "image": 34710,
        "color": "lightblue",
        "proiority": 2,
        "created": 1512496438848
    },
    {
        "id": 34711,
        "title": "mi ipsum ac adipiscing massa",
        "text": `quis nec consequat nunc lacus rutrum
        sed tortor id pretium pharetra
         egestas nullam dolor amet at et pulvinar`,
        "image": 34711,
        "color": "lightgreen",
        "proiority": 1,
        "created": Date.now()
    }
];

function getNotes() {
    return Promise.resolve(notes)
}

function getNoteById(id) {
    return new Promise((resolve, reject) => {

        var note = notes.find(note => note.id === +id);
        if (note) {
            resolve(note)
        } else {
            reject('no note found')
        }
    })
}



function _getNextId() {
    var maxId = notes.reduce((acc, note) => {
        return (note.id > acc) ? note.id : acc
    }, 0);
    return maxId + 1;
}

function saveNote(noteToSave) {
    return new Promise((resolve, reject) => {
        if (noteToSave.id) {
            //treat edit mode
            let noteIdx = notes.findIndex(note => {
                return noteToSave.id === note.id
            })
            notes.splice(noteIdx, 1, noteToSave)
        } else {
            noteToSave.id = _getNextId;
            notes.push(noteToSave)
        }
        resolve(noteToSave)
        // reject('error in saving');
    })
}

function deleteNote(noteId) {
    return new Promise((resolve, reject) => {
        let noteIdx = notes.findIndex(note => {
            return noteId === note.id
        });
        let noteToDelete = notes[noteIdx]
        notes.splice(noteIdx, 1);
        resolve(noteToDelete.title);
        // reject('the note could not be deleted');

    })

}

function sortByPriority() {
    return new Promise((resolve, reject) => {
        notes.sort(function (a, b) {
            return a.proiority - b.proiority;
        });    
        resolve()
    });
}

function sortByTime() {
    return new Promise((resolve, reject) => {
        notes.sort(function (a, b) {
            return  b.created - a.created;
        });    
        resolve()
    });
}


export default {
    getNotes,
    saveNote,
    getNoteById,
    deleteNote,
    sortByTime,
    sortByPriority,
    notes
}