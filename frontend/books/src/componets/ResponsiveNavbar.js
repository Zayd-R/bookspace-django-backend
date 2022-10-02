import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import logService from '../services/login'
import userService from '../services/user'
import { logoutUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const ResponsiveAppBar = ({ setData }) => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const LinkStyle = {textDecoration: 'none', color:'black'}

  const logout = () => {
    logService.logout()
    userService.clearUser()
    dispatch(logoutUser())
    setData([])
  }

  const pages = ['Search', user ? 'My Shelve' : null]

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // TODO: Change avatar pic

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to='/' style={LinkStyle}>
            BookSpace
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/search' style={LinkStyle}>
                  Search
                </Link>
              </MenuItem>
              {user ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to='/my-shelve' style={LinkStyle}>
                    My Shelve
                  </Link>
                </MenuItem>
              ) : null}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to='/' style={LinkStyle}>
            BookSpace
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <div>
                
              <Link
                component='a'
                to={`/${
                  page === 'My Shelve' ? 'my-shelve' : page?.toLowerCase()
                }`}
                key={page}
                onClick={handleCloseNavMenu}
                style={{ my: 2, color: 'white', display: 'block', padding:'5px', textDecoration: 'none'}}
              >
                {page}
                {'  '}
                <br/>
              </Link>
              </div>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link onClick={logout} style={LinkStyle}>
                    Logout
                  </Link>
                </MenuItem>
              ) : (
                <Box>
                  <MenuItem onClick={handleCloseUserMenu}>
                     <Link to='/login'  style={LinkStyle}>
                      Login
                     </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to='/register'  style={LinkStyle}>
                      Register
                    </Link>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
