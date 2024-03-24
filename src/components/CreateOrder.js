// import moment from 'moment';
// import React, { useState } from 'react';
// import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import { useSelector } from 'react-redux';

// const CreateOrder = () => {
// const date=useSelector((state) => state.dateReducer.activeDay);
//   const [formData, setFormData] = useState({
//     deliveryDate: date,
//     time: '10:00',
//     note: '',
//     terminal: 1,
//     total: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Form verilerini işleme kodu buraya gelecek
//     console.log('Form verileri:', formData);
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormGroup>
//         <Label for="date">Tarih</Label>
//         <Input
//           type="date"
//           name="deliveryDate"
//           id="deliveryDate"
//           value={formData.deliveryDate}
//           onChange={handleChange}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="time">Saat</Label>
//         <Input
//           type="time"
//           name="time"
//           id="time"
//           value={formData.time}
//           onChange={handleChange}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="note">Not</Label>
//         <Input
//           type="text"
//           name="note"
//           id="note"
//           value={formData.note}
//           onChange={handleChange}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="terminal">Terminal</Label>
//         <Input
//           type="text"
//           name="terminal"
//           id="terminal"
//           value={formData.terminal}
//           onChange={handleChange}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="total">Toplam</Label>
//         <Input
//           type="number"
//           name="total"
//           id="total"
//           value={formData.total}
//           onChange={handleChange}
//         />
//       </FormGroup>
//       <Button color="primary" type="submit">Gönder</Button>
//     </Form>
//   );
// };

// export default CreateOrder;
