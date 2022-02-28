import React from "react";
import { connect } from "dva";
import ProductList from "../components/ProductList";

const Products = ({dispatch, products})=>{
    const handleDelete = (id)=>{
        dispatch({
            type: 'products/delete',
            payload: id
        })
    }

    return (
        <div>
            <h1>List of Products</h1>
            <ProductList onDelete={handleDelete} products={products}></ProductList>
        </div>
    )
}

// export default Products
export default connect(
    ({ products })=> {
        return { products }
    }
)(Products)