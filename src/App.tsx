
import { About, Work, Testimonial, Skills, Header, Footer } from "./container"
import { Navbar } from "./components"
import './App.scss'
function App() {
  return (
    <div className="app">
      <Navbar />
      <Header/>
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer/>
    </div>
  )
}

export default App
