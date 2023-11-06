import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import styles from "./BasicCard.module.css";

export default function BasicCard(props) {
  return (
    <div className={styles.aVideo}>
      <Card sx={{ width: 320 }}>
        <div>
          <Typography level="title-lg" max={props.description}></Typography>
          <Typography level="body-sm">April 24 to May 02, 2021</Typography>
        </div>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <img src={props.img} srcSet="" loading="lazy" alt="" />
        </AspectRatio>
        <CardContent orientation="horizontal">
          <div>
            <Typography fontSize="lg" fontWeight="lg">
              {props.title}
            </Typography>
            <Typography level="body-sm"> {props.trainer} </Typography>
          </div>
          <a
            href="https://www.youtube.com/results?search_query=Sport+For+Health%3A+Talking+mental+health"
            target="_blank" // To open the link in a new tab
            rel="noopener noreferrer" // Recommended for security
            max-heigth="36px"
          >
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              href="https://www.youtube.com/results?search_query=Sport+For+Health%3A+Talking+mental+health"
              components="a"
            >
              Watch
            </Button>{" "}
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
