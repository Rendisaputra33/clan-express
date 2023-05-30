function ignoreRendi(req, res, next) {
  if (req.params.name == "rendi") {
    return res.json({
      status: 403,
      message: "Tidak boleh masuk",
    });
  }

  return next();
}

module.exports = ignoreRendi;
