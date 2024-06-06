const { Create_document } = require('../../controllers/document_controller');
const Document = require('../../model/document');

jest.mock('../../model/document');

describe('Create_document', () => {
  const mockRequest = {
    id: '1234567890', // Mocked admin_id from isAdmin middleware
    body: {
      title: 'Test Document',
      description: 'This is a test document',
      type: 'pdf',
    },
    file: {
      filename: 'test.pdf',
    },
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 500 if document creation fails', async () => {
    Document.create.mockRejectedValue(new Error('Database error'));

    await Create_document(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Database error' });
  });

  it('should create a new document and return 200 on success', async () => {
    const mockDocument = {
      title: 'Test Document',
      description: 'This is a test document',
      file: 'test.pdf',
      type: 'pdf',
      createdBy: '1234567890',
    };
    Document.create.mockResolvedValue(mockDocument);

    await Create_document(mockRequest, mockResponse);

    expect(Document.create).toHaveBeenCalledWith({
      title: 'Test Document',
      description: 'This is a test document',
      file: 'test.pdf',
      type: 'pdf',
      createdBy: '1234567890',
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Document created' });
  });
});