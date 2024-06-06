const { Verify_account } = require("../../controllers/user_auth_controller");
const User = require("../../model/user");

jest.mock('../../utils/jwt', () => ({
    decodeToken: jest.fn(() => ({ id: 'user_id' }))
}));
jest.mock("../../model/user");

const verify_request = {
    params: {
        token: 'valid_token'
    }
};

const verify_response = {
    status: jest.fn((x) => ({
        json: jest.fn((data) => data) // Mocking the json method
    }))
};

describe("Verify_account", () => {
    it("should return status code 200 and message 'Verified' on successful verification", async () => {
        User.findByIdAndUpdate.mockResolvedValueOnce(true); // Mocking successful verification update
        const result = await Verify_account(verify_request, verify_response);
        expect(verify_response.status).toHaveBeenCalledWith(200);
        expect(result.msg).toBe('Verified');
    });

    it("should return status code 500 and error message on verification failure", async () => {
        User.findByIdAndUpdate.mockResolvedValueOnce(false); // Mocking verification failure
        const result = await Verify_account(verify_request, verify_response);
        expect(verify_response.status).toHaveBeenCalledWith(500);
        expect(result.msg).toBeDefined();
    });

    it("should return status code 500 and error message on invalid token", async () => {
        jest.spyOn(global.console, 'error').mockImplementation(() => {}); // Suppress console.error
        require('../../utils/jwt').decodeToken.mockReturnValueOnce({ message: 'invalid token' }); // Mocking invalid token
        const result = await Verify_account(verify_request, verify_response);
        expect(verify_response.status).toHaveBeenCalledWith(500);
        expect(result.msg).toBeDefined();
    });

    it("should return status code 500 and error message on expired token", async () => {
        jest.spyOn(global.console, 'error').mockImplementation(() => {}); // Suppress console.error
        require('../../utils/jwt').decodeToken.mockReturnValueOnce({ message: 'jwt expired' }); // Mocking expired token
        const result = await Verify_account(verify_request, verify_response);
        expect(verify_response.status).toHaveBeenCalledWith(500);
        expect(result.msg).toBeDefined();
    });
});
