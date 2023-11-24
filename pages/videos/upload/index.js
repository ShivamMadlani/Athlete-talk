import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import Uploadvideo from "../../../components/Uploadvideo";
const { server } = require("../../../utils/server");

export default function JoyOrderDashboardTemplate() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: {
              xs: "calc(12px + var(--Header-height))",
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
          }}
        >
          <Uploadvideo />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export const getServerSideProps = async (context) => {
  const { req, res } = context;
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
    const categoriesResponse = await fetch(`${server}/api/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.cookies.jwt}`,
      },
    });

    let categories;
    if (categoriesResponse.ok) {
      const data = await categoriesResponse.json();
      if (!data.data.categories) throw new Error("No categories found");
      categories = data.data.categories;
    } else {
      throw new Error("Something went wrong!🥲");
    }

    return {
      props: {
        categories,
      },
    };
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
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};
