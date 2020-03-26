import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import heroImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'

export default function Logon(){
  const [id, setId] = useState('');
  const history = useHistory();
  async function handleLogon(e){
    e.preventDefault();
    try{
      const response = await api.post('sessions', { id });
      console.log(response.data[0].name);
      localStorage.setItem('ong_id', id);
      localStorage.setItem('ong_name', response.data[0].name);
      history.push('/profile')
    }catch(err){
      alert('Falha no login!');
    }
  }

  return(
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="be The Hero"/>

        <form onSubmit={handleLogon}>
            <h1>Faça seu logon </h1>
            <input
             placeholder="Sua ID" 
             value={id} 
             onChange={e => setId(e.target.value)}
            />
            <button type="submit" className="button">Entrar</button>
            <Link to="/register" className="back-link">
              <FiLogIn size={16} color="#E02041" />   
              Não tenho cadastro
            </Link>
        </form>
      </section>
      <img src={heroImg} alt="Heroes"/>
    </div>
  );
}