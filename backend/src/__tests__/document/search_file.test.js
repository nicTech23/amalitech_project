const { Search_file } = require('../../controllers/document_controller');
const Document = require('../../model/document');

jest.mock('../../model/document');

describe('Search_file', () => {
  const mockRequest = {
    query: {
      search: 'test',
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
    Document.find.mockRejectedValue(new Error('Database error'));

    await Search_file(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Database error' });
  });

  it('should return a message if no files are found', async () => {
    Document.find.mockResolvedValue([]);

    await Search_file(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'No files found' });
  });

  it('should return search results if files are found', async () => {
    const mockSearchResults = [
      { title: 'Test Document 1', description: 'This is a test document', type: 'pdf' },
      { title: 'Test Document 2', description: 'Another test document', type: 'docx' },
    ];
    Document.find.mockResolvedValue(mockSearchResults);

    await Search_file(mockRequest, mockResponse);

    expect(Document.find).toHaveBeenCalledWith({
      $or: [
        { description: { $regex: 'test', $options: 'i' } },
        { title: { $regex: 'test', $options: 'i' } },
        { type: { $regex: 'test', $options: 'i' } },
      ],
    });
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockSearchResults });
  });
});