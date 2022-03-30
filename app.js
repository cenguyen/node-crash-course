const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// register view engine
// set lets us configure application settings
app.set('view engine', 'ejs');
// when using view, no need for .html, we can use .ejs

// listen for requests
app.listen(3000);

// middle ware and static files
// MIDDLEWARE WITH MORGAN
app.use(express.static('public')); //moved styles into styles.css into public folder
app.use(morgan('dev'));

// MIDDLEWARE
// app.use((req, res) => {
//   console.log('new request made: ');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
// });
// ====> //new request made:
// host:  localhost
// path:  /
// method:  GET
// but then hangs and webpage keeps loading, we need to tell it to keep going with next
// app.use((req, res, next) => {
//   console.log('new request made: ');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('in the next middleware');
//   next();
// });

// listen for get requests
// app.get('/', (req, res) => {
//   //res.send("<p>home page</p>"); // infers the type of content we want to send to browser
//   res.sendFile('./views/index.html', { root: __dirname }); // when we use a relative path, we have to add the root to the 2nd param
// });

// with views, we RENDER
app.get('/', (req, res) => {
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet:
        'Sit as close as possible to warm fire without sitting on cold floor catto munch salmono.',
    },
    {
      title: 'Mario finds stars',
      snippet:
        'Sit as close as possible to warm fire without sitting on cold floor catto munch salmono.',
    },
    {
      title: 'Bowser does bowser things',
      snippet:
        'Sit as close as possible to warm fire without sitting on cold floor catto munch salmono.',
    },
  ];
  res.render('index', { title: 'Home', blogs });
});

// app.get('/about', (req, res) => {
//   //res.send("<p>about page</p>");
//   res.sendFile('/views/about.html', { root: __dirname });
// });

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// // redirects;
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// });

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a New Blog' });
});
// 404 page
// use if for middleware!
// 404 page needs to go at the bottom!
// app.use((req, res) => {
//   res.sendFile('./views/404.html', { root: __dirname });
// });

// for 404 pages, express would infer a 200 status code so we have to tell it it should be a 404 code
// app.use((req, res) => {
//   res.status(404).sendFile('./views/404.html', { root: __dirname });
// });

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
