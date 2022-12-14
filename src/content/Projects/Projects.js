import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import style from "./Projects.module.css";
import Card from "./Card";
import { buttons } from "../../data/buttonsData";
import { getTechStack } from "../../services/getTechStack";
import { filterTechStack } from "../../services/filterTechStack";
import BackButton from "../../component/BackButton";

function Projects() {
  const [filteredProjects, setFilteredProjects] = useState(null);
  useEffect(() => {
    setFilteredProjects(getTechStack());
  }, []);

  function handlePokemon(e) {
    let techStack = e.target.value;
    techStack !== "all"
      ? setFilteredProjects(filterTechStack(techStack))
      : setFilteredProjects(getTechStack());
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <BackButton />
      <div className={style.projectsDiv}>
        <div className={style.projectTitle}>
          <h2>PROJECTS</h2>
          <p>These are the projects I've created.</p>
        </div>
        <div className={style.buttonLists}>
          {buttons &&
            buttons.map((type, index) => (
              <button key={index} value={type.value} onClick={handlePokemon}>
                {type.name}
              </button>
            ))}
        </div>
        <motion.div
          key={filteredProjects}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className={style.projectLists}>
          {filteredProjects &&
            filteredProjects.map((data, index) => (
              <Card
                key={index}
                mImgData={data.mImgData}
                title={data.title}
                type={data.type}
                desc={data.desc}
                liveLink={data.liveLink}
                githubLink={data.githubLink}
                techStackLists={data.techStackLists}
              />
            ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Projects;
