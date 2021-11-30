import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { StudentList } from "../../components/StudentList";
import students from "../fixtures/processedStudents";

describe("<StudentProfile />", () => {
    let wrapper: ShallowWrapper;
    let expandOnClick = jest.fn((id: number) => {});
    let addTagToStudent = jest.fn((id: number, tag: string) => {});

    const customizedBeforeEach = (hiddenStudents: number[] = []) => {
        wrapper = shallow(
            <StudentList 
                students={students}
                hiddenStudents={hiddenStudents}
                expandOnClick={(id) => expandOnClick(id)}
                addTagToStudent={(id, tag) => addTagToStudent(id, tag)} 
            />
            )            
    }

    it("renders default state successfully", () => {
        customizedBeforeEach();
        expect(wrapper).toMatchSnapshot();
    })

    it("renders successfully with filtered students", () => {
        customizedBeforeEach([students[0].id, students[2].id]);
        expect(wrapper.find(".student-profile__list-container").children().length).toBe(students.length - 2);
        expect(wrapper).toMatchSnapshot();
    })
});