import React from "react";
import { Row, Avatar, Popover, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

import bell from "../../assets/bell.svg";

const AvatarPage = () => {
  const navigate = useNavigate();
  const userAccountString = localStorage.getItem("userAccount");
  const userAccount = userAccountString ? JSON.parse(userAccountString) : {};
  const numberData = useAppSelector((state) => state.numbers.numbers);

  const text = (
    <div className="flex items-center bg-[orange] text-white h-10">
      <span className="mx-3">Thông báo</span>
    </div>
  );

  const content = (
    <>
      <div className="w-[280px] h-[300px] overflow-y-scroll ">
        {numberData.map((item) => (
          <div
            className="hover:bg-[#fff2e7] mx-3 cursor-pointer"
            onClick={() => navigate(`/number-details/${item.id}`)}
          >
            <p className="text-[#d7925a]">Người dùng: {item.customerName}</p>
            <p>Thời gian cấp số: {item.fromDate}</p>
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
  return (
    <>
      <Row className=" flex justify-center my-[10px]">
        <div className="flex items-center">
          <Popover
            placement="bottom"
            title={text}
            content={content}
            trigger={"click"}
          >
            <img src={bell} alt="icon bell" className="mr-5 cursor-pointer" />
          </Popover>
          <Avatar
            src={userAccount?.imageUrl}
            size={35}
            onClick={() => navigate("/profile")}
            className="cursor-pointer"
          />

          <div style={{ margin: "0 10px" }}>
            <p className="txt__hi">Xin chào</p>
            <p className="txt__name">{userAccount?.fullName}</p>
          </div>
        </div>
      </Row>
    </>
  );
};

export default AvatarPage;
