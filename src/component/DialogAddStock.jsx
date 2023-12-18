import React, { Fragment, useState } from "react";
import { Modal } from "antd";
import InputFormBuy from "./utils/InputFormBuy";
import { FaPlus } from "react-icons/fa6";
import InputFormSell from "./utils/InputFormSell";
import { message } from "antd";
import Button from "@mui/material/Button";

const DialogAddStock = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [components, setComponents] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [arrStock, setArrStock] = useState({
        stock_buy: [],
        stock_sell: []
    })
    const catchStockInput = (stock) => {
    }
    const warning = (text) => {
        messageApi.open({
            type: "warning",
            content: text,
        });
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addComponent = (type) => {
        if (components.length < 4) {
            const newComponent =
                type === "buy" ? (
                    <InputFormBuy key={components.length} />
                ) : (
                    <InputFormSell key={components.length} />
                );
            setComponents((prevComponents) => [...prevComponents, newComponent]);
        } else {
            warning("Tối đa 4 mã");
        }
    };
    const removeComponent = (index) => {
        const updatedComponents = [...components];
        updatedComponents.splice(index, 1);
        setComponents(updatedComponents);
    };

    return (
        <>
            {contextHolder}
            <Button variant="contained" onClick={showModal}>
                Thêm cổ phiếu khuyến nghị
            </Button>
            <Modal
                width={1600}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="w-full grid place-items-center">
                    <div className="flex justify-evenly w-[30%] ">
                        <div>
                            <Button onClick={() => addComponent("buy")}>
                                <FaPlus />
                                <span className="ml-2">Mua</span>
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => addComponent("sell")}>
                                <FaPlus />
                                <span className="ml-2">Bán</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex  mt-5 ">
                    {components.map((component, index) => (
                        <Fragment key={index} >
                            <div>
                                <Button onClick={() => removeComponent(index)} variant="outlined" color="warning" >x</Button>
                            </div>
                            {component}

                        </Fragment>
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default DialogAddStock;