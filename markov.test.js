const { MarkovMachine } = require("./markov");


describe('test markov machine', function () {

    beforeEach(function () {
        mm = new MarkovMachine("Green eggs and ham");
        console.log(mm)
    })

    test('markov machine should return a string', function () {
        let res = mm.makeText(numWords = 20);
        expect(res).toEqual(expect.any(String));
    })

    test('markov machine should return string with word count of numWords', function () {
        // test with length of 20
        let res = mm.makeText(numWords = 20);
        let len = res.split(' ').length
        expect(len).toEqual(21);

        // test with length of 30
        res = mm.makeText(numWords = 30);
        len = res.split(' ').length
        expect(len).toEqual(31);
    })

    test('markov machine should return string containing only words passed in', function () {
        let res = mm.makeText(numWords = 20);
        expect(res).toContain('Green');
        expect(res).toContain('eggs');
        expect(res).toContain('and');
        expect(res).toContain('ham');
    })
})