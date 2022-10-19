import React from 'react'

import SidebarItem from './SidebarItem'
import items from './data/sidebar.json'
import '../../css/sidebar-styles/Sidebar.css'


function Sidebar() {
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
          <button type="button" className="btn btn-primary">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
