// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { adminLogin, deleteUser } from 'src/helpers'
import 'react-toastify/dist/ReactToastify.css'
import { URL } from 'src/helpers/Api'
// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const DeleteUser = () => {
  // ** State
  const [mobile, setMobile] = useState('')
  const [err, setErr] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  console.log('err', err)

  const validation = () => {
    let mobileRegex = /^[6-9]\d{9}$/
    if (mobile.length == 0) {
      setErr('Please enter Mobile number')

      return false
    }
    if (!mobileRegex.test(mobile)) {
      // toast.error('Please enter valid email')
      setErr('Please enter valid mobile number')

      return false
    }

    return true
  }

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const adminLoginApi = async () => {
    let params = {
      mobile: mobile
    }
    if (validation()) {
      const response = await fetch(`${URL}auth/deleteUser`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setSuccessMsg(data.message)
            setErr('')
            setMobile('')
          } else {
            setErr(data.message)
          }
        })
        .catch(error => {
          if (typeof error === 'string') {
            setErr(error)
          } else {
            setErr('An error occurred. Please try again.')
          }
        })
    }

    // if (validation()) {
    //   deleteUser(params)
    //     .then(data => {
    //       console.log('data inside fun', data)
    //       if (data.success) {
    //         setSuccessMsg(data.message)
    //         setErr('')
    //         setMobile('')
    //       } else {
    //         console.log('error message', data.message)
    //         setErr(data.message)
    //         setSuccessMsg('')
    //       }
    //     })
    //     .catch(err => {
    //       console.log('error', err)
    //       setErr(err)
    //       setSuccessMsg('')
    //     })
    // }
  }

  const handleLogin = () => {
    adminLoginApi()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <form noValidate autoComplete='off' onSubmit={() => {}}>
            <TextField
              autoFocus
              fullWidth
              id='email'
              label='Mobile number'
              type='tel'
              value={mobile}
              sx={{ marginBottom: 4 }}
              onChange={event => {
                if (event.target.value === '' || event.target.value.length <= 10) {
                  setMobile(event.target.value)
                }

                setErr('')
              }}
            />
            {err ? <Typography sx={{ color: 'red', marginBottom: '5px' }}>{err}</Typography> : null}

            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              {/* <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link> */}
            </Box>

            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              // onClick={() => router.push('/')}
              onClick={handleLogin}
            >
              Submit
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              {successMsg ? <Typography sx={{ color: 'green', marginBottom: '5px' }}>{successMsg}</Typography> : null}

              {/* <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography> */}
              {/* <Typography variant='body2'>
                <Link passHref href='/admin/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography> */}
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
DeleteUser.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default DeleteUser
