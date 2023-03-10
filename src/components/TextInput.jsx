import ThemeContext from "../context/ThemeContext";
import {TextField} from "@mui/material";
import {useContext} from "react";

const TextInput = ({name, id}) => {
    const theme = useContext(ThemeContext)
    return (
        <TextField
            sx={{
                "& label.Mui-focused": {
                    color: theme.secondaryColor,
                },
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: theme.secondaryColor
                    }
                }
            }}
            fullWidth
            id={id}
            name={id}
            label={name}
            variant="outlined"
        />
    )
}

export default TextInput