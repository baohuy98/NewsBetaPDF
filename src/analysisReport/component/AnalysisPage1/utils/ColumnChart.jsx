import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

const StackColumnChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({});
  const categories = data.map((item) => moment(item.date).format("DD/MM"));
  const buys = data.map((item) => item.buy);
  const sells = data.map((item) => item.sell);
  const maxValues = data.map((item) => item.buy + item.sell);
  const maxTotal = Math.max(...maxValues);

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
      tickInterval: Math.ceil(categories?.length / 6),
      tickPositioner: function () {
        const tickPositions = [];
        const interval = Math.ceil(categories?.length / 5);

        for (let i = 0; i < categories.length; i += interval) {
          tickPositions.push(i);
        }
        if (categories.length - 1 !== tickPositions[tickPositions.length - 1]) {
          tickPositions.push(categories.length - 1);
        }
        return tickPositions;
      },
      labels: {
        style: {
          fontSize: "10px",
        },
      },
    },
    yAxis: {
      min: 0,
      max: maxTotal,
      title: {
        text: "",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    legend: {
      enabled: true,
      verticalAlign: "top", // Đặt legend ở trên
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
      },
      itemMarginTop: 0, // Khoảng cách giữa các mục trong legend
      symbolRadius: 0, // Kích thước của marker trong legend
      labelFormatter: function () {
        return (
          '<span style="font-size: 12px; font-weight: bold; color: #333333">' +
          this.name +
          "</span>"
        );
      },
    },
    series: [
      {
        name: "Mua chủ động",
        data: buys,
        color: "green",
      },
      {
        name: "Bán chủ động",
        data: sells,
        color: "red",
      },
    ],
  };

  return (
    <div className="h-[150px] translate-y-[-5px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};

export default StackColumnChart;
