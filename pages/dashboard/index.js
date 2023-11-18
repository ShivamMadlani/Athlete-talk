import React, { useContext, useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import { Grid } from "@mui/joy";
import dynamic from "next/dynamic";
// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import AuthContext from "../../authCtx";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
// import OrderTable from "./components/OrderTable";
import OrderList from "../../components/OrderList";

const BasicRadialChart = dynamic(
  () => import("../../components/BasicRadialChart"),
  { ssr: false }
);

const formContainerStyle = {
  width: "1200px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};

export default function JoyOrderDashboardTemplate({ plans, categories }) {
  const authContext = useContext(AuthContext);

  const completedPlans = plans.filter(
    (plan) => plan.progress === plan.plan.noOfDays
  );
  const inProgressPlans = plans.filter(
    (plan) => plan.progress !== plan.plan.noOfDays
  );

  //you now have access to plans and categories in this page :)
  //display a welcome messsage in a card. username is available in authContext.user.name
  //create 2 cards. one for displaying plans in progress and another for displaying categories. choose an appropriate layout.

  return (
    <>
      <CssVarsProvider disableTransitionOnChange>
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
                  Dashboard
                </Link>
              </Breadcrumbs>
            </Box>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 2,
              }}
            >
              Welcome,{" "}
              {authContext.user?.name
                ? authContext.user.name.charAt(0).toUpperCase() +
                  authContext.user.name.slice(1)
                : ""}
            </Typography>

            <br></br>
            <Box sx={formContainerStyle}>
              <Typography variant="h5" p={2}>
                Plan Summary
              </Typography>
              {plans.length === 0 && (
                <Typography
                  variant="h5"
                  p={2}
                  sx={{ display: "flex", justifyContent: "center", pt: 0 }}
                >
                  No plans yet
                </Typography>
              )}
              {plans.length > 0 && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <BasicRadialChart
                        completed={completedPlans.length}
                        total={plans.length}
                        message={"Plan Progression"}
                      />
                    </Grid>
                    <Grid item xs={12} md={4} p={2}>
                      <Typography
                        variant="h5"
                        sx={{
                          p: 1,
                        }}
                      >
                        In Progress
                      </Typography>
                      {inProgressPlans.map((plan) => (
                        <Box
                          key={plan._id}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            p: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {plan.plan.name}
                          </Typography>
                          <Typography variant="body1">
                            {plan.progress}/{plan.plan.noOfDays}
                          </Typography>
                        </Box>
                      ))}
                    </Grid>
                    <Grid item xs={12} md={4} p={2}>
                      <Typography
                        sx={{
                          p: 1,
                        }}
                        variant="h5"
                      >
                        Completed
                      </Typography>
                      {completedPlans.map((plan) => (
                        <Box
                          key={plan._id}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            p: 1,
                          }}
                        >
                          <Typography sx={{ fontWeight: "bold" }} variant="h6">
                            {plan.plan.name}
                          </Typography>
                          <Box sx={{ display: "flex" }}>
                            <Typography variant="body1">
                              {plan.progress}/{plan.plan.noOfDays}
                            </Typography>
                            <a
                              key={plan._id}
                              href={`/api/achievement/${plan.plan._id}`}
                              target="_black"
                              style={{
                                color: "black",
                                textDecoration: "none",
                              }}
                            >
                              <Icon
                                component={Download}
                                sx={{ marginLeft: "20px" }}
                              />
                            </a>
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
            <Box sx={formContainerStyle}>
              <Typography variant="h5" p={2}>
                Motivational Photos
              </Typography>
              {categories[0].preferredCategories.length === 0 && (
                <Typography
                  variant="h5"
                  p={2}
                  sx={{ display: "flex", justifyContent: "center", pt: 0 }}
                >
                  Images
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
                m={2}
                pb={2}
              >
                {categories[0].preferredCategories.map((category, idx) => (
                  <Box
                    key={category._id}
                    sx={{
                      display: "grid",
                    }}
                    m={1}
                  >
                    <Typography
                      variant="h6"
                      p={2}
                      sx={{
                        display: "inline-grid",
                        fontWeight: "bold",
                        height: "125px",
                        width: "275px",
                        bgcolor: colors[idx % colors.length],
                        fontSize: "25px",
                        borderRadius: "10px",
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;

  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.cookies.jwt}`,
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
      throw new Error("Not authenticated!", response);
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
