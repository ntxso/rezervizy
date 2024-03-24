import { Alert } from "bootstrap";
import moment from "moment";
import { useSelector } from "react-redux";

const OrdersOfCustomer = () => {
    const dateNow=new Date();
    dateNow.setHours(0, 0, 0, 1); 
  const dateFormat = (date) => {
    const datex = new Date(date);
    const datea = datex.toLocaleDateString();
    const timea = datex.toLocaleTimeString().slice(0, 5);
    return `${datea} ${timea}`;
  };

  const setClassNameOrder = (order) => {
    if(order.status===3){
        //alert("iptal")
        return "alert alert-danger py-0";
    }else{
        const dateCompare1=moment(order.deliveryDate);
        const dateCompare2=moment(dateNow);
        if(dateCompare1.isBefore(dateCompare2)){
            return "alert alert-secondary py-0";
        }
        else{
            return "alert alert-primary py-0";
        }
    }
  };

  const orders = useSelector((state) => state.orderx.ordersCustomer);
  //   orders.sort((a, b) => {
  //     return new Date(a.deliveryDate) - new Date(b.deliveryDate);
  //   });
  return (
    <div>
        <h4>Sipariş Listesi</h4>
      {orders.map((order) => (
        <div className={setClassNameOrder(order)} role="alert" key={order.id}>
          {dateFormat(order.deliveryDate)}
          <span className="text-secondary"> {order.note} </span>
          <span className="text-success"> {order.total}TL </span>
          <span className="text-secondary"> Kayıt: {dateFormat(order.takingDate)}</span>
        </div>
      ))}
    </div>
  );
};

export default OrdersOfCustomer;
