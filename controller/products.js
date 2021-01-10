const productModel = require('../models/Product');

exports.createProduct = async (req, res, next) => {
    try {
        const createdProduct = await productModel.create(req.body);
        console.log(createdProduct);
        res.status(201).json(createdProduct);   
    } catch (error) {
        next(error);
    }
    
};

exports.getProducts = async (req, res, next) => {
    try{
        const allProducts = await productModel.find({});
        res.status(200).json(allProducts);
    }catch(error){
        next(error);
    }
    
}

//create(req.body).then(response => {         이런식으로 해줘도 됨

//})
//async와 await을 써주면 test 할 때도 써줘야한다. 