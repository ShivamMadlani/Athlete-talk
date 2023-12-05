import React from "react";
import {
  Box,
  Typography,
  Tabs,
  TabList,
  Tab,
  tabClasses,
  Divider,
  Stack,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  CardOverflow,
  CardActions,
  Button,
} from "@mui/joy";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Textarea from "@mui/joy/Textarea";
import FormHelperText from "@mui/joy/FormHelperText";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useEffect, useState } from "react";

export default function MyProfile() {
  const [profile, setProfile] = useState({});

  const fetchUser = async () => {
    const response = await fetch(`/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data.user);
    } else {
      alert("Something went wrong", response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: {
            sm: -100,
            md: -110,
          },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Box
          sx={{
            px: {
              xs: 2,
              md: 6,
            },
          }}
        >
          <Stack
            spacing={2}
            sx={{
              mt: 1,
              mb: 2,
            }}
          >
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
                Users
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                My profile
              </Typography>
            </Breadcrumbs>
            <Typography
              level="h2"
              sx={{
                mt: 1,
                mb: 2,
              }}
            >
              My profile
            </Typography>
          </Stack>
          <Tabs
            defaultValue={0}
            sx={{
              bgcolor: "transparent",
            }}
          >
            <TabList
              tabFlex={1}
              size="sm"
              sx={{
                pl: {
                  xs: 0,
                  md: 4,
                },
                justifyContent: "left",
                [`&& .${tabClasses.root}`]: {
                  flex: "initial",
                  bgcolor: "transparent",
                  [`&.${tabClasses.selected}`]: {
                    fontWeight: "600",
                    "&::after": {
                      height: "2px",
                      bgcolor: "primary.500",
                    },
                  },
                },
              }}
            >
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={0}
              >
                Settings
              </Tab>
            </TabList>
          </Tabs>
        </Box>
      </Box>

      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: {
            xs: 2,
            md: 6,
          },
          py: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Card>
          <Box>
            <Typography level="title-md">Personal info</Typography>
            {/* <Typography level="body-sm">
              Customize how your profile information will apper to the networks.
            </Typography> */}
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={5}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                  srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            </Stack>

            <Stack spacing={2}>
              <Typography>{profile.name}</Typography>
              <Typography>{profile.role}</Typography>
              <Typography>{profile.email}</Typography>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={5}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={108}
                  sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                    srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </Stack>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Typography>{profile.name}</Typography>
                <Typography>{profile.role}</Typography>
                <Typography>{profile.email}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>        
      </Stack>
    </Box>
  );
}
