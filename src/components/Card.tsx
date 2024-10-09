import React from 'react'
import { ProductModel } from '../models/product_model'

const Card: React.FC<ProductModel> = ({ name , desc, price}) => {
  return (
    <div className="card px-4 border bg-light" style={{width:'18rem', height:'100%'}}>
        <div className="card-body">
        <h5 className="card-title">{name} - R${price}</h5>
        <p className="card-text">{desc}</p>
        <a onClick={(e)=>{e.preventDefault()}} className="btn btn-primary">Go somewhere</a>
        </div>
    </div> 
  )
}

export default Card