import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input, Button, ModalFooter } from "reactstrap";
import * as constants from "../constants/constants";
import { setLoading } from "../reducers/generalSlice";
import {
  fetchCities,
  fetchDistricts,
  fetchQuarters,
  setInputAddress,
  setInputCity,
  setInputDistrict,
  setInputQuarter,
} from "../reducers/cdqSlice";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import {
  fetchCustomerUpdate,
  fetchAddressUpdate,
  fetchFullAddressByAddress,
} from "../reducers/customerSlice";

const CdqAddressInput = ({ address }) => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cdqReducer.cities);
  const districts = useSelector((state) => state.cdqReducer.districts);
  const quarters = useSelector((state) => state.cdqReducer.quarters);

  const inputCity = useSelector((state) => state.cdqReducer.inputCity);
  const inputDistrict = useSelector((state) => state.cdqReducer.inputDistrict);
  const inputQuarter = useSelector((state) => state.cdqReducer.inputQuarter);
  const inputAddress = useSelector((state) => state.cdqReducer.inputAddress);

  useEffect(() => {
    //setAddressData(address);
    // setSelectedDistrict(address.districtId);
    // setSelectedQuarter(address.quarterId);
    const fetchInitialize = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setInputCity(address?.cityId || 34));
        dispatch(setInputDistrict(address?.districtId || 422));
        dispatch(setInputQuarter(address?.quarterId || 32378));
        dispatch(setInputAddress(""));

        dispatch(fetchCities());
        dispatch(fetchDistricts(address?.cityId || 34));
        dispatch(fetchQuarters(address?.districtId || 422));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchInitialize();
  }, [dispatch, address]);

  const handleCityChange = async (e) => {
    //setLoadingModalOpen(true);
    dispatch(setLoading(true));

    console.log("İLL:" + e.target.value);
    dispatch(setInputCity(e.target.value));

    const dists = await dispatch(fetchDistricts(e.target.value));
    if (dists.payload[0]) {
      dispatch(setInputDistrict(dists.payload[0].id));
      const quarts = await dispatch(fetchQuarters(dists.payload[0].id));
      if (quarts.payload[0]) {
        dispatch(setInputQuarter(quarts.payload[0].id));
      }
    }
    //setLoadingModalOpen(false);
    dispatch(setLoading(false));
  };
  const handleDistrictChange = async (e) => {
    //setLoadingModalOpen(true);
    dispatch(setLoading(true));
    console.log("İLÇE:" + e.target.value);
    dispatch(setInputDistrict(e.target.value));
    const quars = await dispatch(fetchQuarters(e.target.value));
    if (quars.payload[0]) {
      dispatch(setInputQuarter(quars.payload[0].id));
    }
    //setLoadingModalOpen(false);
    dispatch(setLoading(false));
  };

  const handleQuarterChange = async (e) => {
    console.log("mahh:" + e.target.value);
    dispatch(setInputQuarter(e.target.value));
  };

  const handleAddressChange = (e) => {
    dispatch(setInputAddress(e.target.value));
    // console.log(
    //   `${inputCity} ${inputDistrict} ${inputQuarter} ${inputAddress}`
    // );
  };

  return (
    <div>
      {/* <Modal isOpen={loadingModalOpen}>
        <ModalHeader>Yükleniyor</ModalHeader>
        <ModalBody>
          <Spinner color="primary" />
        </ModalBody>
      </Modal> */}
      <FormGroup>
        <Label for="city">Şehir</Label>
        <Input
          type="select"
          name="city"
          id="city"
          value={inputCity}
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
          value={inputDistrict}
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
          value={inputQuarter}
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
          value={inputAddress}
          onChange={handleAddressChange}
        />
      </FormGroup>
    </div>
  );
};

export default CdqAddressInput;
