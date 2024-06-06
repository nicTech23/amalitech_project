const { User_login } = require("../../controllers/user_auth_controller");
const User = require("../../model/user");

jest.mock('../../utils/bcrypt', () => ({
    compare_password: jest.fn(() => true)
}));
jest.mock('../../utils/jwt', () => ({
    generateToken: jest.fn(() => 'token')
}));
jest.mock("../../model/user");

const login_request = {
    body: {
        email: 'test@example.com',
        password: 'password'
    }
};

const login_response = {
    status: jest.fn(() => ({
        json: jest.fn((data) => data) // Mocking the json method
    })),
    cookie: jest.fn() // Mocking the cookie method
};

describe("User_login", () => {
    it("should return status code 504 and error message on successful login", async () => {
        User.findOne.mockResolvedValueOnce({ id: 'user_id', password: 'hashed_password', verify: true }); // Mocking user found
        const result = await User_login(login_request, login_response);
        expect(login_response.status).toHaveBeenCalledWith(504); // Expecting status code 504 for successful login
        expect(login_response.cookie).not.toHaveBeenCalled(); // Not expecting cookie to be set for successful login
        expect(result.msg).toBeDefined(); // Expecting an error message
    });

    it("should return status code 504 and error message on user not found", async () => {
        User.findOne.mockResolvedValueOnce(null); // Mocking user not found
        const result = await User_login(login_request, login_response);
        expect(login_response.status).toHaveBeenCalledWith(504);
        expect(result.msg).toBeDefined();
    });

    it("should return status code 504 and error message on unverified account", async () => {
        User.findOne.mockResolvedValueOnce({ id: 'user_id', password: 'hashed_password', verify: false }); // Mocking unverified account
        const result = await User_login(login_request, login_response);
        expect(login_response.status).toHaveBeenCalledWith(504);
        expect(result.msg).toBeDefined();
    });

    it("should return status code 504 and error message on incorrect password", async () => {
        require('../../utils/bcrypt').compare_password.mockReturnValueOnce(false); // Mocking incorrect password
        User.findOne.mockResolvedValueOnce({ id: 'user_id', password: 'hashed_password', verify: true }); // Mocking user found
        const result = await User_login(login_request, login_response);
        expect(login_response.status).toHaveBeenCalledWith(504);
        expect(result.msg).toBeDefined();
    });
});
