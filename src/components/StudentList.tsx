import * as React from "react";
import List from '@material-ui/core/List';
import { CircularProgress } from "@material-ui/core";
import { StudentListItem } from './StudentListItem';

export interface StudentObj {
    city: string;
    company: string;
    email: string;
    firstName: string;
    grades: number[];
    id: number;
    lastName: string;
    pic: string;
    skill: string;
    tags: string[];
    expanded: boolean;
}

interface StudentListItemProps {
    students: StudentObj[];
    hiddenStudents: number[];
    expandOnClick: (id: number) => void;
    addTagToStudent: (id: number, tag: string) => void;
}

export const StudentList = (props: StudentListItemProps) => {
    const { students, hiddenStudents, expandOnClick, addTagToStudent } = props;
    let count = 0;

    if (students.length === 0) {
        return (
            <CircularProgress className="student-profile__list--loading" size={60} />
        );
    }

    return (
        <List
            aria-labelledby="List of students"
            className="student-profile__list-container"
        >
            {
                students.map((student) => {
                    let studentListItem = null;
                    if (hiddenStudents.includes(student.id) === false) {
                        studentListItem = (
                            <StudentListItem 
                                student={student}
                                index={count}
                                expandOnClick={(id) => expandOnClick(id)} 
                                addTagToStudent={(id, tag) => addTagToStudent(id, tag)}
                                key={`student-list-item-${student.id}`}
                            />
                        )
                        count += 1;
                    }
                    return studentListItem;                    
                })
            }
        </List>        
    )
}