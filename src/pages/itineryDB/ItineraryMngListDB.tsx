import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory } from 'react-router-dom'
import Buttons from "../../component/Buttons/Buttons";
import InputField from "../../component/InputField/InputField";
import RemotePagination from "../../component/RemotePagination/RemotePagination";
import { ApiPost } from "../../helper/API/ApiData";
import { dbManagment } from "./ItineraryMngDB";

interface Props {
  data: dbManagment[];
  getDbManagment: (page: any, sizePerPage: any) => void;
  totalSize?: number;
  ltineraryRegBtn?: any;
}


export const ItineraryMngListDB: React.FC<Props> = ({ data, getDbManagment, totalSize }) => {

  const [selectedFile, setSelectedFile] = useState<File>()

  const history = useHistory();

  const ViewProfile = (row: any) => {
    // console.log("row", row);
    history.push(`/Itinerary-mngDB-reg/${row.id}`);
  }

  // getDbManagment(1, 10)


  const linkFollow = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
    return (
      <Buttons
        type="submit"
        children="보기"
        ButtonStyle="rounded-0 bg-custom-black"
        onClick={() => ViewProfile(row)}
      />
    );
  }


  const DBmngList = [
    {
      id: 1,
      ItineraryDB_Serial: "c2021030201",
      ItineraryDB_Country: "대한민국",
      ItineraryDB_Region: "서울",
      ItineraryDB_Category: "카테고리1",
      ItineraryDB_Name: "경국사에서 템플스테이",

    },
  ];

  const DbMngListHead = [
    {
      dataField: "no_id",
      text: "No",

    },
    {
      dataField: "id",
      text: "고유번호",


    },
    {
      dataField: "country",
      text: "국가",


    },
    {
      dataField: "region",
      text: "지역",
      // DBformatter: priceFormatterDB,

    },
    {
      dataField: "category",
      text: "카테고리",

    },
    {
      dataField: "name",
      text: "이름",

    },

    {
      dataField: "Itinerary_Manage",
      text: "상세",
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
      text: 'All', value: DBmngList.length
    }]
  };


  useEffect(() => {
    console.log("file...", selectedFile);

    ltineraryRegBtn()
  }, [selectedFile])

  const ltineraryRegBtn = () => {
    // history.push('/itinerary-management-reg');
    let formData = new FormData()

    if (selectedFile) {
      formData.append("first_name", selectedFile);
    }

    ApiPost(`general/importCourses`, formData).then((res: any) => {
      console.log("imported", res);
    });
    // formData.append("last_name", userdata.last_name);
    // formData.append("user_name", userdata.user_name);
    // formData.append("mobile", userdata.countryCode.value + " " + userdata.mobile);

  }

  const handleTableChange = (pagenumber: number, sizeperpage: number) => {
    getDbManagment(pagenumber, sizeperpage)
  }


  return (
    <>
      <div className="py-2 total-results mt-4 mb-3 d-flex">
        <div><h5 className="font-27-bold">총 <span className="span-color-pink"> {totalSize} </span> 개</h5></div>
        <div className="reg-memberbtn ml-auto d-flex align-items-center">

          <div className="excel-import-info">새로운 엑셀 파일 Import 시 기존 DB 는 삭제됩니다. </div>
          <div>
            {/* <Buttons
              type="submit"
              children="엑셀 파일 IMPORT"
              ButtonStyle="csvimprort-btn ml-auto font-16-bold text-white"
              onClick={ltineraryRegBtn} /> */}
            <label className="csvimprort-lable ml-auto font-16-bold text-white">
            엑셀 파일 IMPORT
              <InputField
                label=""
                fromrowStyleclass=""
                name=""
                value=""
                placeholder="piyush"
                type="file"
                InputstyleClass=" d-none"
                lablestyleClass=""
                onChange={(e: any) => {
                  if (!e.target.files || e.target.files.length === 0) {
                    setSelectedFile(undefined);
                    return;
                  }
                  setSelectedFile(e.target.files[0]);
                }}
              />
            </label>

          </div>

        </div>
      </div>
      <div className="App text-center">

        <RemotePagination
          data={data}
          columns={DbMngListHead}
          totalSize={totalSize ?? 0}
          onTableChange={(page, sizePerPage) => handleTableChange(page, sizePerPage)}
          pagesizedropdownflag
        />
      </div>
    </>
  );
}
