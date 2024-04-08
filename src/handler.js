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

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler };
