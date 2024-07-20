import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header Employee", () => {
  render(<App />);
  const headerElement = screen.getByText(/Employee/i);
  expect(headerElement).toBeInTheDocument();
});
