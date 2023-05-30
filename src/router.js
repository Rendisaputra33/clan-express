// memanggil router dari package express yang telah diinstall
const { Router } = require("express");
const {
  getHandler,
  postHandler,
  putHandler,
  deleteHandler,
} = require("./handler");
// membuat instance object dari Router
const router = Router();

function routerCall(connection) {
  // mendaftarkan jalur dengan method GET untuk memuat data todo yang telah dibuat
  router.get("/", getHandler(connection));

  // mendaftarkan jalur untuk menambah todo dengan methode POST
  router.post("/", postHandler(connection));

  // mendaftarkan jalur untuk merubah todo dengan methode PUT
  router.put("/:id", putHandler(connection));

  // mendaftarkan jalur untuk menghapus todo dengan methode DELETE
  router.delete("/:id", deleteHandler(connection));

  return router;
}

// mengekspor object router yang dibuat agar bisa digunakan oleh file lain yang membutuhkan
module.exports = routerCall;
