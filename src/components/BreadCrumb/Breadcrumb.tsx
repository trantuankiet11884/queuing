import React from 'react'
import {Breadcrumb as AntdBreadcrumb} from 'antd'
import { Link } from 'react-router-dom'
import './style.css'
interface Props {
    label: string;  
    link?: string;
}

interface BreadcrumbProps {
        items: Props[]
}
const Breadcrumb:React.FC<BreadcrumbProps> = ({items}) => {
  return (
    <AntdBreadcrumb separator=">">
      {items.map((item, index) => (
        <AntdBreadcrumb.Item key={index}>
          {item.link ? <Link to={item.link}>{item.label}</Link> : item.label}
        </AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  )
}

export default Breadcrumb