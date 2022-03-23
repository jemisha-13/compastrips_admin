import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Buttons from '../../../component/Buttons/Buttons';
import InputField from '../../../component/InputField/InputField';
import Swal from 'sweetalert2';

function RegisterFaq() {
    const history = useHistory();



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

    const backtoFaq = () => {
        history.push('/faq')
    }

    const faqSave = () => {
        Swal.fire({
            title: '안내',
            text: "입력된 내용이 있습니다. 목록으로 이동하면 입력한 내용이 저장되지 않습니다. ",
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            reverseButtons: true,
            showCloseButton: true,  
            
           
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '게시물 등록완료',
                    text: "게시물이 등록되었습니다!",
                    confirmButtonText: `확인`,
                    showConfirmButton: true,
                    showCloseButton: true

                })
            }
        })
    }

    const faqModifyBtn =() =>{
        Swal.fire({
            title: '게시물 수정 완료',
            text: "게시물이 수정되었습니다!",
            confirmButtonText: `확인`,
           showConfirmButton: true,
           showCloseButton: true
          })
    }

    const faqDeletedBtn = () =>{
        Swal.fire({
            title: '게시물 삭제',
            text: "이 게시물을 삭제하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
            reverseButtons: true,
            showCloseButton: true
         
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '게시물 삭제',
                    text: "게시물이 삭제되었습니다!",
                    confirmButtonText: `확인`,
                    showConfirmButton: true,
                    showCloseButton: true
                })
            }
        })
    }
    return (
        <>
            <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">자주 묻는 질문</h2>
                </div>
            </div>
            <Container fluid className="creator-table ">
                <Row className="pt-5  pl-md-3 mt-4 mt-md-0 pb-2">
                    <Col lg={12} className="pt-5">
                        <Form>
                            <div className="overflow-table">
                                <Container fluid >
                                    <Row>
                                        <Col xs={6} className="mb-31 pl-0">
                                            <h4 className=" font-25-bold">등록하기</h4>
                                        </Col>
                                        <Col className="flot_fon_bold mb-31">
                                            <h5 className=" font-25-bold">* 필수 입력 정보입니다.</h5>
                                        </Col>
                                    </Row>
                                </Container>
                                <Container fluid className="mt-2 mb-5 border-tabel-b1">
                                    <Row>
                                        <Col md={3} className="yellow-bg-table font-18-bold">제목</Col>
                                        <Col md={9} className="profile-table-td-input">
                                            <div className="py-3">
                                                <InputField
                                                    name="title"
                                                    value=""
                                                    lablestyleClass=""
                                                    InputstyleClass="mb-0 manage-datepicker"
                                                    onChange={(e: any) => { }}
                                                    label=""
                                                    placeholder="호스트가 되려면 어떻게 해야하나요?"
                                                    type="text"
                                                    fromrowStyleclass=""
                                                />
                                            </div>
                                        </Col>
                                        <Col md={3} className="yellow-bg-table font-18-bold">세부 정보</Col>
                                        <Col md={9} className="profile-table-td-input">
                                            <div className="py-3">
                                                <InputField
                                                    name="information"
                                                    value=""
                                                    lablestyleClass=""
                                                    InputstyleClass="mb-0 manage-datepicker"
                                                    onChange={() => { }}
                                                    label=""
                                                    placeholder="[답변]"
                                                    type="textarea"
                                                    fromrowStyleclass=""
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Form>
                        <Row className="justify-content-center button-combo">
                            <Buttons
                                type="submit"
                                children="목록으로"
                                ButtonStyle="border-button w-245px font-22-bold"
                                onClick={backtoFaq} />

                            <Buttons
                                type="submit"
                                children="저장하기"
                                ButtonStyle="modal-pink-button w-245px font-22-bold"
                                onClick={faqSave} />

                        </Row>
                        <Row className="justify-content-center button-combo">
                            <Buttons
                                type="submit"
                                children="목록으로"
                                ButtonStyle="border-button font-22-bold w-245px"
                                onClick={backtoFaq} />

                            <Buttons
                                type="submit"
                                children="수정하기"
                                ButtonStyle="modal-pink-button font-22-bold w-245px"
                                onClick={faqModifyBtn} />

                            <Buttons
                                type="submit"
                                children="삭제하기"
                                ButtonStyle="modal-black-button font-22-bold w-245px"
                                onClick={faqDeletedBtn} />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default RegisterFaq
