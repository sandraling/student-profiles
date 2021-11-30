import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { StudentListItem, getAverage } from "../../components/StudentListItem";
import students from "../fixtures/processedStudents";


describe("<StudentListItem />", () => {
    let wrapper: ShallowWrapper;
    const student = students[0];
    const expandOnClick = jest.fn((id: number) => {});
    const addTagToStudent = jest.fn((id: number, tag: string) => {});

    const customizedBeforeEach = (index = 0 /* first in list */) => {
        wrapper = shallow(
            <StudentListItem 
                student={student}
                index={index}
                expandOnClick={(id) => expandOnClick(id)}
                addTagToStudent={(id, tag) => addTagToStudent(id, tag)}    
            />
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Component rendering", () => {
        it("renders for first item in list", () => {
            customizedBeforeEach();
            expect(wrapper).toMatchSnapshot();
        });

        it ("renders for subsequent item in list", () => {
            customizedBeforeEach(1);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe("Expand feature", () => {
        it ("calls expandOnClick function when expand button is clicked", () => {
            customizedBeforeEach();
            wrapper.find(".expand-btn").simulate("click");
            expect(expandOnClick).toHaveBeenCalled();
        })
    });

    describe("Tagging feature", () => {
        it ("calls addTagToStudent function to on form submit", () => {
            const tagValue = "tag 1";
            customizedBeforeEach();
            wrapper.find(".add-tag-input").at(0).simulate("change", {
                target: { value: tagValue }
            });
            expect(wrapper).toMatchSnapshot();
            wrapper.find("form").simulate("submit", {
                preventDefault: () => {}
            });
            expect(addTagToStudent).toHaveBeenCalledWith(student.id, tagValue);
            expect(wrapper).toMatchSnapshot();
        })
    })
})

describe("getAverage helper function", () => {
    it ("returns computed average given an array of numbers", () => {
        let computedAverage = getAverage([1, 2, 3]);
        expect(computedAverage).toBe(2);
        computedAverage = getAverage([89, 90, 91, 92]);
        expect(computedAverage).toBe(90.5);
    })
})