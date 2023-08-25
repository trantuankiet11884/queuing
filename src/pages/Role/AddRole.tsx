import { Button, Card, Checkbox, Col, Input,  Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import HeaderPage from "../../components/Header/HeaderPage";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addRole, updateRole } from "../../redux/slice/roleSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddRole = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isUpdate = !!id;
  const items = [
    { label: "Cài đặt hệ thống", link: "/roles" },
    { label: "Quản lý vai trò", link: "/roles" },
    { label: isUpdate ? "Cập nhật vai trò" : "Thêm vai trò" },
  ];
  // State to store form data
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [functionGroupA, setFunctionGroupA] = useState(false);
  const [functionGroupB, setFunctionGroupB] = useState(false);
  const [functionX, setFunctionX] = useState(false);
  const [functionY, setFunctionY] = useState(false);
  const [functionZ, setFunctionZ] = useState(false);

  const dispatch = useAppDispatch();
  const selectedRole = useAppSelector((state) =>
    state.roles.roles.find((role) => role.id === id)
  );

  const handleAddRole = async () => {
    
    const roleData = {
      roleName: roleName,
      description: description,
      functionGroupA: functionGroupA,
      functionGroupB: functionGroupB,
      functionX: functionX,
      functionY: functionY,
      functionZ: functionZ,
    };

    try {
      if (selectedRole) {
        await dispatch(updateRole({id, ...roleData}));
      } else {
        await dispatch(addRole(roleData));
      }
      navigate("/roles");
      console.log(roleData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(selectedRole);
    
    if (isUpdate && selectedRole) {
      setRoleName(selectedRole.roleName);
      setDescription(selectedRole.description);
      setFunctionGroupA(selectedRole.functionGroupA);
      setFunctionGroupB(selectedRole.functionGroupB);
      setFunctionX(selectedRole.functionX);
      setFunctionY(selectedRole.functionY);
      setFunctionZ(selectedRole.functionZ);
    }
    console.log(selectedRole?.functionX)
  }, [isUpdate, selectedRole]);
  // Update the checked functions when a checkbox is clicked
  const handleCheckboxChange = (value: any, setFunction: any) => {
    setFunction(value);
  };
  return (
    
      <Content className="content__global">
        <HeaderPage breadcrumbItems={items} />
        <div className="mx-5 w-[80vw]">
          <div className="my-5">
            <b className="text-[1.5rem] text-[#FF7506]">Danh sách vai trò</b>
          </div>
          <div>
            <Card>
              <div className="mb-3">
                <b>Thông tin vai trò</b>
              </div>
              <Row gutter={30}>
                <Col span={12}>
                  <div className="my-3">
                    <b>
                      Tên vai trò <span className="text-red-600">*</span>
                    </b>
                    <Input
                      placeholder="Nhập tên vai trò"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                    />
                  </div>
                  <div>
                    <b>Mô tả:</b>
                    <TextArea
                      placeholder="Nhập mô tả"
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <span>* là trường hợp bắt buộc</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <b>Phân quyền chức năng *</b>
                    <Card className="bg-[#fff2e7]">
                      <div>
                        <div className="mb-2">
                          <b className="text-[#FF7506]">Nhóm chức năng A</b>
                        </div>
                        <div>
                          <Checkbox
                            value={functionGroupA}
                            checked={functionGroupA}
                            onChange={(e) =>
                              handleCheckboxChange(
                                e.target.checked,
                                setFunctionGroupA
                              )
                            }
                          />
                          <span className="ml-2">Tất cả</span>
                        </div>
                        <div>
                          <Checkbox
                            value={functionX}
                            checked={functionX}
                            onChange={(e) =>
                              handleCheckboxChange(
                                e.target.checked,
                                setFunctionX
                              )
                            }
                          />
                          <span className="ml-2">Chức năng x</span>
                        </div>
                        <div>
                          <Checkbox
                            value={functionY}
                            checked={functionY}
                            onChange={(e) =>
                              handleCheckboxChange(
                                e.target.checked,
                                setFunctionY
                              )
                            }
                          />
                          <span className="ml-2">Chức năng y</span>
                        </div>
                        <div>
                          <Checkbox
                            value={functionZ}
                            checked={functionZ}
                            onChange={(e) =>
                              handleCheckboxChange(
                                e.target.checked,
                                setFunctionZ
                              )
                            }
                          />
                          <span className="ml-2">Chức năng z</span>
                        </div>
                      </div>
                      <div className="mt-5">
                        <div className="mb-2">
                          <b className="text-[#FF7506]">Nhóm chức năng B</b>
                        </div>
                        <div>
                          <Checkbox
                            value={functionGroupB}
                            onChange={(e) =>
                              handleCheckboxChange(
                                e.target.checked,
                                setFunctionGroupB
                              )
                            }
                          />
                          <span className="ml-2">Tất cả</span>
                        </div>
                        <div>
                          <Checkbox />
                          <span className="ml-2">Chức năng x</span>
                        </div>
                        <div>
                          <Checkbox />
                          <span className="ml-2">Chức năng y</span>
                        </div>
                        <div>
                          <Checkbox />
                          <span className="ml-2">Chức năng z</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
          <div className="flex justify-center">
            <Space>
              <Button className="btn__cancel w-[120px]">Hủy bỏ</Button>
              <Button className="btn__addd w-[120px]" onClick={handleAddRole}>
                {isUpdate ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </div>
        </div>
      </Content>
    
  );
};

export default AddRole;
