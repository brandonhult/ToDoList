// CONSTANTS //
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const app = express();

// TO-DO LIST ARRAYS //
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// ENABLE EJS //
app.set("view engine", "ejs");

// APP USES //
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

// HOME ROUTE GET //
app.get('/', function(req, res) {
  // GET DATE //
  const day = date.getDate();

  // RENDER //
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

// HOME ROUTE POST //
app.post('/', function(req, res) {
  // LETS //
  const item = req.body.newItem;

  // CONDITIONALS //
  if (req.body.list === "Work") {
    if (item.length > 0) {
      workItems.push(item);
      res.redirect('/work');
    }

  } else {
      if (item.length > 0) {
        items.push(item);
        res.redirect('/');
      }
    }
  });

// WORK ROUTE GET //
app.get('/work', function(req, res) {
  // RENDER //
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItems
  });
});

// WORK ROUTE POST //
app.post('/work', function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
});

// ABOUT ROUTE GET //
app.get('/about', function(req, res) {
  res.render('about');
});

// ABOUT ROUTE POST //
app.post('/about', function(req, res) {
  res.redirect('/about')
});

// APP LISTEN ON PORT 3000 //
app.listen(3000, function() {
  // SUCCESS LOG //
  console.log('Server running on port 3000');
});
