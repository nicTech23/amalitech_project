const { Register } = require("../../controllers/user_auth_controller")
const User = require("../../model/user")


jest.mock('../../utils/bcrypt', () => ({
    generateToken: jest.fn(()=> "hashed")
}));
jest.mock('../../utils/jwt', () => ({
    hash_password: jest.fn(()=> "token")
}));
jest.mock("../../model/user")

const register_request = {
     body: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@example.com',
      password: 'password',
      telephone: '1234567890'
    }
}

const register_response = {
    status: jest.fn((x)=>({
    json: jest.fn((data)=> data) // Mocking the json method
  }))
}
describe("Register", ()=>{
    it("it should return error code 504 if user exist", async ()=>{
        User.findOne.mockImplementationOnce(() => ({
            _id: 1,
            email: "email",
            password:"password"
       }) )
        await Register(register_request, register_response)
        expect(register_response.status).toHaveBeenCalledWith(504)
    })

    it("it should return a sawait Register(register_request, register_response)tatus code of 200 if user is registered", async ()=>{
        User.findOne.mockResolvedValueOnce(() => (undefined))
        await Register(register_request, register_response)
    })
})





