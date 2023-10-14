const {isInvalidEmail, isEmptyPayload} = require('../validator')

test('valid email', function(){
    const testPayload = {
        name: "test name",
        email: "test@example.com",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(false)
})

test('invalid email', function(){
    const testPayload = {
        name: "test name",
        email: "testexample.com",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(true)
}) // 2 unit tests

test('empty payload',function(){
    const testPayload = {}
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(true)
})

test('non-empty payload',function(){
    const testPayload = {
        name: "test name",
        email: "test@example.com",
        interests: "testing"
    }
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(false)
})