import './Testimonial.scss'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {HiChevronLeft, HiChevronRight} from 'react-icons/hi'
import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'

type Testimonial = {
  name: string;
  imgUrl: string;
  company: string;
  feedback: string;
}

type Brand = {
  name: string;
  imgUrl: string;
  _id: any
}

const Testimonial = () => {

  const [brands, setBrands] = useState<Array<Brand>>([]);
  const [testimonials, setTestimonials] = useState<Array<Testimonial>>([]);
  const [currentIndex, setcurrentIndex] = useState(0);

  const handleClick = (index: number) => {
    setcurrentIndex(index);
  }
  
  // featching data from sanity studio
  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]'

    client.fetch(query).then((data) => {
      console.log(data);
      
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  const test = testimonials[currentIndex];

  return (
    <>
      {testimonials.length && (
        <>
          <div className='app__testimonial app__flesx'>
            <div className="app__testimonial-item">
              <img src={urlFor(test.imgUrl).toString()} alt="testimonial" />
              <div className="app__testimonial-content">
                <p className="p-text">{test.feedback}</p>

                <div className="">
                  <h4 className='bold-text'>{test.name}</h4>
                  <h5 className='p-text'>{test.company}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
              <div className="app__flex" 
                onClick={() => 
                handleClick(currentIndex == 0? testimonials.length -1: currentIndex - 1)
                }
              >
                <HiChevronLeft />
              </div>

              <div className="app__flex" 
                onClick={() => 
                handleClick(currentIndex == testimonials.length -1? 0: currentIndex + 1)
                }
              >
                <HiChevronRight />
              </div>
          </div>
        </>
      )}

      <div className="app__testimonails-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{opacity: [0, 1]}}
            transition={{ duration: .5, type: 'tween' }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl).toString()} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default MotionWrap( AppWrap(Testimonial, 'testimonials', 'app__testimonial' ),
   'app__primaraybg');