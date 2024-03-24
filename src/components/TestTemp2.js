import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCustx, selectCustx,
} from "../reducers/custxSlice";

function TestTemp2() {
  //const customer = useSelector((state)=>state.custx.customerxx);
  //const custx = useSelector((state) => state.custx.custx);
  const custx=useSelector(selectCustx);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustx());
  }, [dispatch]);

  return (
    <div className="container">
      <h3>Müşteri</h3>

      <p>{JSON.stringify(custx)}</p>
    </div>
  );
}

export default TestTemp2;
