import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import HeaderPage from "../../components/Header/HeaderPage";
import { Button, Card, Col, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { NumberType } from "../../interface";

const DetailLevelNumber = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [numberDetails, setNumberDetails] = useState<NumberType | null>(null);
  const data = useAppSelector((state) => state.numbers.numbers);
  useEffect(() => {
    const details = data.find((number) => number.id === id);
    setNumberDetails(details || null);
  }, [id, data]);
  const breadcrumbItem = [
    { label: "Cấp số", link: "/numbers" },
    { label: "Danh sách cấp số", link: "/numbers" },
    { label: "Chi tiết" },
  ];
  return (
    <Content className="content__global">
      <HeaderPage breadcrumbItems={breadcrumbItem} />
      <div className="mx-5 w-[1000px]">
        <div>
          <b className="text-[1.5rem] text-[#FF7506]">Quản lý cấp số</b>
        </div>

        <div className="flex">
          <Card className="w-[90%]">
            <b className="text-[1rem] text-[#FF7506]">Thông tin cấp số</b>
            <Row>
              <Col span={12}>
                <div>
                  <b>Họ tên: </b>
                  <span className="ml-10">{numberDetails?.customerName}</span>
                </div>
                <div>
                  <b>Tên dịch vụ: </b>
                  <span className="ml-10">{numberDetails?.serviceName}</span>
                </div>
                <div>
                  <b>Số thứ tự: </b>
                  <span className="ml-10">{numberDetails?.stt}</span>
                </div>
                <div>
                  <b>Thời gian cấp: </b>
                  <span className="ml-10">{numberDetails?.fromDate}</span>
                </div>
                <div>
                  <b>Hạn sử dụng: </b>
                  <span className="ml-10">{numberDetails?.toDate}</span>
                </div>
              </Col>
              <Col>
                <div>
                  <b>Nguồn cấp: </b>
                  <span className="ml-10">{numberDetails?.supply}</span>
                </div>
                <div>
                  <b>Trạng thái: </b>
                  <span className="ml-10">{numberDetails?.status}</span>
                </div>
                <div>
                  <b>Số điện thoại: </b>
                  <span className="ml-10">{numberDetails?.phoneNumber}</span>
                </div>
                <div>
                  <b>Địa chỉ Email: </b>
                  <span className="ml-10">{numberDetails?.email}</span>
                </div>
              </Col>
            </Row>
          </Card>
          <div className="flex">
            <Button className="btn__add" onClick={() => navigate(-1)}>
              Quay lại
            </Button>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default DetailLevelNumber;
