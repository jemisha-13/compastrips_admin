    
import React from "react";
import { Row, Col, Modal } from 'react-bootstrap'

interface Props{
    cards:any,
    flag:boolean,
    hideItineraryTourDetail:()=>void
}

const ItineraryTourDetail  : React.FC<Props> =  ({cards,flag,hideItineraryTourDetail}) => {
    return (
    <Modal show={flag} onHide={() => { hideItineraryTourDetail() }}
    dialogClassName="modal-80w"
    aria-labelledby="example-custom-modal-styling-title"

    >
    <Modal.Header closeButton>
        <Modal.Title id="">
            <h6 className="font-30-bold">여행 코스 상세</h6>
        </Modal.Title>
    </Modal.Header>
    <Modal.Body className="itinery_details_modal">
        <Col className="overflow-table border-tabel-b1">
            <Row className="">
                <Col md={3} className="yellow-bg-table font-18-bold">지역</Col>
                <Col md={9} className="profile-table-td-input align-items-center">
                    <p className="mb-0 px-2 pt-4">{cards?.region}</p>
                </Col>

                <Col md={3} className="yellow-bg-table font-18-bold">카테고리</Col>
                <Col md={9} className="profile-table-td-input align-items-center">
                    <p className="mb-0 px-2 pt-4">{cards?.category}</p>
                </Col>

                <Col md={3} className="yellow-bg-table font-18-bold">이름</Col>
                <Col md={9} className="profile-table-td-input align-items-center">
                    <p className="mb-0 px-2 pt-4">{cards?.name}</p>
                </Col>

                <Col md={3} className="yellow-bg-table font-18-bold">사진</Col>
                <Col md={9} className="profile-table-td-input align-items-center py-4">
                    <div className="upload-pic">
                        {
                            cards?.image.map((image:any,i:any) =>{
                                return  <img src={image} key={i}  />
                            })
                        }
                    </div>
                </Col>

                <Col md={3} className="yellow-bg-table font-18-bold">기간</Col>
                <Col md={9} className="profile-table-td-input align-items-center">
                    <p className="mb-0 px-2 pt-4">{cards?.opening_date} - {cards?.closing_date} </p>
                </Col>

                <Col md={3} className="yellow-bg-table font-18-bold">사진</Col>
                <Col md={9} className="profile-table-td-input align-items-center py-4 px-2">
                    <div className="surmary-tour">
                        {cards?.summary}
                     </div>
                </Col>

                <Col md={3} className=" yellow-bg-table font-18-bold">주소</Col>
                <Col md={9} className="profile-table-td-input align-items-center">
                    <p className="mb-0 px-2 pt-4">{cards?.address}</p>
                </Col>

                <Col md={3} className=" yellow-bg-table font-18-bold">홈페이지</Col>
                <Col md={9} className="profile-table-td-input align-items-center">
                    <p className="mb-0 px-2 pt-4">{cards?.website}</p>
                </Col>

                <Col md={3} className=" yellow-bg-table font-18-bold">전화번호</Col>
                <Col md={9} className="profile-table-td-input align-items-center">
                    <p className="mb-0 px-2 pt-4">{cards?.website}</p>
                </Col>

                <Col md={3} className="yellow-bg-table font-18-bold">가까운 대중교통</Col>
                <Col md={9} className="profile-table-td-input align-items-center">
                    <p className="mb-0 px-2 pt-4">{cards?.n_p_transportation} </p>
                </Col>

            </Row>
        </Col>
    </Modal.Body>
</Modal>
    )
    
}
export default ItineraryTourDetail;