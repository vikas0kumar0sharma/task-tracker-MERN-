import Button from "./Button"
import { useLocation } from "react-router"

const Header = (props) => {

  const location=useLocation()

  const onClick=()=>{
    props.onToggleAdd()
  }

  return (
    <header className='header'>
      <h1>{props.title}</h1>
      { location.pathname==='/' && <Button 
      color={props.showTask ? `red`:`green`}
      text={props.showTask ? `Close`:`Add`}
      onClick={onClick}/>}
    </header>
  )
}

Header.defaultProps={
  title:'default h bro',
}
// can pass like that style={headingStyle}
// const headingStyle={
//   color:'red',
//   backgroundColor:'black'
// }

export default Header