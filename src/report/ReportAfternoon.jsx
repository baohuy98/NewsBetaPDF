import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import { Button } from "@mui/material";
import AfternoonPage1 from "./page1/AfternoonPage1";
import AfternoonPage2 from "./page2/AfternoonPage2";
import AfternoonPage3 from "./page3/AfternoonPage3";
import AfternoonPage4 from "./page4/AfternoonPage4";
import AfternoonPage5 from "./page5/AfternoonPage5";
import { formattedDate } from "../helper/getDateAfternoon";
import NavBar from "../app/component/NavBar";
import AfternoonPage6 from "./page6/AfternoonPage6";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";

const ReportAfternoon = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [role, setRole] = useState(localStorage.getItem("2ZW79"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      dispatch(userLogoutAction());
      localStorage.setItem("_il", "4E8WL");
      localStorage.removeItem("2ZW79");
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(localStorage.getItem("_il"));
    setRole(localStorage.getItem("2ZW79"));
    setUser(JSON.parse(localStorage.getItem("user")));
  };
  const pageRefs = {
    page1: useRef(null),
    page2: useRef(null),
    page3: useRef(null),
    page4: useRef(null),
    page5: useRef(null),
    page6: useRef(null),
  };

  const generateImage = async (pageRefs, height) => {
    if (!pageRefs.current) return null;
    const canvas = await html2canvas(pageRefs.current, {
      width: 800,
      height,
      scale: 2,
    });
    return canvas.toDataURL("image/png");
  };
  const downloadImages = async () => {
    const img1 = await generateImage(pageRefs.page1, 1121);
    const img2 = await generateImage(pageRefs.page2, 1121);
    const img3 = await generateImage(pageRefs.page3, 1121);
    const img4 = await generateImage(pageRefs.page4, 1121);
    const img6 = await generateImage(pageRefs.page6, 1121);
    const img5 = await generateImage(pageRefs.page5, 1121);
    const link1 = document.createElement("a");
    link1.href = img1;
    link1.download = "BetaAfternoonNews-Trang1.png";
    link1.click();

    const link2 = document.createElement("a");
    link2.href = img2;
    link2.download = "BetaAfternoonNews-Trang2.png";
    link2.click();

    const link3 = document.createElement("a");
    link3.href = img3;
    link3.download = "BetaAfternoonNews-Trang3.png";
    link3.click();

    const link4 = document.createElement("a");
    link4.href = img4;
    link4.download = "BetaAfternoonNews-Trang4.png";
    link4.click();
    const link5 = document.createElement("a");
    link5.href = img5;
    link5.download = "BetaAfternoonNews-Trang6.png";
    link5.click();
    const link6 = document.createElement("a");
    link6.href = img6;
    link6.download = "BetaAfternoonNews-Trang5.png";
    link6.click();
  };

  const generatePDF = async () => {
    const pdf = new jsPDF();
    const img1 = await generateImage(pageRefs.page1, 1480);
    const img2 = await generateImage(pageRefs.page2, 1480);
    const img3 = await generateImage(pageRefs.page3, 1480);
    const img4 = await generateImage(pageRefs.page4, 1480);
    const img6 = await generateImage(pageRefs.page6, 1480);
    const img5 = await generateImage(pageRefs.page5, 1480);

    pdf.addImage(img1, "PNG", 0, 0, 210, 390); //385
    pdf.addPage();
    pdf.addImage(img2, "PNG", 0, 0, 210, 392);
    pdf.addPage();
    pdf.addImage(img3, "PNG", 0, 0, 210, 392);
    pdf.addPage();
    pdf.addImage(img4, "PNG", 0, 0, 210, 392);
    pdf.addPage();
    pdf.addImage(img6, "PNG", 0, 0, 210, 404);
    pdf.addPage();
    pdf.addImage(img5, "PNG", 0, 0, 210, 392);

    pdf.save(`${formattedDate}.dailyreport.pdf`);
  };

  return (
    <div className=" relative">
      <div className="absolute right-[10%] top-[35px]">
        <NavBar
          isLogin={isLogin}
          user={user}
          handleUserLogout={handleUserLogout}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
      <div>
        <div ref={pageRefs.page1}>
          <AfternoonPage1 role={role} />
        </div>
        <div ref={pageRefs.page2}>
          <AfternoonPage2 role={role} />
        </div>
        <div ref={pageRefs.page3}>
          <AfternoonPage3 />
        </div>
        <div ref={pageRefs.page4}>
          <AfternoonPage4 role={role} />
        </div>
        <div ref={pageRefs.page6}>
          <AfternoonPage6 />
        </div>
        <div ref={pageRefs.page5}>
          <AfternoonPage5 />
        </div>
      </div>
      <div className="flex justify-evenly w-[50%] mb-5">
        <Button color="success" onClick={generatePDF} variant="contained">
          Tạo PDF
        </Button>

        <Button color="success" onClick={downloadImages} variant="contained">
          Tải ảnh
        </Button>
      </div>
    </div>
  );
};

export default ReportAfternoon;
