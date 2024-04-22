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
  const price = document.getElementById("price");
  const code = document.getElementById("code");
  const stock = document.getElementById("stock");
  const category = document.getElementById("caregory");

  title.value = note.title;
  description.value = note.description;
  price.value = note.price;
  code.value = note.code;
  stock.value = note.stock;
  category.value = note.category;

  savedId = note.id;
});
