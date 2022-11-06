import React from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import SidebarItem from './SidebarItem'
import items from './data/sidebar.json'
import '../../css/sidebar-styles/Sidebar.css'


function Sidebar() {
  const navigate = useNavigate();
  const logout = (e) => {
      Axios({
          method: 'GET',
          withCredentials: true,
          url: "http://localhost:9000/users/logout"
      }).then((res) => {
          console.log(res.data);
          navigate('/users/signin');
      });
      e.preventDefault();
  };

  return (
    <div className='sidebar'>
      <div className='img-div'>
        <img src={require('../../img/logoFinal.jpg')} alt='logo'/>
      </div>
      { items.map((item, index) => <SidebarItem key={index} item={item}></SidebarItem>)}
      <div className='footer sticky-top'>
        <div className='footer-name'>
          Sanders Chancan Chanca
        </div>
        <div className='footer-job'>
          Jefe de compras
        </div>
        <div className='footer-button'>
          <button type="button" className="btn btn-primary" onClick={logout}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
