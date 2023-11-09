import React from "react";

function SkillBars(props) {
  return (
    <div className="container">
      <div className="skill-box">
        <span className="title">
          {props.title}
          <div className="buttons">
            <img
              src="delete.png"
              alt=""
              width="25px"
              height="25px"
              onClick={props.onDelete}
            />
            <img
              src="edit-button.png"
              alt=""
              width="25px"
              height="25px"
              onClick={() => {
                const newProgress = prompt("Enter the new skill progress (0-100):");
                if (newProgress !== null) {
                  const progressValue = parseInt(newProgress, 10);
                  if (!isNaN(progressValue) && progressValue >= 0 && progressValue <= 100) {
                    props.editProgress(progressValue);
                  } else {
                    alert("Please enter a valid skill progress (0-100).");
                  }
                }
              }}
            />
          </div>
        </span>
        <div className="skill-bar">
          <span className="skill-per" style={{ width: `${props.progress}%` }}>
            <span className="tooltip">{props.progress}%</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SkillBars;
