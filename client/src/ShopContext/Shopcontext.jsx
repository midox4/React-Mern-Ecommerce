

import { createContext, useEffect, useState } from "react";
import Message from "../component/Snackbar/Message";
import Axios from "../api/axios";



// ********
// Shop Context
// ********
export const ShopContext = createContext();


// ********
// Auth Provider
// ********
const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  const [persist, setPersist] = useState(false);
  const [LocalStorage , setLocalStorage] = useState([])
  const [dataLocalStorage , setDataLocalStorage] = useState(JSON.parse(localStorage.getItem('data')))
  const [loading, setloading] = useState(false);
  
console.log('localStorage: ' +dataLocalStorage);

  useEffect(() => {
    const token = async ()=> {
      setloading(true)
        try{
       const {data} = await Axios.get("/USER/GET")
       setloading(false)
       setPersist(true);
       setUser(data);
      }
      catch (err) {
           setloading(false)
          console.log(err.message);
          console.log(err.response.status);
          setPersist(true);
        }
      }
    return() => token()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
console.log('user: ' +user);


  const [cartitems, setcartitems] = useState([]);
  const [signin, setsignin] = useState(false);
  const [signup, setsignup] = useState(false);
  const [search, setsearch] = useState("");


// ********
// Function Increase Qte
// ********
  const increaseQte = (product , i) => {
    product.Qte++
    const listInvoice = [...cartitems]
    listInvoice[i]['total'] = listInvoice[i]['price'] * listInvoice[i]['Qte']
    setcartitems(listInvoice)
  };
  
  
// ********
// Function Decrease Qte
// ********
  const decreaseQte = (product , i) => {
    if(product.Qte <= 1) {
      return Message("Please Verify Quantity !", "info");
     }
    product.Qte--
    const listInvoice = [...cartitems]
    listInvoice[i]['total'] = listInvoice[i]['price'] * listInvoice[i]['Qte']
    setcartitems(listInvoice)
  };
  

// ********  
// Function Add To Cart Shop
// ********
  const addTocart = (product) => {
    if (cartitems.find((item) => item.id === product.id)) {
      Message("Product Is Exisit Into Cart !", "error");
      return setcartitems;
    }
      const quantity = {
          Qte: 1,
          total: product.price * 1,
      };    
      const newproduct = Object.assign(quantity, product);
      setcartitems([...cartitems, newproduct]);
      Message("Product Added To Cart With Succes !", "success");
    };

// ********  
// Function Favorite Products
// ********    
var arr = []

const Favorite = (item) =>{
  if (dataLocalStorage?.find((val) => val.id === item.id)) {
    Message("Product Is Exist In Favorite !", "error");  
    return dataLocalStorage;
  }
  else if(dataLocalStorage === null){
    arr.push(item)
  localStorage.setItem("data" , JSON.stringify(arr))
  setDataLocalStorage(JSON.parse(localStorage.getItem('data')))
  return  Message("Product Added In Favorite !", "success");
  }
   else{
    arr.push(item)
     const newArr = [...dataLocalStorage ,...arr]
   localStorage.setItem("data" , JSON.stringify(newArr))
     setDataLocalStorage(JSON.parse(localStorage.getItem('data')))
     return  Message("Product Added In Favorite !", "success");
   }
}



// ********
// Function Remove To Cart Shop
// ********
    const removeTocart = (product) => {
      const newcart = cartitems.filter((p) => p.id !== product.id);
      setcartitems(newcart);
      Message("Product Removed With Succes !", "warning");
    };
    
// ********
// Sum TT Calc
// ********
  const total = cartitems.reduce((pri, prod) => pri + prod.price * prod.Qte, 0);
  
  
  
  return (
    <ShopContext.Provider
      value={{
        LocalStorage , 
        setLocalStorage,
        dataLocalStorage ,
        setDataLocalStorage,
        user,
        setUser,
        loading,
        persist, 
        setPersist,
        search,
        setsearch,
        cartitems,
        setcartitems,
        addTocart,
        removeTocart,
        total,
        setsignin,
        signin,
        setsignup,
        signup,
        increaseQte,
        decreaseQte,
        Favorite
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default Context;
