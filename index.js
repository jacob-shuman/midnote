/*
Saved Data Structure
interface MidNoteData{
    note?: Note;
}

Note Structure
interface MidNote {
    text: string;
    lastSaveTime: string;
}
*/

window.addEventListener("DOMContentLoaded", (event) => {
  // Variables
  let note = {
    text: "",
    lastSaveTime: undefined
  };

  // Constants
  const fs = new Filer.FileSystem();
  const DEFAULT_NOTE = "There is no note saved... Click here to enter a note!";
  const AUTO_SAVE_INTERVAL = 10; //In seconds

  // DOM References
  const noteText = document.getElementById("note");
  const resetNoteButton = document.getElementById("resetNoteButton");
  const resetConfirmCheckbox = document.getElementById("resetConfirmCheckbox");
  const autoSaveTitleText = document.getElementById("autoSaveTitle");
  const lastSaveTimeText = document.getElementById("lastSaveTime");

  // Functions
  const setNote = function(note) {
    noteText.innerHTML = note;
  };

  const getNote = function() {
    return noteText.innerHTML;
  };

  const resetNote = function() {
    if (resetConfirmCheckbox.checked) {
      // Uncheck reset confirmation box
      resetConfirmCheckbox.checked = false;

      setNote(DEFAULT_NOTE);
      saveNote();
    }
  };

  const updateLastSaveTime = function() {
    note.lastSaveTime = Date(Date.now());
    updateLastSaveText();
  };

  const updateLastSaveText = function() {
    // lastSaveTimeText.innerHTML = "Save last occured at: " + Date(Date.now());
    lastSaveTimeText.innerHTML = note.lastSaveTime ? "Save last occured at: " + note.lastSaveTime : "Note has never saved";
  };

  const saveNote = function() {
    note = {
      text: getNote(),
      lastSaveTime: ""
    };

    fs.writeFile("/note", JSON.stringify(note), "utf8", function(err) {
      if (!err) {
        updateLastSaveTime();
      }
    });
  };

  autoSaveTitleText.innerHTML = `This page autosaves your note every ${AUTO_SAVE_INTERVAL} seconds`;

  // Search for previously saved note(s)
  fs.readFile("/note", "utf8", function(err, data) {
    if (data) note = JSON.parse(data);
    
    // Update note if previous data exists
    setNote(err ? DEFAULT_NOTE : note.text);

    // Initiate auto save
    setInterval(saveNote, AUTO_SAVE_INTERVAL * 1000);

    saveNoteButton.onclick = saveNote;
    resetNoteButton.onclick = resetNote;
  });
});
