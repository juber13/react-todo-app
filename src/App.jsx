import { useEffect, useState } from 'react'

import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [val , setValue] = useState(null)
  const [list , setLists] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [updateState , setUpDateState] = useState(false);
  const [id , setId] = useState(-1);
  const [searchInput , setSearchInput] = useState("");




  const addToLocalStorage = (data) => {
      localStorage.setItem('todos' , JSON.stringify(data));
  }

  const addTodos = (e) => {
    // handle upadtio here
    e.preventDefault();
    if(!val) return;
    if(updateState == true){
      const index =  list.findIndex(item => item.id === id);
      const items = [...list];
      if(val !== ""){
        items[index].name = val;
        setLists(items);
        setUpDateState(false);
        setValue("");
        addToLocalStorage(items); 
        toast.success("Item Updated")
      }
    }else{
      setLists([...list , {name : val , id : list.length + 1 , state : false}]);
      setValue("");
      toast.update("Item Added")
      addToLocalStorage(list);
      toast.success("Item Updated")
    }
  }

   

  const handleUpdate = (id) => {
    setUpDateState(true);
    const findIndex = list.findIndex(item => item.id === id);
    setValue(list[findIndex].name);
    setId(id);
  } 


  const handleDelete = (id) => {
     const newData  = list.filter(item =>  item.id !== id);
     setLists(newData);
     addToLocalStorage(newData)
     if(val){
       setValue("");
     }
     setUpDateState(false)
     toast.warn("Item Deleted")
  }

  const handleCheckBox = (id) => {
    const findInex = list.findIndex(item => item.id === id);
    const items = [...list];
    items[findInex].state  = !items[findInex].state;
    setLists(items);
  }

  useEffect(() => {
    addToLocalStorage(list);
 },[list])


   const defaultState = () => {
    setUpDateState(false);
    setValue('');
   }


  // function filterOut(data){
  //   return data.filter((item) => item.name.toLowerCase().includes(searchInput))
  // }


  return (
    <div className='todo-container'>
        <div className="heading">
           <h2>Grocery Bud</h2>
        </div>
       <form className='flex' onSubmit={addTodos}>
      <label style={{fontSize : "1rem" ,  position: "relative" , left:"5px"}} className={updateState ? "show" : "hide"} onClick={defaultState}>⬅️</label>
       <input style={{position: "relative"}} type="text"  placeholder='Todo Name!' onChange={(e) => setValue(e.target.value)} value={val}/>
       <button type='submit'  style={{marginRight:"20px"}}>{updateState ? "Update" : "Add Item!"}</button>
       <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
       />
      </form>
      <div>
        {list.length > 0 ? list.map(item => {
          return(
            <li key={item.id} style={{marginTop:"20px"}}>
                <span style={{marginRight:"20px"}} className={item.state ? "active" : ""}>{item.name}</span> 
                <button onClick={() => handleUpdate(item.id)} style={{marginRight:"20px" ,}} disabled={item.state}>Update</button>
                <button onClick={() => handleDelete(item.id)} style={{marginRight:"20px"}} disabled={item.state}>Delete</button>
                <input type="checkbox"  checked={item.state} onChange={() => handleCheckBox(item.id)}/>
            </li>
          )
        }) : <p>No Todos to show!!</p>}
         
      </div>
    </div>
  )
}

export default App
