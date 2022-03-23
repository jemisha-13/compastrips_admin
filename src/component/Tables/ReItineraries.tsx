import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { ApiGet } from '../../helper/API/ApiData';
import Buttons from '../Buttons/Buttons'

function ReItineraries() {
    
    // const LatestSet = [
    //     {
    //         Country: "대한민국",
    //         Region: "지역",
    //         TourTitle: "경국사에서 템플스테이",
    //         RegDate: "YYYY-MM-DD HH:MM",            
    //     },

    //     {
    //         Country: "대한민국",
    //         Region: "지역",
    //         TourTitle: "경국사에서 템플스테이",
    //         RegDate: "YYYY-MM-DD HH:MM",
    //     },
    // ];

    interface LatestSet {
        Country: string,
        Region: string,
        TourTitle: string,
        RegDate: Date,
        Id: string,
    }

    const [tableData, setTableData] = useState<LatestSet[]>([])
    const history = useHistory();


    useEffect(() => {
        ApiGet('admin/itinerary?flag=true')
        .then((res:any)=> {
            console.log("res",res);
            
            setTableData(res.data.map((x: any) => {
                return {
                    Country: x.country ,
                    Region: x.region,
                    TourTitle: x.title,
                    RegDate: x.created_at.slice(0, 10) + " " + x.created_at.slice(11, 16),
                    Id: x.id,
                }
            }))
        })
    }, [])


    

    const viewMore = () => {
        // console.log('Latest settlement pending')
        history.push('/itinerary-management')

    }
    
    return (
        <>
        <Col xl={6} className="mt-md-5">
            <Row className="mt-4 mt-md-0 align-items-center">
                <Col md={9}>
                    <h5 className="font-27-bold text-left">최근 등록된 일정</h5>
                </Col>
                <Col md={3} className="text-md-right">
                    <Buttons type="" ButtonStyle="dash-bg-pink" onClick={() => { viewMore() }}> 더보기 </Buttons>
                </Col>
            </Row>
            <Col className="p-0">
            <div className="overflow-table">
                <table className="dashtable mt-3 custom-table-border">
                    <tr className="font-18-bold">
                        <th>국가</th>
                        <th>지역</th>
                        <th>여행 제목</th>
                        <th>등록 일시</th>
                    </tr>

                    {tableData && tableData.map(item => {
                        return (
                            <tr className="font-16-bold" key={item.Id}>
                                <td>{item.Country}</td>
                                <td>{item.Region}</td>
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

export default ReItineraries
