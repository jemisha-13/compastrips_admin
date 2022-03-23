import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory } from 'react-router-dom'
import Buttons from "../../component/Buttons/Buttons";


const HostedItineryList = (props: any) => {


    const history = useHistory();


    const HostedItineryList = (row: any) => {
        console.log("row", row);
        history.push('/hosted-itinerary-details');
    }


    const linkFollow = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
            <Buttons
                type="submit"
                children="관리"
                ButtonStyle="rounded-0 bg-custom-black"
                onClick={() =>HostedItineryList(row)}
            />
        );
    }


    const DateFollow = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
            <div className="const-date">
                <p>YYYY.MM.DD (DAY)</p>
                <p>  HH:MM - HH:MM</p>
            </div>
        );
    }

    const products = [
        {
            id: 1,
            Country: "대한민국",
            Region: "서울",
            Tourtitle: "경국사에서 템플스테이",
            NickName: "jaeyojae",
            HostDate: "진행중",
            Vacancies: "있음(2)",
            AcceptanceStatus: "공개",
            Disclosure:"공개",
            RegistrationDate:"YYYY-MM-DD HH:MM"
        },
        {
            id: 2,
            Country: "대한민국",
            Region: "서울",
            Tourtitle: "경국사에서 템플스테이",
            NickName: "홍수아          ",
            HostDate: "진행중",
            Vacancies: "있음(2)",
            AcceptanceStatus: "공개",
            Disclosure:"공개",
            RegistrationDate:"YYYY-MM-DD HH:MM"
        },
    ]

    const columns = [
        {
            dataField: "id",
            text: "No",

        },
        {
            dataField: "Country",
            text: "국가",

        },
        {
            dataField: "Region",
            text: "지역",

        },
        {
            dataField: "Tourtitle",
            text: "여행제목",

        },
        {
            dataField: "NickName",
            text: "닉네임",

        },
        {
            dataField: "HostDate",
            text: "여행 일정",

        },
        {
            dataField: "Vacancies",
            text: "잔여인원",

        },
        {
            dataField: "Status",
            text: "진행 상태",
            formatter: DateFollow,
        },
        {
            dataField: "Disclosure",
            text: "공개 상태",

        },
        {
            dataField: "RegistrationDate",
            text: "등록일",

        },
        {
            dataField: "Manage",
            text: "작성일",
            formatter: linkFollow,

        },
    ];

    const customTotal = (from: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined, to: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined, size: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined) => (
        <span className="react-bootstrap-table-pagination-total">
            Showing {from} to {to} of {size} Results
        </span>
    )


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
                <div><h5 className="font-27-bold"> 총 <span className="span-color-pink"> 100 </span> 개</h5></div>

                {/* <Buttons
                    type="submit"
                    children="등록"
                    ButtonStyle="Register-button ml-auto"
                    onClick={()=>{}}
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


export default HostedItineryList
