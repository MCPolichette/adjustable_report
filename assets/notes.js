// Function to add a note to the notes container
function addNoteToContainer(title, txt) {
	const notesContainer = document.getElementById("notesContainer");
	const note = document.createElement("div");
	note.className = "note";
	note.innerHTML = `<div class="noteBox col-10">
    <h5>${title}</h5>
    <p>${txt}</p>
    <button type="button" class="close btn btn-warning removeForPrint" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
  `;

	note.querySelector(".close").addEventListener("click", function () {
		note.remove();
	});

	notesContainer.appendChild(note);
}

document.addEventListener("DOMContentLoaded", function () {
	const addNoteBtn = document.getElementById("addNoteBtn");
	addNoteBtn.addEventListener("click", function () {
		const noteTitleInput = document.getElementById("noteTitle");
		const title = noteTitleInput.value.trim();
		const txt = document
			.getElementById("noteText")
			.value.replace(/\r?\n/g, "<br />");
		if (title !== "" && txt !== "") {
			addNoteToContainer(title, txt);
			noteTitleInput.value = "";
		}
	});

	// Initialize draggable and sortable for notes
	const notesContainer = document.getElementById("notesContainer");
	let draggedNote = null;

	function handleDragStart(event) {
		draggedNote = event.target;
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.setData("text/html", draggedNote.outerHTML);
		draggedNote.classList.add("dragged");
	}

	function handleDragOver(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}

	function handleDrop(event) {
		event.preventDefault();
		if (event.target.classList.contains("note")) {
			event.target.insertAdjacentHTML(
				"beforebegin",
				draggedNote.outerHTML
			);
		} else {
			notesContainer.appendChild(draggedNote);
		}
		draggedNote.classList.remove("dragged");
	}

	notesContainer.addEventListener("dragstart", handleDragStart);
	notesContainer.addEventListener("dragover", handleDragOver);
	notesContainer.addEventListener("drop", handleDrop);
});
