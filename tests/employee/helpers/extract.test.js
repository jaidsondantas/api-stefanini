const {extractBody} = require("../../../employee/helpers/extract.helper");


describe('Extract', () => {
    test('should return the JSON body of the event', () => {
        const event = {
            body: '{"name": "John", "age": 25}'
        }

        const body = extractBody(event)

        expect(body).toEqual({name: 'John', age: 25})
    })

    test('should throw an exception when the body is missing', () => {
        const event = {}

        expect(() => {
            extractBody(event)
        }).toThrow('Missing Body')

    })
});
