const methodMap = {
  'index': ['get']
}

function index(req, res) {
  res.render('index', { title: 'Express' });
}


module.exports = { index, methodMap };
