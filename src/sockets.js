import { v4 as uuid } from "uuid";

let notes = [];
const {getProduct, addProduct, getProductById, updateProduct, deleteProduct} = new ProductManager('./products.json')

export default (io) => {
  io.on("connection", (socket) => {

    console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    socket.emit("server:loadnotes",  async(req, res) => {
        const result= await getProduct()
        console.log(result)
        return result
    });

    socket.on("client:newnote", async(newNote) => {
      const result = await addProduct(newNote)
      io.emit("server:newnote", result);
      console.log(result)
      return result
    });

    socket.on("client:deletenote", (noteId) => {
      console.log(noteId);
      notes = notes.filter((note) => note.id !== noteId);
      io.emit("server:loadnotes", notes);
    });

    socket.on("client:getnote", (noteId) => {
      const note = notes.find((note) => note.id === noteId);
      socket.emit("server:selectednote", note);
    });

    socket.on("client:updatenote", (updatedNote) => {
      notes = notes.map((note) => {
        if (note.id === updatedNote.id) {
          note.title = updatedNote.title;
          note.description = updatedNote.description;
        }
        return note;
      });
      io.emit("server:loadnotes", notes);
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
