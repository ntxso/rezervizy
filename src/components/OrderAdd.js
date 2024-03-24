// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { useSelector } from 'react-redux';

// function OrderAdd() {
//     const date = useSelector((state) => state.dateReducer.activeDay);

   
//   const [formData, setFormData] = useState({
//     deliveryDate: date,
//     time: '10:00',
//     phoneNumber: '',
//     name: '',
//     note: '',
//     total: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission (e.g., send data to server)
//     console.log('Form data submitted:', formData);
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="date">
//         <Form.Label>Date</Form.Label>
//         <Form.Control
//           type="date"
//           name="date"
//           value={formData.deliveryDate}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="time">
//         <Form.Label>Time</Form.Label>
//         <Form.Control
//           type="time"
//           name="time"
//           value={formData.time}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="phoneNumber">
//         <Form.Label>Phone Number</Form.Label>
//         <Form.Control
//           type="tel"
//           name="phoneNumber"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="name">
//         <Form.Label>Name</Form.Label>
//         <Form.Control
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="note">
//         <Form.Label>Note</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={3}
//           name="note"
//           value={formData.note}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="total">
//         <Form.Label>Total</Form.Label>
//         <Form.Control
//           type="number"
//           name="total"
//           value={formData.total}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// }

// export default OrderAdd;
