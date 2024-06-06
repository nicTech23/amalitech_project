const { Update_password } = require("../../controllers/user_auth_controller");
const User = require("../../model/user");

jest.mock('../../utils/jwt', () => ({
    decodeToken: jest.fn(() => ({ id: 'user_id' })) // Mocking token decode
}));
jest.mock("../../model/user");
jest.mock("../../utils/bcrypt", () => ({
    hash_password: jest.fn((password) => password) // Mocking password hashing
}));

const updatePasswordRequest = {
    params: {
        token: 'valid_token'
    },
    body: {
        password: 'new_password',
        confirm_password: 'new_password'
    }
};

const updatePasswordResponse = {
    status: jest.fn(() => ({
        json: jest.fn((data) => data) // Mocking the json method
    }))
};

describe("Update_password", () => {
    it("should return status code 500 and error message for invalid token", async () => {
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress console log
        const result = await Update_password({ params: { token: 'invalid_token' } }, updatePasswordResponse);
        expect(updatePasswordResponse.status).toHaveBeenCalledWith(500);
        expect(result.msg).toBeDefined();
    });

    it("should return status code 500 and error message for expired token", async () => {
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress console log
        const result = await Update_password({ params: { token: 'expired_token' } }, updatePasswordResponse);
        expect(updatePasswordResponse.status).toHaveBeenCalledWith(500);
        expect(result.msg).toBeDefined();
    });

    it("should return status code 401 and error message when passwords don't match", async () => {
        const result = await Update_password({ params: { token: 'valid_token' }, body: { password: 'new_password', confirm_password: 'different_password' } }, updatePasswordResponse);
        expect(updatePasswordResponse.status).toHaveBeenCalledWith(401);
        expect(result.msg).toBeDefined();
    });

    it("should return status code 200 and success message for successful password update", async () => {
        User.findOneAndUpdate.mockResolvedValueOnce({}); // Mocking user found and updated
        const result = await Update_password(updatePasswordRequest, updatePasswordResponse);
        expect(updatePasswordResponse.status).toHaveBeenCalledWith(200);
        expect(result.msg).toBe('Password updated successfully');
    });
});
