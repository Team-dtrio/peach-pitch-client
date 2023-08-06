import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Login from "../../src/components/Login";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock("firebase/auth", () => ({
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(),
}));

jest.mock("../../src/services/firebase", () => ({
  firebaseAuth: jest.fn(),
}));

describe("<Login />", () => {
  it("renders the Login component", () => {
    const queryClient = new QueryClient();

    const theme = {
      font: {
        main: "Arial",
      },
      background: {
        main: "#ffffff",
      },
    };

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Sign In With Google")).toBeInTheDocument();
  });
});
