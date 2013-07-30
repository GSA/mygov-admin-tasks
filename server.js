var express = require('express');
var app = express();
app.set('views', __dirname + '/src/');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/src/'));
app.listen(1234, function(){
  console.log("Express server listening on port 1234");
});

app.get('/', function(req, res){
  res.render('index');
});

var getEnvironment = function(){
  if(process.argv[2]) {
    return process.argv[2].split("=")[1];
  } else {
    return "local";
  }
};

app.locals({
  environment: getEnvironment()
});
