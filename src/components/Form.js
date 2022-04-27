import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, {useEffect, useState} from "react";


export default function SelectSmall() {
    // eslint-disable-next-line no-undef
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Region</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={10}>North</MenuItem>
                <MenuItem value={20}>South</MenuItem>
                <MenuItem value={30}>East</MenuItem>
                <MenuItem value={30}>West</MenuItem>
            </Select>
        </FormControl>
    );
}
