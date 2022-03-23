import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import Buttons from '../../component/Buttons/Buttons';
import InputField from '../../component/InputField/InputField';
import DatePicker from "react-datepicker";
import Select from 'react-select'
import RadioButton from '../../component/radiobutton/RadioButton';
import { ItineraryMngListDB } from './ItineraryMngListDB';
import { ApiGet, ApiGetNoAuth, ApiPost } from '../../helper/API/ApiData';
import moment from 'moment';
import { CustomDateFilter } from '../../helper/CustomDateFilter';

export interface dbManagment {
    id: string;
    no_id: string;
    country: string;
    region: string;
    category: string;
    name: string;
}

interface dropDown {
    value: string;
    label: string
}

const ItineraryMngDB = () => {

    // states and variables
    const [state, setState] = useState({
        itneryDBSearch: '',
        // itineryDBDateSearch: 'registration_date',
        itineryDBCountry: '',
        itineryDBRegion: '',
        itineryDBCategory: '',
        itineryDBSeries: 'name',
    })

    const searchOptions = [
        { value: 'name', label: '이름' },
        { value: 'id', label: '고유번호' }
    ]

    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();

    const [dbManagment, setDbManagment] = useState<dbManagment[]>([]);
    const [totalSize, setTotalSize] = useState(Number);
    const [isRadioCheck, setisRadioCheck] = useState(String);

    const [country, setCountry] = useState<dropDown[]>([])
    const [region, setRegion] = useState<dropDown[]>([])
    const [category, setCategory] = useState<dropDown[]>([])


    // helper functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("e.target.value", e);
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const viewMore = () => {
        getDbManagment()
    }

    const handleSelect = (e: any) => {
        // console.log(e.target.value);

        setisRadioCheck(e.target.value);
        let date = CustomDateFilter(e.target.value);

        setStartDate(moment(date).toDate());
        setEndDate(e.target.value === '어제' ? moment().subtract(24, 'hours').toDate() : moment().toDate());
    };

    const onDatePickerClick = (id: string) => {
        document.getElementById(id)?.click();
    }

    const getDbManagment = (page = 1, sizePerPage = 10) => {

        let start = startDate ? moment(startDate).format("YYYY-MM-DD") : "";
        let end = endDate ? moment(endDate).format("YYYY-MM-DD") : "";

        // date_option=registration_date&start_date=${start}&end_date=${end}&country=${state.itineryDBCountry}&region=${state.itineryDBRegion}&category=${state.itineryDBCategory}&option=${state.itineryDBSeries}&search_term=${state.itneryDBSearch}&
        ApiPost(
            `admin/getFilteredTourcourse?per_page=${sizePerPage}&page_number=${page}`, {
            start_date: start,
            end_date: end,
            country: "대한민국",
            region: state.itineryDBRegion,
            category: state.itineryDBCategory,
            option: state.itineryDBSeries,
            search_term: state.itneryDBSearch
        }
        ).then((res: any) => {

            setTotalSize(res.data && res.data.count);
            setDbManagment(
                res.data &&
                res.data.courses &&
                res.data.courses.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: (res.data.count - ((page - 1) * sizePerPage)) - index,
                        country: x.country,
                        region: x.region,
                        category: x.category,
                        name: x.name,
                    };
                })
            );
        });
    }

    const ltineraryRegBtn = () => {

    }

    const getCountry = async () => {
        await ApiGetNoAuth("general/country").then((res: any) => {
            setCountry(
                res.data.map((x: any) => {
                    return {
                        value: x.name,
                        label: x.name
                    }
                })
            )
        })
            .catch(error => {
                console.log(error);
            })

        setCountry((prev: any) => {
            return [
                { value: "", label: "국가" },
                ...prev
            ]
        })
    }

    const getRegion = async () => {
        await ApiGet("itinerary/region").then((res: any) => {
            setRegion(
                res.data.map((x: any) => {
                    return {
                        value: x.region,
                        label: x.region
                    }
                })
            )
        })
            .catch(error => {
                console.log(error);
            })

        setRegion((prev: any) => {
            return [
                { value: "", label: "지역" },
                ...prev
            ]
        })
    }

    const getCategory = async () => {
        await ApiGet("itinerary/category").then((res: any) => {
            setCategory(
                res.data.map((x: any) => {
                    return {
                        value: x.category,
                        label: x.category
                    }
                })
            )
        })
            .catch(error => {
                console.log(error);
            })

        setCategory((prev: any) => {
            return [
                { value: "", label: "카테고리" },
                ...prev
            ]
        })
    }

    // useEffects
    useEffect(() => {
        getDbManagment()
        // getCountry()
        getRegion()
        getCategory()
    }, [])


    return (
        <>
            <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">여행 코스 DB 관리</h2>
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
                                            <h6 className="font-18-bold ln-65">검색 기간</h6>
                                        </div>
                                    </Col>
                                    <Col lg={10} className="pt-lg-4 pb-3 pb-lg-0 pl-lg-0">
                                        <Form.Row className="stela-row m-0">


                                            <div className="">
                                                <InputGroup>
                                                    <InputGroup.Text className="inputgroup-text-imp">
                                                        등록일
                                                    </InputGroup.Text>
                                                </InputGroup>
                                                {/* <InputField
                                                    name="itineryDBDateSearch"
                                                    value="등록일"
                                                    lablestyleClass=""
                                                    InputstyleClass="mb-0 manage-datepicker"
                                                    onChange={(e: any) => { handleChange(e) }}
                                                    label=""
                                                    placeholder="등록일"
                                                    type="text"
                                                    fromrowStyleclass=""
                                                /> */}
                                            </div>

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
                                                    checked={isRadioCheck == "어제" ? true : false}
                                                    BtnLable="어제"
                                                    onSelect={(e) => { handleSelect(e) }}
                                                />
                                                <RadioButton
                                                    type="checkbox"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="오늘"
                                                    checked={isRadioCheck == "오늘" ? true : false}
                                                    BtnLable="오늘"
                                                    onSelect={handleSelect}
                                                />
                                                <RadioButton
                                                    type="checkbox"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="1개월"
                                                    checked={isRadioCheck == "1개월" ? true : false}
                                                    BtnLable="1개월"
                                                    onSelect={handleSelect}
                                                />

                                                <RadioButton
                                                    type="checkbox"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="3개월"
                                                    checked={isRadioCheck == "3개월" ? true : false}
                                                    BtnLable="3개월"
                                                    onSelect={handleSelect}
                                                />

                                                <RadioButton
                                                    type="checkbox"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="6개월"
                                                    checked={isRadioCheck == "6개월" ? true : false}
                                                    BtnLable="6개월"
                                                    onSelect={handleSelect}
                                                />

                                                <RadioButton
                                                    type="checkbox"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="1년"
                                                    checked={isRadioCheck == "1년" ? true : false}
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
                                                {/* <Select
                                                    options={country}
                                                    defaultValue={{ value: "", label: "국가" }}
                                                    name="itineryDBCountry"
                                                    placeholder="국가"
                                                    onChange={(e: any) => setState({
                                                        ...state,
                                                        itineryDBCountry: e.value
                                                    })}
                                                /> */}
                                                <InputGroup>
                                                    <InputGroup.Text className="inputgroup-text-imp">
                                                        대한민국
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </div>


                                            <div className="">
                                                <Select
                                                    options={region}
                                                    defaultValue={{ value: "", label: "지역" }}
                                                    name="itineryDBRegion"
                                                    placeholder="지역"
                                                    onChange={(e: any) => setState({
                                                        ...state,
                                                        itineryDBRegion: e.value
                                                    })}
                                                />
                                            </div>


                                            <div className="">
                                                <Select
                                                    options={category}
                                                    defaultValue={{ value: "", label: "카테고리" }}
                                                    name="itineryDBCategory"
                                                    placeholder={'카테고리'}
                                                    onChange={(e: any) => setState({
                                                        ...state,
                                                        itineryDBCategory: e.value
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


                                            <div className="">
                                                <Select
                                                    options={searchOptions}
                                                    defaultValue={searchOptions[0]}
                                                    name="itineryDBSeries"
                                                    placeholder={'이름 고유번호'}
                                                    onChange={(e: any) => setState({
                                                        ...state,
                                                        itineryDBSeries: e.value
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
                                                            name="itneryDBSearch"
                                                            value={state.itneryDBSearch}
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
                                    <ItineraryMngListDB
                                        data={dbManagment}
                                        getDbManagment={getDbManagment}
                                        totalSize={totalSize}
                                        ltineraryRegBtn={ltineraryRegBtn}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </>

            </>
        </>
    )
}

export default ItineraryMngDB