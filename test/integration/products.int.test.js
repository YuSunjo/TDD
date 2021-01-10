//통합테스트 파일
const request = require('supertest');
const express = require('express');

const app = require('../../server');
const newProduct = require('../data/new-product.json');

test('should Post api/products', async () => {
    const response = await request(app)
    .post('/api/products')
    .send(newProduct);
    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe(newProduct.name)
    expect(response.body.description).toBe(newProduct.description)
})

