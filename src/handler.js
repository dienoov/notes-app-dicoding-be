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

module.exports = { addNoteHandler };
