window.addEventListener("DOMContentLoaded", (event) => {
  const DEFAULT_NOTE = "There is currently no note saved.";
  const fs = new Filer.FileSystem();

  // DOM References
  const noteText = document.getElementById("note");

  // Functions
  const setNote = function(note) {
      noteText.innerHTML = note;
  };

  fs.readFile("/note", "utf8", function(err, data) {
    setNote(err ? DEFAULT_NOTE : data);
  });
});
