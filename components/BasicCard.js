import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import styles from "./BasicCard.module.css";

export default function BasicCard(props) {
  return (
    <div className={styles.aVideo}>
      <Card sx={{ width: 320 }}>
        <iframe
          src={`https://drive.google.com/file/d/${props.gDriveID}/preview`}
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>

        <CardContent orientation="horizontal">
          <div>
            <Typography fontSize="lg" fontWeight="lg">
              {props.title.slice(0, 80) +
                (props.title.length > 55 ? "..." : "")}
            </Typography>
            <Typography level="body-sm">
              {" "}
              {props.description.slice(0, 81) +
                (props.description.length > 81 ? "..." : "")}{" "}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
