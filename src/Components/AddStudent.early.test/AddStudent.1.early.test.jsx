
// Unit tests for: AddStudent
import { describe, beforeEach, jest } from 'jest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect } from '@jest/globals';


import axios from "axios";
import AddStudent from '../AddStudent';
import { ContextProvider } from "../../Context/ContextAPI";



// Mock axios and firebase
jest.mock("axios");
jest.mock("firebase/database", () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  set: jest.fn(),
}));

describe('AddStudent() AddStudent method', () => {
  let setShowFormMock;

  beforeEach(() => {
    setShowFormMock = jest.fn();
    jest.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should submit the form successfully with valid inputs', async () => {
      // Mock axios post response
      axios.post.mockResolvedValue({ data: { success: true } });

      // Render the component
      render(
        <ContextProvider value={{ showForm: true, setShowForm: setShowFormMock }}>
          <AddStudent />
        </ContextProvider>
      );

      // Fill out the form
      fireEvent.change(screen.getByPlaceholderText('student name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/Class/i), { target: { value: '10' } });
      fireEvent.change(screen.getByLabelText(/Section/i), { target: { value: 'A' } });
      fireEvent.change(screen.getByLabelText(/Bus Id/i), { target: { value: 'CG-04MU-2606' } });
      fireEvent.change(screen.getByLabelText(/Current Status/i), { target: { value: 'studying' } });

      // Submit the form
      fireEvent.click(screen.getByText('Add Student'));

      // Wait for the form submission to complete
      await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

      // Check if the form was reset and message displayed
      expect(screen.getByText('Submitted')).toBeInTheDocument();
      expect(setShowFormMock).toHaveBeenCalledWith(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle API errors gracefully', async () => {
      // Mock axios post to reject
      axios.post.mockRejectedValue(new Error('Network Error'));

      // Render the component
      render(
        <ContextProvider value={{ showForm: true, setShowForm: setShowFormMock }}>
          <AddStudent />
        </ContextProvider>
      );

      // Fill out the form
      fireEvent.change(screen.getByPlaceholderText('student name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/Class/i), { target: { value: '10' } });
      fireEvent.change(screen.getByLabelText(/Section/i), { target: { value: 'A' } });
      fireEvent.change(screen.getByLabelText(/Bus Id/i), { target: { value: 'CG-04MU-2606' } });
      fireEvent.change(screen.getByLabelText(/Current Status/i), { target: { value: 'studying' } });

      // Submit the form
      fireEvent.click(screen.getByText('Add Student'));

      // Wait for the form submission to complete
      await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

      // Check if the error was logged
      expect(console.log).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should not submit the form if required fields are missing', async () => {
      // Render the component
      render(
        <ContextProvider value={{ showForm: true, setShowForm: setShowFormMock }}>
          <AddStudent />
        </ContextProvider>
      );

      // Attempt to submit the form without filling it out
      fireEvent.click(screen.getByText('Add Student'));

      // Ensure axios post was not called
      expect(axios.post).not.toHaveBeenCalled();
    });
  });
});

// End of unit tests for: AddStudent
