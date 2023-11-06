import React from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import AspectRatio from "@mui/joy/AspectRatio";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";

export default function ContrySelector({ sx, ...props }) {
  return (
    <FormControl
      {...props}
      sx={[{ display: { sm: "contents" } }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <FormLabel>Country</FormLabel>
      <Autocomplete
        size="sm"
        autoHighlight
        isOptionEqualToValue={(option, value) => option.code === value.code}
        defaultValue={{ code: "TH", label: "Thailand", phone: "66" }}
        options={countries}
        renderOption={(optionProps, option) => (
          <AutocompleteOption {...optionProps}>
            <ListItemDecorator>
              <AspectRatio ratio="1" sx={{ minWidth: 20, borderRadius: "50%" }}>
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
              </AspectRatio>
            </ListItemDecorator>
            {option.label}
            <Typography component="span" textColor="text.tertiary" ml={0.5}>
              (+{option.phone})
            </Typography>
          </AutocompleteOption>
        )}
        slotProps={{
          input: {
            autoComplete: "new-password", // disable autocomplete and autofill
          },
        }}
      />
    </FormControl>
  );
}

const countries = [
  { code: "AD", label: "Andorra", phone: "376" },
  { code: "AE", label: "United Arab Emirates", phone: "971" },
  { code: "AF", label: "Afghanistan", phone: "93" },
  { code: "AG", label: "Antigua and Barbuda", phone: "1-268" },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
  // ... (rest of the country data)
  // Note: The 'countries' array should be the same as in the original TypeScript code.
];
