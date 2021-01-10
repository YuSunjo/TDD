const express = require('express');

const PORT = 5000;
const app = express();
const productRoutes = require('./routes');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
mongoose.connect("mongodb+srv://test:tnswh2023@cluster0.mdgde.mongodb.net/test?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('mongodb connect');
}).catch( err => console.log(err));

app.use('/api/products', productRoutes);


app.get('/', (req, res) => {
    res.send('hello world');
})

app.use((error,req, res, next) => {
    res.status(500).json({message: error.message});
})

app.listen(PORT, (req, res) => {
    console.log(`${PORT} connecting`);
})

module.exports = app;