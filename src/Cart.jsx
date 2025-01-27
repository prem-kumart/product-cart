/* eslint-disable react/prop-types */


const Cart = ({product,cart,setCart,priceToUsd,orderConfirmed}) => {

  function removeProductFromCart(){
     
     setCart(cart.filter((eachProduct)=>eachProduct.id != product.id))
     return;
  }
  return (
    
    <>
    <div className="flex justify-between items-center">
        <div className="flex flex-row gap-4 ">

            {orderConfirmed && <img className="w-[50px] h-[50px] rounded-md"src={product.thumbnail} alt="thumbnail" />}
            <div className="flex flex-col gap-2">
            <p>{product.name}</p>
            <div className="flex flex-row gap-2">
                <p className="text-red">{product.quantity}x</p>
                <p className="text-rose-500 font-light">@ {priceToUsd(product.price)}</p>
                <p className="text-rose-500 font-normal">${product.quantity * product.price}</p>
            </div>
            </div>
        </div>
        <div>
          <button className="flex items-center justify-center w-[18px] h-[18px] border-[2px] border-solid border-rose-400 rounded-full group hover:border-rose-900" onClick={()=>removeProductFromCart()}  >
              <img className="fill-rose-900 m-auto w-[9px] h-[9px] svg-rose group-hover:svg-rose-black" src="./assets/images/icon-remove-item.svg" alt="remove button image" />
          </button>
        </div>
    </div>
    <hr className="text-rose-100"></hr>
   
    </>
  )
}

export default Cart
