// memanggil router dari package express yang telah diinstall
const { Router } = require("express");
const todo = require("./todo");

// membuat instance object dari Router
const router = Router();

// mendaftarkan jalur dengan method GET untuk memuat data todo yang telah dibuat
router.get("/", function (req, res) {
  res.json({
    status: "SUKSES",
    code: 200,
    data: todo,
  });
});

// mendaftarkan jalur untuk menambah todo dengan methode POST
router.post("/", function (req, res) {
  // mengambil input dari client/user menggunakan destrukturing object
  const { pekerjaan, sudah_selesai } = req.body;
  // mencari id terakhir dari todo yang sudah tersedia
  const perkerjaanTerakhir = todo[todo.length - 1];
  const id = perkerjaanTerakhir ? perkerjaanTerakhir.id + 1 : 1;
  // mengambil tanggal hari ini
  const tanggal = new Date()
    .toLocaleDateString()
    .split("/")
    .reverse()
    .join("/");

  // melakukan format data agar sama dengan todo yang sudah ada
  const dataDiSimpan = {
    id: id,
    task: pekerjaan,
    completed: sudah_selesai,
    date: tanggal,
  };

  //tambahkan data ke array todo yang sudah tersedia
  todo.push(dataDiSimpan);

  res.json({
    status: "SUKSES",
    code: 200,
    data: dataDiSimpan,
  });
});

// mendaftarkan jalur untuk merubah todo dengan methode PUT
router.put("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  console.log(req.body); // mendapatkan id task dari parameter route
  const { pekerjaan, sudah_selesai } = req.body; // mendapatkan input dari client/user menggunakan destructuring object

  // mencari index task dengan id yang sesuai dengan id yang diterima dari parameter route
  const index = todo.findIndex((task) => task.id === id);

  // jika task dengan id yang sesuai ditemukan, lakukan update data task
  if (index !== -1) {
    todo[index].task = pekerjaan; // mengubah deskripsi task
    todo[index].completed = sudah_selesai; // mengubah status task
    res.json({
      status: "SUKSES",
      code: 200,
      data: todo[index], // mengirimkan data task yang telah diupdate ke client/user
    });
  } else {
    // jika task dengan id yang sesuai tidak ditemukan
    res.status(404).json({
      status: "GAGAL",
      code: 404,
      message: "Task tidak ada",
    });
  }
});

// mendaftarkan jalur untuk menghapus todo dengan methode DELETE
router.delete("/:id", function (req, res) {
  const id = parseInt(req.params.id); // mendapatkan id task dari parameter route

  // mencari index task dengan id yang sesuai dengan id yang diterima dari parameter route
  const index = todo.findIndex((task) => task.id === id);

  // jika task dengan id yang sesuai ditemukan, lakukan penghapusan data task
  if (index !== -1) {
    const deletedTask = todo.splice(index, 1); // menghapus data task dengan menggunakan method splice() dan menyimpannya ke dalam variabel deletedTask
    res.json({
      status: "SUKSES",
      code: 200,
      data: deletedTask[0], // mengirimkan data task yang telah dihapus ke client/user
    });
  } else {
    // jika task dengan id yang sesuai tidak ditemukan
    res.status(404).json({
      status: "GAGAL",
      code: 404,
      message: "Task tidak ada",
    });
  }
});

// mengekspor object router yang dibuat agar bisa digunakan oleh file lain yang membutuhkan
module.exports = router;
