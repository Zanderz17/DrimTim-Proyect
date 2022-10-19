import React from 'react'
import { useState } from 'react';
import '../../css/sidebar-styles/SidebarItem.css'

function SidebarItem({item}) {
    const [open, setOpen] = useState(false);

    if(item.childrens){
        return (
            <div className='hover-bold'>
                <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
                    <div className='sidebar-title'>
                        <span>
                        {<i className={item.icon}></i>}
                        {item.title}
                        </span>
                        <i className='bi-chevron-down toggle-btn' onClick={() => setOpen(!open)}></i>
                    </div>
                    <div className='sidebar-content'>
                        {item.childrens.map((child, index) => <SidebarItem key={index} item={child}></SidebarItem>)}
                    </div>
                </div>
            </div>
        )
    }
    else{
        return (
            <a href={item.path || '#'} className='sidebar-item plain'>
                    {<i className={item.icon}></i>}
                    {item.title}
            </a>
        )
    }
}

export default SidebarItem
