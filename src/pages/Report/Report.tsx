import { Badge, Button, DatePicker,  Space, Table } from "antd";
import React, { useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header/HeaderPage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchDataNumber } from "../../redux/slice/numberSlice";
import { exportToExcel } from "../../Export/exportExcel";

const Report = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.numbers.numbers);
  useEffect(() => {
    dispatch(fetchDataNumber());
  }, [dispatch]);
  const items = [
    { label: "Báo cáo", link: "/reports" },
    { label: "Lập báo cáo" },
  ];
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "stt",
      sorter: (a: any, b: any) => a.stt - b.stt,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      sorter: (a: any, b: any) => a.serviceName - b.serviceName,
    },
    {
      title: "Thời gian cấp",
      dataIndex: "fromDate",
      sorter: (a: any, b: any) => a.fromDate - b.fromDate,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (status: string) => {
        let tagColor = "";
        let titleBadge = "";
        switch (status) {
          case "Đang chờ":
            tagColor = "blue";
            titleBadge = "Đang chờ";
            break;
          case "Đã sử dụng":
            tagColor = "gray";
            titleBadge = "Đã sử dụng";
            break;
          case "Bỏ qua":
            tagColor = "red";
            titleBadge = "Bỏ qua";
            break;
          default:
            tagColor = "";
            titleBadge = "";
            break;
        }
        return (
          <div>
            <Badge color={tagColor} />
            <span className="ml-2">{titleBadge}</span>
          </div>
        );
      },
      sorter: (a: any, b: any) => a.status - b.status,
    },
    {
      title: "Nguồn cấp",
      dataIndex: "supply",
      sorter: (a: any, b: any) => a.supply - b.supply,
    },
  ];
  return (
    <Content className="content__global">
      <HeaderPage breadcrumbItems={items} />
      <div className="mx-5 w-[80vw]">
        <div className="flex flex-col my-5">
          <b>Chọn thời gian</b>
          <Space>
            <DatePicker />
            <DatePicker />
          </Space>
        </div>
        <div className="flex">
          <div className="w-[90%]">
            <Table columns={columns} dataSource={data} bordered size="small" pagination={{pageSize: 5}} />
          </div>
          <div>
            <Button
              className="btn__add"
              onClick={() => exportToExcel(data, "Báo cáo")}
            >
              Tải về
            </Button>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Report;
