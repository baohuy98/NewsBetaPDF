import { LoadingButton } from "@mui/lab";
import { IconButton, TextField } from "@mui/material";
import { Modal } from "antd";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { postApi } from "../../helper/postApi";

const apiUrl = process.env.REACT_APP_BASE_URL;

export default ({ params, setData }) => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState();
  const [loading, setLoading] = useState(false)

  const showModal = (data) => {
    setIsModalEditOpen(true);
    setDataEdit(data);
  };

  const handleEditOk = async () => {
    setIsModalEditOpen(false);
  };

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const handleDelete = (code) => {
    // Sử dụng SweetAlert để xác nhận việc xóa
    Swal.fire({
      title: `Bạn chắc chắn muốn xóa mã ${code}?`,
      text: "Thao tác này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Xác nhận xóa tin và cập nhật state
        await postApi(apiUrl, "/api/v1/investment/delete-beta-watch-list", {
          code,
        });
        setData((prev) => {
          const newData = [...prev].filter(item => item.code != code)
          return newData
        })
      }
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const price_2024 = e.target[2]?.value || 0
    const price_2025 = e.target[4]?.value || 0
    try {
        const res = await postApi(apiUrl, '/api/v1/investment/update-beta-watch-list', {
            code: e.target[0].value,
            price_2024,
            price_2025,
            ma: e.target[6]?.value || 0,
            is_beta_page: 1
        })
        setData((prev) => {
            const thisItem = prev.find((item) => item.code == e.target[0].value)
            const newP2024 = parseFloat(((price_2024 - thisItem.closePrice) / thisItem.closePrice * 100).toFixed(2))
            const newP2025 = parseFloat(((price_2025 - thisItem.closePrice) / thisItem.closePrice * 100).toFixed(2))

            const index = prev.findIndex((item) => item.code == e.target[0].value)
            const newData = [...prev]

            newData[index] = {
                ...thisItem,
                price_2024: parseFloat(parseFloat(price_2024).toFixed(2)),
                price_2025: parseFloat(parseFloat(price_2025).toFixed(2)),
                p_2024: newP2024,
                p_2025: newP2025,
                name: `MA_${e.target[6]?.value}`,
                ma: parseFloat((res.data[0].ma / 1000).toFixed(2)),
                total: parseFloat((res.data[0].total * 100).toFixed(2)),
                signal: res.data[0].signal == 0 ? 'MUA' : res.data[0].signal == 1 ? 'BÁN' : res.data[0].signal == 2 ? 'Hold mua' : 'Hold bán'
            }
            return newData
        })
        setLoading(false)
    } catch (e) {
        setLoading(false)
        console.error(e);
    }
  }

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="Edit"
        onClick={() => showModal(params.data)}
      >
        <MdEdit />
      </IconButton>
      <IconButton
        color="secondary"
        aria-label="Delete"
        onClick={() => handleDelete(params.data.code)}
      >
        <MdDelete />
      </IconButton>
      <Modal
        centered
        width={500}
        open={isModalEditOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer={null}
        className="edit-conditions"
      >
        <div className="m-[15px]">
          <form onSubmitCapture={handleSubmitEdit}>
            <TextField defaultValue={dataEdit?.code} disabled label="Mã" fullWidth className="!mb-[20px]" />
            <TextField defaultValue={dataEdit?.price_2024} label="Giá mục tiêu 2024" fullWidth className="!mb-[20px]" />
            <TextField defaultValue={dataEdit?.price_2025} label="Giá mục tiêu 2025" fullWidth className="!mb-[20px]" />
            <TextField defaultValue={dataEdit?.name.slice(3)} label="MA" fullWidth className="!mb-[20px]" />
            <LoadingButton variant="contained" type="submit" fullWidth loading={loading}>Chỉnh sửa</LoadingButton>
          </form>
        </div>
      </Modal>
    </div>
  );
};
