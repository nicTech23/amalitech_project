const { Forgot_password } = require("../../controllers/user_auth_controller");
const User = require("../../model/user");

jest.mock('../../utils/jwt', () => ({
    generateToken: jest.fn(() => 'token')
}));
jest.mock("../../model/user");
jest.mock("../../utils/nodeMailer");

const forgotPasswordRequest = {
    body: {
        email: 'test@example.com'
    }
};

const forgotPasswordResponse = {
    status: jest.fn(() => ({
        json: jest.fn((data) => data) // Mocking the json method
    }))
};

describe("Forgot_password", () => {
    it("should return status code 401 and error message when email not found", async () => {
        User.findOne.mockResolvedValueOnce(null); // Mocking user not found
        const result = await Forgot_password(forgotPasswordRequest, forgotPasswordResponse);
        expect(forgotPasswordResponse.status).toHaveBeenCalledWith(401);
        expect(result.msg).toBeDefined();
    });

    it("should return status code 200 and token when email found and email sent", async () => {
        User.findOne.mockResolvedValueOnce({ id: 'user_id', email: 'test@example.com', first_name: 'John' }); // Mocking user found
        const result = await Forgot_password(forgotPasswordRequest, forgotPasswordResponse);
        expect(forgotPasswordResponse.status).toHaveBeenCalledWith(200);
        expect(result.msg).toBeDefined();
        expect(result.token).toBe('token');
    });
});
