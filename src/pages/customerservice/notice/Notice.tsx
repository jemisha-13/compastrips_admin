import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';


import DatePicker from "react-datepicker";
import Select from 'react-select'

import ReviewMangList from '../../reviewmang/ReviewMangList';
import RadioButton from '../../../component/radiobutton/RadioButton';
import InputField from '../../../component/InputField/InputField';
import Buttons from '../../../component/Buttons/Buttons';
import NoticeList from './NoticeList';


function Notice() {
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

    const onDatePickerClick = (id: string) => {
        document.getElementById(id)?.click();
    }

    return (
        <>
            <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">공지사항</h2>
                </div>
            </div>

            <>

                <>

                    <Container fluid className="top-filters">
                        <Row className="pt-5 pl-md-3 mt-4 mt-md-0">

                            <Col lg={12}>
                                <Row>
                                    <Col lg={2} className="pt-4 pr-lg-0">
                                        <div className="head-member">
                                            <h6 className="font-18-bold ln-65">등록일</h6>
                                        </div>
                                    </Col>
                                    <Col lg={10} className="pt-lg-4 pb-3 pb-lg-0 pl-lg-0">
                                        <Form.Row className="stela-row m-0">


                                            {/* <div className="">
                                                <InputField
                                                    name="reviewDateSearch"
                                                    value={state.reviewDateSearch}
                                                    lablestyleClass=""
                                                    InputstyleClass="mb-0 manage-datepicker"
                                                    onChange={(e: any) => { handleChange(e) }}
                                                    label=""
                                                    placeholder="등록일"
                                                    type="text"
                                                    fromrowStyleclass=""
                                                />
                                            </div> */}

                                            <div className=" " onClick={() => { onDatePickerClick("startDate") }}>
                                                <DatePicker id="startDate" name="" selected={startDate} startDate={startDate} endDate={endDate} onChange={(date: Date | null) => setStartDate(date)} dateFormat="dd.MM.yyyy" selectsStart />

                                            </div>

                                            <div className="tild">
                                                <span>~</span>
                                            </div>

                                            <div className=" " onClick={() => { onDatePickerClick("endDate") }}>
                                                <DatePicker id="endDate" selected={endDate} onChange={(date: Date | null) => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} dateFormat="dd.MM.yyyy" />
                                            </div>

                                            <div className="filter-radio d-md-flex ">
                                                <RadioButton
                                                    type="checkbox"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="어제"
                                                    BtnLable="어제"
                                                    onSelect={handleSelect}
                                                />
                                                <RadioButton
                                                    type="checkbox"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="오늘"
                                                    BtnLable="오늘"
                                                    onSelect={handleSelect}
                                                />
                                                <RadioButton
                                                    type="checkbox"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="1개월"
                                                    BtnLable="1개월"
                                                    onSelect={handleSelect}
                                                />

                                                <RadioButton
                                                    type="checkbox"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="3개월"
                                                    BtnLable="3개월"
                                                    onSelect={handleSelect}
                                                />

                                                <RadioButton
                                                    type="checkbox"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="6개월"
                                                    BtnLable="6개월"
                                                    onSelect={handleSelect}
                                                />

                                                <RadioButton
                                                    type="checkbox"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="1년"
                                                    BtnLable="1년"
                                                    onSelect={handleSelect}
                                                />


                                            </div>


                                        </Form.Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>


                    <Container fluid className="condition-select">
                        <Row className=" pl-md-3 ">

                            <Col lg={12}>
                                <Row>
                                    <Col lg={2} className="pt-0 pr-lg-0">
                                        <div className="head-member">
                                            <h6 className="font-18-bold ln-65">조건 검색</h6>
                                        </div>
                                    </Col>
                                    <Col lg={10} className="pt-0 pl-lg-0">
                                        <Form.Row className="stela-row m-0">

                                            <div className="">
                                                <Select
                                                    options={reviewTitle}
                                                    name="reviewTitle"
                                                    placeholder={'제목'}
                                                    onChange={(e: any) => setState({
                                                        ...state,
                                                        reviewTitle: e.value
                                                    })}
                                                    theme={theme => ({
                                                        ...theme,
                                                        borderRadius: 0,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary25: '#d9eff9',
                                                            primary: '#42B6E6 ',
                                                            fontsize: '15px',
                                                        },
                                                    })}
                                                />
                                            </div>


                                            <Form.Row>
                                                <Col>
                                                    <div className=" d-flex">
                                                        <InputField
                                                            name="reviewSearch"
                                                            value={state.reviewSearch}
                                                            lablestyleClass=""
                                                            InputstyleClass="mb-0 manage-datepicker"
                                                            onChange={(e: any) => { handleChange(e) }}
                                                            label=""
                                                            placeholder="검색어 입력"
                                                            type="text"
                                                            fromrowStyleclass=""
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
                                    < NoticeList />
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </>

            </>
        </>
    )
}

export default Notice
