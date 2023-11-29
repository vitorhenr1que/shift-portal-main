import React from "react";
import { FormControl, InputAdornment, IconButton } from '@mui/material';
import { UiTextField } from "./styles";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
    return (
        <UiTextField
                value={""}
                variant="outlined"
                placeholder="Buscar"
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <SearchIcon sx={{ color: "black" }} />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
    )
}