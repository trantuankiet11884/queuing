import { Breadcrumb, Col, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import AvatarPage from "../Avatar/Avatar";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface Props {
  breadcrumbItems: BreadcrumbItem[];
}
const HeaderPage = (props: Props) => {
  return (
    <Header style={{ backgroundColor: "#f5f5f5" }} className="">
      <Row className="flex items-center justify-between w-[82vw]">
        <Col>
        <Breadcrumb>
            {props.breadcrumbItems.map((item, index) => (
              <Breadcrumb.Item key={index}>
                {item.link ? <Link to={item.link}>{item.label}</Link> : item.label}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Col>
        <Col>
          <AvatarPage />
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderPage;
