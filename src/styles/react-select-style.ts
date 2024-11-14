import { StylesConfig } from "react-select";

export const ReactSelectStyles: StylesConfig<any, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "bg-primary-foreground", // Set your desired background color
    borderColor: state.isFocused ? "primary" : "border-input", // Change border color on focus
    "&:hover": {
      borderColor: state.isFocused ? "primary" : "border-input", // Change border color on hover
    },
    height: "40px",
  }),
  input: (provided) => ({
    ...provided,
    color: "text-foreground", // Set your desired text color
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    backgroundColor: "hsl(var(--background))", // Set your desired background color for the dropdown menu using Tailwind CSS class
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "hsl(var(--primary-foreground))"
      : "hsl(var(--background))", // Set the background color for selected and non-selected options
    "&:hover": {
      backgroundColor: "hsl(var(--primary-foreground))", // Set the background color on hover for non-selected options
    },
    color: state.isSelected ? "hsl(var(--muted-foreground))" : "",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "text-foreground", // Set the text color for the selected value
  }),
  multiValueLabel: (base) => ({
    ...base,
    backgroundColor: "transparent",
    color: "white",
    padding: "6px",
  }),
  multiValueRemove: (base) => ({
    ...base,
    backgroundColor: "transparent",
    padding: "6px",
  }),
  multiValue: (base) => ({
    ...base,
    display: "flex",
    flexDirection: "row",
    borderRadius: "2px",
    margin: "2px",
    boxSizing: "border-box",
    backgroundColor: "gray",
  }),
};
