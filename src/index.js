import React from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import urlExists from "url-exists";
import { ErrorMessage } from "@hookform/error-message";

import "./index.css";

function App() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="url"
          control={control}
          defaultValue=""
          rules={{ validate: websiteCheck }}
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              id="url"
              autoComplete="url"
              variant="outlined"
              fullWidth
              error={!!errors.url}
              label="Url"
            />
          )}
        />
        <ErrorMessage errors={errors} name="url" />
        <input type="submit" />
      </form>
    </div>
  );
}

const websiteCheck = async (value) => {
  let str = value;
  let urlCheck = str.indexOf("http://") === 0 || str.indexOf("https://") === 0;
  if (!urlCheck) {
    console.log("Protocol doesn't exist!");
    str = "http://" + str;
  } else {
    console.log("Protocol exists!");
  }

  return new Promise((resolve) => {
    urlExists(str, function (err, exists) {
      if (!exists) {
        console.log("Not available: ", str, exists);
      } else {
        console.log("Available: ", str, exists);
      }

      resolve(exists || "Not Available");
    });
  });
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
