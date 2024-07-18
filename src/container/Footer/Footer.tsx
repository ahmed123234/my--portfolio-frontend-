import './Footer.scss'
import { useState } from 'react'
import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'


type FormData = {
  name: string;
  email: string;
  message: string;
} 

const Footer = () => {
  const [isloading, setIsloading] = useState<boolean>(false);
  const [isFormSubmited, setIsFormSubmited] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({name: '', email: '', message: ''})

  const {name, email, message} = formData;

  const handleSubmit = () => {
    setIsloading(true);

    // form an object that follow the sanity guidelines
    const contact = {
      _type: 'contact',
      name,
      email,
      message
    }

    // use sanity client to upload the data from the client to sanity
    console.log('contact', contact)
    client.create(contact, {method: 'POST', token: import.meta.env.VITE_APP_SANITY_TOKENII}).then(() => {
      setIsloading(false);
      setIsFormSubmited(true);
    }).catch((err) => {
      console.log("error: ", err);
      
    });
  
    // client.request({
    //   method:'POST',
    //   body: JSON.stringify(contact)
    // }).then()
  }

  const handleChangeInput = (e: any) => {
    // @ts-ignore
    const { name, value } = e.target;

    setFormData({...formData, [name]: value})
  }
  
  return (
    <>
      <h2 className="head-text">Take a coffe & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:ahmadghnnam60@gmail.com" className='p-text'>
            ahmadghnnam60@gmail.com
          </a>
        </div>

        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +1 (123) 456-789" className='p-text'>
            +1 (123) 456-789
          </a>
        </div>
      </div>

      {!isFormSubmited ? (
      <div className='app__footer-form ap__flex'>
        <div className="app__flex">
          <input type="text" className="p-tex" 
            placeholder='Your Name'
            value={name}
            name='name'
            onChange={handleChangeInput}
          />
        </div>

        <div>
          
          <input type="email" className="p-tex" 
              placeholder='Your Email'
              value={email}
              name='email'
              onChange={handleChangeInput}
            />
        </div>

        <div>
        <textarea 
          className='p-text'
          placeholder='Your Message'
          value={message}
          name='message'
          onChange={handleChangeInput}
        >

        </textarea>
        </div>

        <button type="button" className='p-text' onClick={handleSubmit}>
          {isloading ? 'Sending': 'Send Message'}
        </button>
      </div>
      ): (
        <div>
          <h3 className="head-txet">Thank you for getting in touch</h3>
        </div>
      )}
    </>
  )
}

export default MotionWrap(AppWrap(Footer, 'contact', 'app__footer'), 'app__whitebg')