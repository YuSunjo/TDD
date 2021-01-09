const express = require('express');

const PORT = 3000;
const app = express();
const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://root:1234@cluster0.8szhx.mongodb.net/hello?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('mongodb connect');
}).catch( err => console.log(err));

app.use('/api/products', productRoutes);
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(PORT, (req, res) => {
    console.log(`${PORT} connecting`);
})