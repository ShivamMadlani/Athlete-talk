import React, { useContext } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import { CircularProgress, Grid } from "@mui/joy";
import { useCountUp } from "use-count-up";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import AuthContext from "../../authCtx";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

const formContainerStyle = {
  width: "100%",
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

  const { value } = useCountUp({
    isCounting: true,
    duration: 1.5,
    start: 0,
    end: Math.floor((completedPlans.length * 100) / plans.length),
  });

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
              overflow: "auto",
              "::-webkit-scrollbar": {
                display: "none",
              },
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
              level="h4"
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 2,
              }}
            >
              Welcome,{" "}
              {authContext.user?.name
                ? authContext.user.name.charAt(0).toUpperCase() +
                  authContext.user.name.slice(1)
                : ""}
            </Typography>

            <Box sx={formContainerStyle}>
              <Typography p={2} fontWeight={700}>
                Plan Summary
              </Typography>
              {plans.length === 0 && (
                <Typography
                  p={2}
                  sx={{ display: "flex", justifyContent: "center", pt: 0 }}
                >
                  No plans yet
                </Typography>
              )}
              {plans.length > 0 && (
                <>
                  <Grid container spacing={2}>
                    <Grid
                      xs={12}
                      md={3.5}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CircularProgress
                        aria-label="plan progress"
                        style={{ color: "black" }}
                        color={value == 100 ? "success" : "primary"}
                        variant="solid"
                        determinate
                        value={Number(value)}
                        sx={{
                          "--CircularProgress-progressThickness": "10px",
                          "--CircularProgress-trackThickness": "12px",
                          "--CircularProgress-size": "10rem",
                          my: "20px",
                        }}
                      >
                        <Typography fontSize={value > 40 && value / 3}>
                          {value}%
                        </Typography>
                      </CircularProgress>
                    </Grid>
                    <Grid xs={12} md={4} p={2}>
                      <Typography
                        fontWeight={600}
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
                          <Typography>{plan.plan.name}</Typography>
                          <Typography>
                            {plan.progress}/{plan.plan.noOfDays}
                          </Typography>
                        </Box>
                      ))}
                    </Grid>
                    <Grid xs={12} md={4} p={2}>
                      <Typography
                        fontWeight={600}
                        sx={{
                          p: 1,
                        }}
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
                          <Typography>{plan.plan.name}</Typography>
                          <Box sx={{ display: "flex" }}>
                            <Typography>
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
                            ></a>
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
            <Box sx={formContainerStyle}>
              <Typography p={2} fontWeight={700}>
                Motivational Photos
              </Typography>
              {categories[0].preferredCategories.length === 0 && (
                <Typography
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
