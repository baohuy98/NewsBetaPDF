import React, { Fragment, useEffect, useState } from "react";
import { Form, Modal } from "antd";
import { FaPlus } from "react-icons/fa6";
import { message } from "antd";
import Button from "@mui/material/Button";
import FormInput from "./FormInput";

const DialogAddTechnicalReportInfor = ({
  stock,
  onSubmitSuccess,
  getImgFromInput,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const warning = (text) => {
    messageApi.open({
      type: "warning",
      content: text,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button variant="contained" onClick={showModal}>
        Thêm hình và nhận định
      </Button>
      <Modal
        width={1600}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Đóng"
        footer={null}
      >
        <div className="h-[650px] ">
          <FormInput
            code={stock}
            getImgFromInput={getImgFromInput}
            handleOk={handleOk}
            onSubmitSuccess={onSubmitSuccess}
          />
        </div>
      </Modal>
    </>
  );
};

export default DialogAddTechnicalReportInfor;
