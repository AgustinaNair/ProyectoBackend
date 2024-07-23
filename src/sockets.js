import { v4 as uuid } from "uuid";
import { logger } from "./utils/logger.js";

let notes = [];
const {getProduct, addProduct, getProductById, updateProduct, deleteProduct} = new ProductDao('./products.json')

export default (io) => {
  io.on("connection", (socket) => {

    logger.info("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    socket.emit("server:loadnotes",  async(req, res) => {
        const result= await getProduct()
        logger.info(result)
        return result
    });

    socket.on("client:newnote", async(newNote) => {
      const result = await addProduct(newNote)
      io.emit("server:newnote", result);
      logger.info(result)
      return result
    });

    socket.on("client:deletenote", (noteId) => {
      logger.info(noteId);
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
      logger.info(socket.id, "disconnected");
    });
  });
};
