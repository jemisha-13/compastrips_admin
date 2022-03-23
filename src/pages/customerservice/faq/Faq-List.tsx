import React, { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory } from 'react-router-dom'
import Buttons from "../../../component/Buttons/Buttons";
import RegisterFaq from "./RegisterFaq";


const FaqList = (props: any) => {


    const history = useHistory();


    const RegisterFaq = (row: any) => {
        console.log("row", row);
        history.push('/register-Faq');
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

    function priceFormatter(cell: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined, row: any) {

        return (
            <strong style={{ color: '#B931B8' }}>{cell}</strong>
        );
    }


    const products = [
        {
            Faq_id: 1,
            Faq_Title: "호스트가 되려면 어떻게 해야하나요?",
            Faq_Views: "156",
            Faq_RegisteredDate: "YYYY-MM-DD HH:MM",

        },
    ]

    const columns = [
        {
            dataField: "Faq_id",
            text: "No",

        },
        {
            dataField: "Faq_Title",
            text: "제목",
            formatter:priceFormatter,

        },
        {
            dataField: "Faq_Views",
            text: "조회수",

        },
        {
            dataField: "Faq_RegisteredDate",
            text: "등록일/최근 수정일",

        },
        {
            dataField: "ReviewManage",
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

                <Buttons
                    type="submit"
                    children="등록"
                    ButtonStyle="Register-button ml-auto"
                    onClick={() => {}}
                         />

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
export default FaqList