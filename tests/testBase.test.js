function createMockResponse()
{
    return {
        statusCode: null,
        body: null,
        status(code)
        {
            this.statusCode = code
            return this
        },
        json(data)
        {
            this.body = data
            return this
        }
    }
}

describe('testBase', () =>
{
    test('co the gia lap response json', () =>
    {
        const res = createMockResponse()

        res.status(200).json({
            message: 'Unit test hoạt động'
        })

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            message: 'Unit test hoạt động'
        })
    })
})

module.exports = {
    createMockResponse
}
