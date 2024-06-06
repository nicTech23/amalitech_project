const { Messages_for_each_file } = require('../../controllers/message_controller');
const Message = require('../../model/messages');

jest.mock('../../model/messages');

describe('Messages_for_each_file', () => {
  const mockRequest = {
    params: {
      document_id: '1234567890',
    },
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 500 if an error occurs', async () => {
    Message.countDocuments.mockRejectedValue(new Error('Database error'));

    await Messages_for_each_file(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Database error' });
  });

  it('should return 0 if no messages found for the document', async () => {
    Message.countDocuments.mockResolvedValue(0);

    await Messages_for_each_file(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({ msg: '0' });
  });

  it('should return the total number of messages for the document', async () => {
    const totalMessages = 5;
    Message.countDocuments.mockResolvedValue(totalMessages);

    await Messages_for_each_file(mockRequest, mockResponse);

    expect(Message.countDocuments).toHaveBeenCalledWith({ document: '1234567890' });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: totalMessages });
  });

  it('should throw an error if document_id is undefined', async () => {
    const mockRequestWithoutDocumentId = {
      params: {},
    };

    try {
      await Messages_for_each_file(mockRequestWithoutDocumentId, mockResponse);
    } catch (error) {
      expect(error.message).toBe('document not found');
    }
  });
});