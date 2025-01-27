/* eslint-disable react/prop-types */
import useSize from './custom_Hooks/useSize.jsx'
import { useEffect,useState} from 'react'


const Product = ({ productId,image,name,category,price,cart,setCart,priceToUsd }) => {
 
  const [quantity,setQuantity] = useState(0);

  const widthSize = useSize()[0];
//   const priceInUSD = new Intl.NumberFormat('en-US', {
//    style: 'currency',
//    currency: 'USD'
// }).format(price);
  let imageSrc = ""
  function imageBasedOnScreenSize(){
   
    if(widthSize >= 1440){
       imageSrc = image.desktop;
    }else if ( widthSize >=678){
       imageSrc = image.tablet;
    }else {
        imageSrc = image.mobile
    }
    return imageSrc;

  }

  useEffect(()=>{
       if((cart.filter(eachProduct => eachProduct.id == productId)).length == 0){
         setQuantity(0);
       }
  },[cart])


  function setQuantityAndCart(quantity){
      setQuantity(quantity)

      // If quantity of the product is zero (0) removing it from the cart.
      if(!quantity){
         setCart(cart.filter((eachProduct)=>eachProduct.id != productId));
         return;
      }

      // if the cart length is not zero and item exists in the cart
      if(cart.length != 0 && (cart.filter(eachProduct => eachProduct.id == productId)).length != 0 ){
           
           const cartAfterMapping = cart.map((eachProduct)=>{
                                                                  if(eachProduct.id == productId){
                                                                     eachProduct.quantity = quantity;
                                                                  }
                                                                  return eachProduct
                                                      })                                   
           setCart(cartAfterMapping)

      } else 
      {
         
         const insertProductIntoCart = {
                                 id : productId,
                                 thumbnail:image.thumbnail,
                                 name : name,
                                 price : price,
                                 quantity : quantity,
                           }   
         setCart([...cart,insertProductIntoCart])
         
      }
  }
  

  return (
      <section className="flex flex-col gap-6  w-fit">          
         
          <div className="flex flex-col">
             <img  className={`rounded-lg -z-0 w-[100%]  ${ quantity ? "border-[2px] border-solid border-red" : " "}`} src={imageBasedOnScreenSize()} alt="product image"/> 
             { !quantity ? 
               
                  <button className="flex items-center justify-center gap-1 self-center z-10 -mt-5 py-2 min-w-[160px] w-[33%]  bg-white rounded-3xl border-[1px] border-solid border-red group" onClick={()=>setQuantityAndCart(quantity+1)}>
                     <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart Icon"/>
                     <span className='text-[0.75em] text-rose-900 font-medium tracking-normal group-hover:text-red'>Add to Cart</span>
                  </button>

               :
               <button className="flex flex-row items-center justify-around self-center z-10 -mt-3 py-2 bg-red min-w-[160px] w-[33%] rounded-3xl">
                   <div className="flex items-center justify-center w-4 h-4 rounded-full border-[1px] border-solid border-white group hover:bg-white" onClick={()=>setQuantityAndCart(quantity-1)}>
                   <a> 
                     <img className="group-hover:svg-red" src="./assets/images/icon-decrement-quantity.svg" alt="icon decrement"/>
                   </a>
                   </div>
                    <p className='text-white '>{quantity}</p>
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border-[1px] border-solid border-white group hover:bg-white" onClick={()=>setQuantityAndCart(quantity+1)}>
                    <a>
                    <img className="group-hover:svg-red" src="./assets/images/icon-increment-quantity.svg" alt="icon increment"/>
                   </a>
                   </div>
               </button>         
             }

          </div>
          <div className="flex flex-col gap-1 font-red-hat">
             <p className="text-rose-500 text-sm font-light">{category}</p>
             <h2 className='text-rose-900 text-base font-medium'>{name}</h2>
             <p className='text-red text-base font-medium'>{priceToUsd(price)}</p>
          </div>
    
      </section>
       
  
     
  )
}

export default Product
