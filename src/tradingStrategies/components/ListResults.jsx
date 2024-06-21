import { Table } from "antd";
import React from "react";
import formatNumberCurrency from "../../helper/formatNumberCurrency";

const ListResults = ({ data }) => {
  const columns = [
    {
      title: "MA",
      dataindex: "name",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">{record.name}</div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Tổng hiệu suất sinh lời",
      dataindex: "total",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">
          {formatNumberCurrency(record.total * 100)}
        </div>
      ),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Tổng số lượng lệnh",
      dataindex: "count",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">{record.count}</div>
      ),
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Hiệu suất sinh lời max",
      dataindex: "max",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">
          {formatNumberCurrency(record.max * 100)}
        </div>
      ),
      sorter: (a, b) => a.max - b.max,
    },
    {
      title: "Hiệu suất sinh lời min",
      dataindex: "min",
      align: "center",
      render: (_, record) => (
        <div className="text-black text-right">
          {formatNumberCurrency(record.min * 100)}
        </div>
      ),
      sorter: (a, b) => a.min - b.min,
    },
    {
      title: "Hiệu suất sinh lời trung bình",
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-black text-right">
            {formatNumberCurrency((record.total / record.count) * 100)}
          </div>
        );
      },
      sorter: (a, b) => a.total / a.count - b.total / b.count,
    },
  ];
  return (
    <div className="mt-2">
      <Table
        showSorterTooltip={false}
        columns={columns}
        dataSource={data}
        pagination={{ defaultPageSize: 7, showSizeChanger: false }}
      />
    </div>
  );
};

export default ListResults;
