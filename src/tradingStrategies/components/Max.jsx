import { Table } from "antd";
import React from "react";
import formatNumberCurrency from "../../helper/formatNumberCurrency";

const Max = ({ data }) => {
  return (
    <div className="mt-2">
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-[16px] bg-[#fafafa] text-center text-black text-opacity-[88] font-medium text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">MA</th>
              <th className="p-[16px] bg-[#fafafa] text-center text-black text-opacity-[88] font-medium text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">Tổng hiệu suất sinh lời</th>
              <th className="p-[16px] bg-[#fafafa] text-center text-black text-opacity-[88] font-medium text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">Tổng số lượng lệnh</th>
              <th className="p-[16px] bg-[#fafafa] text-center text-black text-opacity-[88] font-medium text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">Hiệu suất sinh lời max</th>
              <th className="p-[16px] bg-[#fafafa] text-center text-black text-opacity-[88] font-medium text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">Hiệu suất sinh lời min</th>
              <th className="p-[16px] bg-[#fafafa] text-center text-black text-opacity-[88] font-medium text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">Hiệu suất sinh lời trung bình</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              <tr>
                <td className="p-[16px] text-right text-black text-opacity-[88] text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">{data.name}</td>
                <td className="p-[16px] text-right text-black text-opacity-[88] text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">{formatNumberCurrency(data.total * 100)}</td>
                <td className="p-[16px] text-right text-black text-opacity-[88] text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">{data.count}</td>
                <td className="p-[16px] text-right text-black text-opacity-[88] text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">{formatNumberCurrency(data.max * 100)}</td>
                <td className="p-[16px] text-right text-black text-opacity-[88] text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">{formatNumberCurrency(data.min * 100)}</td>
                <td className="p-[16px] text-right text-black text-opacity-[88] text-[14px] border-b-[1px] border-solid border-[#f0f0f0] border-x-0 border-t-0">{formatNumberCurrency(data.total / data.count * 100)}</td>
              </tr>
            ) : (
              <tr>
                <td className="p-[16px]" colspan="6">
                  <div className="my-[32px] mx-[8px] text-center text-[14px] leading-[1.5714285714285714] ">
                    <div class="h-[40px] mb-[8px]">
                      <svg
                        width="64"
                        height="41"
                        viewBox="0 0 64 41"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          transform="translate(0 1)"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <ellipse
                            fill="#f5f5f5"
                            cx="32"
                            cy="33"
                            rx="32"
                            ry="7"
                          ></ellipse>
                          <g fill-rule="nonzero" stroke="#d9d9d9">
                            <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                            <path
                              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                              fill="#fafafa"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div class="text-black text-opacity-25">No data</div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Max;
