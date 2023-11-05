
import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import SkillBars from "./SkillBars";


// Replace useScript with a simple useEffect for now
const useEnhancedEffect =
  typeof window !== "undefined" ? useEffect : React.useEffect;

export default function ProgressBar() {
  

  const [skills, setSkills] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedSkills = JSON.parse(localStorage.getItem("skills")) || [];
      return storedSkills;
    } else {
      return [];
    }
  });
  
  
  const [currentSkillId, setCurrentSkillId] = useState(null);

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  function newProgress() {
    const title = prompt("Enter the skill title:");
    const progress = prompt("Enter the skill progress (0-100):");

    if (title === null || progress === null || (progress > 100) || progress < 0) {
      return; 
    } 

    const newSkill = {
      id: nanoid(),
      title,
      progress: parseInt(progress, 10) || 0,
    };

    setSkills((prevSkills) => [newSkill, ...prevSkills]);
    setCurrentSkillId(newSkill.id);
  }

  function deleteSkill(skillId) {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));
  }

  function editProgress(skillId, newProgress) {
   let progressValue = parseInt(newProgress, 10) || 0;
    setSkills((prevSkills) => {
      return prevSkills.map((skill) => {
        if (skill.id === skillId) {
          return { ...skill, progress: progressValue };
        }
        return skill;
      });
    });
  }

  const SkillBarsList = skills.map((skill) => {
    return (
      <SkillBars
        key={skill.id}
        {...skill}
        onDelete={() => deleteSkill(skill.id)}
        editProgress={(newProgress) => editProgress(skill.id, newProgress)}
      />
    );
  });

  /* ----------------------- */
  


  return (
    <>
        <div >
            <div className="app">
              <h1 className="title-text">
                Progress Bar
                <button onClick={newProgress}><img src="add.png" alt="" width="50px" height="50px"/></button>
              </h1>
              {SkillBarsList}
            </div>
        </div>
    </>
  );
}
