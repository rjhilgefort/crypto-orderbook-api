import * as middleware from "./middleware"
// @ponicode
describe("middleware.cors", () => {
    test("0", () => {
        let callFunction: any = () => {
            middleware.cors(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
