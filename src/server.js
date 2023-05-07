// memanggil module express yang telah di install menggunakan npm(node package manager)
const express = require("express");
const router = require("./router");
const cors = require("cors");

// membuat instance object express
const application = express();

// menentukan port yang akan digunakan menjalankan server
const PORT = 4000;

application.use(
  cors({
    origin: "*",
  })
);

// mendaftarkan module untuk membaca input yang dikirim oleh client/user
application.use(express.urlencoded({ extended: false }));
application.use(express.json());

// mendaftarkan router yang telah dibuat ke object express
// parameter pertama mendefinisikan prefix dari router
// parameter kedua mendifisikan router yang telah dibuat
application.use("/todo", router);

// menjalankan server ke port 4000
application.listen(PORT, function () {
  console.log(`Server berjalan di : http://localhost:${PORT}`);
});
