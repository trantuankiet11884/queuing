import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./device.css";
import HeaderPage from "../../components/Header/HeaderPage";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchData } from "../../redux/slice/deviceSlice";
import { Device } from "../../interface";

const DevicePage: React.FC = () => {
  // Định nghĩa breadcrumb cho trang Thiết bị > Danh sách thiết bị
  const breadcrumbItems = [
    { label: "Thiết bị", link: "/devices" },
    { label: "Danh sách thiết bị" },
  ];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.devices.devices);

  const [activeStatusFilter, setActiveStatusFilter] = useState<string | null>(
    null
  );
  const [connectionStatusFilter, setConnectionStatusFilter] = useState<
    string | null
  >(null);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");

  const handleActiveStatusChange = (value: string) => {
    setActiveStatusFilter(value);
  };

  const handleConnectionStatusChange = (value: string) => {
    setConnectionStatusFilter(value);
  };

  const handleKeyWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyWord(e.target.value);
  };

  const filteredData = data.filter((device) => {
    // Convert the filter strings to booleans if not null
    const isActiveFilter =
      activeStatusFilter === "true"
        ? true
        : activeStatusFilter === "false"
        ? false
        : null;
    const isConnectionFilter =
      connectionStatusFilter === "true"
        ? true
        : connectionStatusFilter === "false"
        ? false
        : null;

    // Check if the device matches the active status filter
    const isActiveMatch =
      isActiveFilter === null || device.activeStatus === isActiveFilter;

    // Check if the device matches the connection status filter
    const isConnectionMatch =
      isConnectionFilter === null ||
      device.connectionStatus === isConnectionFilter;

    // Check if the device name contains the keyword
    const isKeywordMatch =
      searchKeyWord === "" ||
      device.deviceName.toLowerCase().includes(searchKeyWord.toLowerCase());

    // Return true if the device matches all filter criteria
    return isActiveMatch && isConnectionMatch && isKeywordMatch;
  });

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleAddDevice = () => {
    navigate("/device_add");
  };
  const handleDetail = (id: any) => {
    // Xử lý sự kiện khi nhấp vào nút "Chi tiết" của thiết bị có khóa là key
    navigate(`/details/${id}`);
    console.log(`Xem chi tiết thiết bị có khóa là ${id}`);
  };

  const handleUpdate = (id: string) => {
    // Xử lý sự kiện khi nhấp vào nút "Cập nhật" của thiết bị có khóa là key
    navigate(`/device_add/${id}`);
    console.log(`Cập nhật thiết bị có khóa là ${id}`);
  };

  const renderServiceUse = (serviceUse: string[] | string) => {
    let services: string[] = [];

    if (Array.isArray(serviceUse)) {
      // If the serviceUse is an array, use it directly
      services = serviceUse;
    } else if (typeof serviceUse === "string") {
      // If the serviceUse is a string, split it into an array
      services = serviceUse.split(",");
    } else {
      // If the serviceUse is neither an array nor a string, set it as an empty array
      services = [];
    }

    // Maximum number of services to show before truncation
    const maxServicesToShow = 2;

    // Check if there are more services than the maximum allowed
    const shouldTruncate = services.length > maxServicesToShow;
    const tooltipContent = Array.isArray(serviceUse)
      ? serviceUse.join(", ")
      : serviceUse;
    return (
      <span>
        {services.slice(0, maxServicesToShow).map((service, index) => (
          <React.Fragment key={index}>
            {service.trim()}
            {index < maxServicesToShow - 1 && ", "}
          </React.Fragment>
        ))}
        {shouldTruncate && (
          <>
            <br />
            <Tooltip trigger={"click"} title={tooltipContent}>
              <span
                className="underline underline-offset-1 cursor-pointer link-info text-[#4277FF]"
                onClick={() => {
                  // Handle the "Xem thêm" click event here
                  console.log("Xem thêm clicked:", serviceUse);
                }}
              >
                ...Xem thêm
              </span>
            </Tooltip>
          </>
        )}
      </span>
    );
  };
  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "deviceCode",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "deviceName",
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "ipAddress",
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
      title: "Trạng thái kết nối",
      dataIndex: "connectionStatus",
      render: (status: boolean) =>
        status ? (
          <>
            <Badge color="green" className="mr-2" />
            <span>Kết nối</span>
          </>
        ) : (
          <>
            <Badge color="red" className="mr-2" />
            <span>Mất kết nối</span>
          </>
        ),
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "serviceUse",
      render: renderServiceUse,
    },
    {
      title: " ",
      dataIndex: "",
      render: (_: any, record: Device) => (
        <span
          className="underline underline-offset-1 p-5 cursor-pointer link-info text-[#4277FF]"
          onClick={() => handleDetail(record.id)}
        >
          Chi tiết
        </span>
      ),
    },
    {
      title: " ",
      dataIndex: "",
      render: (_: any, record: Device) => (
        <span
          className="underline underline-offset-1 p-5 cursor-pointer link-info text-[#4277FF]"
          onClick={() => handleUpdate(record.id)}
        >
          Cập nhật
        </span>
      ),
    },
  ];
  return (
    <Content style={{ minHeight: "100vh" }}>
      <HeaderPage breadcrumbItems={breadcrumbItems} />

      <div className="px-4">
        <div>
          <b className="text-[1.5rem] text-[#ff7506]">Danh sách thiết bị</b>
        </div>
        <div className=" flex mt-5">
          <Space>
            <Form layout="vertical">
              <Form.Item label={<b>Trạng thái hoạt động</b>}>
                <Select
                  defaultValue="jack"
                  style={{ width: 200 }}
                  value={activeStatusFilter}
                  onChange={handleActiveStatusChange}
                  options={[
                    { value: null, label: "Tất cả" },
                    { value: "true", label: "Hoạt động" },
                    { value: "false", label: "Ngưng hoạt động" },
                  ]}
                />
              </Form.Item>
            </Form>
            <Form layout="vertical">
              <Form.Item label={<b>Trạng thái kết nối</b>}>
                <Select
                  defaultValue="jack"
                  style={{ width: 200 }}
                  value={connectionStatusFilter}
                  onChange={handleConnectionStatusChange}
                  options={[
                    { value: null, label: "Tất cả" },
                    { value: "true", label: "Kết nối" },
                    { value: "false", label: "Mất kết nối" },
                  ]}
                />
              </Form.Item>
            </Form>
            <Form layout="vertical" className="ml-[300px]">
              <Form.Item label={<b>Từ khóa</b>}>
                <Input
                  suffix={<SearchOutlined />}
                  placeholder="Search"
                  value={searchKeyWord}
                  onChange={handleKeyWordChange}
                  style={{ marginLeft: 8, width: "267px" }}
                />
              </Form.Item>
            </Form>
          </Space>
        </div>
        <div className="flex justify-between ">
          <div className="">
            <Table
              columns={columns}
              dataSource={filteredData}
              bordered
              size="small"
              pagination={{ pageSize: 5 }}
            />
          </div>
          <Button className="btn__add">
            <PlusOutlined />
            <p onClick={handleAddDevice}>Thêm thiết bị</p>
          </Button>
        </div>
      </div>
    </Content>
  );
};

export default DevicePage;
