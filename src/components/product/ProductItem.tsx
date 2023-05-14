import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Product } from '../../interfaces/products/ProductType'
import { DeleteForever, ModeEdit } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'

import { GlobalTheme } from '../../context/ThemeProvider'
import { darkTheme, lightTheme } from '../../styles/styles'
import { deleteProductFromStock } from '../../redux/actions/ProductAction'
import { CartIcon } from '../cart/Cart'
import CreateAndEdit from '../admin/CreateAndEdit/CreateAndEdit'

const ProductItem = ({ product }: { product: Product }) => {
  const [openCreateAndEdit, setOpenCreateAndEdit] = React.useState(false)

  const location = useLocation()
  const { pathname } = location
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  //TODO: User from redux state, not from localstorage
  // const { user } = useSelector((state: RootState) => state.userLogged);
  const userRole = JSON.parse(localStorage.getItem('user') || '{}').role
  const decodedUserRole = JSON.parse(localStorage.getItem('decodedUser') || '{}').role

  const { theme } = GlobalTheme()

  const handleEdit = () => {
    setOpenCreateAndEdit(!openCreateAndEdit)
  }

  const handleDelete = (id: string) => {
    dispatch(deleteProductFromStock(id))
  }

  return (
    <>
      <div
        key={product.id}
        className="products__content__item"
        style={{
          backgroundColor: theme === 'dark' ? lightTheme.primary : darkTheme.secondary,
          boxShadow: `-1px 0px 2px 2px ${
            theme === 'dark' ? darkTheme.shadow : lightTheme.shadow
          }, inset 0 0 ${theme === 'dark' ? '4px' : '1px'} 0 ${
            theme === 'dark' ? darkTheme.shadowMedium : lightTheme.shadowMedium
          }`
        }}>
        {(userRole || decodedUserRole) === 'ADMIN' && pathname.includes('admin') && (
          <div
            className="products__content__item--admin-icons"
            style={{
              backgroundColor: theme === 'dark' ? darkTheme.bg : lightTheme.bg
            }}>
            <div
              onClick={() => handleEdit()}
              style={{
                backgroundColor: openCreateAndEdit ? 'rgba(23, 108, 0, 0.295)' : 'transparent'
              }}>
              <ModeEdit
                className="products__content__item--admin-icons--icon"
                fontSize="large"
                color="success"
              />
            </div>
            <div onClick={() => handleDelete(product.id)}>
              <DeleteForever
                className="products__content__item--admin-icons--icon products__content__item--admin-icons--icon--delete "
                fontSize="large"
                color="error"
              />
            </div>
          </div>
        )}
        {!id && (
          <div className="products__content__item--details">
            <Link
              to={`/product/${product.id}`}
              style={{
                textDecoration: 'none',
                color: darkTheme.textLink,
                display: 'flex'
              }}>
              <MoreVertIcon />
              Details
            </Link>
          </div>
        )}
        <div
          className="products__content__item--add"
          style={{
            backgroundColor: theme === 'dark' ? darkTheme.bg : lightTheme.bg
          }}>
          <div className="products__content__item--add--icon">
            <CartIcon product={product} />
          </div>
        </div>
        <div className="products__content__item--image">
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '5px',
              objectFit: 'cover',
              transform: 'rotate(-20deg)'
            }}
          />
        </div>
        <div
          className="products__content__item--info"
          style={{
            color: theme === 'dark' ? lightTheme.textItem : darkTheme.textItem
          }}>
          <h3 className="products__content__item--info--name">{product.name}</h3>
          <p className="products__content__item--info--description">
            {product.description.slice(0, 26)}...
          </p>
          <p className="products__content__item--info--price">£{product.price}</p>
        </div>
        {openCreateAndEdit && (
          <div className="products__content__item--editing-view">
            <CreateAndEdit
              productId={`${product.id}`}
              setOpenCreateAndEdit={setOpenCreateAndEdit}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ProductItem
