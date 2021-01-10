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

test('should return 500 on Post /api/products', async () => {
    const response = await request(app)
    .post('/api/products')
    .send({name:"phone"})
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({message: "Product validation failed: description: Path `description` is required."})
})

test('Get /api/products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
})

