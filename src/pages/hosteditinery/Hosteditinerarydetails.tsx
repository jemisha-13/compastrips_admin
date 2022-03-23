
import { Col, Container, Row } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import Buttons from '../../component/Buttons/Buttons'
import InputField from '../../component/InputField/InputField'
import moment from 'moment';
import { useState } from 'react';
import Image_Base from "../../img/Image_Base.png"
import hostcity from "../../img/hostcity.png"


function Hosteditinerarydetails() {



    const reviewProfile = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
            <div className="flex table-review-img">
                <img src={row.avatar} alt="" />
                <span className="font-16-bold-pink ">{row.review_nickname}</span>
            </div>
        );
    }


    const reviewlistHead = [
        {
            dataField: "review_nickname",
            text: "닉네임",
            formatter: reviewProfile,

        },
        {
            dataField: "review_score",
            text: "별점",


        },

        {
            dataField: "review_date",
            text: "등록일",


        },

        {
            dataField: "review_review",
            text: "리뷰",


        },



    ];

    const [state, setState] = useState({
        title: '',
        information: '',
        disclosure: 'OPEN',
        creator: '',
        hosted_count: '',
        hosts: [],
        tourcourses: [],
        courseImages: [],
        star: '',
        reviews: [],
        wishlist: '',
        country: '대한민국',
        nationality: 'aa',
    })







    return (
        <>
            <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">호스팅 여행 일정 내역</h2>
                </div>
            </div>


            <Container fluid className="creator-table">
                <Row className="pt-5 pl-md-3 mt-4 mt-md-0 pb-2">


                    <Col lg={12}>

                        <div className="overflow-table">
                            <Col xs={12} className="pb-3 pl-0 pt-5 d-md-flex text-left align-items-center">
                                <h4 className="font-27-bold ">여행 일정 정보</h4>
                            </Col>

                            <Container fluid className="mt-1 border-tabel-b1">
                                <Row>
                                    <Col md={3} className="yellow-bg-table font-18-bold">여행 제목</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center d-md-flex">
                                        <p className="mb-0 ">경국사 템플스테이</p>
                                        <Buttons
                                            type="submit"
                                            children="여행 정보 바로가기"
                                            ButtonStyle="go-host font-16-bold ml-md-3 w-171"
                                            onClick={() => { }} />
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">국가</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">대한민국</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">지역</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">서울</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">작성자 정보</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">Created by  Compastrips</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">호스트 수</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">5명</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">공개</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <Buttons
                                            type="submit"
                                            children="공개"
                                            ButtonStyle="go-host font-16-bold ml-33  w-140-h-45"
                                            onClick={() => { }} />
                                        <Buttons
                                            type="submit"
                                            children="비공개"
                                            ButtonStyle="modal-pink-button font-16-bold go-pink ml-0 w-140-h-45"
                                            onClick={() => { }} />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>



                    <Col lg={12}>

                        <div className="overflow-table">
                            <Col xs={12} className="pb-3 pl-0 pt-5 d-md-flex text-left align-items-center">
                                <h4>호스트 정보</h4>
                            </Col>

                            <Container fluid className="mt-1 border-tabel-b1">
                                <Row>
                                    <Col md={3} className="yellow-bg-table font-18-bold">이름</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center d-md-flex">
                                        <p className="mb-0 ">홍지수</p>
                                        <Buttons
                                            type="submit"
                                            children="회원관리 바로가기"
                                            ButtonStyle="go-host font-16-bold p-set w-171 ml-4"
                                            onClick={() => { }} />
                                    </Col>


                                    <Col md={3} className="yellow-bg-table font-18-bold">닉네임</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">홍수아</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">여행 일시</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">YYYY.MM.DD  오전 HH:MM - 오후 HH:MM</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">여행 시작 장소</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">홍대입구 5번 출구</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">이동수단</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">택시</p>
                                    </Col>

                                    <Col md={3} className="yellow-bg-table font-18-bold">여행 인원</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">5명</p>
                                    </Col>
                                    <Col md={3} className="yellow-bg-table font-18-bold"> 호스트 기본 정보 </Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">성별 여 ｜ 연령대 1980년생 ｜ 국적 대한민국</p>
                                    </Col>
                                    <Col md={3} className="yellow-bg-table font-18-bold">호스트 타입</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">현지인 호스트</p>
                                    </Col>
                                    <Col md={3} className="yellow-bg-table font-18-bold">소개글</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">소개글이 표시됩니다. </p>
                                    </Col>
                                    <Col md={3} className="yellow-bg-table font-18-bold">등록일</Col>
                                    <Col md={9} className="profile-table-td-input align-items-center">
                                        <p className="mb-0 ">YYYY-MM-DD HH:MM</p>
                                    </Col>
                                </Row>
                            </Container>
                            <Col className="mt-66"></Col>
                        </div>
                    </Col>

                    <div className="overflow-table">
                        <Col xs={12} className="pb-3 pl-0">
                            <h4 className=" font-25-bold">진행현황</h4>
                        </Col>

                        <Container fluid className="mt-1 border-tabel-b1">
                            <Row>
                                <Col md={3} className="yellow-bg-table font-18-bold">진행상태 (진행중/종료)</Col>
                                <Col md={9} className="profile-table-td-input align-items-center">
                                    <p className="mb-0">종료</p>
                                </Col>

                                <Col md={3} className="yellow-bg-table font-18-bold">신청자 목록 </Col>
                                <Col md={9} className="profile-table-td-input align-items-center">
                                    <p className="mb-0">전체 5명, 신청 3명, 잔여 2명 <span className="span-color-pink"> {state.wishlist} </span> | 승인 완료 2 | 승인 불가 1</p>
                                    {/* <div className="mt-3 text-center">
                                             <BootstrapTable
                                                 bootstrap4
                                                 keyField="id"
                                                 data={state.reviews}
                                                 columns={reviewlistHead}
                                             />
                                         </div> */}
                                    <div className="Applicants_center">
                                        <div className="d-flex">
                                            <div className="Applicants_user_img">
                                                <img src={Image_Base} />
                                            </div>
                                            <div>
                                                <div className="d-flex Applicants_button_type_p_tag pt-18">
                                                    <p><span className="text-ize">남성</span></p>
                                                    <p><span className="text-ize">20대</span></p>
                                                    <img src={hostcity}></img>
                                                </div>
                                                <div className="Applicants_user_name">
                                                    <p>홍수아  |  010-1234-1234  </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Applicants_center_last">
                                            <p>참가신청 : YYYY.MM.DD</p>
                                        </div>
                                    </div>
                                </Col>

                                <Col md={3} className="yellow-bg-table font-18-bold">평점</Col>
                                <Col md={9} className="profile-table-td-input align-items-center">
                                    <p className="mb-0">★ 4.3</p>
                                </Col>

                                <Col md={3} className="yellow-bg-table font-18-bold">리뷰</Col>
                                <Col md={9} className="profile-table-td-input align-items-center">
                                    <Buttons
                                        type="submit"
                                        children="리뷰 보기"
                                        ButtonStyle="go-host font-16-bold p-set w-140-h-49 ml-4"
                                        onClick={() => { }} />
                                </Col>

                            </Row>
                        </Container>
                        <Col className="textarea-border"></Col>
                    </div>



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
                                            onChange={() => { }}
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
                                onClick={() => { }} />

                            <Buttons
                                type="submit"
                                children="저장"
                                ButtonStyle="modal-pink-button font-22-bold"
                                onClick={() => { }} />



                            <Buttons
                                type="submit"
                                children="삭제"
                                ButtonStyle="border-button font-22-bold"
                                onClick={() => { }} />
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}


export default Hosteditinerarydetails
