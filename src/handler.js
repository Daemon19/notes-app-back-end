const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const success = notes.find((note) => note.id === id) !== undefined;

  if (!success) {
    return h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    }).code(500);
  }

  return h.response({
    status: 'success',
    message: 'Catatan berhasil ditambahkan',
    data: {
      noteId: id,
    },
  }).code(201);
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: { notes },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.find((note) => note.id === id);

  if (note === undefined) {
    return h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    }).code(404);
  }

  return {
    status: 'success',
    data: { note },
  };
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui catata. ID tidak ditemukan',
    }).code(404);
  }

  notes[index] = {
    ...notes[index], title, tags, body, updatedAt,
  };

  return h.response({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  }).code(200);
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'TODO',
    }).code(404);
  }

  notes.splice(index, 1);

  return h.response({
    status: 'success',
    message: 'Catatan berhasil dihapus',
  }).code(200);
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
