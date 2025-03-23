const NavButton = ({name, onClick}) => {
  return (
    <div className='nav-button' onClick={onClick}>
      <p> {name} </p>
    </div>
  )
}

const NavBar = ({setPage}) => {
  return (
    <div className='nav-bar'>
      <NavButton name='Home' onClick={() => setPage(0)}/>
      <NavButton name='About' onClick={() => setPage(1)}/>
      <NavButton name='Blog' onClick={() => setPage(2)}/>
      <NavButton name='O.C.' onClick={() => setPage(3)}/>
    </div>
  )
}

export { NavBar }