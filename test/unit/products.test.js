//jset가 test하는 방법  => 파일이름에 test or spec, tests라는 폴더 있으면


describe("Calculateion", () => {
    test('two plus two is four', () => {
        expect(2 + 2).toBe(4);
    });
    
    test('two plus two is four', () => {
        expect(2 + 2).not.toBe(5);
    });
});
