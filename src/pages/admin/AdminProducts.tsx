import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/actions/ProductAction'
import Products from '../products/Products'

const AdminProducts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  return <Products {...products} />
}

export default AdminProducts
