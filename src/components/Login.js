import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { checkLogin } from '../reducers/loginSlice';

const Login = () => {
    const dispatch=useDispatch();
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giriş işlemleri burada gerçekleştirilir
    console.log("Kullanıcı adı:", email);
    console.log("Şifre:", password);
    const login = { email:email, password: password };
    axios
      .post("https://temizpro.com/api/auth/login", login)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        axios
          .get(
            "https://temizpro.com/api/user/getuserbyidentityname?identityname="+email
          )
          .then((resp) => {
            console.log("TTT:" + JSON.stringify(resp.data));
            localStorage.setItem("supplierid", resp.data.data.supplierId);
          }).then((resp)=>{
            dispatch(checkLogin());
            navigate("/");
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 400) {
            setError('Kullanıcı adı veya şifre hatalı.');
          } else {
            setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
          }
      });
  };

  return (
    <Container>
      <h2>Giriş Yap</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Kullanıcı Adı</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Kullanıcı adınızı girin"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Şifre</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Şifrenizi girin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button color="primary" type="submit">Giriş Yap</Button>
      </Form>
    </Container>
  );
};

export default Login;
