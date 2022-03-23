import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory } from 'react-router-dom'
import Buttons from "../../component/Buttons/Buttons";

const ReviewMangList = (props:any) => {

  
  const history = useHistory();
  

  const DetailReview = (row: any) => {
    console.log("row", row);
    history.push('/review-details');
  }


  const linkFollow = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
    return (
      <Buttons
        type="submit"
        children="관리"
        ButtonStyle="rounded-0 bg-custom-black"
        onClick={() => DetailReview(row)}
      />
    );
  }


  const products = [
      {
        id:1,
        ReviewName:"조원상",
        ReviewTour:"경국사에서 템플스테이",
        ReviewHost:"홍길동",
        ReviewStar:"5.0",
        Review:"마음이 복잡했는데 편안해진 템플스테이였습니다.",
        ReviewDate:"YYYY-MM-DD HH:MM",

      },
  ]

  const columns = [
    {
      dataField: "id",
      text: "No",

    },
    {
      dataField: "ReviewName",
      text: "이름",


    },
    {
      dataField: "ReviewTour",
      text: "여행 제목",
      // formatter: priceFormatter,

    },
    {
      dataField: "ReviewHost",
      text: "호스트",

    },
    {
      dataField: "ReviewStar",
      text: "별점",

    },
    {
      dataField: "Review",
      text: "리뷰",

    },
    {
      dataField: "ReviewDate",
      text: "등록일시",

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
        <div><h5 className="font-27-bold">Total <span className="span-color-pink"> 100 </span> Results</h5></div>
        
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
export default ReviewMangList
