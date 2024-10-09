import Card from './components/Card';
import React, { useEffect, useState } from 'react';
import { ProductModel } from './models/product_model';
import './App.css';


function App() { 
  
  const [product, setProduct] = useState<ProductModel[]>([])

  useEffect(()=>{
      const fetchProduct = async () => {

        await fetch('http://localhost:3000/product')
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(e => console.log(e))
 
      }

      fetchProduct()
  }, []);

  return (
    <> 
      <div className="container py-4 px-3 mx-auto">
        <div className="row gy-5">
          {product.map(item => (
              <div className="col-4" key={item.id} style={{maxHeight:'18rem'}}>  
                <Card id={item.id} name={item.name} desc={item.desc} price={item.price} />
              </div> 
          ))} 
        </div>
      </div>
    </>
  )
}

export default App
