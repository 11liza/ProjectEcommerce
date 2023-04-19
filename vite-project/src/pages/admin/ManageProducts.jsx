import React, { useState } from 'react'
import axios from 'axios'
import usefetchAllRecords from '../usefetchAllRecords'
import { Link } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import styled from 'styled-components'

const ManageProducts = () => {
  const {data:products,isLoading, isError} = usefetchAllRecords('https://db.up.railway.app/products');
  const {setIsDisplayCart} = useOutletContext();


  const handleDelete = async (productId) => {
    try {
      // Make API call to delete product using productId
      await axios.delete(`https://db.up.railway.app/products/${productId}`);
  
      // Perform any additional actions after successful deletion
      console.log(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
      // Handle error if any
      console.error(`Error deleting product with ID ${productId}: ${error}`);
    }
  };
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isError){
    return <h1>{isError}</h1>
  }

  //hide Cart icon
  setIsDisplayCart(false);
  
  return (
    <Wrapper>
      <HeaderSection>
        <Title>Manage Products</Title>
        <CreateLink to='/admin/create-product'>Create new product</CreateLink>
      </HeaderSection>
      <ProductTable>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
          {products.length == 0
          ? <h1>No product is available!</h1>
          : products.map((product)=>{ return (
            <TableRow key={product._id}>
              <TableData>{product.title}</TableData>
              <TableData>{product.price}</TableData>
              <TableData>{product.quantity}</TableData>
              <TableData>
                <EditButton to={"/admin/update-product/" + `${product._id}`}>Edit</EditButton>  
                <DeleteButton onClick={() => handleDelete(product._id)}>Delete</DeleteButton>
              </TableData>
            </TableRow>
          )})}
      </ProductTable>
    </Wrapper>
  )
}

const lightColor = 'rgb(123, 172, 191)'
const darkColor = 'rgb(103, 163, 186)'

const Title = styled.h1`
  font-weight: lighter;
  color: ${darkColor};
  font-size: 20pt;
`;

const CreateLink = styled(Link)`
  background-color: ${darkColor};
  padding: 10px;
  text-decoration: none;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: ${lightColor}
  }
`;

const DeleteButton = styled.button`
  background-color: ${darkColor};
  padding: 10px;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 10pt;
  margin: 5px;
  border: 1px solid ${darkColor};

  &:hover {
    background-color: ${lightColor}
  }
`;

const EditButton = styled(Link)`
background-color: white;
padding: 10px;
text-decoration: none;
color: ${darkColor};
border-radius: 5px;
font-size: 10pt;
border: 1px solid ${darkColor};

&:hover {
  background-color: rgb(224, 231, 234);
}  
`;

const ProductTable = styled.table`
  border-collapse: collapse;
  width: 80%;
  margin: auto;
`;

const TableHead = styled.th`
  border: 1.5px solid ${darkColor};
  padding: 5px;
  color: ${darkColor};
  font-size: 20pt;
  background-color: rgb(224, 231, 234);
  text-align: center;`;

const TableRow = styled.tr`
border: 1.5px solid ${darkColor};
  padding: 5px;
  text-align: center;`;

const TableData = styled.td`
border: 1.5px solid ${darkColor};
  padding: 5px;
  text-align: center;`;

const Wrapper = styled.div`
  background-color: white;
  width: 100vw;
  display: block;
  padding: 30px;
  min-height: 75vh;
`;

const HeaderSection = styled.section`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0 100px;
margin-top: -120px;
margin-bottom: 60px;
margin-left: 33%;
`;

export default ManageProducts