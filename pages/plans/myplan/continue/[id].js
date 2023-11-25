import React, { useEffect, useState, useEnhancedEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { List, ListItem, ListItemContent, ListItemDecorator } from "@mui/joy";
// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Videocam } from "@mui/icons-material";

import Header from "../../../../components/header";
import Sidebar from "../../../../components/sidebar";
// import OrderTable from "./components/OrderTable";
import OrderList from "../../../../components/OrderList";
import { useRouter } from "next/router";

// Replace useScript with a simple useEffect for now
import styles from "./index.module.css";
const { server } = require("../../../../utils/server");

const ContinuePlan = ({ videos, day }) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    if (currentPage === 0) {
      setCurrentPage(1);
      setStartTime((prev) => {
        if (prev === null) return Date.now();
        return prev;
      });
    }

    if (currentPage === 1) {
      if (currentVideo < videos.length - 1) {
        setCurrentVideo((prev) => prev + 1);
      } else {
        setCurrentPage(2);
      }
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (currentPage === 0) {
      router.back();
    }

    if (currentPage === 1) {
      if (currentVideo === 0) {
        setCurrentPage(0);
      } else {
        setCurrentVideo((prev) => prev - 1);
      }
    }

    if (currentPage === 2) {
      setCurrentPage(1);
    }
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endTime = Date.now();

    const timeTaken = endTime - startTime;

    const body = {
      day,
      planID: router.query.id,
      timeTaken,
    };

    try {
      const updatePlanDay = await fetch(`/api/plans/myplan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });

      if (updatePlanDay.ok) {
        const data = await updatePlanDay.json();
        const score = data.data.score;
        setScore(score);
        setCurrentPage(2);
      }
    } catch (err) {
      console.log(err);
      router.push("/plans/myplan");
    }
    setLoading(false);
  };

  const concentPage = (
    <Sheet
      elevation={2}
      sx={{
        p: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">
        Welcome to Day {day + 1} of your plan...
      </Typography>
      <Typography mt={1} mb={2} variant="h5">
        You have <b>{videos.length}</b> videos to watch today:
      </Typography>
      {videos.length > 0 && (
        <List>
          {videos.map((video) => (
            <ListItem key={video._id}>
              <ListItemDecorator>
                <Videocam />
              </ListItemDecorator>
              <ListItemContent>{video.title}</ListItemContent>
            </ListItem>
          ))}
        </List>
      )}
      <Box display={"flex"} justifyContent={"space-between"} mt={"auto"}>
        <Button variant="outlined" color="neutral" onClick={handleBack}>
          Back
        </Button>
        <Button variant="solid" color="primary" onClick={handleStart}>
          Start
        </Button>
      </Box>
    </Sheet>
  );
  const videoPage = (
    <Sheet
      elevation={2}
      sx={{
        p: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: "10px",
          fontWeight: "bold",
        }}
      >
        Exercise #{currentVideo + 1}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mb: "10px",
        }}
      >
        <b>Title</b>: {videos[currentVideo].title}
      </Typography>
      <Box display={"flex"} justifyContent={"center"}>
        <iframe
          src={`https://drive.google.com/file/d/${videos[currentVideo].gDriveID}/preview`}
          width="1280"
          height="480"
          allowFullScreen
          allow="autoplay"
          frameborder="0"
          style={{
            borderRadius: "10px",
          }}
        ></iframe>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} mt="10px">
        <Button onClick={handleBack} variant="outlined" color="neutral">
          Back
        </Button>
        {currentVideo === videos.length - 1 && (
          <Button
            disabled={loading}
            variant="solid"
            color="primary"
            onClick={handleFinish}
          >
            Finish
          </Button>
        )}
        {currentVideo !== videos.length - 1 && (
          <Button variant="solid" color="primary" onClick={handleStart}>
            Next
          </Button>
        )}
      </Box>
    </Sheet>
  );
  const finishPage = (
    <Sheet
      elevation={2}
      sx={{
        p: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mb: "20px",
          fontWeight: "bold",
        }}
      >
        Congratulations! You have completed today&apos;s task.
      </Typography>
      <Box display="flex" justifyContent="center">
        <Typography variant="h6">
          Your score is: {Math.abs(score) + ""}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt="10px">
        <Button
          variant="solid"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            router.push("/plans/myplan");
          }}
        >
          Go to plans
        </Button>
      </Box>
    </Sheet>
  );
  const pages = [concentPage, videoPage, finishPage];

  return (
    <>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <Header />
          <Sidebar />
          <div className={styles.box}>
            <Box
              component="main"
              className="MainContent"
              sx={{
                px: {
                  xs: 2,
                  md: 6,
                },
                pt: {
                  xs: "calc(12px + var(--Header-height))",
                  sm: "calc(12px + var(--Header-height))",
                  md: 3,
                },
                pb: {
                  xs: 2,
                  sm: 2,
                  md: 3,
                },
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                height: "100dvh",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                    href="#some-link"
                    fontSize={12}
                    fontWeight={500}
                  >
                    My Plans
                  </Link>
                </Breadcrumbs>
              </Box>
              <OrderList />
              <div>{pages[currentPage]}</div>
            </Box>
          </div>
        </Box>
      </CssVarsProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { id } = context.query;

  if (!req.cookies.jwt) {
    console.log("Cookie not found🍪🍪");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-plan/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.cookies.jwt}`,
        },
      }
    );

    if (response.ok) {
      const plan = await response.json();

      return {
        props: {
          videos: plan.data.videos,
          day: plan.data.day,
        },
      };
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default ContinuePlan;
