import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ price: '', pname: '', ncat: 'food' });

  const uRL = "https://crudcrud.com/api/2cee705eff9a493bb7863db010760d08/itemsInfo";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(uRL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const showOnScreen = (obj) => {
    if (obj.cat === "food") {
      return (
        <li key={obj._id}>
          Name: {obj.pname} ----- Price: {obj.price} Rs
          <button onClick={() => deleteFun(obj._id)}>Delete</button>
        </li>
      );
    } else if (obj.cat === "skincare") {
      return (
        <li key={obj._id}>
          Name: {obj.pname} ----- Price: {obj.price} Rs
          <button onClick={() => deleteFun(obj._id)}>Delete</button>
        </li>
      );
    } else {
      return (
        <li key={obj._id}>
          Name: {obj.pname} ----- Price: {obj.price} Rs
          <button onClick={() => deleteFun(obj._id)}>Delete</button>
        </li>
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const myobj = {
        price: newProduct.price,
        pname: newProduct.pname,
        cat: newProduct.ncat,
      };

      const response = await fetch(uRL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myobj),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const op = await response.json();
      setProducts([...products, op]);

      // Clear form fields
      setNewProduct({ price: '', pname: '', ncat: 'food' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFun = async (objid) => {
    try {
      const response = await fetch(`${uRL}/${objid}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setProducts(products.filter((product) => product._id !== objid));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} autoComplete="on">
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          name="nprice"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <label htmlFor="pname">Product Name:</label>
        <input
          id="pname"
          name="npname"
          value={newProduct.pname}
          onChange={(e) => setNewProduct({ ...newProduct, pname: e.target.value })}
        />
        <label htmlFor="cat">Category:</label>
        <select
          id="cat"
          name="ncat"
          value={newProduct.ncat}
          onChange={(e) => setNewProduct({ ...newProduct, ncat: e.target.value })}
        >
          <option value="food">Food Item</option>
          <option value="skincare">Skincare Item</option>
          <option value="electronics">Electronic Item</option>
        </select>
        <button type="submit">Add Product</button>
      </form>
      <h1>Products:</h1>
      <h3>Food Items:</h3>
      <ul id="foodList">
        {products
          .filter((product) => product.cat === 'food')
          .map((product) => showOnScreen(product))}
      </ul>
      <h3>Skincare Items:</h3>
      <ul id="skincareList">
        {products
          .filter((product) => product.cat === 'skincare')
          .map((product) => showOnScreen(product))}
      </ul>
      <h3>Electronic Items:</h3>
      <ul id="electronicsList">
        {products
          .filter((product) => product.cat === 'electronics')
          .map((product) => showOnScreen(product))}
      </ul>
    </div>
  );
}

export default App;
