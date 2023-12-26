import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
      }
    }else{
      setLists([...list , {name : val , id : list.length + 1 , state : false}]);
      setValue("");
      addToLocalStorage(list);
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


  function filterOut(data){
    return data.filter((item) => item.name.toLowerCase().includes(searchInput))
  }


  return (
    <div className='todo-container'>
     <div className='flex'>
      <input type="text"  placeholder='Find Todos' onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
      <button>Search Todos!!</button>
     </div>
      <label style={{fontSize : "2rem" ,  position: "relative" , left:"5px", top:"10px"}} className={updateState ? "show" : "hide"} onClick={defaultState}>⬅️</label>
       <form className='flex' onSubmit={addTodos}>
       <input style={{position: "relative"}} type="text"  placeholder='Todo Name!' onChange={(e) => setValue(e.target.value)} value={val}/>
       <button type='submit'  style={{marginRight:"20px"}}>{updateState ? "upDate" : "Add Todos!"}</button>
      </form>
      <div>
        {list.length > 0 ? filterOut(list).map(item => {
          return(
            <li key={item.id} style={{marginTop:"20px"}}>
                <span style={{marginRight:"20px"}} className={item.state ? "active" : ""}>{item.name}</span> 
                <button onClick={() => handleUpdate(item.id)} style={{marginRight:"20px" ,}} disabled={item.state}>Update</button>
                <button onClick={() => handleDelete(item.id)} style={{marginRight:"20px"}} disabled={item.state}>Delete</button>
                <input type="checkbox"  checked={item.state} onChange={() => handleCheckBox(item.id)}/>
            </li>
          )
        }) : "No Todos to show"}
         
      </div>
    </div>
  )
}

export default App
