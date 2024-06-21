import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Select, message } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";
import NavBar from "../app/component/NavBar";
import { getApi } from "../helper/getApi";
import ListResults from "./components/ListResults";
import Max from "./components/Max";
import "./utils/styles/cssDatePicker.css";

const apiUrl = process.env.REACT_APP_BASE_URL;

const TradingStrategies = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState([]);
  const [dataStocks, setDataStocks] = useState([]);
  const [stock, setStock] = useState("");

  const [fromDate, setFromDate] = useState(dayjs().subtract(1, "year"));
  const [toDate, setToDate] = useState(dayjs());

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      dispatch(userLogoutAction());
      localStorage.setItem("_il", "4E8WL");
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem("_il"));
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    document.title = "Chiến lược giao dịch";
  }, []);

  useEffect(() => {
    const fetchDataStock = async () => {
      try {
        const data = await getApi(apiUrl, "/api/v1/investment/all-stock");
        setDataStocks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataStock();
  }, []);

  const filterOption = (input, option) =>
    (option?.value || "").toLowerCase().includes(input.toLowerCase()) ||
    (option?.label || "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    setStock(value);
  };

  const warning = (type, text) => {
    messageApi.open({
      type,
      content: text,
    });
  };

  const fetchData = async () => {
    if (stock === "") {
      warning("warning", "Hãy nhập mã cổ phiếu");
    } else {
      try {
        const data = await getApi(
          apiUrl,
          `/api/v1/investment/test?stock=${stock}&from=${dayjs(fromDate).format(
            "YYYY-MM-DD"
          )}&to=${dayjs(toDate).format("YYYY-MM-DD")}`
        );
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="relative">
      {contextHolder}
      <div className="absolute right-[10%] top-[1%]">
        <NavBar
          isLogin={isLogin}
          user={user}
          handleUserLogout={handleUserLogout}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
      <div className="px-[40px] py-[40px] font-[Roboto]">
        <div className="bg-gradient-to-r from-[#0669fcff] to-[#011e48ff] md:w-[410px] sm:w-[345px] h-[40px] rounded-[20px] uppercase text-[#ffba07] font-bold text-[20px] flex flex-col text-center items-center justify-center">
          Chiến lược giao dịch
        </div>

        <div className="mt-5">
          <div className="flex items-center">
            <div>
              <Select
                style={{
                  width: 246,
                  height: 56,
                }}
                defaultValue={stock}
                showSearch
                onChange={onChange}
                filterOption={filterOption}
                options={dataStocks.map((code) => ({
                  value: code,
                  label: code,
                }))}
              />
            </div>
            <div className="ml-8">
              <DatePicker
                format="DD/MM/YYYY"
                margin="normal"
                disableFuture
                formatDate={(date) => moment(date).format("DD/MM/YYYY")}
                value={fromDate}
                onChange={(newValue) => {
                  setFromDate(newValue);
                }}
              />
            </div>
            <div className="ml-8">
              <DatePicker
                format="DD/MM/YYYY"
                margin="normal"
                disableFuture
                formatDate={(date) => moment(date).format("DD/MM/YYYY")}
                value={toDate}
                onChange={(newValue) => {
                  setToDate(newValue);
                }}
              />
            </div>
            <div className="ml-8">
              <Button variant="contained" onClick={fetchData}>
                <span className="normal-case text-[15px] font-semibold">
                  Tìm kiếm
                </span>
              </Button>
            </div>
          </div>

          <div className="mt-5">
            Max:
            <Max data={data.max} />
          </div>
          <div className="mt-5">
            Kết quả:
            <ListResults data={data.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingStrategies;
