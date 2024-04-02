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

const PrivacyPolicy = () => {
  const email = 'ar9134449@gmail.com'

  const handleClick = () => {
    window.location.href = `mailto:${email}`
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', marginBottom: '10px' }}>
        <Box sx={{ display: 'flex', width: '50%', marginBottom: '10px' }}>
          <img src='/images/logos/app_logo.png' alt='logo' width='100' height='100' style={{ marginTop: '10px' }} />
          <Typography variant='h4' sx={{ marginTop: '10px', marginLeft: '20px' }}>
            Privacy Policy
          </Typography>
        </Box>
        <br />
        <br />
        <Typography>
          Your information, including Personal Data, is processed at the Company's operating offices and in any other
          places where the parties involved in the processing are located. It means that this information may be
          transferred to — and maintained on — computers located outside of Your state, province, country or other
          governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
        </Typography>
        <br />
        <Typography>
          Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement
          to that transfer.
        </Typography>
        <br />
        <Typography>
          The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in
          accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization
          or a country unless there are adequate controls in place including the security of Your data and other
          personal information.
        </Typography>
        <br />
        <Typography variant='h6'>Delete Your Personal Data</Typography>
        <Typography>
          You have the right to delete or request that We assist in deleting the Personal Data that We have collected
          about You.
        </Typography>
        <br />
        <Typography>
          Our Service may give You the ability to delete certain information about You from within the Service.
        </Typography>
        <br />
        <Typography>
          You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one,
          and visiting the account settings section that allows you to manage Your personal information. You may also
          contact Us to request access to, correct, or delete any personal information that You have provided to Us.
        </Typography>
        <br />
        <Typography>
          Please note, however, that We may need to retain certain information when we have a legal obligation or lawful
          basis to do so.
        </Typography>
        <br />
        <Typography variant='h6'>Disclosure of Your Personal Data</Typography>
        <Typography variant='h6'>Business Transactions</Typography>
        <Typography>
          If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We
          will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy
          Policy.
        </Typography>
        <br />

        <Typography variant='h6'>Law enforcement</Typography>
        <Typography>
          Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so
          by law or in response to valid requests by public authorities (e.g. a court or a government agency).
        </Typography>
        <br />
        <Typography variant='h6'>Other legal requirements</Typography>
        <Typography>
          The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
        </Typography>
        <br />
        <Typography>Comply with a legal obligation</Typography>
        <Typography>Protect and defend the rights or property of the Company</Typography>
        <Typography>Prevent or investigate possible wrongdoing in connection with the Service</Typography>
        <Typography>Protect the personal safety of Users of the Service or the public</Typography>
        <Typography>Protect against legal liability</Typography>
        <Typography>Security of Your Personal Data</Typography>
        <Typography>
          The security of Your Personal Data is important to Us, but remember that no method of transmission over the
          Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means
          to protect Your Personal Data, We cannot guarantee its absolute security.
        </Typography>
        <br />
        <Typography variant='h6'>Children's Privacy</Typography>
        <Typography>
          Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable
          information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child
          has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data
          from anyone under the age of 13 without verification of parental consent, We take steps to remove that
          information from Our servers.
        </Typography>
        <br />
        <Typography>
          If We need to rely on consent as a legal basis for processing Your information and Your country requires
          consent from a parent, We may require Your parent's consent before We collect and use that information.
        </Typography>
        <br />
        <Typography variant='h6'>Links to Other Websites</Typography>
        <Typography>
          Our Service may contain links to other websites that are not operated by Us. If You click on a third party
          link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of
          every site You visit.
        </Typography>
        <br />
        <Typography>
          We have no control over and assume no responsibility for the content, privacy policies or practices of any
          third party sites or services.
        </Typography>
        <br />
        <Typography variant='h6'>Changes to this Privacy Policy</Typography>
        <Typography>
          We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new
          Privacy Policy on this page.
        </Typography>
        <br />
        <Typography>
          We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming
          effective and update the "Last updated" date at the top of this Privacy Policy
        </Typography>
        <br />
        <Typography>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are
          effective when they are posted on this page.
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>Contact Us</Typography>
        <Typography>If you have any questions about this Privacy Policy, You can contact us:</Typography>
        <Typography>
          By email:{' '}
          <span
            className='email-link'
            style={{ cursor: 'pointer', color: 'blue', marginBottom: '50px' }}
            onClick={handleClick}
          >
            {email}
          </span>
        </Typography>
      </Box>

      <FooterIllustrationsV1 />
    </Box>
  )
}
PrivacyPolicy.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default PrivacyPolicy
