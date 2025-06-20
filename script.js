const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

addBtn.addEventListener("click", () => addNewNote());

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
   <div class="tools">
     <button class="edit"><i class="fas fa-edit"></i></button>
     <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>
  
<div class="main ${text ? "" : "hidden"}"></div>
<textarea class="${text ? "hidden" : ""}"></textarea>`;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const mainBtn = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  mainBtn.innerHTML = marked(text);

  deleteBtn.addEventListener("click", () => {
    note.remove();

    updateStorage();
  });
  editBtn.addEventListener("click", () => {
    mainBtn.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    mainBtn.innerHTML = marked(value);

    updateStorage();
  });

  document.body.appendChild(note);
}

function updateStorage() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem("notes", JSON.stringify(notes));
}
