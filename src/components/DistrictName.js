import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAddress } from "../reducers/customerSlice";
import { fetchDistricts } from "../reducers/cdqSlice";

const DistrictName = ({ customerId }) => {
  const [distName, setDistName] = useState("...");
  const districts = useSelector((state) => state.cdqReducer.districts);
  const dispatch = useDispatch();
  useEffect(() => {
    const initialize = async () => {
      try {
        let resp = await dispatch(fetchGetAddress(customerId));
        let test = districts.find((obj) => obj.id === resp.payload.districtId);
        console.log("dists:" + JSON.stringify(test));
        if (test) {
          setDistName(test.name);
        }
        if (districts.length === 0) {
          await dispatch(fetchDistricts(35));
        }
      } catch (error) {
        console.error("Hata oluştu:", error);
      } finally {
      }
    };

    initialize();
  }, [dispatch, customerId, districts]);
  return distName;
};
export default DistrictName;
