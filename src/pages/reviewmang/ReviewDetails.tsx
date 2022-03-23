import React from 'react'
import { Row, Container, Col, Form, Modal, Image } from 'react-bootstrap'
import Buttons from '../../component/Buttons/Buttons';
import InputField from '../../component/InputField/InputField'
import { useHistory } from 'react-router';


const ReviewDetails = () => {
    const history = useHistory();


    const handleChange = () => {
        console.log('work-done');
    }

    const SaveReview = () => {
    }

    const deleteReview = () => {
    }

    const BacktoReviewList = () => {
        history.push('/review-mang')
    }
    
    const BacktohostList = () =>{
        history.push('/hosted-itinery')
    }


    return (

        <>
            <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">리뷰 관리</h2>
                </div>
            </div>


            <Container fluid className="creator-table">
                <Row className="pt-5 pl-md-3 mt-4 mt-md-0 pb-2">
                    



                    <Col lg={12}>

                        <div className="overflow-table">
                            <Col xs={12} className="pb-3 pl-0 pt-5 d-md-flex text-left align-items-center">
                                <h4 className=" font-25-bold">리뷰 내용</h4>
                            </Col>

                            <Container fluid className="mt-1 border-tabel-b1">
                                <Row>
                                    <Col md={3} className="yellow-bg-table font-18-bold">평점</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">4.0</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">리뷰</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">마음이 복잡했는데 편안해진 템플스테이였습니다.</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">등록일시</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">YYYY.MM.DD HH:MM - HH:MM</p>
                                    </Col>
                                </Row>
                            </Container>
                           
                        </div>
                    </Col>

                    <Col lg={12}>

                        <div className="overflow-table">
                            <Col xs={12} className="pb-3 pl-0 pt-5 d-md-flex text-left align-items-center">
                                <h4 className=" font-25-bold">여행 참석자 정보</h4>
                            </Col>

                            <Container fluid className="mt-1 border-tabel-b1">
                                <Row>
                                    <Col md={3} className="yellow-bg-table font-18-bold">이름</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">이재영</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">닉네임</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">jaeyojae</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">휴대폰 번호</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">010-0330-0330</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">국적</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">대한민국</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">성별</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">남</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">생년월일</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">1999 03 01</p>
                                    </Col>
                                </Row>
                            </Container>
                            <Col className="textarea-border"></Col>
                        </div>
                    </Col>

                    <Col lg={12}>

                        <div className="overflow-table">
                            <Col xs={12} className="pb-3 pl-0 pt-5 d-md-flex text-left align-items-center">
                                <h4 className=" font-25-bold">여행 일정 정보</h4>
                            </Col>

                            <Container fluid className="mt-1 border-tabel-b1">
                                <Row>
                                    <Col md={3} className="yellow-bg-table font-18-bold">여행 제목</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center d-md-flex">
                                        <p className="mb-0 ">경국사에서 템플스테이</p>
                                        <Buttons
                                        type="submit"
                                        children="호스팅 여행 일정 바로가기"
                                        ButtonStyle="go-host font-16-bold ml-md-3"
                                        onClick={BacktohostList} />
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">호스트</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">홍길동</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">여행 일정</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">YYYY.MM.DD (DAY) HH:MM - HH:MM</p>
                                    </Col>
                                </Row>
                            </Container>
                            <Col className="textarea-border"></Col>
                        </div>
                    </Col>



                    <Col lg={12} className="mt-5">
                        <Container fluid className="mt-1 border-tabel-b1">
                            <Row>
                                <Col md={3} className="yellow-bg-table font-18-bold">관리자 메모</Col>
                                <Col md={9} className="profile-table-td-input">
                                    <div className="py-3">
                                        <InputField
                                            name="text"
                                            value=""
                                            lablestyleClass=""
                                            InputstyleClass="mb-0 manage-datepicker"
                                            onChange={handleChange}
                                            label=""
                                            placeholder=""
                                            type="textarea"
                                            fromrowStyleclass=""
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>



                    <Col md={12} className="pb-3 pl-0 pt-5 w-100">
                        <div className="text-center">
                            <Buttons
                                type="submit"
                                children="목록"
                                ButtonStyle="border-button font-22-bold"
                                onClick={BacktoReviewList} />

                            <Buttons
                                type="submit"
                                children="저장"
                                ButtonStyle="modal-pink-button font-22-bold"
                                onClick={SaveReview} />

                        

                            <Buttons
                                type="submit"
                                children="삭제"
                                ButtonStyle="border-button font-22-bold"
                                onClick={deleteReview} />


                        </div>
                    </Col>
                </Row>
            </Container>


         
        </>


    )
}

export default ReviewDetails
