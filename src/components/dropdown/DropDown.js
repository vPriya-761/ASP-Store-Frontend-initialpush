import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const DropDown = ({
  name,
  label,
  helperText,
  onChange,
  onBlur,
  error,
  value,
  list,
  handleFunction,
  disabled,
}) => {
  return (
    <TextField
      name={name}
      select
      label={label}
      value={value}
      onChange={onChange}
      helperText={helperText}
      onBlur={onBlur}
      error={error}
      fullWidth
      disabled={disabled}
    >
      {list?.data?.map((option) => (
        <MenuItem
          key={option.id}
          value={option.id}
          onClick={() => {
            handleFunction(name, option.id);
          }}
        >
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};
export default DropDown;
