"use client";
import React, { useEffect, useState } from "react";
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
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';


import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
// import OrderTable from "./components/OrderTable";
import OrderList from "../../components/OrderList";
import AuthContext from "@/authCtx";

// Replace useScript with a simple useEffect for now
const useEnhancedEffect =
  typeof window !== "undefined" ? useEffect : React.useEffect;

const getData = async (token) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        props: {
          plans: data.data.userPlans,
          categories: data.data.userCategories,
        },
      };
    } else {
      throw new Error('Not authenticated!', response);
    }
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function JoyOrderDashboardTemplate() {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token == null) {
      router.push('/login');
    }
  }

  // const obj = getData(token);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, []);

  const authCtx = React.useContext(AuthContext);

  return (
    <>
      <CssVarsProvider disableTransitionOnChange >
        <CssBaseline />
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <Header />
          <Sidebar />
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
                  Dashboard
                </Link>
                {/* <Typography color="primary" fontWeight={500} fontSize={12}>
                Orders
              </Typography> */}
              </Breadcrumbs>
            </Box>
            {/* <Box
            sx={{
              display: "flex",
              my: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2">Orders</Typography>
            <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
            >
              Download PDF
            </Button>
          </Box> */}
            {/* <OrderTable /> */}
            <OrderList />
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
}
