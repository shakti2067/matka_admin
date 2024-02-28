// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import { adminChangePassword, adminLogout } from 'src/helpers'
import { Button, TextField } from '@mui/material'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [userData, setUserData] = useState({
    name: '',
    role: ''
  })

  const [isPopupOpenWithdrow, setPopupOpenWithdrow] = useState(false)
  let [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  let [error, setError] = useState({
    oldPasswordErr: '',
    newPasswordErr: '',
    confirmPasswordErr: ''
  })

  console.log('error', error)
  console.log('form', form)

  const togglePopupWithdrow = () => {
    setPopupOpenWithdrow(!isPopupOpenWithdrow)
    setAnchorEl(null)
  }

  // ** Hooks
  const router = useRouter()

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }
  const validation = () => {
    let { oldPassword, newPassword, confirmPassword } = form

    if (oldPassword.length === 0) {
      setError({ ...error, oldPasswordErr: 'Please enter old password' })
      return false
    }

    if (newPassword.length === 0) {
      setError({ ...error, newPasswordErr: 'Please enter new password' })
      return false
    }
    if (confirmPassword.length === 0) {
      setError({ ...error, confirmPasswordErr: 'Please enter confirm password' })
      return false
    }

    return true
  }

  const handleLogout = () => {
    adminLogout()
      .then(data => {
        if (data.success) {
          localStorage.removeItem('user')
          alert(data.message)
          router.replace('/admin/login')
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handlePasswordChange = () => {
    if (validation()) {
      adminChangePassword()
        .then(data => {
          if (data.success) {
            router.replace('/admin/login')
          } else {
            console.log('error')
          }
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  useEffect(() => {
    let data = window?.localStorage.getItem('user')
    if (data == null || data == '') {
      router.replace('/admin/login')
    } else {
      let user = JSON.parse(window.localStorage.getItem('user'))

      setUserData({
        name: user.name,
        role: user.role
      })
    }
  }, [])

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src='/images/avatars/1.png'
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{userData.name}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {userData.role}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 2 }} />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <MessageOutline sx={{ marginRight: 2 }} />
            Chat
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Settings
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem>*/}
        {/* <Divider /> */}
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={togglePopupWithdrow}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Change password
          </Box>
        </MenuItem>
      </Menu>
      {isPopupOpenWithdrow && (
        <div>
          <div
            className='overlay'
            onClick={togglePopupWithdrow}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9998 // Ensure the overlay is below the popup but above the rest of the content
            }}
          />
          <div
            style={{
              borderRadius: '5px',
              width: '35%',
              position: 'fixed',
              top: '47%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#F7F7F7',
              padding: '20px',
              zIndex: 9999 // Ensure the popup is above the overlay
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h6'>Change password</Typography>
              <div onClick={togglePopupWithdrow} style={{ cursor: 'pointer' }}>
                &#10006;
              </div>
            </div>
            <Typography style={{ margin: '10px 0 5px 0' }}>Old password</Typography>
            <TextField
              type='text'
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
              value={form.oldPassword}
              onChange={d => {
                setForm({
                  ...form,
                  oldPassword: d.target.value
                })
                setError({
                  ...error,
                  oldPasswordErr: ''
                })
              }}
            />
            {error.oldPasswordErr ? <Typography style={{ color: 'red' }}>{error.oldPasswordErr}</Typography> : null}
            <Typography style={{ margin: '10px 0 5px 0' }}>new password</Typography>
            <TextField
              type='text'
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
              value={form.newPassword}
              onChange={d => {
                setForm({
                  ...form,
                  newPassword: d.target.value
                })
                setError({
                  ...error,
                  newPasswordErr: ''
                })
              }}
            />
            {error.newPasswordErr ? <Typography style={{ color: 'red' }}>{error.newPasswordErr}</Typography> : null}

            <Typography style={{ margin: '10px 0 5px 0' }}>confirm password</Typography>
            <TextField
              type='text'
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
              value={form.confirmPassword}
              onChange={d => {
                setForm({
                  ...form,
                  confirmPassword: d.target.value
                })
                setError({
                  ...error,
                  confirmPasswordErr: ''
                })
              }}
            />
            {error.confirmPasswordErr ? (
              <Typography style={{ color: 'red' }}>{error.confirmPasswordErr}</Typography>
            ) : null}
            <Button
              style={{ backgroundColor: '#9155FD', color: 'white', fontSize: '13px' }}
              onClick={handlePasswordChange}
            >
              update password
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default UserDropdown
