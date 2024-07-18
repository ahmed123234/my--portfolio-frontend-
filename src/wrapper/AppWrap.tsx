import { SocialMedia, NavigationDots } from '../components'
// use higher order component to share simillar functionalities among different app components/sections
const AppWrap = (Component: any, idName: string, className?: string) => function HOC () {
  return(
    <div id={idName} className={`app__container ${className}`}>
      <SocialMedia />
      <div className="app__wrapper app__flex">
        <Component />
        
        <div className="copyright">
          <p className="p-text">@2023 AHMED GHANNAM</p>
          <p className="p-text">All rights reserved</p>
        </div>
      </div>

      <NavigationDots active={idName} />
    </div>
  )
}

export default AppWrap