import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { StudentProfiles } from "../../components/StudentProfiles";

describe("<StudentProfile />", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
      wrapper = shallow(<StudentProfiles />)
  });
  
  it("renders default state successfully", () => {
      expect(wrapper).toMatchSnapshot();
  })

});