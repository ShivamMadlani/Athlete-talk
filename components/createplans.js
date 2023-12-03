import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

// import DropZone from "./DropZone";
// import FileUpload from "./FileUpload";
// import CountrySelector from "./CountrySelector";
import { Table } from "@mui/joy";
import OrderTable from "./OrderTable";
// import EditorToolbar from "./EditorToolbar";

import IconButton from "@mui/joy/IconButton";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Alert from "@mui/joy/Alert";

export default function MyProfile({ categories, videos }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const extractedCategories = categories.map((category) => category.name);
  const [newCategoryButtonClicked, setNewCategoryButtonClicked] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentDay, setCurrentDay] = useState(1);
  const [noOfDays, setNoOfDays] = useState(1);
  const [planName, setPlanName] = useState("");
  const [planDes, setPlanDes] = useState("");
  const [videosSelected, setVideosSelected] = useState([[]]);

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [display, setDisplay] = React.useState(false);

  useEffect(() => {
    setVideosSelected((prev) => {
      const newVideosSelected = prev;
      let diff = noOfDays - prev.length;
      while (diff !== 0) {
        if (diff > 0) {
          newVideosSelected.push([]);
          diff--;
        } else {
          newVideosSelected.pop();
          diff++;
        }
      }
      return newVideosSelected;
    });
  }, [noOfDays]);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!planName || !planDes || videosSelected.length == 0 || noOfDays == 0) {
      setDisplay(true);
      setError("Please fill all the fields");
      return;
    }

    const filteredCateogries = categories.filter((category) =>
      selectedCategories.includes(category.name)
    );
    const selectedCategoriesID = filteredCateogries.map(
      (category) => category._id
    );

    const plan = {
      name: planName,
      description: planDes,
      categories: selectedCategoriesID,
      noOfDays: noOfDays,
      videos: videosSelected,
    };

    const postResponse = await fetch(`/api/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(plan),
    });

    if (postResponse.ok) {
      /* alert("Plan created successfully"); */
      setDisplay(true);
      setSuccess("Plan created successfully");
    } else {
      /* alert("Error creating plan"); */
      setDisplay(true);
      setError("Error creating plan");
      console.log(postResponse);
    }
  };
  const handleNext = () => {
    if (currentPage == 0 || (currentPage == 1 && currentDay == noOfDays)) {
      setCurrentPage((prev) => prev + 1);
    } else if (currentPage == 1) {
      setCurrentDay((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage == 2 || (currentPage == 1 && currentDay == 1)) {
      setCurrentPage((prev) => prev - 1);
    } else if (currentPage == 1) {
      setCurrentDay((prev) => prev - 1);
    }
  };

  const page0 = (
    <>
      <Stack
        direction="row"
        spacing={3}
        sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
      >
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Stack spacing={1}>
            <FormLabel>Plan Name</FormLabel>
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
                size="medium"
                onChange={(e) => setPlanName(e.target.value)}
                value={planName}
              />
            </FormControl>
          </Stack>
          <Stack direction="column" spacing={1}>
            <FormControl>
              <FormLabel>Plan Description</FormLabel>
              <Input
                size="large"
                onChange={(e) => setPlanDes(e.target.value)}
                value={planDes}
              />
            </FormControl>
          </Stack>
          <Stack direction="column" spacing={1}>
            <FormControl>
              <FormLabel>No.of Days</FormLabel>
              <Input
                size="large"
                onChange={(e) => setNoOfDays(e.target.value)}
                value={noOfDays}
              />
            </FormControl>
          </Stack>
          {/* <div>
            <CountrySelector />
          </div> */}
        </Stack>
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
      >
        <Stack direction="row" spacing={2}>
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <FormLabel>Plan name</FormLabel>
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
                size="sm"
                onChange={(e) => setPlanName(e.target.value)}
                value={planName}
              />
            </FormControl>
          </Stack>
        </Stack>
        <FormControl>
          <FormLabel>Plan Description</FormLabel>
          <Input
            size="sm"
            onChange={(e) => setPlanDes(e.target.value)}
            value={planDes}
          />
        </FormControl>
        <FormControl sx={{ flexGrow: 1 }}>
          <FormLabel>No. of Days</FormLabel>
          <Input
            size="sm"
            sx={{ flexGrow: 1 }}
            onChange={(e) => setNoOfDays(e.target.value)}
            value={noOfDays}
          />
        </FormControl>
        {/* <div>
          <CountrySelector />
        </div> */}
      </Stack>
    </>
  );

  const page1 = (
    <>
      <Typography fontSize="xl">Day {currentDay}</Typography>
      <OrderTable
        rows={videos}
        selectedVideos={videosSelected}
        setVideosSelected={setVideosSelected}
        day={currentDay - 1}
      />
    </>
  );
  const page2 = (
    <>
      <Typography variant="h4">Summary</Typography>
      <Table>
        <tbody>
          <tr>
            <td>
              <Typography>Plan name</Typography>
            </td>
            <td>
              <Typography>{planName}</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography>Plan Description</Typography>
            </td>
            <td>
              <Typography>{planDes}</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography>No. of Days</Typography>
            </td>
            <td>
              <Typography>{noOfDays}</Typography>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <Typography>Day</Typography>
            </td>
            <td>
              <Typography>Video name</Typography>
            </td>
          </tr>
          {videosSelected.map((vid, index) => {
            return vid.map((id) => {
              const video = videos.find((video) => video.id == id);
              return (
                <tr key={id}>
                  <td>
                    <Typography>{index + 1}</Typography>
                  </td>
                  <td>
                    <Typography>{video.title}</Typography>
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </Table>
    </>
  );

  const pages = [page0, page1, page2];

  function displayAlert() {
    if (display && success) {
      return (
        <Alert
          key={"Success"}
          sx={{
            scale: "70%",
            top: "5px",
            right: "0px",
            display: "flex",
            position: "sticky",
          }}
          startDecorator={<ReportIcon />}
          variant="soft"
          color={"success"}
          endDecorator={
            <IconButton
              variant="soft"
              color={"success"}
              onClick={() => setDisplay(false)}
            >
              <CheckCircleIcon />
            </IconButton>
          }
        >
          <div>
            <div>Success</div>
            <Typography level="body-sm" color={"success"}>
              {success}
            </Typography>
          </div>
        </Alert>
      );
    } else if (display && error) {
      return (
        <Alert
          key={"Error"}
          sx={{ top: "0px", scale: "70%", right: "0px" }}
          startDecorator={<ReportIcon />}
          variant="soft"
          color={"danger"}
          endDecorator={
            <IconButton
              variant="soft"
              color={"danger"}
              onClick={() => setDisplay(false)}
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
      );
    }
  }

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
            {/* <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              fontSize={12}
              fontWeight={500}
            >
              Users
            </Link> */}
            <Typography color="primary" fontWeight={500} fontSize={12}>
              Create Plans
            </Typography>
          </Breadcrumbs>
          <Typography
            level="h2"
            sx={{
              mt: 1,
              mb: 2,
            }}
          >
            Create Plans
          </Typography>
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
            <Typography level="title-md">Create Plans</Typography>
            <Typography level="body-sm">Customize your plan</Typography>
          </Box>
          <Divider />
          {pages[currentPage]}
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={handleBack}
              >
                Back
              </Button>
              {currentPage != pages.length - 1 && (
                <Button size="sm" variant="solid" onClick={handleNext}>
                  Next
                </Button>
              )}
              {currentPage == pages.length - 1 && (
                <Button size="sm" variant="solid" onClick={handleCreate}>
                  Submit
                </Button>
              )}
            </CardActions>
          </CardOverflow>
        </Card>
        <Box sx={{ display: "flex", marginLeft: "20px" }}>
          {displayAlert(success, error)}
        </Box>
      </Stack>
    </Box>
  );
}
