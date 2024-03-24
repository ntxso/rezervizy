import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input, Button, ModalFooter } from "reactstrap";
import * as constants from "../constants/constants";
import {
  fetchCities,
  fetchDistricts,
  fetchQuarters,
} from "../reducers/cdqSlice";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import {
  fetchCustomerUpdate,
  fetchAddressUpdate,
  fetchFullAddressByAddress,
} from "../reducers/customerSlice";
import { setLoading } from "../reducers/generalSlice";

const CustomerEdit = ({isOpen, toggle }) => {
  const customer = useSelector((state) => state.customer.activeCustomer);
  const address = useSelector((state) => state.customer.activeAddress);

  const [customerData, setCustomerData] = useState(customer);
  const [addressData, setAddressData] = useState(address);
  const [selectedCity, setSelectedCity] = useState(0);

  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [selectedQuarter, setSelectedQuarter] = useState(0);

  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cdqReducer.cities);
  const districts = useSelector((state) => state.cdqReducer.districts);
  const quarters = useSelector((state) => state.cdqReducer.quarters);

  const [handleControl, setHandleControl] = useState(null);

  const [loadingModalOpen, setLoadingModalOpen] = useState(false);

  useEffect(() => {


    setCustomerData(customer);
    setAddressData(address);
    setSelectedCity(address.cityId);
    setSelectedDistrict(address.districtId);
    setSelectedQuarter(address.quarterId);

    dispatch(fetchDistricts(address.cityId || 0));
    dispatch(fetchQuarters(address.districtId || 0));
  }, [dispatch, address,customer]);

  useEffect(() => {

    if (handleControl === constants.CITIES_CONTROL) {
      setLoadingModalOpen(true); // Modal'ı aç
      dispatch(fetchDistricts(selectedCity))
        .then(() => setLoadingModalOpen(false)) // Fetch işlemi tamamlandığında Modal'ı kapat
        .catch(() => setLoadingModalOpen(false)); // Hata durumunda da Modal'ı kapat;
    }
  }, [dispatch, selectedCity, handleControl]);

  useEffect(() => {
 
    if (handleControl === constants.CITIES_CONTROL) {
      if (districts.length > 0) {
 
        setSelectedDistrict(districts[0].id);
      }
    }
  }, [districts, handleControl]);

  useEffect(() => {
  
    if (
      handleControl === constants.DISTRICTS_CONTROL ||
      constants.CITIES_CONTROL
    ) {
    
      setLoadingModalOpen(true);
      dispatch(fetchQuarters(selectedDistrict))
        .then(() => setLoadingModalOpen(false)) // Fetch işlemi tamamlandığında Modal'ı kapat
        .catch(() => setLoadingModalOpen(false)); // Hata durumunda da Modal'ı kapat;;
    }
  }, [dispatch, selectedDistrict, handleControl]);

  useEffect(() => {
 
    if (handleControl === constants.DISTRICTS_CONTROL) {
      if (quarters.length > 0) {
       
        setSelectedQuarter(quarters[0].id);
      }
    }
  }, [quarters, handleControl]);

  useEffect(() => {
   
    setAddressData((prevData) => ({
      ...prevData,
      cityId: selectedCity,
      districtId: selectedDistrict,
      quarterId: selectedQuarter,
    }));
  }, [selectedCity, selectedDistrict, selectedQuarter]);

  useEffect(() => {
 
    dispatch(fetchCities());

    //setSelectedDistrict(initialData.districtId);
  }, [dispatch]);

  const handleCityChange = (event) => {
    // Seçilen şehri güncelle ve useEffect ile ilgili action'ları tetikle
    setSelectedCity(event.target.value);
    //dispatch(fetchCities(event.target.value));
    setHandleControl(constants.CITIES_CONTROL);
  };

  const handleDistrictChange = (event) => {
    // Seçilen şehri güncelle ve useEffect ile ilgili action'ları tetikle
    setSelectedDistrict(event.target.value);
    //dispatch(fetchQuarters(event.target.value));
    setHandleControl(constants.DISTRICTS_CONTROL);
  };
  const handleQuarterChange = (event) => {
    // Seçilen şehri güncelle ve useEffect ile ilgili action'ları tetikle
    setSelectedQuarter(event.target.value);
    //fetchQuarters(event.target.value)
    setHandleControl(constants.QUARTERS_CONTROL);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange=(e)=>{
    setAddressData((prevData)=>({
      ...prevData,
      address:e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      dispatch(setLoading(true));
      await dispatch(fetchCustomerUpdate(customerData));

      await dispatch(fetchAddressUpdate(addressData));
      await dispatch(fetchFullAddressByAddress(addressData));
      //setSubmitControl(resp);
      console.log("güncellemeler tamam");
      toggle();
    } catch (error) {
      console.log("HATA:" + error);
    }finally{
      dispatch(setLoading(false));
    }
  };

  const modalBody = () => {
    return (
      <div>
        <FormGroup>
          <Label for="phoneNumber">Telefon Numarası</Label>
          <Input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={customerData.phoneNumber}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">İsim</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={customerData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="city">Şehir</Label>
          <Input
            type="select"
            name="city"
            id="city"
            value={selectedCity}
            onChange={handleCityChange}
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="district">İlçe</Label>
          <Input
            type="select"
            name="district"
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
          >
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="quarter">Mahalle</Label>
          <Input
            type="select"
            name="quarter"
            id="quarter"
            value={selectedQuarter}
            onChange={handleQuarterChange}
          >
            {quarters.map((quarter) => (
              <option key={quarter.id} value={quarter.id}>
                {quarter.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="address">Adres</Label>
          <Input
            type="textarea"
            name="address"
            id="address"
            value={addressData.address}
            onChange={handleAddressChange}
          />
        </FormGroup>
      </div>
    );
  };

  return (
    <div>
      <Modal isOpen={loadingModalOpen}>
        <ModalHeader>Yükleniyor</ModalHeader>
        <ModalBody>
          <Spinner color="primary" />
        </ModalBody>
      </Modal>
      <Modal isOpen={isOpen} toggle={toggle}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Sipariş Oluştur</ModalHeader>
          <ModalBody>{modalBody()}</ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Kaydet
            </Button>
            <Button color="secondary" onClick={toggle}>
              Kapat
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerEdit;
