let notes = JSON.parse(localStorage.getItem("notes")) || [];

const notesList = document.getElementById("notesList");
const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteDesc");
const editIndex = document.getElementById("editIndex");
const saveBtn = document.getElementById("saveNoteBtn");

function displayNotes() {
  notesList.innerHTML = "";

  notes.forEach((note, i) => {
    notesList.innerHTML += `
      <div class="col-md-4">
        <div class="note-card ${note.color} p-3 border rounded position-relative">
          <div class="note-actions position-absolute top-0 end-0 me-2 mt-2">
            <i class="bi bi-pencil-square edit-note text-primary me-2" data-index="${i}" style="cursor:pointer;"></i>
            <i class="bi bi-trash delete-note text-danger" data-index="${i}" style="cursor:pointer;"></i>
          </div>

          <h6>${note.title}</h6>
          <p>${note.text}</p>
        </div>
      </div>
    `;
  });

  attachListeners();
}

function attachListeners() {
  document.querySelectorAll(".edit-note").forEach(btn => {
    btn.addEventListener("click", () => openEditModal(btn.dataset.index));
  });

  document.querySelectorAll(".delete-note").forEach(btn => {
    btn.addEventListener("click", () => deleteNote(btn.dataset.index));
  });
}

function openEditModal(index) {
  editIndex.value = index;
  noteTitle.value = notes[index].title;
  noteText.value = notes[index].text;

  let modal = new bootstrap.Modal(document.getElementById("noteModal"));
  modal.show();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

saveBtn.addEventListener("click", () => {
  const title = noteTitle.value.trim();
  const text = noteText.value.trim();
  if (!title || !text) return alert("Please fill all fields");

  const colors = ["bg-yellow", "bg-blue", "bg-red"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const idx = editIndex.value;

  if (idx === "") {
    // Add new
    notes.push({ title, text, color: randomColor });
  } else {
    // Edit existing
    notes[idx] = { title, text, color: randomColor };
  }

  localStorage.setItem("notes", JSON.stringify(notes));

  noteTitle.value = "";
  noteText.value = "";
  editIndex.value = "";

  document.querySelector(".btn-close").click();

  displayNotes();
});





function editNote(i) {
  noteTitle.value = notes[i].title;
  noteText.value = notes[i].text;
  editIndex.value = i;

  document.getElementById("modalTitle").innerText = "Edit Notes";


  new bootstrap.Modal(document.getElementById("noteModal")).show();
}



function deleteNote(i) {
  notes.splice(i, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}
