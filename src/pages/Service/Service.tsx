import { Badge, Button, DatePicker, Input, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header/HeaderPage";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/slice/serviceSlice";
import "./service.css";
import { useNavigate } from "react-router-dom";
import { ServiceType } from "../../interface";

const Service = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.services.services);
  const [activeStatus, setActiveStatus] = useState<boolean | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const navigate = useNavigate();

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleActiveStatusChange = (value: boolean) => {
    setActiveStatus(value === null ? null : value);
  };

  const filteredData = data.filter((service) => {
    const isActiveMath =
      activeStatus === null || service.activeStatus === activeStatus;

    const isKeywordMatch =
      searchKeyword === "" ||
      service.serviceName.toLowerCase().includes(searchKeyword.toLowerCase());
    return isActiveMath && isKeywordMatch;
  });

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const breadcrumbItems = [
    { label: "Dịch vụ", link: "/services" },
    { label: "Danh sách dịch vụ" },
  ];

  const columns = [
    {
      title: "Mã dịch vụ",
      dataIndex: "serviceCode",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "activeStatus",
      render: (status: boolean) =>
        status ? (
          <>
            <Badge color="green" className="mr-2" />
            <span>Hoạt động</span>
          </>
        ) : (
          <>
            <Badge color="red" className="mr-2" />
            <span>Ngưng hoạt động</span>
          </>
        ),
    },
    {
      title: " ",
      dataIndex: "",
      render: (_: any, record: ServiceType) => (
        <span
          className="underline underline-offset-1 p-5 cursor-pointer link-info text-[#4277FF]"
          onClick={() => navigate(`/service-details/${record.id}`)}
        >
          Chi tiết
        </span>
      ),
    },
    {
      title: " ",
      dataIndex: "",
      render: (_: any, record: ServiceType) => (
        <span
          className="underline underline-offset-1 p-5 cursor-pointer link-info text-[#4277FF]"
          onClick={() => navigate(`/service-add/${record.id}`)}
        >
          Cập nhật
        </span>
      ),
    },
  ];
  return (
    <Content className="content__global">
      <HeaderPage breadcrumbItems={breadcrumbItems} />

      <div className="flex flex-col px-4 w-full">
        <div>
          <b className="text-[1.5rem] text-[#ff7506]">Quản lý dịch vụ</b>
        </div>

        <div className="flex  my-2">
          <div className="flex flex-col">
            <b>Trạng thái hoạt động</b>
            <Select
              defaultValue={null}
              style={{ width: 200 }}
              value={activeStatus}
              onChange={handleActiveStatusChange}
              options={[
                { value: null, label: "Tất cả" },
                { value: true, label: "Hoạt động" },
                { value: false, label: "Ngưng hoạt động" },
              ]}
            />
          </div>
          <div className="flex flex-col mx-4">
            <b>Chọn thời gian</b>
            <Space>
              <DatePicker placeholder="Từ ngày" />
              <DatePicker placeholder="Đến ngày" />
            </Space>
          </div>
          <div className="flex flex-col ml-[24.3%]">
            <b>Từ khóa</b>
            <Input
              suffix={<SearchOutlined />}
              placeholder="Nhập từ khóa"
              value={searchKeyword}
              onChange={handleKeywordChange}
              style={{ marginLeft: 8, width: "273px" }}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <Table
              columns={columns}
              dataSource={filteredData}
              bordered
              className="table__service"
              size="small"
              pagination={{ pageSize: 5 }}
            />
          </div>
          <Button className="btn__add" onClick={() => navigate("/service-add")}>
            <PlusOutlined />
            <p>Thêm dịch vụ</p>
          </Button>
        </div>
      </div>
    </Content>
  );
};

export default Service;
