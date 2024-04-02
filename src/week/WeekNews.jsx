import React, { useRef, useState } from "react";
import Page1Week from "./component/Page1/Page1Week";
import Page2Week from "./component/Page2/Page2Week";
import Page3Week from "./component/Page3/Page3Week";
import Page4Week from "./component/Page4/Page4Week";
import Page5Week from "./component/Page5/Page5Week";
import Page6Week from "./component/Page6/Page6Week";
import Page7Week from "./component/Page7/Page7Week";
import Page8Week from "./component/Page8/Page8Week";
import Page9Week from "./component/Page9/Page9Week";
import Page10Week from "./component/Page10/Page10Week";
import Page11Week from "./component/Page11/Page11Week";
import Page12Week from "./component/Page12/Page12Week";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import NavBar from "../app/component/NavBar";
import getTimeWeek from "../helper/getTimeWeek";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../Auth/thunk";

const weekDate = getTimeWeek();

const WeekNews = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("_il"))
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      dispatch(userLogoutAction());
      localStorage.setItem("_il", JSON.stringify(false));
      localStorage.removeItem("user");
    }
  };

  const onSubmitSuccess = () => {
    setIsLogin(JSON.parse(localStorage.getItem("_il")));
    setUser(JSON.parse(localStorage.getItem("user")));
  };
  const pageRefs = {
    page1: useRef(null),
    page2: useRef(null),
    page3: useRef(null),
    page4: useRef(null),
    page5: useRef(null),
    page6: useRef(null),
    page7: useRef(null),
    page8: useRef(null),
    page9: useRef(null),
    page10: useRef(null),
    page11: useRef(null),
    page12: useRef(null),
  };
  const generateImage = async (ref, height, width, dpi = 300) => {
    if (!ref.current) return null;
    const canvas = await html2canvas(ref.current, { width, height, scale: 2 });
    return canvas.toDataURL("image/png");
  };

  const generatePDF = async () => {
    const pdf = new jsPDF({ orientation: "p" });
    const img1 = await generateImage(pageRefs.page1, 1480, 800);
    const img2 = await generateImage(pageRefs.page2, 1480, 800);
    const img3 = await generateImage(pageRefs.page3, 1480, 800);
    const img4 = await generateImage(pageRefs.page4, 1480, 800);
    const img5 = await generateImage(pageRefs.page5, 1480, 800);
    const img6 = await generateImage(pageRefs.page6, 1480, 800);
    const img7 = await generateImage(pageRefs.page7, 1480, 800);
    const img8 = await generateImage(pageRefs.page8, 1480, 800);
    const img9 = await generateImage(pageRefs.page9, 800, 1480);
    const img10 = await generateImage(pageRefs.page10, 1480, 800);
    const img11 = await generateImage(pageRefs.page11, 1480, 800);
    const img12 = await generateImage(pageRefs.page12, 1480, 800);

    pdf.addImage(img1, "JPEG", 0, 0, 210, 391);
    pdf.addPage(null, "p");
    pdf.addImage(img2, "JPEG", 0, 0, 210, 391);
    pdf.addPage(null, "p");
    pdf.addImage(img3, "JPEG", 0, 0, 210, 391);
    pdf.addPage(null, "p");
    pdf.addImage(img4, "JPEG", 0, 0, 210, 391);
    pdf.addPage(null, "p");
    pdf.addImage(img5, "JPEG", 0, 0, 210, 391);
    pdf.addPage(null, "p");
    pdf.addImage(img6, "JPEG", 0, 0, 210, 391);
    pdf.addPage(null, "p");
    pdf.addImage(img7, "JPEG", 0, 0, 210, 391);
    pdf.addPage(null, "p");
    pdf.addImage(img8, "JPEG", 0, 0, 210, 391);
    pdf.addPage(null, "l");
    pdf.addImage(img9, "JPEG", 0, 0, 392, 211);
    // pdf.addPage(null, 'p')
    // pdf.addImage(img10, 'JPEG', 0, 0);
    // pdf.addPage(null, 'p')
    // pdf.addImage(img11, 'JPEG', 0, 0);
    pdf.addPage(null, "p");
    pdf.addImage(img12, "JPEG", 0, 0, 210, 391);

    pdf.save(`Baocaotuan${weekDate}.pdf`);
  };

  const downloadImages = async () => {
    const img1 = await generateImage(pageRefs.page1, 1121, 800);
    const img2 = await generateImage(pageRefs.page2, 1121, 800);
    const img3 = await generateImage(pageRefs.page3, 1121, 800);
    const img4 = await generateImage(pageRefs.page4, 1121, 800);
    const img5 = await generateImage(pageRefs.page5, 1121, 800);
    const img6 = await generateImage(pageRefs.page6, 1121, 800);
    const img7 = await generateImage(pageRefs.page7, 1121, 800);
    const img8 = await generateImage(pageRefs.page8, 1121, 800);
    const img9 = await generateImage(pageRefs.page9, 800, 1121);
    const img10 = await generateImage(pageRefs.page12, 1121, 800);

    const link1 = document.createElement("a");
    link1.href = img1;
    link1.download = "Baocaotuan-Trang1.png";
    link1.click();

    const link2 = document.createElement("a");
    link2.href = img2;
    link2.download = "Baocaotuan-Trang2.png";
    link2.click();

    const link3 = document.createElement("a");
    link3.href = img3;
    link3.download = "Baocaotuan-Trang3.png";
    link3.click();

    const link4 = document.createElement("a");
    link4.href = img4;
    link4.download = "Baocaotuan-Trang4.png";
    link4.click();

    const link5 = document.createElement("a");
    link5.href = img5;
    link5.download = "Baocaotuan-Trang5.png";
    link5.click();

    const link6 = document.createElement("a");
    link6.href = img6;
    link6.download = "Baocaotuan-Trang6.png";
    link6.click();

    const link7 = document.createElement("a");
    link7.href = img7;
    link7.download = "Baocaotuan-Trang7.png";
    link7.click();

    const link8 = document.createElement("a");
    link8.href = img8;
    link8.download = "Baocaotuan-Trang7.png";
    link8.click();

    const link9 = document.createElement("a");
    link9.href = img9;
    link9.download = "Baocaotuan-Trang7.png";
    link9.click();
    const link10 = document.createElement("a");
    link10.href = img10;
    link10.download = "Baocaotuan-Trang7.png";
    link10.click();
  };
  return (
    <div className="relative">
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
          <Page1Week />
        </div>
        <div ref={pageRefs.page2}>
          <Page2Week isLogin={isLogin} />
        </div>
        <div ref={pageRefs.page3}>
          <Page3Week isLogin={isLogin} />
        </div>
        <div ref={pageRefs.page4}>
          <Page4Week />
        </div>
        <div ref={pageRefs.page5}>
          <Page5Week />
        </div>
        <div ref={pageRefs.page6}>
          <Page6Week />
        </div>
        <div ref={pageRefs.page7}>
          <Page7Week isLogin={isLogin} />
        </div>
        <div ref={pageRefs.page8}>
          <Page8Week />
        </div>
        <div className="h-[1480px]" ref={pageRefs.page9}>
          <Page9Week />
        </div>
        {/* <div ref={pageRefs.page10}>
                    <Page10Week />
                </div>
                <div ref={pageRefs.page11}>
                    <Page11Week />
                </div> */}
        <div ref={pageRefs.page12}>
          <Page12Week />
        </div>
      </div>
      <div className="flex justify-evenly w-[50%] mb-5">
        <Button variant="contained" color="success" onClick={generatePDF}>
          Tạo PDF
        </Button>
        <Button variant="contained" color="success" onClick={downloadImages}>
          Tạo hình
        </Button>
      </div>
    </div>
  );
};

export default WeekNews;
