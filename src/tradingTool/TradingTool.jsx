import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk.js";
import NavBar from "../app/component/NavBar.jsx";
import { getApi } from "../helper/getApi.js";
import socket from "../helper/socket.js";
import ActionComponents from "./components/ActionComponents.jsx";
import DetailComponents from "./components/DetailComponents.jsx";
import "./utils/styles/styles.css";
import { Button, TextField } from "@mui/material";
import { Modal } from "antd";
import { postApi } from "../helper/postApi.js";
import { LoadingButton } from "@mui/lab";

const apiUrl = process.env.REACT_APP_BASE_URL;
const flashClass = {
  up: "custom-flash-up",
  down: "custom-flash-down",
  ref: "custom-flash-ref",
};

const getColor = (item) => {
  let color = "";
  if (item === 0) color = "text-yellow-500";
  else if (item < 0) color = "text-red-500";
  else color = "text-green-500";

  return color;
};

const TradingTool = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [role, setRole] = useState(localStorage.getItem("2ZW79"));

  const [socketConnected, setSocketConnected] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState();

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
      window.location.href = "/";
      localStorage.setItem("_il", "4E8WL");
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem("_il"));
    setRole(localStorage.getItem("2ZW79"));
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    document.title = "TradingTool";
  }, []);

  const getDataTable = async () => {
    const data = await getApi(apiUrl, `/api/v1/investment/beta-watch-list`);
    const dataWithKey = Array.isArray(data) && data?.map((item, index) => {
        const closePrice = parseFloat((item.closePrice / 1000).toFixed(2));
        const p_2024 = item.price_2024 ? parseFloat((((item.price_2024 - closePrice) / closePrice) * 100).toFixed(2)) : 0;
        const p_2025 = item.price_2025 ? parseFloat((((item.price_2025 - closePrice) / closePrice) * 100).toFixed(2)) : 0;

        return {
          ...item,
          key: index,
          id: item.code,
          closePrice,
          signal_text: item.signal == 0 ? "MUA" : item.signal == 1 ? "BÁN" : item.signal == 2 ? "Hold mua" : "Hold bán",
          total: parseFloat((item.total * 100).toFixed(2)),
          price_2024: parseFloat(item.price_2024.toFixed(2)),
          price_2025: parseFloat(item.price_2025.toFixed(2)),
          p_2024,
          p_2025,
          ma: parseFloat((item.ma / 1000).toFixed(2)),
          change: parseFloat((((item.closePrice - item.closePricePrev) / item.closePricePrev) * 100 ).toFixed(2)),
          perChange: parseFloat((((item.closePrice - item.closePricePrev) / item.closePricePrev) * 100).toFixed(2)) + "%",
        };
      });
    setData(dataWithKey);
    setSocketConnected(true);
  };

  useEffect(() => {
    getDataTable();
  }, []);

  const gridRef = useRef();

  const columnDefs = [
    { headerName: "Mã", field: "code", cellRenderer: DetailComponents, cellClass: (params) =>  getColor(params.data.change)},
    { headerName: "Giá", field: "closePrice", cellClass: (params) =>  getColor(params.data.change) },
    { headerName: "+/-", field: "change", cellClass: (params) =>  getColor(params.data.change) },
    { headerName: "Giá mục tiêu 2024", field: "price_2024", },
    { headerName: "Tiềm năng tăng giá 2024 (%)", field: "p_2024", },
    { headerName: "Giá mục tiêu 2025", field: "price_2025", },
    { headerName: "Tiềm năng tăng giá 2025 (%)", field: "p_2025", },
    { headerName: "MA", field: "name", },
    { headerName: "Giá trị MA", field: "ma", },
    { headerName: "Hiệu suất sinh lời theo MA (%)", field: "total", },
    { headerName: "Tín hiệu", field: "signal_text", cellClass: (params) =>  params.value == 'MUA' ? 'text-green-500' : (params.value == 'BÁN' ? 'text-red-500' : (params.value == 'Hold mua' ? 'text-green-500' : 'text-red-500'))},
    { headerName: "", field: "actions", cellRenderer: (params)=> <ActionComponents params={params} setData={setData}/> },
  ];

  const defaultColDef = useMemo(() => {
    return {
        autoSizeStrategy: {
            type: 'fitCellContents'
        },
        flex: 1,
        resizable: false,
        enableCellChangeFlash: true,
        suppressMovable: true,
    };
  }, []);

  const getRowId = useCallback((params) => {
    return params.data.id;
  }, []);

  useEffect(() => { 
    if (socketConnected && data?.length > 0) {
      socket.on(`listen-ma-co-phieu`, (newData) => {
        const item = data.find(item => item.code == newData[0].code)

        const closePrice = parseFloat(item.closePrice.toFixed(2));
        const newClosePrice = parseFloat((newData[0].closePrice / 1000).toFixed(2));
        const closePricePrev = parseFloat((item.closePricePrev / 1000).toFixed(2));
        const change = parseFloat(((newClosePrice - closePricePrev) / closePricePrev * 100).toFixed(2))

        if (closePrice !== newClosePrice) {
          const newItem = {
            ...item,
            closePrice: newClosePrice,
            ma: parseFloat((newData[0].ma / 1000).toFixed(2)),
            signal: newData[0].signal == 0 ? 'MUA' : newData[0].signal == 1 ? 'BÁN' : newData[0].signal == 2 ? 'Hold mua' : 'Hold bán',
            p_2024: item.price_2024 ? parseFloat(((item.price_2024 - newClosePrice) / newClosePrice * 100).toFixed(2)) : 0,
            p_2025: item.price_2025 ? parseFloat(((item.price_2025 - newClosePrice) / newClosePrice * 100).toFixed(2)) : 0,
            total: parseFloat((newData[0].total * 100).toFixed(2)),
            change,
            perChange: change + '%'
          };

          const rowNode = gridRef?.current?.api?.getRowNode(newItem.code);

          if (rowNode) {
            const updateColumnData = (colId, newValue, flashClass, newItem) => {
              const rowElement = document.querySelector(`[row-id="${newItem.code}"]`);
              const cellElement = rowElement?.querySelector(`[col-id="${colId}"]`);

              const oldValue = rowNode.data[colId];

              if (colId === 'signal_text') {
                if (newItem.signal_text !== oldValue) {
                  if (newItem.signal === 0 || newItem.signal === 2) {
                    cellElement?.classList.add(flashClass.up);
                  } else {
                    cellElement?.classList.add(flashClass.down);
                  }
                }
              } else {
                if (oldValue < newValue) {
                  cellElement?.classList.add(flashClass.up);
                } else if (oldValue > newValue) {
                  cellElement?.classList.add(flashClass.down);
                } else {
                  cellElement?.classList.add(flashClass.ref);
                }
              }

              rowNode.setDataValue(colId, newValue);

              setTimeout(() => {
                cellElement?.classList.remove(
                  flashClass.up,
                  flashClass.down,
                  flashClass.ref
                );
              }, 500);
            };

            updateColumnData("closePrice", newItem.closePrice, flashClass, newItem);
            updateColumnData("change", newItem.change, flashClass, newItem);
            updateColumnData("p_2024", newItem.p_2024, flashClass, newItem);
            updateColumnData("p_2025", newItem.p_2025, flashClass, newItem);
            updateColumnData("ma", newItem.ma, flashClass, newItem);
            updateColumnData("total", newItem.total, flashClass, newItem);
            updateColumnData("signal_text", newItem.signal_text, flashClass, newItem);}
        }
      });
    }

    return () => {
      socket.off(`listen-ma-co-phieu`);
    };
  }, [socketConnected, data]);
  
  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };

  const handleAddOk = async () => {
    setIsModalAddOpen(false);
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };
  
  const handleSubmitCreate = async (e) => {
        e.preventDefault()
        setLoading(true)
        const code = e.target[0].value.toUpperCase()
        const price_2024 = e.target[2].value
        const price_2025 = e.target[4].value
        try {
            const res = await postApi(apiUrl, '/api/v1/investment/create-beta-watch-list', {
                code,
                price_2024,
                price_2025,
                ma: e.target[6]?.value || 0,
                is_beta_page: 1
            })

            const closePrice = parseFloat((res.data[0].closePrice / 1000).toFixed(2))
            const newP2024 = parseFloat(((price_2024 - closePrice) / closePrice * 100).toFixed(2))
            const newP2025 = parseFloat(((price_2025 - closePrice) / closePrice * 100).toFixed(2))

            setData((prev) => {
                const newData = [...prev, {
                    ...res.data[0],
                    change: parseFloat((((res.data[0].closePrice - res.data[0].closePricePrev) / res.data[0].closePricePrev) * 100 ).toFixed(2)),
                    closePrice,
                    price_2024:Number(price_2024), 
                    price_2025:Number(price_2025),
                    p_2024: newP2024,
                    p_2025: newP2025,
                    ma: parseFloat((res.data[0].ma / 1000).toFixed(2)),
                    total: parseFloat((res.data[0].total * 100).toFixed(2)),
                    id: code,
                    name: res.data[0].name,
                    signal_text: res.data[0].signal == 0 ? 'MUA' : res.data[0].signal == 1 ? 'BÁN' : res.data[0].signal == 2 ? 'Hold mua' : 'Hold bán',
                }]
                return newData
            })
            setLoading(false)
            setIsModalAddOpen(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
  }

  return (
    <div className="relative">
      <div className="absolute right-[10%] top-[1%]">
        <NavBar
          isLogin={isLogin}
          user={user}
          role={role}
          handleUserLogout={handleUserLogout}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
      
      <div className="w-full h-[919px] p-[40px]">
        <div className="flex justify-start content-center mb-[15px]">
            <div>
                <Button onClick={showModalAdd}>Thêm mã</Button>
            </div>
        </div>
        <div className="w-full h-[787px]">
          <div className="example-wrapper">
            <div className={"ag-theme-quartz w-full h-full"}>
              <AgGridReact
                ref={gridRef}
                rowData={data}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                getRowId={getRowId}
                suppressRowHoverHighlight={true}
                animateRows={true}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        width={500}
        open={isModalAddOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        footer={null}
        className="detail-conditions"
      >
        <div className="h-fit m-[15px]">
          <form onSubmit={handleSubmitCreate}>
            <TextField label="Mã" fullWidth className="!mb-[20px]" />
            <TextField label="Giá mục tiêu 2024" fullWidth className="!mb-[20px]" />
            <TextField label="Giá mục tiêu 2025" fullWidth className="!mb-[20px]" />
            <TextField label="MA" fullWidth className="!mb-[20px]" />
            <LoadingButton variant="contained" type="submit" fullWidth loading={loading}>Thêm mã</LoadingButton>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TradingTool;
