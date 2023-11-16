import React, { useState } from "react";
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

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// import DropZone from "./DropZone";
// import FileUpload from "./FileUpload";
import CountrySelector from "./CountrySelector";
import { Table } from "@mui/joy";
import { DataGrid } from "@mui/x-data-grid";
import OrderTable from "./OrderTable";
// import EditorToolbar from "./EditorToolbar";

export default function MyProfile({ categories, videos }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentDay, setCurrentDay] = useState(1);
  const [noOfDays, setNoOfDays] = useState(1);
  const [videosSelected, setVideosSelected] = useState([[]]);

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
              <Input size="medium" />
            </FormControl>
          </Stack>
          <Stack direction="column" spacing={1}>
            <FormControl>
              <FormLabel>Plan Description</FormLabel>
              <Input size="large" />
            </FormControl>
          </Stack>
          <Stack direction="column" spacing={1}>
            <FormControl>
              <FormLabel>No.of Days</FormLabel>
              <Input size="large" />
            </FormControl>
          </Stack>
          <div>
            <CountrySelector />
          </div>
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
              <Input size="sm" />
            </FormControl>
          </Stack>
        </Stack>
        <FormControl>
          <FormLabel>Plan Description</FormLabel>
          <Input size="sm" />
        </FormControl>
        <FormControl sx={{ flexGrow: 1 }}>
          <FormLabel>No. of Days</FormLabel>
          <Input size="sm" sx={{ flexGrow: 1 }} />
        </FormControl>
        <div>
          <CountrySelector />
        </div>
      </Stack>
    </>
  );

  const page1 = (
    <>
      <Typography fontSize="xl">Day</Typography>
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
      <h1>page2</h1>
    </>
  );

  const pages = [page0, page1, page2];

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
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              fontSize={12}
              fontWeight={500}
            >
              Users
            </Link>
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
                <Button size="sm" variant="solid">
                  Submit
                </Button>
              )}
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
