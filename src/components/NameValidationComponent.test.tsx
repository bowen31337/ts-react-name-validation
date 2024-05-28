import { render, screen, fireEvent, waitFor } from "./test-utils";
import NameValidationComponent from "./components/NameValidationComponent";

describe("NameValidationComponent", () => {
  it("should render input field", () => {
    render(<NameValidationComponent />);
    const inputElement = screen.getByPlaceholderText(/Enter your name/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should display error for invalid name", () => {
    render(<NameValidationComponent />);
    const inputElement = screen.getByPlaceholderText(/Enter your name/i);

    fireEvent.change(inputElement, { target: { value: "Invalid123" } });
    fireEvent.keyUp(inputElement);

    const errorMessage = screen.getByText(
      /Name must contain only letters and spaces./i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should display loading message during async validation", async () => {
    render(<NameValidationComponent />);
    const inputElement = screen.getByPlaceholderText(/Enter your name/i);

    fireEvent.change(inputElement, { target: { value: "john doe" } });
    fireEvent.keyUp(inputElement);

    await waitFor(() => {
      expect(screen.getByText(/Validating.../i)).toBeInTheDocument();
    });
  });

  it("should display error for existing name", async () => {
    render(<NameValidationComponent />);
    const inputElement = screen.getByPlaceholderText(/Enter your name/i);

    fireEvent.change(inputElement, { target: { value: "john doe" } });
    fireEvent.keyUp(inputElement);

    await waitFor(() => {
      const errorMessage = screen.queryByText(/Name already exists./i);
      expect(errorMessage).toBeInTheDocument();
    }, {timeout: 2000});
  });

  it("should not display error for valid name", async () => {
    render(<NameValidationComponent />);
    const inputElement = screen.getByPlaceholderText(/Enter your name/i);

    fireEvent.change(inputElement, { target: { value: "Valid Name" } });
    fireEvent.keyUp(inputElement);

    expect(
      screen.queryByText(/Name must contain only letters and spaces./i)
    ).not.toBeInTheDocument();
  });
});
