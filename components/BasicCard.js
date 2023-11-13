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
          {/* <Typography level="title-lg" max={props.description}></Typography> */}
          </div>
        <iframe
            src={`https://drive.google.com/file/d/${props.gDriveID}/preview`}
            width="100%"
            height="100%"
            allowFullScreen
        >
        </iframe>
       
        <CardContent orientation="horizontal">
          <div>
            <Typography fontSize="lg" fontWeight="lg">
              {props.title}
            </Typography>
            <Typography level="body-sm"> {props.trainer} </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
