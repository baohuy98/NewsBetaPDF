import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import formatNumber from "../helper/formatNumber";
import { getColorBaseOnValue } from "../helper/getColorBaseOnValue";

const getLineCorlor = (value) => {
  if (value > 0) return "#039B3B";
  if (value < 0) return "red";
};
const getArrow = (value) => {
  if (value < 0) return <FaArrowDownLong />;
  if (value > 0) return <FaArrowUpLong />;
};
const SplineChart = ({ data }) => {
  const dataRender = data.chart.map((item) => item.value);

  const chartOptions = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "spline",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    xAxis: {
      visible: false, // Ẩn trục x
    },
    yAxis: {
      title: "",
      plotLines: [
        {
          value: data.prevClosePrice,
          color: "gray",
          dashStyle: "dot", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 2,
          zIndex: 2,
          // label: {
          //     text: (data.prevClosePrice.toFixed(2)),
          //     align: 'right',
          //     x: 5,
          //     y: -10,
          //     zIndex: 10,
          //     style: {
          //         fontSize: '9px', // Chỉnh kích thước font size tại đây
          //         fontWeight: 'bold'
          //     },

          // },
        },
      ],
      gridLineWidth: 0, // Ẩn lưới của trục y
      labels: {
        enabled: true, // Ẩn giá trị của trục y
        style: {
          fontSize: "12px", // Chỉnh kích thước font chữ của giá trị
          fontWeight: "bold",
        },
      },
    },
    legend: {
      enabled: false, // Tắt legend
    },
    plotOptions: {
      series: {
        marker: {
          radius: 1, // Tắt marker
        },
        lineWidth: 2,
        color: getLineCorlor(data.change),
      },
    },
    series: [
      {
        name: "Dữ liệu",
        data: dataRender,
        zoneAxis: "y",
        zones: [
          {
            value: data.prevClosePrice, // Giá trị tách màu (nếu giá trị dưới 5 thì màu đỏ, còn trên 5 thì màu xanh)
            color: "red",
          },
          {
            color: "green",
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center    ">
      <h3 className="m-1 font-semibold text-[25px]">{data.code}</h3>
      <p
        className={`${getColorBaseOnValue(
          data.change
        )} font-semibold m-1 text-[25px]`}
      >
        {getArrow(data.change)}
        {formatNumber(data.closePrice)}{" "}
      </p>
      <p
        className={`${getColorBaseOnValue(
          data.perChange
        )} font-semibold m-1 text-[25px]`}
      >
        ({formatNumber(data.change)} | {formatNumber(data.perChange)}%)
      </p>
      <div className="h-[130px] w-[230px] grid place-items-center  ">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      </div>
    </div>
  );
};

export default SplineChart;
