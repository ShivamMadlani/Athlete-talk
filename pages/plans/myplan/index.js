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
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
// import OrderTable from "./components/OrderTable";
import OrderList from "../../../components/OrderList";
import { useRouter } from "next/router";
import { Card, CardActions, CardContent, LinearProgress } from "@mui/joy";
// Replace useScript with a simple useEffect for now

import styles from "./index.module.css";

const MyPlans = ({ userPlans }) => {
  const router = useRouter();
  const PlanCards = userPlans.map((plan, idx) => {
    return (
      <>
        <Card
          key={idx}
          sx={{
            borderRadius: "10px",
            height: "100%",
            m: 1,
            width: 275,
            height: 275,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box p={1}>
              <Typography
                color="text.primary"
                level="title-lg"
                sx={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {plan.plan.name.slice(0, 30) +
                  (plan.plan.name.length > 30 ? "..." : "")}
              </Typography>
              <Typography
                color="text.primary"
                level="body-md"
                sx={{ display: "block", mt: "20px" }}
              >
                {plan.plan.description.slice(0, 45) +
                  (plan.plan.description.length > 45 ? "..." : "")}
              </Typography>
            </Box>
            <Typography variant="h6" mt="60px" mb="-5px">
              Progress
            </Typography>
            <Box>
              <LinearProgress
                determinate
                value={
                  (plan.progress / plan.plan.noOfDays).toPrecision(2) * 100
                }
              />
            </Box>
            {plan.progress === plan.plan.noOfDays && (
              <Button disabled variant="contained">
                Completed
              </Button>
            )}
            {plan.progress !== plan.plan.noOfDays && (
              <Button
                variant="soft"
                sx={{
                  backgroundColor: "#004080",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#002040",
                  },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/plans/myplan/continue/${plan.plan.id}`);
                }}
              >
                Continue
              </Button>
            )}
          </Box>
        </Card>
      </>
    );
  });

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
              <div className={styles.planFeed}>{PlanCards}</div>
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
    const userPlansResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-plan`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.cookies.jwt}`,
        },
      }
    );

    if (userPlansResponse.ok) {
      const userPlans = await userPlansResponse.json();

      return {
        props: {
          userPlans: userPlans.data.plans,
        },
      };
    } else {
      throw new Error("Something went wrong: ", userPlansResponse);
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

export default MyPlans;
