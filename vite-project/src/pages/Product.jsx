import React,{useState} from 'react'
import usefetchOneRecord from './usefetchOneRecord'
import { useParams} from 'react-router-dom'
import ProductItem from '../components/ProductItem';
import { useOutletContext } from "react-router-dom";
import Cart from '../components/Cart'

const Product = () => {
  const Params = useParams();
  console.log(Params.id)
  const URL = 'https://db.up.railway.app'
  const {data: product, isLoading, isError} = usefetchOneRecord('https://db.up.railway.app/products/'+ Params.id)
  
  const [lineItems, setLineItems, totalPrice,setTotalPrice,toggle,setToggle, handleResetCart] = useOutletContext();

  const handleClick = (product,amount) => {
    setToggle(true);
    let isExist = lineItems.some(element => element.product._id == product._id)
    if (!isExist) {
      setTotalPrice(totalPrice => totalPrice + product.price*amount)
      setLineItems([...lineItems, { product: product, quantity: amount }])
    } else {
      setLineItems(lineItems.map((order) => {
        if (order.product._id === product._id) {
          console.log('exist')
          setTotalPrice(totalPrice + order.product.price*amount)
          return { ...order, quantity: order.quantity + amount }
        } else {
          return order;
        }
      }))
    }
    setTimeout(()=>{
        setToggle(false)
    },3000)
  }
 
  const handleIncrement = (product) =>{
    
    setLineItems(lineItems.map((item) => {
      if (item.product._id === product._id) {
        console.log('exist')
        setTotalPrice(totalPrice + item.product.price)
        return { ...item, quantity: item.quantity + 1 }
      } else {
        return item;
      }
    }))
  }

  const handleDecrement = (product) =>{
    setLineItems(lineItems.map((item) => {
      if (item.product._id === product._id) {
        console.log('exist')
        setTotalPrice(totalPrice - item.product.price)
        return { ...item, quantity: item.quantity - 1 }
      } else {
        return item;
      }
    }))
  }
  
  // useEffect(()=>{
  //   const timerID = setInterval(()=>{
  //     setToggle(false)
  //   },10000)
  //   return ()=> clearInterval(timerID)
  // },[toggle])

  const handleRemoveItem = (item)=>{
    setLineItems(lineItems => lineItems.filter((i)=>i.product._id != item.product._id));
    setTotalPrice(totalPrice - item.product.price*item.quantity)
  }

  return (
    <div>
      {isLoading?<h1>Loading...</h1>:isError?<h1>{isError}</h1>:<div className="single-product-view"><ProductItem key={product._id} product={product} URL={URL} handleClick={handleClick} /></div>}
      {(lineItems.length>0 && toggle==true)  && <Cart lineItems={lineItems} totalPrice={totalPrice} handleRemoveItem={handleRemoveItem} handleResetCart={handleResetCart} handleDecrement={handleDecrement} handleIncrement={handleIncrement}/>}
      
    </div>
  )
}

export default Product
