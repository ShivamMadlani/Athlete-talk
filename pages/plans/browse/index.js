import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { Table } from "@mui/joy";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
// import OrderTable from "./components/OrderTable";
import OrderList from "../../../components/OrderList";
import { useRouter } from "next/router";

// Replace useScript with a simple useEffect for now
import styles from "./index.module.css";
const { server } = require("../../../utils/server");

const BrowsePlans = ({ plans, preferredCategories }) => {
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

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [planTaken, setPlanTaken] = React.useState(false);

  const fetchPlan = async (id) => {
    try {
      // console.log(document.cookie.split("=")[1]);
      const planResponse = await fetch(`${server}/api/plans/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!planResponse.ok) return;
      const planData = await planResponse.json();
      setData({
        plan: planData.data.plan,
        planVideos: planData.data.planVideos,
        taken: planData.data.taken,
      });
      setPlanTaken(planData.data.taken);
    } catch (error) {
      console.log(error);
    }
  };

  const addPlanHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          plan: data.plan._id,
        }),
      });
      if (response.ok) {
        console.log("response ok");
        setPlanTaken(true);
      } else {
        throw new Error("Something went wrong!: ", err);
      }
    } catch (err) {
      console.log(err);
      alert("error occured");
    }
  };

  const PlanCards = plansSortedByPreferredCategories.map((plan, id) => {
    return (
      <Card
        key={id}
        sx={{
          borderRadius: "10px",
          height: "100%",
          m: 1,
          width: 300,
          height: 300,
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
              {plan.name.slice(0, 30) + (plan.name.length > 30 ? "..." : "")}
            </Typography>
            <Typography
              color="text.primary"
              level="body-md"
              sx={{ display: "block", mt: "20px" }}
            >
              {plan.description.slice(0, 65) +
                (plan.description.length > 65 ? "..." : "")}
            </Typography>
            <Typography
              color="text.primary"
              level="body-sm"
              sx={{ mt: "100px" }}
            >
              <b>Created By</b>: {plan.creator.name}
            </Typography>
          </Box>
          <Button
            variant="soft"
            sx={{
              backgroundColor: "#004080",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#002040",
              },
            }}
            onClick={() => {
              fetchPlan(plan._id);
              setOpen(true);
            }}
          >
            View Details
          </Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
              aria-labelledby="nested-modal-title"
              aria-describedby="nested-modal-description"
              sx={(theme) => ({
                overflowY: "auto",
                "::-webkit-scrollbar": {
                  display: "none",
                },
                [theme.breakpoints.only("xs")]: {
                  top: "unset",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderRadius: 0,
                  transform: "none",
                  maxWidth: "unset",
                },
              })}
            >
              <Typography id="nested-modal-title" level="h2">
                Plan Details
              </Typography>
              {(Object.keys(data).length == 0 && (
                <Typography
                  id="nested-modal-description"
                  textColor="text.tertiary"
                >
                  loading
                </Typography>
              )) || (
                <>
                  <Typography variant="h4" level="title-lg">
                    Plan Name: {data.plan.name}
                  </Typography>
                  <Typography variant="h6" level="title-md">
                    Plan Description: {data.plan.description}
                  </Typography>
                  <Typography variant="h6" level="title-md">
                    Plan Creator: {data.plan.creator.name}
                  </Typography>
                  {data.planVideos.map((videoDay, idx) => {
                    return (
                      <Box key={idx}>
                        <Typography variant="h5" sx={{ mt: 2 }}>
                          {" "}
                          Day {idx + 1}
                        </Typography>
                        <Table>
                          <tbody>
                            <tr>
                              <th>No.</th>
                              <th>Video Name</th>
                            </tr>
                            {videoDay.map((video, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>{idx + 1}</td>
                                  <td sx={{ width: "80%" }}>{video.title}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Box>
                    );
                  })}
                </>
              )}
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 1,
                  flexDirection: { xs: "column", sm: "row-reverse" },
                }}
              >
                {(Object.keys(data).length == 0 && (
                  <>
                    <Button disabled variant="solid" color="primary">
                      Take
                    </Button>
                    <Button disabled variant="outlined" color="neutral">
                      Back
                    </Button>
                  </>
                )) || (
                  <>
                    {!planTaken && (
                      <Button
                        variant="solid"
                        color="primary"
                        onClick={(e) => {
                          setOpen(false);
                          setData({});
                          addPlanHandler(e);
                        }}
                      >
                        Take
                      </Button>
                    )}
                    {planTaken && (
                      <Button disabled variant="solid" color="primary">
                        Already Taken
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="neutral"
                      onClick={() => {
                        setOpen(false);
                        setData({});
                      }}
                    >
                      Back
                    </Button>
                  </>
                )}
              </Box>
            </ModalDialog>
          </Modal>
        </Box>
      </Card>
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
                overflow: "auto", // Add this line to enable scrolling within the main content
                "&::-webkit-scrollbar": {
                  display: "none", // Hide the scrollbar
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
                    href="/plans/browse"
                    fontSize={12}
                    fontWeight={500}
                  >
                    Browse Plan
                  </Link>
                </Breadcrumbs>
              </Box>
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
    console.log("Cookie not found🍪🍪");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  try {
    const plans = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
      throw new Error("Something went wrong", plans);
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
    props: {}, // will be passed to the page component as props
  };
}

export default BrowsePlans;
