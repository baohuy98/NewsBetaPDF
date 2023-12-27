import React, { useEffect, useState } from 'react'
import HeaderAfternoon from '../utils/component/HeaderAfternoon'
import FooterAfternoon from '../utils/component/FooterAfternoon'
import { https } from '../../services/configService'
import { getColorBaseOnValue } from '../../helper/getColorBaseOnValue'
import formatNumber from '../../helper/formatNumber'
import DialogNews from '../../component/DialogNews'

const AfternoonPage4 = () => {
    const [rate, setRate] = useState()
    const [interestRate, setInterestRate] = useState()
    const [goodsPrice, setGoodsPrice] = useState()
    const [newsForeign, setNewsForeign] = useState(
        []
    );
    const [newsDomestic, setNewsDomestic] = useState(
        []
    );
    const [newsEnterprise, setNewsEnterprise] = useState(
        []
    );
    const [events, setEvents] = useState();
    useEffect(() => {
        const fetchDataEvent = async () => {
            try {
                const response = await https.get("api/v1/report/lich-su-kien");
                setEvents(response.data.data);
            } catch (err) { }
        };

        fetchDataEvent();
    }, []);
    useEffect(() => {
        const fetchDataRate = async () => {
            try {
                const response = await https.get('api/v1/report/ty-gia')
                setRate(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }

        const fetchDataInterestRate = async () => {
            try {
                const response = await https.get('/api/v1/report/lai-suat')
                setInterestRate(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }



        const fetchDataGoodsPrice = async () => {
            try {
                const response = await https.get('/api/v1/report/hang-hoa')
                setGoodsPrice(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }



        fetchDataRate()
        fetchDataInterestRate()
        fetchDataGoodsPrice()
    }, [])

    const handleCatchDataNews = (arrNews, type) => {
        if (type === "trong-nuoc") {
            setNewsDomestic(arrNews);
        } else if (type === "quoc-te") {
            setNewsForeign(arrNews);
        } else if (type === "doanh-nghiep") {
            setNewsEnterprise(arrNews);
        }
    };
    return (
        <div className='h-[1480px] w-[800px]'>
            <div className='header'>

                <HeaderAfternoon />
            </div>


            <div className='content h-[900px] w-full flex flex-col items-center '>

                <div className='w-[95%] translate-x-[-13px]  '>
                    <div className='content w-[760px] mt-2 '>
                        <div className='content-top flex  justify-center translate-x-[-10px]  '>

                            <div className='content-top_left w-[235px]'>

                                <div className="absolute z-[-2] translate-x-2 ">
                                    <div className="skew-x-[35deg] flex translate-y-[1px]">
                                        <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                        <div className="w-[195px] bg-[#9CC9FE] h-[12px]"></div>
                                    </div>
                                    <div className="skew-x-[-35deg] flex">
                                        <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                        <div className="w-[195px] bg-[#9CC9FE] h-[12px]"></div>
                                    </div>
                                </div>

                                <h2 className='text-[12px] font-bold text-[#000] w-full text-center my-1 '>Tỷ giá</h2>
                                <table className='bg-transparent border-collapse h-[297px] mt-2   '>
                                    <thead className='bg-[#0155B7]  text-[12px]  border border-[#0155B7] border-solid border-collapse'>
                                        <tr className='text-white '>
                                            <th className='font-semibold px-1 py-1 text-[px] '>Ngoại tệ</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>Thị giá</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>%D</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>%1M</th>
                                            <th className='font-semibold px-1 py-1  text-[px]'>%YtD</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border border-[#0155B7] border-solid border-collapse ">
                                        {rate?.slice(0, 7)?.map(item => {
                                            return (
                                                <tr>
                                                    <td className='text-center  font-bold flex items-center text-[12px] h-full'>
                                                        <div className='flex items-center justify-evenly'>
                                                            <img src={`/${item.code}.png`} alt="icon" width={20} height={20} />
                                                            <p className='m-0'>
                                                                {item.code}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className='text-center  text-[12px] px-1'>{formatNumber(item.price)}</td>
                                                    <td className={`${getColorBaseOnValue(item.day)} text-[12px] text-center px-1 `}>{(item.day).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.month)} text-[12px] text-center px-1 `}>{(item.month).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.year)} text-[12px] text-center px-1 `}>{(item.year).toFixed(2)}</td>
                                                </tr>
                                            )
                                        }
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className='content-top_mid w-[260px] translate-x-[-9px] '>

                                <div className="absolute z-[-2] translate-x-2 ">
                                    <div className="skew-x-[35deg] flex translate-y-[1px]">
                                        <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                        <div className="w-[235px] bg-[#9CC9FE] h-[12px]"></div>
                                    </div>
                                    <div className="skew-x-[-35deg] flex">
                                        <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                        <div className="w-[235px] bg-[#9CC9FE] h-[12px]"></div>
                                    </div>
                                </div>
                                <h2 className='text-[12px] font-bold text-[#000] text-center my-1 w-full'>Lãi suất bình quân liên ngân hàng</h2>
                                <table className='bg-transparent border-collapse h-[297px] w-full mt-2  '>
                                    <thead className='bg-[#0155B7]  text-[12px]  border border-[#0155B7] border-solid border-collapse'>
                                        <tr className='text-white  '>
                                            <th className='font-semibold px-1 py-1 text-[10px] ' >Kỳ hạn</th>
                                            <th className='font-semibold px-1 py-1 text-[10px] ' >Mức lãi suất</th>
                                            <th className='font-semibold px-1 py-1 text-[10px] ' >%D</th>
                                            <th className='font-semibold px-1 py-1 text-[10px] ' >%1M</th>
                                            <th className='font-semibold px-1 py-1  text-[10px]' >%YtD</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border border-[#0155B7] border-solid border-collapse ">
                                        {interestRate?.map(item => {
                                            return (
                                                <tr>
                                                    <td className='text-center font-bold  items-center text-[12px] w-[60px] ' >
                                                        {item.code}
                                                    </td>
                                                    <td className='text-center  text-[12px] px-1  '>{formatNumber(item.price)}</td>
                                                    <td className={`${getColorBaseOnValue(item.day)} text-[12px] text-center  px-1 `}>{(item.day).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.month)} text-[12px] text-center px-1  `}>{(item.month).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.year)} text-[12px] text-center  px-2 `}>{(item.year).toFixed(2)}</td>
                                                </tr>
                                            )
                                        }
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className='content-top_right w-[235px] '>
                                <div className="absolute z-[-2] translate-x-2 ">
                                    <div className="skew-x-[35deg] flex translate-y-[1px]">
                                        <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                        <div className="w-[250px] bg-[#9CC9FE] h-[12px]"></div>
                                    </div>
                                    <div className="skew-x-[-35deg] flex">
                                        <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                        <div className="w-[250px] bg-[#9CC9FE] h-[12px]"></div>
                                    </div>
                                </div>
                                <h2 className='text-[12px] font-bold text-[#000] text-center w-full m-1'>Giá hàng hóa</h2>
                                <table className='bg-transparent border-collapse  mt-2 h-[297px] '>
                                    <thead className='bg-[#0155B7]  text-[12px]  border border-[#0155B7] border-solid border-collapse'>
                                        <tr className='text-white '>
                                            <th className='font-semibold px-1 py-1 text-[px] '>Hàng hóa</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>Thị giá</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>%D</th>
                                            <th className='font-semibold px-1 py-1 text-[px] '>%1M</th>
                                            <th className='font-semibold px-1 py-1  text-[px]'>%YtD</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border border-[#0155B7] border-solid border-collapse ">
                                        {goodsPrice?.slice(0, 7).map(item => {
                                            return (
                                                <tr>
                                                    <td className='text-center px-2 py-1 font-bold  items-center text-[12px]' >
                                                        {item.name}
                                                    </td>
                                                    <td className='text-center px-2 py-1 text-[12px] '>{formatNumber(item.price)}</td>
                                                    <td className={`${getColorBaseOnValue(item.day)} text-[12px] text-center px-1 py-1`}>{(item.day).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.month)} text-[12px] text-center px-1 py-1`}>{(item.month).toFixed(2)}</td>
                                                    <td className={`${getColorBaseOnValue(item.year)} text-[12px] text-center px-1 py-1`}>{(item.year).toFixed(2)}</td>
                                                </tr>
                                            )
                                        }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className='content-mid relative'>
                            <div className='absolute top-0 right-0 translate-x-[400px] flex flex-col justify-around h-[150px]'>
                                <DialogNews
                                    handleCatchDataNews={handleCatchDataNews}
                                    type={"quốc tế"}
                                    query={"quoc-te"}
                                    idQuery={0}
                                />
                                <DialogNews
                                    handleCatchDataNews={handleCatchDataNews}
                                    type={"trong nước"}
                                    query={"trong-nuoc"}
                                    idQuery={1}
                                />
                                <DialogNews
                                    handleCatchDataNews={handleCatchDataNews}
                                    type={"doanh nghiệp"}
                                    query={"doanh-nghiep"}
                                    idQuery={2}
                                />
                            </div>
                            <div className="content-top w-[790px] h-[250px] z-10 relative mt-5  ">
                                <div className={` flex justify-around w-full h-[80%]  `}>
                                    <div className="content-top_left w-[45%]  ">
                                        <div className="absolute z-[-2] translate-x-[58px] translate-y-1 ">
                                            <div className="skew-x-[35deg] flex translate-y-[1px]">
                                                <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                                <div className="w-[270px] bg-[#9CC9FE] h-[12px]"></div>
                                            </div>
                                            <div className="skew-x-[-35deg] flex">
                                                <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                                <div className="w-[270px] bg-[#9CC9FE] h-[12px]"></div>
                                            </div>
                                        </div>

                                        <h2 className="titile font-[800] text-[12px] translate-x-[15px] text-[#000] text-center  my-2 m-0 ">
                                            TIN QUỐC TẾ
                                        </h2>
                                        {newsForeign.length > 0 ? (
                                            <div className="newsForeign ">
                                                <ul className='my-0'>
                                                    {newsForeign?.map((item) => (
                                                        <li className="text-[14px] font-semibold mt-2 ">
                                                            <span className="line-clamp-2">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className="text-center mt-10 font-semibold">
                                                Vui lòng chọn tin tức....
                                            </p>
                                        )}
                                    </div>
                                    <div className="content-top_right w-[45%]   mr-5 ">

                                        <div className="absolute z-[-2] translate-x-[40px] translate-y-1 ">
                                            <div className="skew-x-[35deg] flex translate-y-[1px]">
                                                <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                                <div className="w-[280px] bg-[#9CC9FE] h-[12px]"></div>
                                            </div>
                                            <div className="skew-x-[-35deg] flex">
                                                <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                                <div className="w-[280px] bg-[#9CC9FE] h-[12px]"></div>
                                            </div>
                                        </div>
                                        <h2 className="titile font-[800] text-[12px] text-[#000] text-center  my-2 m-0 ">
                                            TIN TRONG NƯỚC
                                        </h2>
                                        {newsDomestic.length > 0 ? (
                                            <div className="newsDomestic ">
                                                <ul className='my-0'>
                                                    {newsDomestic?.map((item) => (
                                                        <li className="text-[14px] font-semibold mt-2">
                                                            <span className="line-clamp-2">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className="text-center mt-10 font-semibold">
                                                Vui lòng chọn tin tức....
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='content-bot flex justify-around mt-2'>

                            <div className="content-bot_left  w-[45%] ml-3 ">
                                <div className="absolute z-[-2] translate-x-[40px] translate-y-1 ">
                                    <div className="skew-x-[35deg] flex translate-y-[1px]">
                                        <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                        <div className="w-[270px] bg-[#9CC9FE] h-[12px]"></div>
                                    </div>
                                    <div className="skew-x-[-35deg] flex">
                                        <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                        <div className="w-[270px] bg-[#9CC9FE] h-[12px]"></div>
                                    </div>
                                </div>
                                <h2 className="titile font-[800] text-[12px] text-[#000]  text-center  my-2 m-0">
                                    LỊCH SỰ KIỆN
                                </h2>
                                <div className="events">
                                    <table className=" bg-transparent border border-[#0155B7]  border-solid border-collapse  ">
                                        <thead className="text-black border border-[#0155B7]  border-solid border-collapse  ">
                                            <tr>
                                                <th className=" font-semibold text-[12px] leading-8 text-center  w-[60px] border border-[#0155B7] border-y-0  border-solid border-collapse    ">
                                                    Mã CP
                                                </th>
                                                <th className=" font-semibold text-[12px] leading-8 text-center border border-[#0155B7] border-y-0  border-solid border-collapse  ">
                                                    Ngày GDKHQ
                                                </th>
                                                <th className=" font-semibold text-[12px]  leading-8 text-center border border-[#0155B7] border-y-0  border-solid border-collapse   ">
                                                    Nội dung
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className=" ">
                                            {events?.slice(0, 8)?.map((item) => (
                                                <tr className=''>
                                                    <td className="text-[12px] font-bold text-center py-1  px-2 border border-[#0155B7] border-y-0  border-solid border-collapse ">
                                                        {item.ticker}
                                                    </td>
                                                    <td className="text-[12px] font-bold text-center py-1  px-2 border border-[#0155B7] border-y-0  border-solid border-collapse  ">
                                                        {item.date}
                                                    </td>
                                                    <td className="text-[12px] font-semibold  px-2 border border-[#0155B7] border-y-0  border-solid border-collapse  ">
                                                        {item.title}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="content-bot_left h-full w-[45%]  ">
                                <div className="absolute z-[-2] translate-x-[40px] translate-y-1 ">
                                    <div className="skew-x-[35deg] flex translate-y-[1px]">
                                        <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                        <div className="w-[280px] bg-[#9CC9FE] h-[12px]"></div>
                                    </div>
                                    <div className="skew-x-[-35deg] flex">
                                        <div className="bg-[#FFB243] h-[12px] w-[10px] "></div>
                                        <div className="w-[280px] bg-[#9CC9FE] h-[12px]"></div>
                                    </div>
                                </div>
                                <h2 className="titile font-[800] text-[12px] text-[#000] text-center translate-x-[10px]  my-2 m-0">
                                    TIN DOANH NGHIỆP
                                </h2>
                                {newsEnterprise.length > 0 ? (
                                    <div className="newsEnterpise">
                                        <ul>
                                            {newsEnterprise?.map((item) => {
                                                const parts = item.split(":");
                                                let beforeColon = "";
                                                let afterColon = "";
                                                // Kiểm tra xem có đúng một dấu ':' trong chuỗi hay không
                                                if (parts.length === 2) {
                                                    // Phần trước dấu ':' (trim() để loại bỏ khoảng trắng thừa)
                                                    beforeColon = parts[0].trim();

                                                    // Phần sau dấu ':' (trim() để loại bỏ khoảng trắng ở đầu và cuối)
                                                    afterColon = parts[1].trim();

                                                } else {
                                                    console.log("Không tìm thấy dấu : trong chuỗi.");
                                                }
                                                return (
                                                    <li className="mb-1 ">
                                                        <span className="text-[12px] text-[#064BAD] font-bold">
                                                            {beforeColon}:{" "}
                                                        </span>
                                                        <span className="text-[12px] font-semibold  ">
                                                            {afterColon}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-center mt-10 font-semibold">
                                        Vui lòng chọn tin tức....
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div className='footer mt-[92px]'>
                <FooterAfternoon pageNum={4} />
            </div>
        </div>
    )
}

export default AfternoonPage4