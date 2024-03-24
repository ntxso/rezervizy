import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomers } from "../reducers/customerSlice";
import { setLoading } from "../reducers/generalSlice";
import { fetchDistricts } from "../reducers/cdqSlice";
import { Col, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router";

function Customers() {
  const { search } = useParams();
  const navigate = useNavigate();
  const customers = useSelector((state) => state.customer.customers);
  const districts = useSelector((state) => state.cdqReducer.districts);
  const [cityId, setCityId] = useState(34);
  //const status = useSelector((state) => state.customer.status);

  //const must1=dispatch(fetchCustomerById(12839));
  const dispatch = useDispatch();
  useEffect(() => {
    const initialize = async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(fetchCustomers());
      } catch (error) {
      } finally {
        dispatch(setLoading(false));
      }
    };
    initialize();
  }, [dispatch]);

  useEffect(() => {
  
    if (customers.length > 0) {
      const onePerson = customers[customers.length - 1];
      setCityId(onePerson.cityId);
    }
  }, [dispatch, customers]);

  useEffect(() => {
    dispatch(fetchDistricts(cityId));
  }, [dispatch, cityId]);

  const lowerSearch = search?.toLowerCase();
  const upperSearch = search?.toUpperCase();
  const filteredCustomers =
    lowerSearch === upperSearch
      ? customers.filter((cust) =>
          cust.phoneNumber.includes(search ? search : "")
        )
      : customers.filter((cust) =>
          cust.name.toLowerCase().includes(lowerSearch ? lowerSearch : "")
        );


  // const filteredCustomersByPhoneNumber = customers.filter((cust) =>
  //   cust.phoneNumber.includes(search?search:"")
  // );

  // const filteredCustomersByName = customers.filter((cust) =>
  //   cust.name.toLowerCase().includes(normalizedSearch)
  // );

  // const showList=filteredCustomersByPhoneNumber.length >= filteredCustomersByName.length
  // ? filteredCustomersByPhoneNumber
  // : filteredCustomersByName;

  const first20Customers = filteredCustomers.slice(-20);
  const handleRowClick = (customerId) => {
    // Satıra tıklandığında müşteri detayları sayfasına yönlendirme yap
    navigate(`/customer/${customerId}`);
  };

  const findDist = (id) => {
    let result = districts.find((p) => p.id === id);
    if (result) {
      return result.name;
    } else {
      return "";
    }
  };
  return (
    <div className="container">
      <Row>
        <Col>
          <h5>
            Müşteri Listesi {filteredCustomers.length} {search}
          </h5>
        </Col>
      </Row>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>İsim</th>
            <td>İlçe</td>
          </tr>
        </thead>
        <tbody>
          {first20Customers.map((customer) => (
            <tr
              key={customer.customerId}
              onClick={() => handleRowClick(customer.customerId)}
            >
              <td>{customer.customerId}</td>
              <td>{customer.name}</td>
              <td>{findDist(customer.districtId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
