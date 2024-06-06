const { Admin_login } = require("../../controllers/admin_controller");
const Admin = require("../../model/admin");

jest.mock('../../utils/bcrypt', () => ({
    compare_password: jest.fn(() => true)
}));
jest.mock('../../utils/jwt', () => ({
    generateToken: jest.fn(() => 'token')
}));
jest.mock("../../model/admin");

const login_request = {
    body: {
        email: 'admin@example.com',
        password: 'password'
    }
};

const login_response = {
    status: jest.fn(() => ({
        json: jest.fn((data) => data) // Mocking the json method
    })),
    cookie: jest.fn() // Mocking the cookie method
};

describe("Admin_login", () => {
    it("should return status code 504 and error message on successful login", async () => {
        Admin.findOne.mockResolvedValueOnce({ id: 'admin_id', password: 'hashed_password' }); // Mocking admin found
        const result = await Admin_login(login_request, login_response);
        expect(login_response.status).toHaveBeenCalledWith(504); // Expecting status code 504 for successful login
        expect(login_response.cookie).not.toHaveBeenCalled(); // Not expecting cookie to be set for successful login
        expect(result.msg).toBeDefined(); // Expecting an error message
    });

    it("should return status code 504 and error message on admin not found", async () => {
        Admin.findOne.mockResolvedValueOnce(null); // Mocking admin not found
        const result = await Admin_login(login_request, login_response);
        expect(login_response.status).toHaveBeenCalledWith(504);
        expect(result.msg).toBeDefined();
    });

    it("should return status code 504 and error message on incorrect password", async () => {
        require('../../utils/bcrypt').compare_password.mockReturnValueOnce(false); // Mocking incorrect password
        Admin.findOne.mockResolvedValueOnce({ id: 'admin_id', password: 'hashed_password' }); // Mocking admin found
        const result = await Admin_login(login_request, login_response);
        expect(login_response.status).toHaveBeenCalledWith(504);
        expect(result.msg).toBeDefined();
    });
});
