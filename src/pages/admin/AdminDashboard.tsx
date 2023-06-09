import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartRounded, StorageRounded } from '@mui/icons-material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import StoreMallDirectoryRounded from '@mui/icons-material/StoreMallDirectoryRounded'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../redux/store'
import { GlobalTheme } from '../../context/ThemeProvider'
import { darkTheme, lightTheme } from '../../styles/styles'
import './styles/AdminDashboard.scss'
import { fetchProducts } from '../../redux/actions/ProductAction'

type ButtonProps = {
  name: string
  icon: JSX.Element
  link: string
}

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { theme } = GlobalTheme()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const buttonsLink: ButtonProps[] = [
    {
      name: 'Customers',
      icon: <PeopleAltIcon fontSize="large" />,
      link: '/admin/customers'
    },
    {
      name: 'Products',
      icon: <StoreMallDirectoryRounded fontSize="large" />,
      link: '/admin/products'
    },
    {
      name: 'In stock',
      icon: <StorageRounded fontSize="large" />,
      link: '/admin/createandcheck'
    },
    {
      name: 'Orders',
      icon: <ShoppingCartRounded fontSize="large" />,
      link: '/admin/orders'
    }
  ]
  const Buttons = (link: ButtonProps) => {
    return (
      <Link
        to={link.link}
        className="admin-dashboard__buttons"
        style={{
          textDecoration: 'none',
          border: theme === 'dark' ? `1px solid ${lightTheme.bg}` : 'none',
          color: theme === 'dark' ? lightTheme.bg : darkTheme.bg
        }}>
        {link.icon}
        <p
          className="admin-dashboard__buttons--text"
          style={{
            color: theme === 'dark' ? lightTheme.bg : darkTheme.bg
          }}>
          {link.name}
        </p>
      </Link>
    )
  }
  return (
    <div className="admin-dashboard">
      {buttonsLink.map((link) => (
        <Buttons key={link.name} {...link} />
      ))}
    </div>
  )
}

export default AdminDashboard
