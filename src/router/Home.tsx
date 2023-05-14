import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { logged } from '../redux/actions/UserAction'
import { fetchProducts } from '../redux/actions/ProductAction'
import Products from '../pages/products/Products'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state)
  const user = localStorage.getItem('decodedUser')

  useEffect(() => {
    dispatch(fetchProducts())
    if (user) {
      dispatch(logged(JSON.parse(user)))
    }
  }, [dispatch, user])

  return <Products {...products} />
}

export default Home
