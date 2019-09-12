/*
Saved Data Structure
interface MidNoteData{
    note?: Note;
}

Note Structure
interface MidNote {
    text: string;
    lastSavedTime: string;
    tags?: string[];
}
*/

window.addEventListener("DOMContentLoaded", (event) => {
  //Constants
  const fs = new Filer.FileSystem();
  const DEFAULT_NOTE = "There is currently no note saved.";
  const AUTO_SAVE_INTERVAL = 10; //In seconds

  // DOM References
  const noteText = document.getElementById("note");
  const lastAutoSaveTimeText = document.getElementById("lastAutoSaveTime");
  const autoSaveTitleText = document.getElementById("autoSaveTitle");

  // Functions
  const setNote = function(note) {
    noteText.innerHTML = note;
  };
  const getNote = function() {
    return noteText.innerHTML;
  };

  const updateLastAutoSaveText = function() {
    lastAutoSaveTimeText.innerHTML = "Auto save last occured at: " + Date(Date.now());
  }
  
  const saveNote = function() {
    updateLastAutoSaveText();
  };

  autoSaveTitleText.innerHTML = `This page autosaves your note every ${AUTO_SAVE_INTERVAL} seconds`

  // Search for previously saved note(s)
  fs.readFile("/note", "utf8", function(err, data) {
    // Update note if previous data exists
    setNote(err ? DEFAULT_NOTE : data);

    console.log(err);

    // Initiate auto save
    setInterval(saveNote, AUTO_SAVE_INTERVAL * 1000);


  });
});
