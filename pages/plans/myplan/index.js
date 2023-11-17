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
import { useRouter } from 'next/router';
import {
  Card,
  CardActions,
  CardContent,
} from '@mui/joy';
// Replace useScript with a simple useEffect for now

import styles from "./index.module.css";


function createHex() {
  var hexCode1 = '';
  var hexValues1 = '0123456789abcdef';

  for (var i = 0; i < 6; i++) {
    hexCode1 += hexValues1.charAt(
      Math.floor(Math.random() * hexValues1.length)
    );
  }
  return hexCode1;
}

const gradients = [
    'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
    'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
    'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
    'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
    'linear-gradient(45deg, #FFC3A0 0%, #FFAFBD 100%)',
    'linear-gradient(45deg, #B6CEE8 0%, #F578DC 100%)',
    'linear-gradient(45deg, #F3FFB6 0%, #CA74F7 100%)',
 ];

const MyPlans = ({userPlans}) => {
    const router = useRouter();
    const PlanCards = userPlans.map((plan,idx) => {
        return (
            <Box key={idx}>
            <Card
              sx={{
                width: '300px',
                height: '300px',
                m: 1,
                borderRadius: '10px',
              }}
            >
              <Box
                sx={{
                  height: 140,
                  background: `${gradients[idx % gradients.length]}`,
                }}
              />
              <Box
                sx={{
                  background: 'white',
                  width: 'fit-content',
                  borderRadius: '50px',
                  padding: '5px 10px',
                  boxShadow: `0px 2px 4px #2ecc71`,
                  position: 'relative',
                  mt: '-20px',
                  ml: '5px',
                }}
              >
                <Typography variant="h6" sx={{ verticalAlign: 'middle' }}>
                  Progress :{' '}
                  {(plan.progress / plan.plan.noOfDays).toPrecision(2) * 100}%
                </Typography>
              </Box>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    mt: '10px',
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {plan.plan.name}
                </Typography>
              </CardContent>
              <CardActions>
                {plan.progress === plan.plan.noOfDays && (
                  <Button disabled variant="contained">
                    Completed✅
                  </Button>
                )}
                {plan.progress !== plan.plan.noOfDays && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/plans/myplan/continue/${plan.plan.id}`);
                    }}
                    variant="contained"
                  >
                    Continue
                  </Button>
                )}
              </CardActions>
            </Card>
          </Box>
        );
    })

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
      console.log('Cookie not found🍪🍪');
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  
    try {
      const userPlansResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-plan`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
        throw new Error('Something went wrong: ', userPlansResponse);
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
  
  export default MyPlans;
  
