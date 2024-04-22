const socket = io.connect();

const saveNote = (title, description, price, code, stock, category) => {
  socket.emit("client:newnote", {
    title,
    description,
    price,
    code,
    stock,
    category
  });
};


const deleteNote = (id) => {
  socket.emit("client:deletenote", id);
};

const updateNote= (id, title, description) => {
  socket.emit("client:updatenote", {
    title,
    description,
    price,
    code,
    stock,
    category
  });
};

socket.on("server:loadnotes", renderNotes);

socket.on("server:newnote", appendNote);

socket.on("server:selectednote", (note) => {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  title.value = note.title;
  description.value = note.description;
  price.value = note.description;
  code.value = note.description;
  stock.value = note.description;
  category.value = note.description;

  savedId = note.id;
});
