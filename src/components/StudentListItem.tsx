import * as React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StudentObj } from './StudentList';

interface StudentListItemProps {
    student: StudentObj;
    index: number;
    expandOnClick: (id: number) => void;
    addTagToStudent: (id: number, tag: string) => void;
}

/**
 * Component representing one single student's profile
 * @param props see StudentListItemProps interface
 */
export const StudentListItem = (props: StudentListItemProps) => {
    const { student, index, expandOnClick,addTagToStudent } = props;
    const fullName = student.firstName + " " + student.lastName;
    const [tagInput, setTagInput] = React.useState<string>("");
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Some error checking before saving tag to student.
        // Error not alternatively presented since this is 
        // out of the scope of this project!
        if (tagInput !== "" && !student.tags.includes(tagInput)) {
            addTagToStudent(student.id, tagInput);
            setTagInput("");
        }
    }

    return (
        <>  
            { index === 0 ? null : <Divider /> }
            <ListItem className="student-profile__list-item" key={`student-${student.id}`}>
                <ListItemAvatar>                        
                    <Avatar 
                        className="student-profile__avatar"
                        src={student.pic} 
                        alt={`Profile picture of ${fullName}`} 
                    />
                </ListItemAvatar>
                <Typography component="div" variant="body2" className="student-profile__main-body">
                    <div className="student-profile__name">{fullName}</div>
                        <>
                            <span className="student-profile__description">
                                <span>Email: {student.email}</span>
                                <span>Company: {student.company}</span>
                                <span>Skill: {student.skill}</span>
                                <span>Average: {React.useMemo(() => getAverage(student.grades), [student.id])}%</span>
                                <Collapse in={student.expanded} timeout="auto" unmountOnExit>
                                    <div className="student-profile__subsection">
                                        <table className="student-profile__subsection__grades-table" key={`student-${student.id}-grade-table`}>
                                            <tbody>
                                                {student.grades.map((grade, index) => (
                                                    <tr key={`student-${student.id}-grade-tr-${index}`}>
                                                        <td>{`Test ${index}:`}</td>
                                                        <td>{`${grade}%`}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="student-profile__subsection__tag-div">
                                            {
                                                student.tags.map((tag, index) => 
                                                    <Chip 
                                                        key={`student-${student.id}-chip-${index}`}
                                                        size="small" 
                                                        label={tag}
                                                        className="student-profile__subsection__tag-btn"
                                                    />
                                                )
                                            }
                                        </div>
                                        <form onSubmit={(e) => onFormSubmit(e)}>
                                            <Input 
                                                className="add-tag-input student-profile__subsection__tag-input"
                                                placeholder="Add a tag"
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                            />
                                        </form>
                                    </div>
                                </Collapse>
                            </span>
                        </>
                </Typography>
                <IconButton 
                    aria-label="expand" 
                    className="expand-btn student-profile__expand-btn"
                    onClick={() => expandOnClick(props.student.id)}
                >
                    {student.expanded
                        ? <FontAwesomeIcon icon={faMinus}/> 
                        : <FontAwesomeIcon icon={faPlus} />}
                </IconButton>
            </ListItem>    
        </>
    )
}

/**
 * Given a list of numbers, return the average of them.
 * @param numList An array of numbers
 */
export const getAverage = (numList: number[]) => {
    const sum = numList.reduce((a, b) => a + b, 0);
    return (sum / numList.length) || 0;
}