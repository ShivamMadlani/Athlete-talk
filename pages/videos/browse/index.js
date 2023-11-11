import React, { useEffect, useState, useEnhancedEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { nanoid } from "nanoid";

import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
// import OrderTable from "./components/OrderTable";
import OrderList from "../../../components/OrderList";

// Replace useScript with a simple useEffect for now
import BasicCard from "../../../components/BasicCard";
import data from "../../../components/dataVideo";
import styles from "./index.module.css";
const { server } = require("../../../utils/server");

const test = () => {
  const VideoCards = data.map((item) => <BasicCard key={item.id} {...item} />);

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
                    Browse Video
                  </Link>
                </Breadcrumbs>
              </Box>
              <OrderList />
              <div className={styles.videoFeed}>{VideoCards}</div>
            </Box>
          </div>
        </Box>
      </CssVarsProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const { req, res } = context;

  if (!req.cookies.jwt)
    return { redirect: { destination: '/login', permanent: false } };

  try {
    const response = await fetch(`${server}/api/video`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.cookies.jwt}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return {
        props: {
          videos: data.data.videos,
          preferredCategories: data.data.preferredCategories,
        },
      };
    } else {
      throw new Error('something went wrong!');
    }
  } catch (err) {
    console.log(err);
    return { redirect: { destination: '/login', permanent: false } };
  }
  return { redirect: { destination: '/login', permanent: false } };
}

export default test;
