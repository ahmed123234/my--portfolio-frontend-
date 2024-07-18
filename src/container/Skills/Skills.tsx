import './Skills.scss'
import { AppWrap, MotionWrap } from '../../wrapper'
import { motion } from 'framer-motion'
import { urlFor, client } from '../../client'
import { useEffect, useState } from 'react'
import {Tooltip } from 'react-tooltip'

type Skill = {
  name: string;
  bgColor: string;
  icon: string;
}

type Expereince = {
  works: Array<{
    name: string;
    company: string;
    desc: string;
  }>
  year: string
}

const Skills = () => {

  const [skills, setSkills] = useState<Array<Skill>>([]);

  const [experiences, setExperiences] = useState<Array<Expereince>>([])

  useEffect(() => {
    const query = '*[_type == "skills"]';
    const experincesQuery = '*[_type == "experiences"]'

    client.fetch(query).then((data) => {
      setSkills(data);
    });

    client.fetch(experincesQuery).then((data) => {
      setExperiences(data);
    });
  }, []);

  return (
    <>
      <h2 className='head-text'>Skills & Experience</h2>
      <div className="app__skils-container">
        <motion.div
          className='app__skils-list'
        >
          {skills.map((skill) => (
              <motion.div
                whileInView={{opacity:[0, 1]}}
                transition={{duration: .5}}
                className='app__skills_item app__flex'
                key={skill.name}
              >

               <div className="app__flex" style={{backgroundColor: skill.bgColor}}>
                  <img src={urlFor(skill.icon).toString()} alt={skill.name} />
               </div>
               <p className="p-text">{skill.name}</p>

              </motion.div>

          ))}
        </motion.div>
    
        {/* Expereince */}
        <motion.div
          className='app__skils-exp'
        >
          {experiences.map((experience) => (
            <motion.div
              whileInView={{opacity:[0, 1]}}
              transition={{duration: .5}}
              className='app__skills-exp-item'
              key={experience.year}

            > 
              <div className="app__skils-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>

              <motion.div
                className='app__skills-exp-works'
              >
                {experience.works.map((work) => (
                  <>
                    <motion.div
                        whileInView={{opacity: [0, 1]}}
                        transition={{duration: .5}}
                        className='app__skills-exp-work'
                        key={work.name}
                        data-tip
                        data-for={work.name}
                      >
                        <h4 className='bold-text'>{work.name}</h4>
                        <p className="p-text">{work.company}</p>

                      </motion.div>

                      <Tooltip
                        id={work.name}
                        // effect='solid'
                        // arroeColor='#fff'
                        style={{color: '#fff', backgroundColor: "#000"}}
                        className='skills-tooltip'
                      >
                        {work.desc}
                      </Tooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
            
              
          ))
          }
          
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Skills, 'app__skills'), 'skills', 'app__whitebg')