const todo = require("./todo");

function getHandler(req, res) {
    res.json({
      status: "SUKSES",
      code: 200,
      data: todo,
    });
  };

function postHandler(req, res) {
    
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
}

function putHandler(req, res) {
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
}

function deleteHandler(req, res) {
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
  }


module.exports = {getHandler,postHandler,putHandler,deleteHandler};
