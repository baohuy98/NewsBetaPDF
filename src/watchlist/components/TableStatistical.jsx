import { Slider } from "@mui/material";
import { Table, Tooltip } from "antd";
import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import formatNumberCurrency from "../../helper/formatNumberCurrency";
import { getColorBaseOnValue } from "../../helper/getColorBaseOnValue";

const TableStatistical = ({ data, handleDelCodeInWatchlist, loadingTb }) => {
  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      // Dòng lẻ màu trắng
      return "bg-white";
    } else {
      // Dòng chẵn màu #d9e9fd
      return "bg-[#d9e9fd] ";
    }
  };

  const columns = [
    {
      title: "Mã CP",
      dataindex: "code",
      fixed: true,
      width: 200,
      align: "center",
      render: (_, record) => {
        return (
          <div className={`font-bold text-lg flex flex-row items-center`}>
            <IoIosCloseCircle
              className="text-[#dcdcdd] w-[20px] h-[20px] mr-2 cursor-pointer hover:text-red-500"
              onClick={() => handleDelCodeInWatchlist(record.code)}
            />
            <Tooltip
              placement="left"
              title={
                <span className="">Click vào mã cổ phiếu để xem báo cáo</span>
              }
              color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
            >
              <a
                className="text-[#0D4381] cursor-pointer no-underline hover:text-[#0164F8]"
                href={`/phan-tich-ky-thuat-tu-dong/${record.code}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {record.code}
              </a>
            </Tooltip>
          </div>
        );
      },
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Thị giá (đồng)",
      dataindex: "closePrice",
      width: 150,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`text-right ${getColorBaseOnValue(record.perChange)}`}
          >
            {formatNumberCurrency(record.closePrice * 1000)}
          </div>
        );
      },
      sorter: (a, b) => a.closePrice - b.closePrice,
    },
    {
      title: "%D",
      dataindex: "perChange",
      width: 70,
      align: "center",
      render: (_, record) => {
        return (
          <div
            className={`text-right ${getColorBaseOnValue(record.perChange)}`}
          >
            {formatNumberCurrency(record.perChange)}
          </div>
        );
      },
      sorter: (a, b) => a.perChange - b.perChange,
    },
    {
      title: "KLGD (CP)",
      dataindex: "totalVol",
      width: 130,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.totalVol)}
          </div>
        );
      },
      sorter: (a, b) => a.totalVol - b.totalVol,
    },
    {
      title: "GTGD (tỷ đồng)",
      dataindex: "totalVal",
      width: 160,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.totalVal / 1000000000)}
          </div>
        );
      },
      sorter: (a, b) => a.totalVal - b.totalVal,
    },
    {
      title: "%W",
      dataindex: "",
      width: 150,
      align: "center",
      render: (_, record) => {
        return <div className="text-black text-right"></div>;
      },
      // sorter: (a, b) => a.totalVal - b.totalVal,
    },
    {
      title: "%M",
      dataindex: "",
      width: 150,
      align: "center",
      render: (_, record) => {
        return <div className="text-black text-right"></div>;
      },
      // sorter: (a, b) => a.totalVal - b.totalVal,
    },
    {
      title: "%YtD",
      dataindex: "",
      width: 150,
      align: "center",
      render: (_, record) => {
        return <div className="text-black text-right"></div>;
      },
      // sorter: (a, b) => a.totalVal - b.totalVal,
    },
    {
      title: "%YoY",
      dataindex: "",
      width: 150,
      align: "center",
      render: (_, record) => {
        return <div className="text-black text-right"></div>;
      },
      // sorter: (a, b) => a.totalVal - b.totalVal,
    },
    {
      title: "Khối lượng NN mua/bán ròng (CP)",
      dataindex: "buyVol",
      width: 190,
      align: "center",
      render: (_, record) => {
        return (
          <div className={`text-right ${getColorBaseOnValue(record.buyVol)}`}>
            {formatNumberCurrency(record.buyVol)}
          </div>
        );
      },
      sorter: (a, b) => a.buyVol - b.buyVol,
    },
    {
      title: (
        <span>
          Giá trị NN <br /> mua/bán ròng (tỷ đồng)
        </span>
      ),
      dataindex: "buyVal",
      width: 220,
      align: "center",
      render: (_, record) => {
        return (
          <div className={`text-right ${getColorBaseOnValue(record.buyVal)}`}>
            {formatNumberCurrency(record.buyVal / 1000000000)}
          </div>
        );
      },
      sorter: (a, b) => a.buyVal - b.buyVal,
    },
    {
      title: "Vốn hóa (tỷ đồng)",
      dataindex: "marketCap",
      width: 180,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.marketCap / 1000000000)}
          </div>
        );
      },
      sorter: (a, b) => a.marketCap - b.marketCap,
    },
    {
      title: "KL Mua chủ động (CP) (M)",
      dataindex: "Mua",
      width: 180,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.Mua)}
          </div>
        );
      },
      sorter: (a, b) => a.Mua - b.Mua,
    },
    {
      title: "KL Bán chủ động (CP) (B)",
      dataindex: "Ban",
      width: 170,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.Ban)}
          </div>
        );
      },
      sorter: (a, b) => a.Ban - b.Ban,
    },
    {
      title: "M/B",
      dataindex: "MB",
      width: 70,
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency(record.MB)}
          </div>
        );
      },
      sorter: (a, b) => a.MB - b.MB,
    },
    {
      title: "Biến động 52 tuần",
      width: 165,
      align: "center",
      render: (_, record) => {
        const lowestPrice = +record.PRICE_LOWEST_CR_52W.toFixed(2);
        const highestPrice = +record.PRICE_HIGHEST_CR_52W.toFixed(2);
        const isHighestPrice = record.closePrice === highestPrice;

        const thumbColor = isHighestPrice ? "#3dcc91" : "#137ab9";
        const borderTopColor = isHighestPrice ? "#3dcc91" : "#137ab9";

        return (
          <div className="w-[120px] h-[28px] -translate-y-[5px] translate-x-[7px]">
            <Slider
              disabled
              value={record.closePrice}
              min={lowestPrice}
              max={highestPrice}
              track={false}
              marks={[
                { value: lowestPrice, label: lowestPrice },
                { value: highestPrice, label: highestPrice },
              ]}
              sx={{
                "& .MuiSlider-markLabel": {
                  fontSize: "11px", // Kích thước chữ
                  top: "20px",
                },
                "& .MuiSlider-thumb": {
                  width: "2px",
                  height: "4px",
                  backgroundColor: thumbColor,
                  borderRadius: 0,
                },
                "& .MuiSlider-thumb::after": {
                  width: "0px",
                  height: "0px",
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: `4px solid ${borderTopColor}`,
                  borderRadius: 0,
                  top: "-2.5px",
                  left: "1px",
                },
                "& .MuiSlider-root": {
                  padding: "0px 0px",
                },
              }}
            />
          </div>
        );
      },
    },
    {
      title: "beta",
      dataindex: "",
      width: 150,
      align: "center",
      render: (_, record) => {
        return <div className="text-black text-right"></div>;
      },
      // sorter: (a, b) => a.buyVal - b.buyVal,
    },
  ];

  return (
    <div>
      {Array.isArray(data) && data?.length > 0 ? (
        <div className="table-data-watchlist w-[1840px]">
          <Table
            loading={loadingTb}
            showSorterTooltip={false}
            scroll={{ x: 2000 }}
            columns={columns}
            dataSource={data}
            rowClassName={rowClassName}
            pagination={{ defaultPageSize: 15, showSizeChanger: false }}
          />
        </div>
      ) : (
        <div className="grid place-content-center h-[710px] font-medium text-lg">
          <div className="flex flex-col justify-center items-center bg-[#D6EBFF] bg-opacity-70 w-[1064px] h-[394px] border-solid border-[#0669FC] border-opacity-20 rounded-[25px]">
            <div className="p-7">Chưa có mã chứng khoán nào</div>
            <div>Bạn hãy thêm mã chứng khoán vào watchlist để theo dõi.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableStatistical;