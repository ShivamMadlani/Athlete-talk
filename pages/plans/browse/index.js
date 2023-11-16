import React, { useEffect, useState, useEnhancedEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
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

// Replace useScript with a simple useEffect for now
import styles from "./index.module.css";

const colors = [
  '#f8bbd0',
  '#e1bee7',
  '#d1c4e9',
  '#c5cae9',
  '#bbdefb',
  '#b3e5fc',
  '#b2ebf2',
  '#b2dfdb',
  '#c8e6c9',
  '#dcedc8',
  '#f0f4c3',
  '#fff9c4',
  '#ffecb3',
  '#ffe0b2',
  '#ffccbc',
  '#d7ccc8',
  '#f5f5f5',
  '#cfd8dc',
];

const BrowsePlans = ({plans,preferredCategories}) => {
    const plansSortedByPreferredCategories = plans.sort((a, b) => {
        const aCategory = a.categories;
        const bCategory = b.categories;
        let presentA = false;
        let presentB = false;
        for (let i = 0; i < preferredCategories.length; i++) {
          if (aCategory.some((category) => category === preferredCategories[i])) {
            presentA = true;
          }
          if (bCategory.some((category) => category === preferredCategories[i])) {
            presentB = true;
          }
        }
        if (!presentA && !presentB) {
          return 0;
        }
        if (!presentA) {
          return 1;
        }
        if (!presentB) {
          return -1;
        }
        return 0;
      });

      const router = useRouter();
//   const PlanCards = data.map((item) => <BasicCard key={item.id} {...item} />);
    const PlanCards = plansSortedByPreferredCategories.map((plan,id) => {
        return (
            <Card
                key={id}
                sx={{
                  backgroundColor: colors[id % colors.length],
                  borderRadius: '10px',
                  height: '100%',
  
                  m: 1,
                  width: 275,
                  height: 275,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <Box p={2}>
                    <Typography
                      color="text.primary"
                      variant="h5"
                      sx={{
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {plan.name.slice(0, 30) +
                        (plan.name.length > 30 ? '...' : '')}
                    </Typography>
                    <Typography
                      color="text.primary"
                      variant="p"
                      sx={{ display: 'block', mt: '30px' }}
                    >
                      {plan.description.slice(0, 45) +
                        (plan.description.length > 45 ? '...' : '')}
                    </Typography>
                    <Typography color="text.primary" variant="body1">
                      <b>Created By</b>: {plan.creator.name}
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      backgroundColor: '#192a56',
                      color: 'white',
                      borderTopLeftRadius: '0px',
                      borderTopRightRadius: '0px',
                    }}
                    variant="contained"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/plans/browse/${plan._id}`);
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
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
                    Browse Plan
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
      const plans = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plans`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${req.cookies.jwt}`,
        },
      });
  
      if (plans.ok) {
        const data = await plans.json();
  
        return {
          props: {
            plans: data.data.plans,
            preferredCategories: data.data.preferredCategories,
          },
        };
      } else {
        console.log(plans);
        throw new Error('Something went wrong', plans);
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
      props: {}, // will be passed to the page component as props
    };
  }

  export default BrowsePlans;
