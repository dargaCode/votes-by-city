import React from "react";
import { shallow } from "enzyme";
import NavigationBar from "./NavigationBar";

describe("`NavigationBar`", () => {
  describe("render", () => {
    it("should include NavLinks for all 2 sections", () => {
      const wrapper = shallow(<NavigationBar />);
      const navLinks = wrapper.find("NavLink");

      expect(navLinks).toHaveLength(2);
      expect(navLinks.at(0).prop("to")).toBe("/hello");
      expect(navLinks.at(1).prop("to")).toBe("/world");
    });
  });
});
