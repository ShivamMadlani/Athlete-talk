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
      <FormLabel>Categories</FormLabel>
      <Autocomplete
        multiple
        size="sm"
        autoHighlight
        isOptionEqualToValue={(option, value) => option.code === value.code}
        options={categories}
        getOptionLabel={(option) => option.code}
      />
    </FormControl>
  );
}

const categories = [
  { code: "Category1", label: "Category 1" },
  { code: "Category2", label: "Category 2" },
  { code: "Category3", label: "Category 3" },
];
