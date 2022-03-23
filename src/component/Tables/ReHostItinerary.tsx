import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { ApiGet } from '../../helper/API/ApiData'
import Buttons from '../Buttons/Buttons'

function ReHostItinerary() {
    const history = useHistory();
    // const LatestSet = [];
        // {
        //     Name: "이재영",
        //     NickName: "jaeyojae",
        //     TourTitle: "경국사에서 템플스테이",
        //     RegDate: "YYYY.MM.DD HH:MM",
            
        // },

        // {
        //     Name: "윤정한",
        //     NickName: "hanihae",
        //     TourTitle: "경국사에서 템플스테이",
        //     RegDate: "YYYY-MM-DD HH:MM",
        // },

        interface LatestSet {
                Name: string,
                NickName: string,
                TourTitle: string,
                RegDate: Date,
                Id: string,
            }

        const [tableData, setTableData] = useState<LatestSet[]>([])

        useEffect(() => {
            ApiGet('admin/hosting')
            .then((res:any)=> {                
                setTableData(res.data.map((x: any) => {
                    return {
                        Name: x.user.first_name+" "+x.user.last_name ,
                        NickName: x.user.user_name,
                        TourTitle: x.itinerary.title,
                        RegDate: x.created_at.slice(0, 10) + " " + x.created_at.slice(11, 16),
                        Id: x.id,
                    }
                }))
            })
        }, [])


    const recentHostBtn = () => {
        history.push('/hosted-itinery')
    }


    
    return (
        
        <>
        <Col xl={6} className="mt-md-5">
        <Row className="mt-4 mt-md-0 align-items-center">
                <Col md={9}>
                    <h5 className="font-27-bold text-left">최근 호스팅 여행 일정</h5>
                </Col>
                <Col md={3} className="text-md-right">
                    <Buttons type="" ButtonStyle="dash-bg-pink" onClick={() => { recentHostBtn() }}> 더보기 </Buttons>
                </Col>
            </Row>
            <Col className="p-0">
            <div className="overflow-table">
                <table className="dashtable mt-3 custom-table-border">
                    <tr className="font-18-bold">
                        <th>이름</th>
                        <th>닉네임</th>
                        <th>닉네임</th>
                        <th>등록 일시</th>
                    </tr>

                    {tableData.map((item) => {
                        return (
                            <tr className="font-16-bold" key={item.Id}>
                                <td>{item.Name}</td>
                                <td>{item.NickName}</td>
                                <td>{item.TourTitle}</td>
                                <td>{item.RegDate}</td>
                               
                            </tr>
                        )
                        }
                        )
                    }
                </table>
            
            </div>
            </Col>
        </Col>  
        </>
    )
}

export default ReHostItinerary
