// memanggil module express yang telah di install menggunakan npm(node package manager)
const express = require("express");
const router = require("./router");
const cors = require("cors");
const getConnection = require("./db/connection");
const ignoreRendi = require("./middleware");
const path = require("path");

// membuat instance object express
const application = express();

// menentukan port yang akan digunakan menjalankan server
const PORT = 4000;

//
application.use(cors({ origin: "*" }));

// mendaftarkan module untuk membaca input yang dikirim oleh client/user
application.use(express.urlencoded({ extended: false }));
application.use(express.json());

application.set("views", path.join(__dirname, "/views"));
application.set("view engine", "ejs");

(async function () {
  const connection = await getConnection();
  // mendaftarkan router yang telah dibuat ke object express
  // parameter pertama mendefinisikan prefix dari router
  // parameter kedua mendifisikan router yang telah dibuat
  application.use("/todo", router(connection));

  application.get("/:name", ignoreRendi, function (req, res) {
    res.render("index", {
      nama: req.params.name,
    });
  });

  // menjalankan server ke port 4000
  application.listen(PORT, async function () {
    console.log(`Server berjalan di : http://localhost:${PORT}`);
  });
})();
