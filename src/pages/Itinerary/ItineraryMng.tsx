import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import Buttons from '../../component/Buttons/Buttons';
import InputField from '../../component/InputField/InputField';
import DatePicker from "react-datepicker";
import Select from 'react-select'
import ItineraryMngList from '../Itinerary/ItineraryMngList'
import RadioButton from '../../component/radiobutton/RadioButton';
import BootstrapTable from "react-bootstrap-table-next";
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import moment from 'moment';
import { useHistory } from 'react-router';
import { CustomDateFilter } from '../../helper/CustomDateFilter';
import paginationFactory from 'react-bootstrap-table2-paginator';
export interface intineraryProduct {
    id: string,
    Itinerary_itineryCountry: string
    Itinerary_itineryRegion: string
    Itinerary_Category: string
    Itinerary_Title: string
    Itinerary_Creator: string
    Itinerary_HostedNumber: number
    Itinerary_Status: string
    Itinerary_RegistrationDate: Date
}
export interface itineraryCommon {
    isSelected?: boolean,
    lable: string,
    value: string
}
const ItineraryMng = () => {
    const history = useHistory();

    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();
    const [itineryRegion, setItineryRegionData] = useState<any[]>([])
    const [itineryCategory, setItItineryCategoryData] = useState<any[]>([])
    const [totalSize, setTotalSize] = useState(Number)
    const [isRadioCheck, setisRadioCheck] = useState(String)


    const itineryCountry = [
        { value: '', label: '국가' },
        { value: 'Korea', label: 'Korea' }
    ]
    const itineryStatus = [
        { value: '', label: '상태' },
        { value: 'OPEN', label: '공개' },
        { value: 'PRIVATE', label: '비공개' },
    ]

    const itineryTitle = [
        { value: 'title', label: '제목' },
        { value: 'Creator', label: '작성자 정보' }
    ]
    const [state, setState] = useState({
        itnerySearch: '',
        itineryDateSearch: '',
        itineryCountry: itineryCountry[0].value,
        itineryRegion: "",
        itineryCategory: "",
        itineryStatus: '',
        itineryTitle: itineryTitle[0].value,
    })
    useEffect(() => {
        getRegion();
        getCategory();
    }, [])

    useEffect(() => {
        getItineraries()
    }, [])

    const getRegion = async () => {
        await ApiGet('itinerary/region')
            .then((res: any) => {
                setItineryRegionData(
                    res.data.map((x: any) => {
                        return {
                            value: x.region,
                            label: x.region,
                        }
                    })
                )
            })


        setItineryRegionData((prev: any) => {
            return [

                { value: "", label: "지역" },
                ...prev
            ]
        })


    }
    // useEffect(()=>{
    //     setState({
    //         ...state,
    //         itineryRegion:itineryRegion[0].value
    //     })
    // },[itineryRegion])
    // useEffect(()=>{
    //     setState({
    //         ...state,
    //         itineryCategory:itineryCategory[0].value,
    //     })
    // },[itineryCategory])



    const getCategory = async () => {
        await ApiGet(`itinerary/category`)
            .then((res: any) => {
                setItItineryCategoryData(res.data.map((x: any) => {
                    return {
                        value: x.category,
                        label: x.category,
                    }
                }))
            })
        setItItineryCategoryData((prev: any) => {
            return [

                { value: "", label: "카테고리" },
                ...prev
            ]
        })


    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const DetailProfile = (row: any) => {
        history.push('/creatorprofile');
    }

    const viewMore = () => {
        getItineraries();
    }
    function formatDate(date: Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const getItineraries = (page = 1, sizePerPage = 10) => {
        let start = startDate ? moment(startDate).format('YYYY-MM-DD') : '';
        let end = endDate ? moment(endDate).format('YYYY-MM-DD') : '';
        const data = {
            start_date: start,
            end_date: end,
            country: state.itineryCountry,
            region: state.itineryRegion,
            category: state.itineryCategory,
            status: state.itineryStatus,
            option: state.itineryTitle,
            search_term: state.itnerySearch
        }
        ApiPost(`admin/getFilteredItineraries?&per_page=${sizePerPage}&page_number=${page}`, data)
            .then((res: any) => {
                setTotalSize(res.data && res.data.count)
                setProductsData(res.data && res.data.itineraries && res.data.itineraries.map((x: any, index: number) => {
                    return {
                        id: x.id,
                        no_id: (res.data.count - ((page - 1) * sizePerPage)) - index,
                        Itinerary_Country: x.country,
                        Itinerary_Region: x.region,
                        Itinerary_Category: x.category,
                        Itinerary_Title: x.title,
                        Itinerary_Creator: x.creator,
                        Itinerary_HostedNumber: x.hosted_number,
                        Itinerary_Status: x.status,
                        Itinerary_RegistrationDate: formatDate(x.registration_date),
                    }
                }))
            })
    }

    const vtimecodebtn = () => {
        console.log("verification verify");
    }


    const linkFollow = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
            <Buttons
                type="submit"
                children="관리"
                ButtonStyle="rounded-0 bg-custom-black"
                onClick={() => DetailProfile(row)}
            />
        );
    }

    function priceFormatter(cell: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined, row: any) {

        return (
            <strong style={{ color: '#B931B8' }}>{cell}</strong>
        );
    }

    const handleSelect = (e: any) => {
        setisRadioCheck(e.target.value);
        let date = CustomDateFilter(e.target.value);

        setStartDate(moment(date).toDate());
        setEndDate(e.target.value === '어제' ? moment().subtract(24, 'hours').toDate() : moment().toDate());
    };

    const [products, setProductsData] = useState<[]>([])

    const columns = [
        {
            dataField: "id",
            text: "No",

        },
        {
            dataField: "Itinerary_itineryCountry",
            text: "국가",


        },
        {
            dataField: "Itinerary_itineryRegion",
            text: "지역",
            // formatter: priceFormatter,

        },
        {
            dataField: "Itinerary_Category",
            text: "카테고리",

        },
        {
            dataField: "Itinerary_Title",
            text: "제목",

        },
        {
            dataField: "Itinerary_Creator",
            text: "작성자 정보 ",


        },
        {
            dataField: "Itinerary_HostedNumber",
            text: "호스팅된 수",

        },
        {
            dataField: "Itinerary_Status",
            text: "상태",

        },
        {
            dataField: "Itinerary_RegistrationDate",
            text: "등록일 ",

        },
        {
            dataField: "Itinerary_Manage",
            text: "관리",
            formatter: linkFollow,

        },
    ];

    const customTotal = (from: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined, to: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined, size: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined) => (
        <span className="react-bootstrap-table-pagination-total">
            Showing {from} to {to} of {size} Results
        </span>
    );


    const options = {

        paginationSize: 5,
        pageStartIndex: 1,
        alwaysShowAllBtns: true,
        hidePageListOnlyOnePage: true,
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
            text: '10', value: 10
        }, {
            text: '20', value: 20
        }, {
            text: 'All', value: products.length
        }]
    };

    return (

        <>
            <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">여행 일정  관리</h2>
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


                                            <div className="input-126">
                                                {/* <InputField
                                                                name="itineryDateSearch"
                                                                value={state.itineryDateSearch}
                                                                lablestyleClass=""
                                                                InputstyleClass="mb-0 manage-datepicker w-126"
                                                                onChange={(e: any) => { handleChange(e) }}
                                                                label=""
                                                                placeholder="등록일"
                                                                type="text"
                                                                fromrowStyleclass=""
                                                            /> */}
                                                <InputGroup>
                                                    <InputGroup.Text className="inputgroup-text-imp">
                                                        대한민국
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </div>

                                            <div className=" ">
                                                <DatePicker name="" selected={startDate} startDate={startDate} endDate={endDate} onChange={(date: Date | null) => setStartDate(date)} dateFormat="dd.MM.yyyy" selectsStart />

                                            </div>

                                            <div className="tild">
                                                <span>~</span>
                                            </div>
                                            <div className=" ">
                                                <DatePicker selected={endDate} startDate={startDate} endDate={endDate} minDate={startDate} onChange={(date: Date | null) => setEndDate(date)} selectsEnd dateFormat="dd.MM.yyyy" />
                                            </div>

                                            <div className="filter-radio d-md-flex ">
                                                <RadioButton
                                                    type="radio"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="어제"
                                                    checked={isRadioCheck == '어제' ? true : false}
                                                    BtnLable="어제"
                                                    onSelect={(e) => { handleSelect(e) }}
                                                />
                                                <RadioButton
                                                    type="radio"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="오늘"
                                                    checked={isRadioCheck == '오늘' ? true : false}
                                                    BtnLable="오늘"
                                                    onSelect={(e) => { handleSelect(e) }}
                                                />
                                                <RadioButton
                                                    type="radio"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="1개월"
                                                    checked={isRadioCheck == '1개월' ? true : false}
                                                    BtnLable="1개월"
                                                    onSelect={(e) => { handleSelect(e) }}
                                                />

                                                <RadioButton
                                                    type="radio"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="3개월"
                                                    checked={isRadioCheck == '3개월' ? true : false}
                                                    BtnLable="3개월"
                                                    onSelect={(e) => { handleSelect(e) }}
                                                />

                                                <RadioButton
                                                    type="radio"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="6개월"
                                                    checked={isRadioCheck == '6개월' ? true : false}
                                                    BtnLable="6개월"
                                                    onSelect={(e) => { handleSelect(e) }}
                                                />

                                                <RadioButton
                                                    type="radio"
                                                    name="Open-Private"
                                                    id="Open-Private"
                                                    value="1년"
                                                    checked={isRadioCheck == '1년' ? true : false}
                                                    BtnLable="1년"
                                                    onSelect={(e) => { handleSelect(e) }}
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
                                                    options={itineryCountry}
                                                    defaultValue={itineryCountry[0]}
                                                    name="itineryCountry"
                                                    placeholder="국가"
                                                    onChange={(e: any) => setState({
                                                        ...state,
                                                        itineryCountry: e.value
                                                    })}
                                                />
                                            </div>


                                            <div className="">
                                                <Select
                                                    options={itineryRegion}
                                                    defaultValue={{ value: "", label: "지역" }}
                                                    name="itineryRegion"
                                                    placeholder="지역"
                                                    onChange={(e: any) => setState({
                                                        ...state,
                                                        itineryRegion: e.value
                                                    })}
                                                />
                                            </div>


                                            <div className="">
                                                <Select
                                                    options={itineryCategory}
                                                    defaultValue={{ value: "", label: "카테고리" }}

                                                    name="itineryCategory"
                                                    placeholder={'카테고리'}
                                                    onChange={(e: any) => setState({
                                                        ...state,
                                                        itineryCategory: e.value
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
                                                    options={itineryStatus}
                                                    defaultValue={itineryStatus[0]}

                                                    name="itineryStatus"
                                                    placeholder={'상태'}
                                                    onChange={(e: any) => setState({
                                                        ...state,
                                                        itineryStatus: e.value
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
                                                    options={itineryTitle}
                                                    name="itineryTitle"
                                                    defaultValue={itineryTitle[0]}
                                                    placeholder={'제목'}
                                                    onChange={(e: any) => setState({
                                                        ...state,
                                                        itineryTitle: e.value
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
                                                            name="itnerySearch"
                                                            value={state.itnerySearch}
                                                            lablestyleClass=""
                                                            InputstyleClass="mb-0 manage-datepicker w-auto"
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
                                    <ItineraryMngList data={products} getItineraries={getItineraries} totalSize={totalSize}/>
                                </div> 
                            </Col>
                        </Row>
                    </Container>

                </>

            </>

        </>
    )
}

export default ItineraryMng