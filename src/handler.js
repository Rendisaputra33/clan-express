/**
 * @param {import('mysql2/promise').Connection} connection
 * @returns
 */
const getHandler = (connection) => async (req, res) => {
  const result = await connection.query("SELECT * FROM tasks");
  res.json({
    status: "SUKSES",
    code: 200,
    data: result[0],
  });
};

/**
 * @param {import('mysql2/promise').Connection} connection
 * @returns
 */
const postHandler = (connection) => async (req, res) => {
  // mengambil input dari client/user menggunakan destrukturing object
  const { pekerjaan, sudah_selesai } = req.body;
  // mengambil tanggal hari ini
  const tanggal = new Date().toISOString();
  // melakukan format data agar sama dengan todo yang sudah ada
  const dataDiSimpan = [pekerjaan, sudah_selesai, tanggal];

  //tambahkan data ke array todo yang sudah tersedia
  await connection.query(
    "INSERT INTO tasks (task, completed, date) VALUES (? ,?, ?, ?)",
    dataDiSimpan
  );

  res.json({
    status: "SUKSES",
    code: 200,
    data: dataDiSimpan,
  });
};

/**
 * @param {import('mysql2/promise').Connection} connection
 * @returns
 */
const putHandler = (connection) => async (req, res) => {
  const id = parseInt(req.params.id);
  // mendapatkan id task dari parameter route
  const { pekerjaan, sudah_selesai } = req.body; // mendapatkan input dari client/user menggunakan destructuring object

  // mencari index task dengan id yang sesuai dengan id yang diterima dari parameter route
  const query = "SELECT * FROM tasks WHERE id = ?";
  const hasil = await connection.query(query, [id]);
  const task = hasil[0][0] ?? null;
  const date = new Date().toISOString().substring(0, 10);

  // jika task dengan id yang sesuai ditemukan, lakukan update data task
  if (task != null) {
    // mengubah date task
    await connection.execute(
      "UPDATE tasks SET task = ?, completed = ?, date = ? WHERE id = ?",
      [pekerjaan, sudah_selesai, date, id]
    );

    task.task = pekerjaan;
    task.completed = sudah_selesai;
    task.date = date;

    res.json({
      status: "SUKSES",
      code: 200,
      data: task, // mengirimkan data task yang telah diupdate ke client/user
    });
  } else {
    // jika task dengan id yang sesuai tidak ditemukan
    res.status(404).json({
      status: "GAGAL",
      code: 404,
      message: "Task tidak ada",
    });
  }
};

/**
 * @param {import('mysql2/promise').Connection} connection
 * @returns
 */
const deleteHandler = (connection) => async (req, res) => {
  const id = parseInt(req.params.id); // mendapatkan id task dari parameter route

  // mencari index task dengan id yang sesuai dengan id yang diterima dari parameter route
  const query = "SELECT * FROM tasks WHERE id = ?";
  const hasil = await connection.execute(query, [id]);
  const task = hasil[0][0] ?? null;

  // jika task dengan id yang sesuai ditemukan, lakukan penghapusan data task
  if (task != null) {
    // menghapus data task dengan menggunakan method splice() dan menyimpannya ke dalam variabel deletedTask
    await connection.execute("DELETE FROM tasks WHERE id = ?", [id]);
    // mengirimkan data task yang telah dihapus ke client/user
    res.json({
      status: "SUKSES",
      code: 200,
      data: task,
    });
  } else {
    // jika task dengan id yang sesuai tidak ditemukan
    res.status(404).json({
      status: "GAGAL",
      code: 404,
      message: "Task tidak ada",
    });
  }
};

module.exports = { getHandler, postHandler, putHandler, deleteHandler };
