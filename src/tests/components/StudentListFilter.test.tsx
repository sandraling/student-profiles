import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { StudentListFilter } from "../../components/StudentListFilter";

describe("<StudentListFilter />", () => {
    let wrapper: ShallowWrapper;
    const setNameFilter = jest.fn((text: string) => {});
    const setTagFilter = jest.fn((text: string) => {});

    beforeEach(() => {
        wrapper = shallow(
            <StudentListFilter 
                setNameFilter={setNameFilter}
                setTagFilter={setTagFilter}
            />
        )
    });
    
    it("renders default state successfully", () => {
        expect(wrapper).toMatchSnapshot();
    })

    it("calls setNameFilter whenever name input field is changed", () => {
        const newName = "new name";
        wrapper.find("#name-input").at(0).simulate("change", {
            target: { value: "new name" }
        });
        expect(setNameFilter).toHaveBeenCalledWith(newName);
    })

    it("calls setTagFilter whenever tag input field is changed", () => {
        const newTag = "new tag";
        wrapper.find("#tag-input").at(0).simulate("change", {
            target: { value: "new tag" }
        });
        expect(setTagFilter).toHaveBeenCalledWith(newTag);
    })

});