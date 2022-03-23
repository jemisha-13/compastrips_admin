import React, { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory } from 'react-router-dom'
import Buttons from "../../component/Buttons/Buttons";



const AppliedHostList = (props: any) => {


    const history = useHistory();


    const RegisterFaq = (row: any) => {
        console.log("row", row);
        history.push('/applied-Hosting-History');
    }


    const linkFollow = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
            <Buttons
                type="submit"
                children="관리"
                ButtonStyle="rounded-0 bg-custom-black"
                onClick={() => RegisterFaq(row)}
            />
        );
    }


    const DateFollow = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
            <div className="const-date">
                <p> YYYY-MM-DD HH:MM </p>
                <p> YYYY-MM-DD HH:MM </p>
            </div>
        );
    }

    const products = [
        {
            App_id: 1,
            App_Name: "이재영",
            NickApp_Name: "여행매니아",
            App_Nationality: "대한민국",
            App_Gender: "남",
            App_AgeGroup: "20대",
            App_TourTitle: "경국사에서 템플스테이",
            App_Host: "홍길동",
            App_AcceptanceStatus: "승인 대기",
        },
        {
            App_id: 2,
            App_Name: "홍지수",
            NickApp_Name: "여행매니아",
            App_Nationality: "대한민국",
            App_Gender: "남",
            App_AgeGroup: "20대",
            App_TourTitle: "홍대 소품샵 일일투어 - 문구, 팬시, 다꾸용품",
            App_Host: "홍길동",
            App_AcceptanceStatus: "승인 대기",
        },
    ]

    const columns = [
        {
            dataField: "App_id",
            text: "No",

        },
        {
            dataField: "App_Name",
            text: "이름",

        },
        {
            dataField: "NickApp_Name",
            text: "닉네임",

        },
        {
            dataField: "App_Nationality",
            text: "국적",

        },
        {
            dataField: "App_Gender",
            text: "성별",

        },
        {
            dataField: "App_AgeGroup",
            text: "연령대",

        },
        {
            dataField: "App_TourTitle",
            text: "여행 제목",

        },
        {
            dataField: "App_Host",
            text: "호스트",

        },
        {
            dataField: "App_AcceptanceStatus",
            text: "승인 상태",

        },
        {
            dataField: "ApplicationdateAcceptedDate",
            text: "신청일 / 승인일",
            formatter: DateFollow,

        },
        {
            dataField: "Manage",
            text: "관리",
            formatter: linkFollow,

        },
    ];

    const customTotal = (from: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined, to: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined, size: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined) => (
        <span className="react-bootstrap-table-pagination-total">
            Showing {from} to {to} of {size} Results
        </span>
    );
    const BacktoReviewList = () => {
        history.push('/review_mang')
    }


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
            <div className="py-2 total-results mt-4 mb-3 d-flex">
                <div><h5 className="font-27-bold">총 <span className="span-color-pink"> 100 </span> 개</h5></div>

                {/* <Buttons
                    type="submit"
                    children="등록"
                    ButtonStyle="Register-button ml-auto"
                    onClick={() => { }}
                /> */}

            </div>

            <div className="App text-center">

                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={products}
                    columns={columns}
                    pagination={paginationFactory(options)}
                />
            </div>

        </>
    );
}
export default AppliedHostList