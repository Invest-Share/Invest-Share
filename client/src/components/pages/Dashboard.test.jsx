import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { MemoryRouter } from "react-router-dom";

describe("Dashboard", () => {
  const user = {
    id: 1,
    firstName: "David",
    lastName: "An",
    email: "davidan@gmail.com",
    password: "secret",
  };

  it("renders Dashboard component", () => {
    render(<Dashboard {...user.firstName} />);
  });
});
