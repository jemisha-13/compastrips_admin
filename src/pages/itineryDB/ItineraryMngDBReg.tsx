import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Form } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import Buttons from '../../component/Buttons/Buttons'
import InputField from '../../component/InputField/InputField'
import RadioButton from '../../component/radiobutton/RadioButton'
import { ApiGet } from '../../helper/API/ApiData'




const ItineraryMngDBReg = () => {

    // states
    const [courseData, setCourseData] = useState<any>({
        id: "",
        region: "",
        category: "",
        name: "",
        image: [],
        period: "",
        summary: "",
        address: "",
        website: "",
        mobile: "",
        transportation: "",
    })

    // helper funtions
    const { id }: any = useParams();

    const history = useHistory();

    const BacktoItineryDBList = () => {
        history.push('/Itinerary-Mng-db')
    }

    // useEffects
    useEffect(() => {
        ApiGet(`itinerary/tourcourse/${id}`).then((res: any) => {
            // console.log("courseData: ", res.data);
            const data = {
                id: res.data.id,
                region: res.data.region,
                category: res.data.category,
                name: res.data.name,
                image: res.data.image,
                period: `${res.data.opening_date.replaceAll('-', '.')} - ${res.data.closing_date.replaceAll('-', '.')}`,
                summary: res.data.summary,
                address: res.data.address,
                website: res.data.website,
                mobile: res.data.mobile,
                transportation: res.data.n_p_transportation,
            }
            setCourseData(data)
        })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <>
            <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">여행 코스 DB 관리</h2>
                </div>
            </div>
            <Container fluid className="creator-table ">
                <Row className=" pl-md-3 pt-5 mt-4 mt-md-0 pb-5 ">
                    <Col lg={12}>

                        <div className="overflow-table pt-5">


                            <Container fluid className="mt-2  mb-5 border-tabel-b1">
                                <Row>
                                    <Col md={3} className=" yellow-bg-table font-18-bold">고유번호</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">{courseData.id}</p>
                                    </Col>

                                    <Col md={3} className=" yellow-bg-table font-18-bold">지역</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">{courseData.region}</p>
                                    </Col>

                                    <Col md={3} className=" yellow-bg-table font-18-bold">카테고리</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">{courseData.category}</p>
                                    </Col>

                                    <Col md={3} className=" yellow-bg-table font-18-bold">이름</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">{courseData.name}</p>
                                    </Col>

                                    <Col md={3} className=" yellow-bg-table font-18-bold">사진</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <div className="upload-pic  d-custom-flex p-3 ">
                                            {
                                                courseData.image.map((x:any) => {
                                                    return (
                                                        <div><img src={x} /></div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Col>

                                    <Col md={3} className=" yellow-bg-table font-18-bold">기간</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">{courseData.period}</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">개요</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center py-4 px-2">
                                        <div className="surmary-tour pl-3">
                                            {courseData.summary}
                                        </div>
                                    </Col>

                                    <Col md={3} className=" yellow-bg-table font-18-bold">주소</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">{courseData.address}</p>
                                    </Col>

                                    <Col md={3} className=" yellow-bg-table font-18-bold">홈페이지</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">{courseData.website}</p>
                                    </Col>

                                    <Col md={3} className=" yellow-bg-table font-18-bold">전화번호</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">{courseData.mobile}</p>
                                    </Col>

                                    <Col md={3} className=" yellow-bg-table font-18-bold">가까운 대중교통</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">{courseData.transportation}</p>
                                    </Col>



                                </Row>
                            </Container>
                        </div>

                    </Col>

                    <Col md={12} className="pb-3 pl-0 pt-5 w-100">
                        <div className="text-center">
                            <Buttons
                                type="submit"
                                children="목록으로"
                                ButtonStyle="border-button font-22-bold"
                                onClick={BacktoItineryDBList} />

                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default ItineraryMngDBReg


