const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");
function saveNotes() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

function loadNotes() {
    const saved = localStorage.getItem('notes');
    if (saved && saved !== 'null') {
        notesContainer.innerHTML = saved;
    } else {
        notesContainer.innerHTML = '';
    }
    attachListenersToNotes();
}

function createNoteElement(text = '') {
    const p = document.createElement('p');
    p.className = 'input-box';
    p.setAttribute('contenteditable', 'true');
    p.innerHTML = text;

    const img = document.createElement('img');
    img.src = 'images/delete.png';
    img.alt = 'delete';
    img.className = 'delete-btn';

    p.appendChild(img);

    // Save on input
    p.addEventListener('input', saveNotes);

    // Delete button
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        p.remove();
        saveNotes();
    });

    return p;
}

function attachListenersToNotes() {
    document.querySelectorAll('.input-box').forEach(p => {
        // If the note was loaded from HTML, it may already have an img inside
        let img = p.querySelector('img');
        if (!img) {
            img = document.createElement('img');
            img.src = 'images/delete.png';
            img.alt = 'delete';
            img.className = 'delete-btn';
            p.appendChild(img);
        }

        // Avoid adding duplicate listeners: clone the node to reset listeners
        const imgClone = img.cloneNode(true);
        img.replaceWith(imgClone);
        imgClone.addEventListener('click', (e) => {
            e.stopPropagation();
            p.remove();
            saveNotes();
        });

        // Ensure input saves
        p.addEventListener('input', saveNotes);
    });
}

createBtn.addEventListener('click', () => {
    const note = createNoteElement('');
    notesContainer.appendChild(note);
    saveNotes();
    // Focus the new note for immediate editing
    note.focus();
});

// Initialize
loadNotes();
