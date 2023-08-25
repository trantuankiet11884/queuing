import { Badge, Button, Input, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header/HeaderPage";
import { SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchDataAccount } from "../../redux/slice/accountSlice";
import { fetchDataRole } from "../../redux/slice/roleSlice";
import { Option } from "antd/es/mentions";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const items = [
    { label: "Cài đặt hệ thống", link: "/accounts" },
    { label: "Quản lý tài khoản" },
  ];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.accounts.accounts);
  const dataRole = useAppSelector((state) => state.roles.roles);

  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
  };

  const filterData = data.filter((account) => {
    const isRoleMatch =
      roleFilter === null ||
      roleFilter === "null" ||
      account.role === roleFilter;
    const isKeywordMatch =
      searchKeyword === "" ||
      account.fullName.toLowerCase().includes(searchKeyword.toLowerCase());
    return isRoleMatch && isKeywordMatch;
  });
  useEffect(() => {
    dispatch(fetchDataAccount());
    dispatch(fetchDataRole());
  }, [dispatch]);

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "status",
      render: (status: any) =>
        status ? (
          <>
            <Badge color="green" />
            <span className="ml-2">Hoạt động</span>
          </>
        ) : (
          <>
            <Badge color="red" />
            <span className="ml-2">Ngưng hoạt động</span>
          </>
        ),
    },
  ];
  return (
    <Content className="content__global">
      <HeaderPage breadcrumbItems={items} />
      <div className="mx-5 w-[80vw]">
        <div className="my-5">
          <b className="text-[1.5rem] text-[#FF7506]">Danh sách tài khoản</b>
        </div>
        <div className="flex justify-between my-3">
          <div className="flex flex-col">
            <b>Tên vai trò</b>
            <Select
              className="w-[200px]"
              defaultValue="null"
              onChange={handleRoleFilterChange}
            >
              <Option value="null">Tất cả</Option>
              {dataRole.map((item) => (
                <Option key={item.id} value={item.roleName}>
                  {item.roleName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col mr-[10%]">
            <b>Từ khóa</b>
            <Input
              suffix={<SearchOutlined />}
              onChange={handleKeywordChange}
              value={searchKeyword}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-[90%]">
            <Table
              columns={columns}
              dataSource={filterData}
              bordered
              size="small"
              pagination={{pageSize: 5}}
            />
          </div>
          <div>
            <Button
              className="btn__add"
              onClick={() => navigate("/account-add")}
            >
              Thêm tài khoản
            </Button>
          </div>
        </div>
      </div>
    </Content>  
  );
};

export default Account;
