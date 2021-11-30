import * as React from "react";
import axios from "axios";
import * as _ from "lodash";
import { CircularProgress} from "@material-ui/core";
import { StudentListFilter } from './StudentListFilter';
import { StudentObj, StudentList } from './StudentList';

const studentDataSource = 'https://www.hatchways.io/api/assessment/students';

interface StudentData {
    students: StudentDataObj[];
}

interface StudentDataObj {
    city: string;
    company: string;
    email: string;
    firstName: string;
    grades: string[];
    id: string;
    lastName: string;
    pic: string;
    skill: string;
    tag: string[];
    expanded: boolean;
}

/**
 * Outputs the student profile page
 */
export const StudentProfiles = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [students, setStudents] = React.useState<StudentObj[]>([]);
    const [error, setError] = React.useState<boolean>(false);
    const [errorMsg, setErrorMsg] = React.useState<string>('');
    const [nameFilter, setNameFilter] = React.useState<string>('');
    const [tagFilter, setTagFilter] = React.useState<string>('');
    const [editRevision, setEditRevision] = React.useState<number>(0);
    // Each time tags are modified, tag revision goes up by 1
    
    /**
     * Fetching student data from server
     */
    React.useEffect(() => {
        axios.get<StudentData>(studentDataSource)
            .then(({ data }) => {
                const students = data.students.map((student) => ({
                    ...student,
                    id: parseInt(student.id),
                    grades: student.grades.map(grade => parseInt(grade)),
                    tags: [],
                    expanded: false
                }));
                setLoading(false);
                setStudents(students);
            })
            .catch(() => {
                setError(true);
                setErrorMsg("We couldn't find the student profiles this time.")
                setLoading(false);
            })
    }, [])

    /**
     * Given id of student and tag, add tag to student if student with
     * said id exists. Update error and error message hooks otherwise.
     * @param id student id
     * @param tag tag to be added to student
     */
    const addTagToStudent = (id: number, tag: string) => {
        const targetIndex = students.findIndex(student => student.id === id);
        if (targetIndex === -1) {
            setError(true);
            setErrorMsg("Failed to set add a tag to a student.");
        } else {
            setStudents(students => {
                const target = students[targetIndex]
                students[targetIndex] = {
                    ...target,
                    tags: [...target.tags, tag]
                }
                return students;
            })
            setEditRevision(rev => rev + 1);
        }
    }

    /**
     * An array of student id's filtered out by name
     */
    const filterByName = React.useMemo(() => {
        let results: number[] = [];
        students.forEach(student => {
            const fullName = (student.firstName + " " + student.lastName).toLowerCase();
            if (fullName.includes(nameFilter) === false) results.push(student.id);
        })
        return results;
    }, [nameFilter])

    /**
     * An array of student id's filtered out by tag
     */
    const filterByTag = React.useMemo(() => {
        let results: number[] = [];
        students.forEach(student => {
            const relevantTags = student.tags.filter(tag => tag.includes(tagFilter));
            if (relevantTags.length === 0) results.push(student.id);
        })
        return results;
    }, [tagFilter, editRevision])

    /**
     * An array of student id's filtered out by both name and tag;
     * Students not filtered out (i.e. not in the array) will either match
     * by name or tag or both.
     */
    const filterResults = () => {
        if (tagFilter === "") return filterByName;
        if (nameFilter === "") return filterByTag;
        return _.intersection(filterByName, filterByTag);
    }

    /**
     * Hook call functions passed down to child components
     */
    const expandProfile = (id: number) => {
        setStudents(students => 
            students.map(student => 
                student.id === id
                    ? {
                        ...student,
                        expanded: !student.expanded
                    }
                    : student))
    }

    /**
     * Student profile rendering
     */    
    if (loading) {
        return (
            <div>
                <CircularProgress />
            </div>
        )
    }

    if (error === true) {
        return (
            <div>
                <h1>Oh no!</h1>
                <h2>{errorMsg}</h2>
            </div>
        )
    }

    return (
        <div className="student-profile__container">
            <StudentListFilter 
                setNameFilter={(text) => setNameFilter(text)}
                setTagFilter={(text) => setTagFilter(text)}
            />
            <StudentList 
                students={students}
                hiddenStudents={filterResults()}
                expandOnClick={(id) => expandProfile(id)}
                addTagToStudent={(id, tag) => addTagToStudent(id, tag)}
            />
        </div>
    )
}