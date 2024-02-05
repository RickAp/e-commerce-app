import React, { useState, useCallback } from "react";
import ProductList from "@/components/ProductList/ProductList";
import Navbar from "@/components/NavBar/NavBar";
import ProductEntryForm from "@/components/ProductEntryForm/ProductEntryForm";
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '@/store/store';

const Home = () => {

  const dispatch = useDispatch();
  const isFormOpen = useSelector((state) => state.product.isFormOpen);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSearch = useCallback((term) => {
    dispatch(setSearchTerm(term));
  }, [dispatch]);

  return (
    <div className="flex flex-col ">
      <Navbar onSearch={handleSearch} onSort={setSortDirection} />
      {isFormOpen && <ProductEntryForm />}
      <div className="mt-24">
        <ProductList sortDirection={sortDirection}/>
      </div>
      
    </div>
  );
};

export default Home;