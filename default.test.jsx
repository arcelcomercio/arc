import React from "react";
import { shallow } from "enzyme";
import ExtraordinaryStory from "./components/global-components/extraordinary-story";

describe("AddToCart", () => {
  beforeEach(() => {
    global.Sales = {
      addItemToCart: jest.fn()
    };
    global.console.log = jest.fn();
  });
  it("should render", () => {
    const wrapper = shallow(<ExtraordinaryStory />);
    expect(wrapper).toBeDefined();
  });
});

/*
test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
})
*/
