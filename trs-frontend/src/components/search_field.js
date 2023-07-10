import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchField() {
  return (
      <Autocomplete
        style={{ padding: '20px'}}
        freeSolo
        disableClearable
        options={data.map((option) => option.title)}
        renderInput={(params) => (
          <TextField 
            {...params}
            InputProps={{
              ...params.InputProps,
              type: '',
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{color: '#252B4D'}}/>
                </InputAdornment>
              ),
            }}
            size="small"
          />
        )}
      />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const data = [
];