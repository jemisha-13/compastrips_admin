import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';  
import InputField from '../../../component/InputField/InputField';
import Buttons from '../../../component/Buttons/Buttons';
import FaqList from './Faq-List';


function Faq() {

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());


    const [state, setState] = useState({
        reviewSearch: '',
        reviewDateSearch: '',
        reviewTitle: '',
    })


    const reviewTitle = [
        { value: '이름 호스트', label: '이름 호스트' },

    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("e.target.value", e);
    }

    const handleSelect = (e?: any) => {

    };

    const viewMore = (e?: any) => {

    };
    return (
        <>
            <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">자주 묻는 질문</h2>
                </div>
            </div>

            <>

                <>
                    <Container fluid className="condition-select mt-50">
                        <Row className="pt-5 pl-md-3 mt-4 mt-md-0">

                            <Col lg={12}>
                                <Row>
                                    <Col lg={2} className="pt-4 pr-lg-0">
                                        <div className="head-member">
                                            <h6 className="font-18-bold ln-65">검색</h6>
                                        </div>
                                    </Col>
                                    <Col lg={10} className="pt-lg-4 pb-3 pb-lg-0 pl-lg-0 FAQ-hedar">
                                        <Form.Row className="stela-row m-0">

                                            


                                            <Form.Row>
                                                <Col>
                                                    <div className=" d-flex">
                                                        <InputField
                                                            name="FAQSearch"
                                                            value=""
                                                            lablestyleClass=""
                                                            InputstyleClass=""
                                                            onChange={(e: any) => { handleChange(e) }}
                                                            label=""
                                                            placeholder="검색어 입력"
                                                            type="text"
                                                            fromrowStyleclass="width-input"
                                                        />

                                                        <Buttons
                                                            type="submit"
                                                            children="검색"
                                                            ButtonStyle="search-button ml-2"
                                                            onClick={viewMore} />
                                                    </div>
                                                </Col>
                                            </Form.Row>
                                        </Form.Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid>
                        <Row>
                            <Col >
                                <div className="pt-3 pl-md-3 pl-0">
                                    <FaqList />
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </>
 
            </>
        </>
    )
}

export default Faq
