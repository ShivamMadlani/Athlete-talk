import { Box, Button, Sheet, Table, Typography, useTheme } from "@mui/joy";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
const { server } = require("../../../utils/server");

const PlanDetails = ({ plan, planVideos, taken }) => {
  const router = useRouter();
  const theme = useTheme();
  const [planTaken, setPlanTaken] = useState(taken);

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
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
          plan: plan._id,
        }),
      });
      if (response.ok) {
        setPlanTaken(true);
      } else {
        throw new Error("Something went wrong!: ", err);
      }
    } catch (err) {
      console.log(err);
      alert("err");
    }
  };

  return (
    <>
      {/* <Button onClick={handleBack} variant="contained">
          Back
        </Button> */}
      <Box>
        <Typography variant="h4" level="title-lg">
          {plan.name}
        </Typography>
        <Typography variant="h6" level="title-md">
          {plan.description}
        </Typography>
        <Typography variant="h6" level="title-md">
          <b>Created By:</b> {plan.creator.name}
        </Typography>
        {/* <Typography variant="h6" level='title-md' sx={{ mb: 1, display: 'inline' }}>
            Categories:{' '}
          </Typography> */}
        {plan.categories.map((category, idx) => {
          return (
            <Typography
              sx={{
                border: `2px solid ${theme.palette.primary.main}`,
                color: "white",
                width: "fit-content",
                padding: 0.76,
                mr: 0.3,
                borderRadius: "20px",
                backgroundColor: theme.palette.primary.main,
              }}
              key={idx}
              variant="p"
            >
              {category.name}
            </Typography>
          );
        })}

        {planVideos.map((videoDay, idx) => {
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
                </tbody>
              </Table>
            </Box>
          );
        })}
      </Box>
      {!planTaken && (
        <Button
          onClick={addPlanHandler}
          variant="contained"
          sx={{
            backgroundColor: "blue",
            color: "white",
            marginLeft: 2,
          }}
        >
          Take
        </Button>
      )}
      <Button
        onClick={handleBack}
        variant="contained"
        sx={{
          backgroundColor: "blue",
          color: "white",
          marginLeft: 2,
        }}
      >
        Back
      </Button>

      {planTaken && (
        <Button disabled variant="contained">
          Already Taken!
        </Button>
      )}
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
    const planResponse = await fetch(`${server}/api/plans/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.cookies.jwt}`,
      },
    });
    if (!planResponse.ok)
      throw new Error("Something went wrong!🥲", planResponse);
    const planData = await planResponse.json();

    return {
      props: {
        plan: planData.data.plan,
        planVideos: planData.data.planVideos,
        taken: planData.data.taken,
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
    props: {},
  };
}

export default PlanDetails;
