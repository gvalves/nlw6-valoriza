import express from 'express';

const app = express();

const port = 3000;

app.get('/test', (req, res) => {
  return res.send('Hello World!');
});

app.post('/test-post', (req, res) => {
  return res.send('Posting Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
