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

productModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe("Product Controller Create", () => {

    beforeEach(() => {
        req.body = newProduct;
    })
    //test 대신 it라고 써도 됨
    test('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe("function");
    });
    test('should call ProductModel.create', () => {
        productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    });
    test('should return 201 response code', () => {
        productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
    test('should return json body in response', () => {
        productModel.create.mockReturnValue(newProduct)
        productController.createProduct(req, res, next);
        expect(res._getJONData()).toStrictEqual(newProduct);
    })
    
    
    
});
