//jset가 test하는 방법  => 파일이름에 test or spec, tests라는 폴더 있으면

// describe("Calculateion", () => {
//     test('two plus two is four', () => {
//         expect(2 + 2).toBe(4);
//     });
    
//     test('two plus two is four', () => {
//         expect(2 + 2).not.toBe(5);
//     });
// });

//jset.fn() 을 이용해서 가짜 함수를 생성

const productController = require('../../controller/products');
const productModel = require('../../models/Product');

//req, res 를 jest에서 생성
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProducts = require('../data/all-products.json');

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndDelete = jest.fn();

const productId = "sdfsdfsdfsdf";
const updatedProduct = {name: "updated name", description: "updated desc"}
let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();;
});

describe("Product Controller Create", () => {

    beforeEach(() => {
        req.body = newProduct;
    })
    //test 대신 it라고 써도 됨
    test('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe("function");
    });
    test('should call ProductModel.create', async () => {
        await productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    });
    test('should return 201 response code', async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
    test('should return json body in response',async () => {
        productModel.create.mockReturnValue(newProduct)
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    })

    test('should handle errors', async () => {
        const errorMessage = { message: "descripttion property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })
});

describe('Product Controller Get', () => {
    test('should have a getProducts function', () => {
        expect(typeof productController.getProducts).toBe("function");
    });
    test('should call ProductModel.find({})', async () => {
        await productController.getProducts(req,res, next);
        expect(productModel.find).toHaveBeenCalledWith({})
    })
    test('should return 200 response', async () => {
        await productController.getProducts(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    })
    test('should return json body in response', async () => {
        productModel.find.mockReturnValue(allProducts);
        await productController.getProducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProducts);
    })
    test('should hanlder errors',async () => {
        const errorMessage = {message: "Error finding product data"}
        const rejectedPromise = Promise.reject(errorMessage)
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
})

describe('product Controller GetById', () => {
    test('should have a getProductById', () => {
        expect(typeof productController.getProductById).toBe('function');
    })
    test('should call productMode.findById',async () => {
        req.params.productId = productId
        await productController.getProductById(req, res, next);
        expect(productModel.findById).toBeCalledWith(productId);
    })
    test('should return json body and response code 200', async () => {
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    })
    test('should return 404 when item doesnt exis', async () => {
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
    test('should hanle erorrs', async () => {
        const errorMessage = {message: "error"};
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findById.mockReturnValue(rejectedPromise);
        await productController.getProductById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
    
})

describe('Product Controller update', () => {
    test('should have an upudateProduct function', () => {
        expect(typeof productController.updateProduct).toBe('function');
    })
    test('should call productModel.findByIdAndUpdate', async () => {
        req.params.productId = productId;
        req.body =updatedProduct
        
        await productController.updateProduct(req, res,next);
        expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
            productId, {name: "updated name", description: "updated desc"},
            { new: true }
        )
    })
    test('should return json body and response code 200', async () => {
        req.params.productId = productId
        req.body = updatedProduct
        productModel.findByIdAndUpdate.mockReturnValue(updatedProduct)
        await productController.updateProduct(req, res, next)
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(updatedProduct);
    })
    test('should handle 404 when item doesnt exist', async () => {
        productModel.findByIdAndUpdate.mockReturnValue(null);
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })

    test('should hadle error',async () => {
        const errorMessage = {message: "error"};
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await productController.updateProduct(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
})

describe('should Controller delete', () => {
    test('should function', () => {
        expect(typeof productController.deleteProduct).toBe('function');
    })
    test('should ProductModel.findByIdAndDelete', async () => {
        req.params.productId = productId;
        await productController.deleteProduct(req, res, next)
        expect(productModel.findByIdAndDelete).toBeCalledWith(productId)
    })
    test('should return 200 response', async () => {
        let deletedProduct = {name: "deleted Product", description: "deleted desc"}
        productModel.findByIdAndDelete.mockReturnValue(deletedProduct)
        await productController.deleteProduct(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(deletedProduct)
        expect(res._isEndCalled()).toBeTruthy();
    })
    test('should return 404 response', async () => {
        productModel.findByIdAndDelete.mockReturnValue(null);
        await productController.deleteProduct(req, res,next)
        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy();
    })
    test('should error', async () => {
        const errorMessage = {message: "error"};
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await productController.deleteProduct(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
    
    
    
})




