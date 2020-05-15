import React, { useEffect } from 'react';
import './App.css';
import {Order} from './order'
import {useSelector, useDispatch} from 'react-redux';
import {OneOrder, startAddingOrder, loadAllOrders} from './actions';



const oneOrder = new OneOrder("", "", "", "");
const newItems = oneOrder.items;
const newAmount = oneOrder.amount;
const newNote = oneOrder.note;
const newUrgent = oneOrder.urgent;


function App() {

  const orders = useSelector(state => state.orders);
  const dispatch = useDispatch();

  useEffect (() =>{
    dispatch(loadAllOrders());
  },[dispatch]);

  const onAdd = () =>{
    dispatch(startAddingOrder(newItems, newAmount, newNote, newUrgent));
  }

  const onLoadAll = () =>{
    dispatch(loadAllOrders());
  }

  return (
    <div id="orders-root">
      <div id="table-name">
        <div className="order-column">Items</div>
        <div className="amount-column">Amount</div>
        <div className="note-column">Note</div>
        <div className="urgent-column">Urgent</div>
        <div className="edit"></div>
        <div className="delete-operation"></div>
      </div>


      <div id="add-and-load">
        <div id="add"><button onClick = {onAdd}>Add order</button></div>
        <div id="load-all"><button onClick = {onLoadAll}>Refrush</button></div>
      </div>
      
      <div id="orders">
        {orders.map(order => <Order key = {order.id} order={order} />)}
      </div>
      
    </div>
  );
}

export default App;
