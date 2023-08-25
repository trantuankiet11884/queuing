import React from "react";
import { Row, Card, Typography, Space } from "antd";

import { CalendarOutlined } from "@ant-design/icons";
import "./dbcontent.css";
import { useAppSelector } from "../../../redux/hooks";
import ChartPage from "./ChartContent";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const DashboardContent: React.FC = () => {
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.numbers.numbers);

  const sttWait = data.filter((item) => item.status === "Đang chờ").length;
  const sttUsage = data.filter((item) => item.status === "Đã sử dụng").length;
  const sttSkip = data.filter((item) => item.status === "Bỏ qua").length;
  console.log(sttUsage);
  // Tạo một đối tượng Map để theo dõi số cấp số theo ngày
  const countsByDate = new Map();

  // Lặp qua dữ liệu để tính số cấp số theo ngày
  data.forEach((item) => {
    const date = item.fromDate;
    if (countsByDate.has(date)) {
      countsByDate.set(date, countsByDate.get(date) + 1);
    } else {
      countsByDate.set(date, 1);
    }
  });

  // Tạo mảng dữ liệu cho biểu đồ từ đối tượng Map
  const chartData = Array.from(countsByDate, ([x, y]) => ({ x, y }));

  return (
    <>
      <div>
        <Space direction="vertical">
          <Row style={{ minHeight: "70px" }} align={"middle"}>
            <Title level={5} style={{ margin: "0 24px", color: "#ff9138" }}>
              Dashboard
            </Title>
          </Row>
          <Row>
            <Title level={4} style={{ margin: "0 24px", color: "#ff9138" }}>
              Biểu đồ cấp số
            </Title>
          </Row>
        </Space>

        <div className="flex">
          <Space>
            <Card
              className="content-card__container cursor-pointer ml-5"
              onClick={() =>
                navigate("/numbers", {
                  state: {
                    filter: "Bỏ qua",
                  },
                })
              }
            >
              <div className="content-card__title">
                <div className="content-card__icon">
                  <CalendarOutlined className="card-icon" />
                </div>
                <div className="content-card__text">Số thứ tự đã bỏ qua</div>
              </div>
              <div className="flex">
                <div className="card-percent__number">{sttSkip}</div>
              </div>
            </Card>
            <Card
              className="content-card__container cursor-pointer"
              onClick={() =>
                navigate("/numbers", {
                  state: {
                    filter: "Đã sử dụng",
                  },
                })
              }
            >
              <div className="content-card__title">
                <div className="content-card__icon">
                  <CalendarOutlined className="card-icon" />
                </div>
                <div className="content-card__text">Số thứ tự đã sử dụng</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="card-percent__number">{sttUsage}</div>
              </div>
            </Card>
            <Card
              className="content-card__container cursor-pointer"
              onClick={() =>
                navigate("/numbers", {
                  state: {
                    filter: "Đang chờ",
                  },
                })
              }
            >
              <div className="content-card__title">
                <div className="content-card__icon">
                  <CalendarOutlined className="card-icon" />
                </div>
                <div className="content-card__text">Số thứ tự đang chờ</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="card-percent__number">{sttWait}</div>
              </div>
            </Card>
            <Card
              className="content-card__container cursor-pointer"
              onClick={() =>
                navigate("/numbers", {
                  state: {
                    filter: "Bỏ qua",
                  },
                })
              }
              style={{ opacity: "0" }}
            >
              <div className="content-card__title">
                <div className="content-card__icon">
                  <CalendarOutlined className="card-icon" />
                </div>
                <div className="content-card__text">Số thứ tự đã bỏ qua</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="card-percent__number">{sttSkip}</div>
              </div>
            </Card>
          </Space>
        </div>
      </div>
      <Card className="mx-5 mt-5">
        <ChartPage data={chartData} />
      </Card>
    </>
  );
};

export default DashboardContent;
