import html2canvas from 'html2canvas'
import React, { useRef } from 'react'
import jsPDF from 'jspdf'
import { currentDate } from '../helper/getDateAfternoonNew'
import { Button } from '@mui/material'
import AfternoonPage1 from './page1/AfternoonPage1'

const ReportAfternoon = () => {
    const pageRefs = {
        page1: useRef(null)
    }

    const generateImage = async (pageRefs, height) => {
        if (!pageRefs.current) return null
        const canvas = await html2canvas(pageRefs.current, { width: 800, height })
        return canvas.toDataURL('image/png')
    }
    const downloadImages = async () => {
        const img1 = await generateImage(pageRefs.page1, 1121)


        const link1 = document.createElement('a')
        link1.href = img1
        link1.download = 'BetaAfternoonNews-Trang1.png'
        link1.click()
    }

    const generatePDF = async () => {
        const pdf = new jsPDF()
        const img1 = await generateImage(pageRefs.page1, 1480)

        pdf.addImage(img1, 'PNG', 0, 0)
        pdf.addPage()

        pdf.save(`BetaAfternoonNews-${currentDate}.pdf`)
    }

    return (
        <div>
            <div>
                <div ref={pageRefs.page1}>
                    <AfternoonPage1 />
                </div>
            </div>
            <div className='flex justify-evenly w-[50%] mb-5'>
                <Button color="success" onClick={generatePDF} variant="contained">
                    Tạo PDF
                </Button>

                <Button color="success" onClick={downloadImages} variant="contained">
                    Tải ảnh
                </Button>

            </div>

        </div>
    )
}

export default ReportAfternoon