import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { flow, isEmpty } from "lodash";

const maybe = (val?: Users, multiple: boolean = false) =>
  (isEmpty(val) ? (multiple ? [] : null) : val);

type User = {
  name: string;
};

type Users = User | User[];

interface MinimalProps {
  value?: Users;
  defaultChecked?: boolean;
  multiple?: boolean;
  onChange?: (user: User | null) => void;
}

const mike: User = { name: "Mike" };
const fakeOptions: User[] = [mike, { name: "Niko" }, { name: "Jamjam" }];

export const Minimal = (props: MinimalProps) => {

  const [value, setValue] = useState<Users | null>(maybe(props.value, props.multiple));
  const [checked, setChecked] = useState<boolean>(
    Boolean(props.defaultChecked)
  );

  const onChangeHandlerAutocomplete = (
    _: SyntheticEvent,
    user: Users | null
  ) => {
    console.log("State: ", user);
    setValue(user);
    return user;
  };

  const onChangeAutocomplete =
    props.onChange !== undefined
      ? flow(onChangeHandlerAutocomplete, props.onChange)
      : onChangeHandlerAutocomplete;

  const onChangeHandlerCheckbox = (_: SyntheticEvent, checked: boolean) => {
    if (checked) onChangeAutocomplete(_, mike);
    else onChangeAutocomplete(_, maybe(props.value, props.multiple));
    setChecked(checked);
  };

  const onChangeCheckbox = onChangeHandlerCheckbox;

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={fakeOptions}
        sx={{ width: 300 }}
        multiple={props.multiple === true}
        onChange={onChangeAutocomplete}
        value={value}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChangeCheckbox}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Self?"
      />
      <p>Data</p>
      <div>{`value: ${
        value !== null ? `'${JSON.stringify(value)}'` : "null"
      }`}</div>
    </>
  );
};
