import React, { useState } from "react";
import {
  Box,
  Typography,
  Input,
  Button,
  FormLabel,
  Divider,
  Chip,
  Radio,
  FormControl,
  RadioGroup,
} from "@mui/joy";
import AuthContext from "../../authCtx";
import { useRouter } from "next/navigation";
import IconButton from "@mui/joy/IconButton";
import { Alert } from "@mui/joy";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SignUp() {
  const authCtx = React.useContext(AuthContext);
  const [role, setRole] = React.useState("athlete");
  const [isLoading, setIsLoading] = React.useState();
  const [error, setError] = React.useState("");
  const [signupSuccessfully, setSignupSuccessfully] = React.useState("");
  const [displaySignupSuccessfully, setDisplaySignupSuccessfully] =
    React.useState(false);
  const [displayErr, setDisplayErr] = React.useState(false);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get("email"),
      password: data.get("password").trim(),
      passwordConfirm: data.get("passwordConfirm"),
      name: data.get("name"),
      role: role === "athlete" ? "user" : role,
    };

    const response = await fetch(`/api/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setIsLoading(false);

    const responseData = await response.json();

    if (response.ok) {
      //set the token here...
      authCtx.login(responseData.token, responseData.data.user);
      /* alert("User created successfully!"); */
      setSignupSuccessfully("User created successfully!");
      setDisplaySignupSuccessfully(true);
      router.push("/dashboard");
      return;
    }
    let errorMessage = "Some error occured! Try again later.";
    try {
      errorMessage = responseData.message;
    } catch (err) {
      /* alert(err); */
      setError(errorMessage);
      setDisplayErr(true);
      console.log(errorMessage);
    }
    setError(errorMessage);
    setDisplayErr(true);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const pageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
  };

  return (
    <div style={pageContainerStyle}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          <Box>
            <Typography level="h2" color="primary" textAlign="center" mb="20px">
              Sign Up
            </Typography>
            <Box
              boxShadow={2}
              px={3}
              bgcolor="background.paper"
              borderRadius="borderRadius"
            >
              <form onSubmit={handleSubmit}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  sx={{ mb: "16px" }}
                  required
                />
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  sx={{ mb: "16px" }}
                  required
                />
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  sx={{ mb: "16px" }}
                  required
                />
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  name="passwordConfirm"
                  onChange={handleChange}
                  sx={{ mb: "16px" }}
                  required
                />

                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <RadioGroup
                    defaultValue="female"
                    name="controlled-radio-buttons-group"
                    value={role}
                    onChange={handleChange}
                    sx={{ my: 1 }}
                  >
                    <Box>
                      <Radio value="athlete" label="Athlete🏃🏼‍♂" />
                      <Radio value="coach" label="Coach👨🏼‍🏫" />
                      <Radio value="admin" label="Admin🤵🏼" />
                    </Box>
                  </RadioGroup>
                </FormControl>
                <Button type="submit" sx={{ width: "100%", mt: 2, mb: 2 }}>
                  Sign Up
                </Button>
              </form>
            </Box>
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <Typography variant="body1">
                For assistance, please contact us at{" "}
                <a href="mailto:athletetalk2000@gmail.com">
                  athletetalk2000@gmail.com
                </a>
                .
              </Typography>
              <Divider>
                <Chip>Join us and experience the benefits!</Chip>
              </Divider>
            </Box>
          </Box>
        </Box>

        {displayErr && error && (
          <Alert
            key={"Error"}
            sx={{ left: "0px", scale: "70%", right: "0px" }}
            startDecorator={<ReportIcon />}
            variant="soft"
            color={"danger"}
            endDecorator={
              <IconButton
                variant="soft"
                color={"danger"}
                onClick={() => setDisplayErr(false)}
              >
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            <div>
              <div>Error</div>
              <Typography level="body-sm" color={"danger"}>
                {error}
              </Typography>
            </div>
          </Alert>
        )}

        {displaySignupSuccessfully && setSignupSuccessfully && (
          <Alert
            key={"Success"}
            sx={{ left: "0px", scale: "70%", right: "0px" }}
            startDecorator={<ReportIcon />}
            variant="soft"
            color={"success"}
            endDecorator={
              <IconButton
                variant="soft"
                color={"success"}
                onClick={() => setDisplaySignupSuccessfully(false)}
              >
                <CheckCircleIcon />
              </IconButton>
            }
          >
            <div>
              <div>Success</div>
              <Typography level="body-sm" color={"success"}>
                {signupSuccessfully}
              </Typography>
            </div>
          </Alert>
        )}
      </Box>
    </div>
  );
}

SignUp.getLayout = (page) => <>{page}</>;