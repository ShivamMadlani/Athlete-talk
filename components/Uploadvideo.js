import React, { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Dashboard } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function MyProfile() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoader(true);

    console.log(title);

    if (!title) return alert("Please provide a title for the video!");
    if (!description)
      return alert("Please provide a description for the video!");
    if (!file) return alert("Please select a file to upload!");

    let formData = new FormData();
    formData.append("file", file.data);
    formData.append("title", title);
    formData.append("description", description);
    console.log("Sending the video upload req");
    fetch(`/api/video/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((response) => {
        setSubmitLoader(false);
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
          throw new Error("Something went wrong!🥲");
        }
      })
      .then((data) => {
        // console.log(data);
        alert("Video Uploaded Successfully!");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const handleFileChange = (event) => {
    console.log(event.target.files);
    const file = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    const str = event.target.files[0].name;
    setFileName(str);
    setFile(file);
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: {
            sm: -100,
            md: -110,
          },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Box
          sx={{
            px: {
              xs: 2,
              md: 6,
            },
          }}
        >
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="/dashboard"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="/videos/upload"
              fontSize={12}
              fontWeight={500}
            >
              Upload video
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>

      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: {
            xs: 2,
            md: 6,
          },
          py: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Upload Video</Typography>
            <Typography level="body-sm">
              Select the .mp4 file that you want to upload and enter appropriate
              description and category of the video.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <FormControl
                sx={{
                  display: {
                    sm: "flex-column",
                    md: "flex-row",
                  },
                  gap: 2,
                }}
              >
                <Input
                  placeholder="Video Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl
                sx={{
                  display: {
                    sm: "flex-column",
                    md: "flex-row",
                  },
                  gap: 2,
                }}
              >
                <Input
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: "flex-column",
                      md: "flex-row",
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="Video Title" />
                </FormControl>
                <FormControl
                  sx={{
                    display: {
                      sm: "flex-column",
                      md: "flex-row",
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="Description" />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>

          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              {fileName}
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                onChange={handleFileChange}
                startDecorator={
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </SvgIcon>
                }
              >
                Upload a file
                <VisuallyHiddenInput type="file" />
              </Button>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleSubmit}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
