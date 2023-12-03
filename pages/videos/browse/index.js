import React, { useEffect, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { nanoid } from 'nanoid';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar';
import OrderList from '../../../components/OrderList';
import styles from './index.module.css';
import BasicCard  from '../../../components/BasicCard';
const { server } = require('../../../utils/server');

const Test = ({ videos, preferredCategories }) => {
  const videosSortedByPreferredCategories = videos.sort((a, b) => {
    const aCategory = a.categories;
    const bCategory = b.categories;
    let presentA = false;
    let presentB = false;
    for (let i = 0; i < preferredCategories.length; i++) {
      if (aCategory.some((category) => category._id === preferredCategories[i])) {
        presentA = true;
      }
      if (bCategory.some((category) => category._id === preferredCategories[i])) {
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

  const VideoCards = videosSortedByPreferredCategories.map((video, idx) => (
    <BasicCard key={idx} {...video} />
  ));

  return (
    <>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Header />
          <Sidebar />
          <div className={styles.box}>
            <Box
              component="main"
              className="MainContent"
              sx={{
                px: { xs: 2, md: 6 },
                pt: { xs: 'calc(12px + var(--Header-height))', sm: 'calc(12px + var(--Header-height))', md: 3 },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100dvh',
                gap: 1,
                overflow: 'auto', // Add this line to enable scrolling within the main content
                "&::-webkit-scrollbar": {
                  display: "none", // Hide the scrollbar
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Breadcrumbs
                  size="sm"
                  aria-label="breadcrumbs"
                  separator={<ChevronRightRoundedIcon fontSize="sm" />}
                  sx={{ pl: 0 }}
                >
                  <Link underline="none" color="neutral" href="/dashboard" aria-label="Home">
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

  if (!req.cookies.jwt) return { redirect: { destination: '/login', permanent: false } };

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
}

export default Test;
