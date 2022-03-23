import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router';
import Buttons from '../../component/Buttons/Buttons'
import InputField from '../../component/InputField/InputField'
import Swal from 'sweetalert2';

function AppliedHostingHistory() {
    const history = useHistory();

    const gotoTourPage = () =>{
        history.push('/Itinerary_Mng_db')
    }

    const gotoAppList = () =>{
        history.push('/applied-host')
    }

    const saveAppList = () =>{
        Swal.fire({
            title: '저장 완료',
            text: "저장이 완료되었습니다!",
            confirmButtonText: `확인`,
           showConfirmButton: true,
           showCloseButton: true
          })
    }

    const deleteAppList = () =>{
        Swal.fire({
            title: '삭제 완료',
            text: "삭제되었습니다.",
            confirmButtonText: `확인`,
           showConfirmButton: true,
           showCloseButton: true
          })
    }

    return (
        <>
            <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">여행 참석 신청 내역</h2>
                </div>
            </div>


            <Container fluid className="creator-table">
                <Row className="pt-5 pl-md-3 mt-4 mt-md-0 pb-2">
                    
                    <Col lg={12}>

                        <div className="overflow-table">
                            <Col xs={12} className="pb-3 pl-0 pt-5 d-md-flex text-left align-items-center">
                                <h4 className="font-27-bold ">여행 참석 신청자 정보</h4>
                            </Col>

                            <Container fluid className="mt-1 border-tabel-b1">
                                <Row>
                                    <Col md={3} className="yellow-bg-table font-18-bold">이름</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">이재영 </p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">닉네임</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">jaeyojae</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">휴대폰 번호</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">(+82) 010-0330-0330</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">국적</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">대한민국</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">성별</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">남</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">생년월일   </Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">1999 03 01</p>
                                    </Col>
                                    <Col md={3} className="yellow-bg-table font-18-bold">승인 상태</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">승인 대기</p>
                                    </Col>
                                    <Col md={3} className="yellow-bg-table font-18-bold">신청일/승인일</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">YYYY-MM-DD HH:MM / YYYY-MM-DD HH:MM</p>
                                    </Col>
                                </Row>
                            </Container>
                            <Col className="mt-66"></Col>
                        </div>
                    </Col>

                    <Col lg={12}>

                        <div className="overflow-table">
                            <Col xs={12} className="pb-3 pl-0 pt-5 d-md-flex text-left align-items-center">
                                <h4  className="font-27-bold">여행 일정 정보</h4>
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
                                        onClick={gotoTourPage} />
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
                                            onChange={()=>{}}
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
                                ButtonStyle="border-button font-22-bold w-213px"
                                onClick={gotoAppList} />

                            <Buttons
                                type="submit"
                                children="저장"
                                ButtonStyle="modal-pink-button font-22-bold w-213px"
                                onClick={saveAppList} />

                        

                            <Buttons
                                type="submit"
                                children="삭제"
                                ButtonStyle="border-button font-22-bold w-213px"
                                onClick={deleteAppList} />


                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default AppliedHostingHistory
