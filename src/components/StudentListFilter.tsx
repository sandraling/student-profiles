import * as React from "react";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

interface StudentListFilterProps {
    setNameFilter: (text: string) => void;
    setTagFilter: (text: string) => void;
}

export const StudentListFilter = (props: StudentListFilterProps) => {
    const { setNameFilter, setTagFilter } = props;

    return (
        <form className="student-profile__search-form">
            <Input 
                id="name-input" 
                className="student-profile__search-bar"
                placeholder="Search by name"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNameFilter(e.target.value)}
                />
            <Input 
                id="tag-input" 
                className="student-profile__search-bar"
                placeholder="Search by tag"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTagFilter(e.target.value)}
            />
        </form>
    )
}