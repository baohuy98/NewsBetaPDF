import React, { useEffect, useRef, useState } from 'react';
import Page1 from './utils/Page1';
import Page2 from './utils/Page2';
import Page3 from './utils/Page3';
import Page4 from './utils/Page4';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { homNay } from './helper/getDate';
import { Button } from '@mui/material';
import Page5 from './utils/Page5';

const Home = () => {

    const pageRefs = {
        page1: useRef(null),
        page2: useRef(null),
        page3: useRef(null),
        page4: useRef(null),
        page5: useRef(null),
    };


    const generateImage = async (pageRef, height) => {
        if (!pageRef.current) return null;
        const canvas = await html2canvas(pageRef.current, { width: 800, height }); // Kích thước A4
        return canvas.toDataURL('image/png');
    };

    const downloadImages = async () => {
        const img1 = await generateImage(pageRefs.page1, 1121);
        const img2 = await generateImage(pageRefs.page2, 1121);
        const img3 = await generateImage(pageRefs.page3, 1121);
        const img4 = await generateImage(pageRefs.page4, 1121);
        const img5 = await generateImage(pageRefs.page5, 1121);

        const link1 = document.createElement('a');
        link1.href = img1;
        link1.download = 'BetaMorningNews-Trang1.png';
        link1.click();

        const link2 = document.createElement('a');
        link2.href = img2;
        link2.download = 'BetaMorningNews-Trang2.png';
        link2.click();

        const link3 = document.createElement('a');
        link3.href = img3;
        link3.download = 'BetaMorningNews-Trang3.png';
        link3.click();

        const link4 = document.createElement('a');
        link4.href = img4;
        link4.download = 'BetaMorningNews-Trang4.png';
        link4.click();

        const link5 = document.createElement('a');
        link5.href = img5;
        link5.download = 'BetaMorningNews-Trang5.png';
        link5.click();
    };



    const generatePDF = async () => {
        const pdf = new jsPDF();
        const img1 = await generateImage(pageRefs.page1, 1480);
        const img2 = await generateImage(pageRefs.page2, 1480);
        const img3 = await generateImage(pageRefs.page3, 1480);
        const img4 = await generateImage(pageRefs.page4, 1480);
        // const img5 = await generateImage(pageRefs.page5, 1480);

        pdf.addImage(img1, 'PNG', 0, 0);
        pdf.addPage();
        pdf.addImage(img2, 'PNG', 0, 0);
        pdf.addPage();
        pdf.addImage(img3, 'PNG', 0, 0);
        pdf.addPage();
        pdf.addImage(img4, 'PNG', 0, 0);
        // pdf.addPage();
        // pdf.addImage(img5, 'PNG', 0, 0);

        pdf.save(`BetaMorningNews-${homNay}.pdf`);
    };


    return (
        <div >

            <div>
                <div ref={pageRefs.page1}>
                    <Page1 />
                </div>
                <div ref={pageRefs.page2}>
                    <Page2 />
                </div>
                <div ref={pageRefs.page3}>
                    <Page3 />
                </div>
                <div ref={pageRefs.page4}>
                    <Page4 />
                </div>
                <div ref={pageRefs.page5}>
                    <Page5 />
                </div>
            </div>
            <div className='flex justify-evenly w-[50%] mb-5'>
                <Button color="success" onClick={generatePDF} variant="contained">
                    Tạo PDF
                </Button>

                <Button color="success" onClick={downloadImages} variant="contained">
                    Tải ảnh
                </Button>


                <Button color="primary" onClick={generatePDF} variant="contained">
                    Tạo PDF kết phiên sáng
                </Button>
                <Button color="primary" onClick={downloadImages} variant="contained">
                    Tải ảnh kết phiên sáng
                </Button>
            </div>
        </div>
    );
};

export default Home;
