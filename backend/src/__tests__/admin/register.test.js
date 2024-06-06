const { Admin_register } = require("../../controllers/admin_controller"); // Import the function to be tested
const Admin = require("../../model/admin"); // Import the Admin model
const { validationResult } = require("express-validator"); // Import validation result utility

jest.mock("../../model/admin"); // Mock the Admin model

describe("Admin_register", () => {
    let req, res;

    beforeEach(() => {
        // Mock request and response objects for each test case
        req = {
            body: {
                name: "John Doe",
                email: "test@example.com",
                password: "password"
            }
        };

        res = {
            // Mock the status and json methods
            status: jest.fn(() => res), // Return res for chaining
            json: jest.fn() // Mock the json method
        };
    });

    it("should register a new admin", async () => {
        // Mock the scenario where admin doesn't exist and registration is successful
        Admin.findOne.mockResolvedValueOnce(null); // Simulate admin not found
        Admin.create.mockResolvedValueOnce(true); // Simulate successful registration

        // Call the function under test
        await Admin_register(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(200); // Expect status 200 to be set
        expect(res.json).toHaveBeenCalledWith({ msg: "Registration successful" }); // Expect correct response message
    });

    it("should return error if admin already exists", async () => {
        // Mock the scenario where admin already exists
        Admin.findOne.mockResolvedValueOnce({}); // Simulate admin found

        // Call the function under test
        await Admin_register(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(500); // Expect status 500 to be set
        expect(res.json).toHaveBeenCalledWith({ msg: "Admin already exists" }); // Expect correct error message
    });
});
