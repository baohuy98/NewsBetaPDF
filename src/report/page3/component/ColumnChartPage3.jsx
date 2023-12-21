import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ColumnChartPage3 = ({ data, title, unit }) => {
    const max = Math?.ceil(Math?.max(...data?.map(item => (item.value / 1000000000))));
    const min = Math?.floor(Math?.min(...data?.map(item => (item.value / 1000000000))))
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "column",
            backgroundColor: "transparent",
        },
        title: {
            useHTML: true,
            text: `<div style=" text-align: center" >
                    <p style="color: #00429B; font-size: 14px; font-weight: bold;margin: 0px">${title}</p>
                    <span style="color: #000; font-size: 10px; font-weight: bold;">ĐVT: ${unit}</span>
            </div>`
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: true,
            title: {
                text: '',
            },
            labels: {
                enabled: false,
                style: {
                    fontSize: '10px',
                    fontWeight: 'bold'
                }
            },
            opposite: true,
            gridLineWidth: 1,
            max,
            min,
            tickInterval: 300
        },
        series: [
            {
                name: '',
                data: data.map(item => (item.value / 1000000000)),
                color: '#1B68BB'
            },

        ],
        legend: {
            enabled: false, // Tắt legend
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}', // Hiển thị giá trị trên cột với 1 số thập phân
                    style: {
                        color: '#000',
                        fontSize: '8px',
                        fontWeight: 'bold',
                        textOutline: '1px contrast' // Tạo viền cho văn bản để nổi bật trên nền đen
                    }
                }
            }
        },
    };

    return (
        <div className='h-[180px]'>
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
        </div>
    )
}

export default ColumnChartPage3