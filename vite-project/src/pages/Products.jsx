import React, { useRef, useState } from 'react'
import ProductItem from '../components/ProductItem';
import usefetchAllRecords from './usefetchAllRecords'
import { useOutletContext } from 'react-router-dom'
import Cart from '../components/Cart'
import styled from 'styled-components'



const Products = () => {
  const intervalRef = useRef(null);
  const {lineItems, setLineItems, totalPrice,setTotalPrice,toggle,setToggle} = useOutletContext();
  const URL = 'https://db.up.railway.app'
  const { data: products, isLoading, isError } = usefetchAllRecords(`${URL}/products`)
  

  const handleClick = (product,amount) => {
    setToggle(true);
    let isExist = lineItems.some(element => element.product._id == product._id)
    if (!isExist) {
      setTotalPrice(totalPrice => totalPrice + product.price*amount)
      setLineItems([...lineItems, { product: product, quantity: amount }])
    } else {
      setLineItems(lineItems.map((order) => {
        if (order.product._id === product._id) {
          
          setTotalPrice(totalPrice + order.product.price*amount)
          return { ...order, quantity: order.quantity + amount }
        } else {
          return order;
        }
      }))
    }
  //set timeout for mini-shopping cart
  clearInterval(intervalRef.current);
  intervalRef.current =setTimeout(()=>{
      setToggle(false)
  },3000)
  }
  

  const handleRemoveItem = (item)=>{
    setLineItems(lineItems => lineItems.filter((i)=>i.product._id != item.product._id));
    setTotalPrice(totalPrice - item.product.price*item.quantity)
  }
  return (
    <ProductContainer>

    {isLoading
    ? <h1>Loading...</h1>
    :isError
        ?<h1>{isError}</h1>
        : products.map((product)=>
      <ProductList key={product._id}>
        <ProductItem  product={product} URL={URL} handleClick={handleClick} isSingleView={false}/>
      </ProductList>)}
      
      {(lineItems.length >0 && toggle === true) 
        && <Cart  handleRemoveItem={handleRemoveItem} />}
    </ProductContainer>
  )
}



const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 10px;
  border: 1px solid white;
  background-color: white;
  align-items: center;
  text-align: center;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap:20px;
  padding: 30px;
`;


export default Products
