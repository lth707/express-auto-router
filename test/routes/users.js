const methodMap = {
  'index': ['get'],
  'other': ['get', 'post']
}
/* GET users listing. */
function index(req, res) {
  res.end(req.originalUrl)
}

function other(req, res) {
  res.end(req.originalUrl)
}

module.exports = { other, index, methodMap };
