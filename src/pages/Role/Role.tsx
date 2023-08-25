import { Button, Input,  Table } from "antd";
import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header/HeaderPage";
import { SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchDataRole } from "../../redux/slice/roleSlice";
import { useNavigate } from "react-router-dom";
import { RoleType } from "../../interface";
import { fetchDataAccount } from "../../redux/slice/accountSlice";

const Role = () => {
  const items = [
    { label: "Cài đặt hệ thống", link: "/roles" },
    { label: "Quản lý vai trò" },
  ];
  const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "roleName",
    },
    {
      title: "Số người dùng",
      dataIndex: "",
      render: (record: RoleType) => {
        const numberOfUsers = accountData.filter((account) => account.role === record.roleName).length
        return <span>{numberOfUsers}</span>
      }
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: " ",
      render: (record: RoleType) => (
        <span className="underline underline-offset-1 text-[#4277FF] cursor-pointer" 
        onClick={() => navigate(`/role-add/${record.id}`)}>
          Cập nhật
        </span>
      ),
    },
  ];
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.roles.roles);
  const accountData = useAppSelector((state) => state.accounts.accounts)
  
  
  useEffect(() => {
    dispatch(fetchDataRole());
    dispatch(fetchDataAccount())
  }, [dispatch]);

  const filterData = data.filter((role) => {
    const isKeyword = searchKeyword === "" || role.roleName.toLowerCase().includes(searchKeyword.toLowerCase());
    return isKeyword;
  })
  return (
   
      <Content className="content__global">
        <HeaderPage breadcrumbItems={items} />
        <div className="mx-5 w-[80vw]">
          <div className="flex justify-between my-5">
            <div>
              <b className="text-[1.5rem] text-[#FF7506]">Danh sách vai trò</b>
            </div>
            <div className="flex flex-col w-1/6 mr-[10%]">
              <b>Từ khóa</b>
              <Input
                value={searchKeyword}
                onChange={handleKeywordChange}
                suffix={<SearchOutlined />}
                placeholder="Nhập từ khóa"
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
            <Button className="btn__add" onClick={() => navigate('/role-add')}>Thêm vai trò</Button>
          </div>
        </div>
      </Content>
  );
};

export default Role;
