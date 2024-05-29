import { renderHook, act } from "@testing-library/react-hooks";
import useNameValidation from "./useNameValidation";
import { waitFor } from "@testing-library/react";

describe("useNameValidation", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useNameValidation());
    expect(result.current.name).toBe("");
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should set error for invalid name", async () => {
    const { result } = renderHook(() => useNameValidation());

    act(() => {
      result.current.handleChange("Invalid123");
    });

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Name must contain only letters and spaces."
      );
    });
  });

  it("should not set error for valid name", async () => {
    const { result } = renderHook(() => useNameValidation());

    act(() => {
      result.current.handleChange("Valid Name");
    });

    await waitFor(() => {
      expect(result.current.error).toBeNull();
    });
  });

  it("should handle async validation", async () => {
    const { result } = renderHook(() => useNameValidation());

    act(() => {
      result.current.handleChange("john doe");
    });

    await waitFor(
      () => {
        expect(result.current.error).toBe("Name already exists.");
      },
      { timeout: 2000 }
    );

    expect(result.current.loading).toBe(false);
  });

  it("should set name correctly", () => {
    const { result } = renderHook(() => useNameValidation());

    act(() => {
      result.current.setName("New Name");
    });

    expect(result.current.name).toBe("New Name");
  });
});
