import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { ApiGet } from '../../helper/API/ApiData'

function TotalUserCount() {

    const [data, setData] = useState({
        allUser: 0,
        hostedItineraries: 0,
        hostingUsers: 0,
        totalItinerary: 0,
        totalTourcourse: 0,
    })

    useEffect(() => {
        ApiGet('admin/number')
            .then((res: any) => {
                setData(res.data) 
            })
    }, [])

    return (
        <>
            <Container fluid >
                <Row className="pt-md-5 pt-0 px-3 mt-0 ">
                    <Col xs={12} className="pb-3 pt-4">
                        <h4 className="font-27-bold">Total</h4>
                    </Col>
                    <div className="overflow-table">
                        <table className="total-count-table table-title-kor">
                            <tr className="font-18-bold">
                                <th >전체 회원</th>
                                <th>호스팅 중인 회원</th>
                                <th>호스팅 중인 여행 일정</th>
                                <th>전체 여행 일정</th>
                                <th>전체 여행 DB </th>
                            </tr>
                            <tr className="font-16-bold">
                                <td>{data.allUser}</td>
                                <td>{data.hostedItineraries}</td>
                                <td>{data.hostingUsers}</td>
                                <td>{data.totalItinerary}</td>
                                <td>{data.totalTourcourse}</td>
                            </tr>
                        </table>
                    </div>
                </Row>
            </Container>


        </>
    )
}

export default TotalUserCount
