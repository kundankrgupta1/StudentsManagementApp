
// Unit tests for: AddStudent


import axios from "axios";
import { set } from "firebase/database";
import AddStudent from '../AddStudent';



// Mock axios and firebase functions
jest.mock("axios");
jest.mock("firebase/database", () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  set: jest.fn(),
}));

describe('AddStudent() AddStudent method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should submit the form successfully with valid inputs', async () => {
      // Mock axios post response
      axios.post.mockResolvedValue({ data: { success: true } });

      const { getByLabelText, getByText } = render(<AddStudent />);

      // Fill out the form
      fireEvent.change(getByLabelText(/Name/i), { target: { value: 'John Doe' } });
      fireEvent.change(getByLabelText(/Class/i), { target: { value: '10' } });
      fireEvent.change(getByLabelText(/Section/i), { target: { value: 'A' } });
      fireEvent.change(getByLabelText(/Bus Id/i), { target: { value: 'CG-04MU-2606' } });
      fireEvent.change(getByLabelText(/Current Status/i), { target: { value: 'studying' } });

      // Submit the form
      fireEvent.click(getByText(/Add Student/i));

      // Wait for the form submission to complete
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/students', expect.any(Object));
        expect(set).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
      });

      // Check for success message
      expect(getByText(/Submitted/i)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle form submission with missing required fields', async () => {
      const { getByText } = render(<AddStudent />);

      // Attempt to submit the form without filling it out
      fireEvent.click(getByText(/Add Student/i));

      // Check that axios.post was not called due to validation
      await waitFor(() => {
        expect(axios.post).not.toHaveBeenCalled();
      });
    });

    it('should handle network errors gracefully', async () => {
      // Mock axios post to reject
      axios.post.mockRejectedValue(new Error('Network Error'));

      const { getByLabelText, getByText } = render(<AddStudent />);

      // Fill out the form
      fireEvent.change(getByLabelText(/Name/i), { target: { value: 'John Doe' } });
      fireEvent.change(getByLabelText(/Class/i), { target: { value: '10' } });
      fireEvent.change(getByLabelText(/Section/i), { target: { value: 'A' } });
      fireEvent.change(getByLabelText(/Bus Id/i), { target: { value: 'CG-04MU-2606' } });
      fireEvent.change(getByLabelText(/Current Status/i), { target: { value: 'studying' } });

      // Submit the form
      fireEvent.click(getByText(/Add Student/i));

      // Wait for the form submission to complete
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalled();
      });

      // Check that no success message is shown
      expect(getByText(/Submitted/i)).not.toBeInTheDocument();
    });
  });
});

// End of unit tests for: AddStudent
