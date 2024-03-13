// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Account, AccountArrowLeft, AccountCash, AccountCheckOutline, AccountDetailsOutline } from 'mdi-material-ui'

const navigation = () => {
  const router = useRouter()
  useEffect(() => {
    let data = window?.localStorage.getItem('user')
    if (data == null || data == '') {
      router.replace('/admin/login')
    }
  }, [])

  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Users Management',
      icon: Account,
      path: '/users'
    },
    {
      title: 'Declare result',
      icon: AccountCash,
      path: '/declare-result'
    },
    {
      title: 'Winners',
      icon: AccountCheckOutline,
      path: '/winners'
    },
    {
      sectionTitle: 'Report management'
    },

    {
      title: 'User Bid History',
      icon: AccountDetailsOutline,
      path: '/report-management/userbid-history'
    },
    {
      title: 'Custom sell Report',
      icon: AccountDetailsOutline,
      path: '/report-management/customersell-report'
    },
    {
      title: 'Winning Report',
      icon: AccountDetailsOutline,
      path: '/report-management/winning-report'
    },

    {
      title: 'Transfer point report',
      icon: AccountDetailsOutline,
      path: '/report-management/transferpoint-report'
    },
    {
      title: 'Bid win Report',
      icon: AccountDetailsOutline,
      path: '/report-management/bidwin-report'
    },

    {
      title: 'Withdraw Report',
      icon: AccountDetailsOutline,
      path: '/report-management/withdraw-report'
    },

    {
      title: 'Auto Deposit history',
      icon: AccountDetailsOutline,
      path: '/report-management/autodeposite'
    },

    {
      sectionTitle: 'Games managment'
    },

    {
      title: 'Game',
      icon: AccountArrowLeft,
      path: '/bids'
      // children: [
      //   {
      //     title: 'Game rate',
      //     icon: CubeOutline,
      //     path: '/bids/rate'
      //   }
      //   // Add more subpages if needed
      // ]
    },
    {
      title: 'Game rate',
      icon: CubeOutline,
      path: '/bids/rate'
    },

    {
      sectionTitle: 'Games & number'
    },

    {
      title: 'Single Digit',
      icon: CubeOutline,
      path: '/gamenumber/singledigit'
    },
    {
      title: 'Jodi Digit',
      icon: CubeOutline,
      path: '/gamenumber/jodi-digit'
    },
    {
      title: 'Single Pana',
      icon: CubeOutline,
      path: '/gamenumber/singlepana'
    },
    {
      title: 'Double Pana',
      icon: CubeOutline,
      path: '/gamenumber/doublepana'
    },
    {
      title: 'Triple Pana',
      icon: CubeOutline,
      path: '/gamenumber/triplepana'
    },
    {
      title: 'Half sangam',
      icon: CubeOutline,
      path: '/gamenumber/halfsangam'
    },
    {
      title: 'Full sangam',
      icon: CubeOutline,
      path: '/gamenumber/fullsangam'
    },

    {
      sectionTitle: 'Settings'
    },
    {
      title: 'Main setings',
      icon: AccountCogOutline,
      path: '/settings/main'
    },
    {
      title: 'Contact Settings',
      icon: AccountCogOutline,
      path: '/settings/contact'
    },
    {
      title: 'Slider images',
      icon: AccountCogOutline,
      path: '/settings/slider'
    },
    {
      title: 'How to Play',
      icon: AccountCogOutline,
      path: '/settings/howtoplay'
    }
    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // }
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/admin/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // }
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
