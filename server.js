const express = require('express');
const path = require('path');

const app = express();

const hbs = require('express-handlebars');

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.show('index.html');
});
app.get('/home', (req, res) => {
  res.show('index.html');
});

app.use('/user', (req, res, next) => {
  if(isAdmin()) next();
  else res.show('login.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.use((req, res) => {
  res.status(404).show('404error.html');
})


app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});



