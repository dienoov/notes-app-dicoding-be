const notes = require('./notes');

const addNoteHandler = (request, h) => {
  try {
    const { title, tags, body } = request.payload;
    const id = +new Date();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    notes.push({
      id, title, tags, body, createdAt, updatedAt,
    });

    return h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    }).code(201);
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    }).code(500);
  }
};

const getAllNotesHandler = (request, h) => h.response({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.find((n) => n.id === +id);

  if (note) {
    return h.response({
      status: 'success',
      data: {
        note,
      },
    });
  }

  return h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  }).code(404);
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const note = notes.find((n) => n.id === +id);

  if (!note) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    }).code(404);
  }

  note.title = title;
  note.tags = tags;
  note.body = body;
  note.updatedAt = updatedAt;

  return h.response({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  });
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((n) => n.id === +id);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  notes.splice(index, 1);

  return h.response({
    status: 'success',
    message: 'Catatan berhasil dihapus',
  });
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
