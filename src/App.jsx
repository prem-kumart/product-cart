import { useState, useEffect } from 'react';
import './App.css'
import Product from './Product.jsx'
import Cart from './Cart.jsx'

async function fetchJsonData() {
  const url = "./data.json";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData
  } catch (error) {
    console.error(error.message);
  }

  return []

}

function App() {

  const [productData,setProductData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [ error , setError] = useState("");
  const [cart, setCart] = useState([]);
  const [OrderConfirmed,setOrderConfirmed] = useState(false);


  const orderTotal = cart.reduce((result,product)=>{
          return result+  (product.quantity * product.price)
  },0)

  const totalQuantity = cart.reduce((result,product)=>{
    return result + product.quantity;
  },0)


  function priceToUsd(price){
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
   }).format(price)

  }

  

  function startNewOrder(){
     setCart([])
     setOrderConfirmed(false)
  }
    
  useEffect(() => {
    async function loadData() {
      try {
        const fetchedData = await fetchJsonData();
        setProductData(fetchedData)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  },[]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <>
      <main className="flex flex-col justify-center items-center gap-8 tablet:gap-8 desktop:flex-row  desktop:px-[7rem] desktop:py-[6rem]  w-[100%] p-6 my-0  m-auto  bg-rose-50  place-content-center">
           
          <div className="flex flex-col gap-8 desktop:w-[52%]">
            <h1 className="self-start font-red-hat text-rose-900 font-bold text-[2.5em] ">Desserts</h1>
            <div className="flex flex-col justify-center gap-8 tablet:grid tablet:grid-cols-3 tablet:gap-6 w-[100%]">
                {productData.map((product,index) => (
                    <Product key={index} productId={index} image={product.image} name={product.name} category={product.category} price={product.price}  cart= {cart} setCart = {setCart} priceToUsd={priceToUsd}/>
                ))}
            </div>
          </div> 
          
           <div className="flex flex-col justify-center gap-8 desktop:min-w-[24rem] desktop:w-[25%] w-[100%] p-6 self-center desktop:self-start bg-white rounded-xl ">
             <h2 className='text-red text-2xl font-bold font-red-hat'>Your Cart ({totalQuantity})</h2>
             
            { cart.length != 0 ?
               <div className='flex flex-col gap-6'>
                        <div className="flex flex-col gap-4">
                        {  cart.length!=0 && cart.map((eachProductInCart)=>{
                                                          return <Cart key={eachProductInCart.id} product={eachProductInCart} cart={cart} setCart={setCart} priceToUsd={priceToUsd} OrderConfirmed={OrderConfirmed} />
                                                      })    
                        }
                        </div>
                        <div className="flex flex-row justify-between font-red-hat">
                          <h2 className="font-light" >Order Total</h2>
                          <h2 className="text-rose-900 text-2xl font-bold">{priceToUsd(orderTotal)}</h2>
                        </div> 
                        <div className="flex flex-row justify-center items-center gap-[0.5px] bg-rose-50 px-6 py-4 rounded-lg">
                          <img src="./assets/images/icon-carbon-neutral.svg" alt="carbon neutral icon"/>
                           <p className='text-rose-900 rounded-lg'>This is a <span className="font-medium">carbon-neutral </span>delivery</p>
                        </div>
                        <button className='bg-red rounded-full text-white py-[1em] text-base  hover:color-mix-black-red' onClick={()=>setOrderConfirmed(cart.length !=0 ? true : false)}>
                          Confirm Order
                        </button>
              </div>
              :
                 <div className="flex flex-col justify-center items-center gap-4">
                    <img src="../assets/images/illustration-empty-cart.svg" alt="empty cart image"/>
                    <p className="font-red-hat text-color-500">Your added items will appear here</p>
                  </div>
             
            }
           </div>
     
      </main>
    
       { OrderConfirmed && 
       
            <div className="fixed  z-10 bg-black -top-0 -bottom-0 rounded-xl flex items-end tablet:top-0 tablet:bottom-0 tablet:rounded-none w-[100%] bg-opacity-[0.5] tablet:flex tablet:justify-center tablet:items-center overflow-auto" onClick={startNewOrder}>
             <div className="flex flex-col justify-center w-[100%]  gap-8 p-10 tablet:w-[60%] desktop:w-[33%] bg-white rounded-xl overflow-auto">
              
               <img className="h-[42px] w-[42px]" src="./assets/images/icon-order-confirmed.svg" alt="check mark" />
               <div>
                    <h2 className='text-rose-900 text-2xl font-bold font-red-hat'>Order Confirmed</h2>
                    <p className='text-rose-500 text-base font-light font-red-hat'>We hope you enjoy your food</p>
               </div>
               <div className='flex flex-col gap-6 bg-rose-50 p-6 '>
                        <div className="flex flex-col gap-4">
                        {  cart.length!=0 && cart.map((eachProductInCart)=>{
                                                          return <Cart key={eachProductInCart.id} product={eachProductInCart} cart={cart} setCart={setCart} priceToUsd={priceToUsd} orderConfirmed={OrderConfirmed}  />
                                                      })    
                        }
                        </div>
                        <div className="flex flex-row justify-between font-red-hat">
                          <h2 className="font-light" >Order Total</h2>
                          <h2 className="text-rose-900 text-2xl font-bold">{priceToUsd(orderTotal)}</h2>
                        </div> 
                     
              </div>
              <button className='bg-red rounded-full text-white py-[1em] text-base' onClick={startNewOrder}>
                         Start New Order
               </button>
           </div>
           </div>

                      }

  
    </>
  )
}

export default App
