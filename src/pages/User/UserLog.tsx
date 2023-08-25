import { DatePicker, Input,  Space, Table } from "antd";
import React, { useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header/HeaderPage";
import { SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchDataLog } from "../../redux/slice/LogSlice";

const UserLog = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.logs.logs);
  useEffect(() => {
    dispatch(fetchDataLog());
  }, [dispatch]);
  const items = [
    { label: "Cài đặt hệ thống", link: "users" },
    { label: "Nhật ký sử dụng" },
  ];

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
    },
    {
      title: "Thời gian tác động",
      dataIndex: "timestamp",
    },
    {
      title: "IP thực hiện",
      dataIndex: "ipUsage",
    },
    {
      title: "Thao tác thực hiện",
      dataIndex: "activity",
    },
  ];
  return (
    <Content className="content__global">
      <HeaderPage breadcrumbItems={items} />
      <div className="mx-5 w-[80vw]">
        <div className="flex justify-between my-3">
          <div className="flex flex-col">
            <b>Chọn thời gian</b>
            <Space>
              <DatePicker />
              <DatePicker />
            </Space>
          </div>
          <div className="flex flex-col">
            <b>Từ khóa</b>
            <Input suffix={<SearchOutlined />} placeholder="Nhập từ khóa" />
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={data} bordered size="small" />
        </div>
      </div>
    </Content>
  );
};

export default UserLog;
