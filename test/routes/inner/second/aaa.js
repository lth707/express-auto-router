const methodMap = {
  'index': ['get']
}

function index(req, res) {
  res.end(req.originalUrl)
}


module.exports = { index, methodMap };
