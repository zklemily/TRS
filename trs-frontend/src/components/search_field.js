import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import theme from '../context/color_theme';

export default function SearchField() {
  return (
      <Autocomplete
        style={{ padding: '20px'}}
        freeSolo
        disableClearable
        options={data.map((option) => option.title)}
        renderInput={(params) => (
          <TextField 
            color='secondary'
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{color: theme.palette.secondary.main}}/>
                </InputAdornment>
              ),
              style: {
                borderRadius: "100px",
              }
            }}
            size="small"
            sx={{
                '& input': {
                  color: theme.palette.secondary.main,
                },
            }}
          />
        )}
      />
  );
}

const data = [
];