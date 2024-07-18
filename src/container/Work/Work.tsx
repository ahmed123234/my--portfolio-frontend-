import './Work.scss'
import { AppWrap, MotionWrap } from '../../wrapper'
import { AiFillEye, AiFillGithub } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { urlFor, client } from '../../client'
import { useEffect, useState } from 'react'

type Work = {
  title: string;
  description: string;
  projectLink: string;
  codeLink: string;
  imgUrl: string;
  tags: Array<string>
}
const Work = () => {
  const [acttiveFilter, setActtiveFilter] = useState<string>('All');

  const [animateCard, setAnimateCard] = useState<{y: number, opacity: number}>({ y: 0, opacity: 1});
  const [filterWork, setFilterWork] = useState<Array<Work>>([]);
  const [works, setWorks] = useState<Array<Work>>([]);

  const handleWorkFilter = (item: string) => {
    setActtiveFilter(item);
    setAnimateCard({y: 100, opacity: 0});
    setTimeout(() => {
      setAnimateCard({y: 0, opacity: 1});
      if(item == 'All') {
        setFilterWork(works);
      } else
        setFilterWork(() => works.filter((work) => work.tags.includes(item)));

    }, 700);
  }

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then(data => {
      console.log(data);
      
      setFilterWork(data);
      setWorks(data);
    })
  }, []);


  return (
    <>
       <h2 className='head-text'>
        My Creative <span>Portfolio</span> Section  
      </h2>

      <div className="app__work-filter">
        {['Backend', 'Web App', 'Mobile', 'React JS', 'Next JS', 'All'].map((item: string, index: number) => (
          <div
          // whileHover={{ backgroundColor: '#267', cursor: 'pointer', transition: {duration: .5, type: 'tween', ease: "easeInOut"}}}
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${acttiveFilter === item ? 'item-active': ''}`}
          >
            {item}

          </div>
        )) }
      </div>

      <motion.div 
      
          animate={animateCard}
          transition={{duration: .5, delayChildren: .5,}}
          className='app__work-portfolio'
      >
        {filterWork.map((work, index) => (
          <div className='app__work-item app__flex' key={index}>
            <div className="app__work-img app__flex">
              {/* <span>{work.imageUrl}</span> */}
              <img src={urlFor(work.imgUrl).toString()} alt={work.title} />

              <motion.div
                whileHover={{ opacity: [0, 1],}}
                transition={{
                  duration: .25,
                  // stager means that the element will shown  one after the other 
                  staggerChildren: 0.5,
                  ease: 'easeInOut'
                }}

                className='app__work-hover app__flex'
              >
                <a href={work.projectLink} target='_blank' rel='norefere'>
                  <motion.div
                    whileInView={{ scale: [0, 1]}}
                    whileHover={{ scale: [1, .9]}}

                    transition={{
                      duration: .25,
                      // stager means that the element will shown  one after the other 
                      staggerChildren: 0.5,
                      ease: 'easeInOut'
                    }}
                    className='app__flex'
                  >
                    <AiFillEye />
                  </motion.div>
                </a>

                <a href={work.codeLink} target='_blank' rel='norefere'>
                  <motion.div
                    whileInView={{ scale: [0, 1]}}
                    whileHover={{ scale: [1, .9]}}

                    transition={{
                      duration: .25,
                      // stager means that the element will shown  one after the other 
                      staggerChildren: 0.5,
                      ease: 'easeInOut'
                    }}
                    className='app__flex'
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{marginTop: 10}}>
                {
                  work.description.length <= 60 ?
                  work.description :

                  work.description.substring(0, 60)  
                }
                {work.description.length - 60 > 0 && (<motion.span
                  whileHover={{
                    color: '#222',
                    fontWeight: '800',
                    transition: {
                      duration: .5,
                      ease: "easeInOut"
                    }
                  }}
                 
                  
                >
                   more...
                </motion.span>)}
              </p>
                    
              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            
            </div>
          </div>
        ))}
      </motion.div>
    </>
  )
}

export default MotionWrap(AppWrap(Work, 'work', 'app__works'), 'app__primarybg');