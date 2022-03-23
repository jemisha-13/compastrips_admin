import React from "react";
import { useHistory } from 'react-router-dom'
import Buttons from "../../component/Buttons/Buttons";
import RemotePagination from "../../component/RemotePagination/RemotePagination";
import { intineraryProduct } from "./ItineraryMng";
interface Props{
  data:intineraryProduct[],
  getItineraries:(page:any,sizePerPage:any) => void,
  totalSize:number
}

const ItineraryMngList : React.FC<Props> = ({data,getItineraries,totalSize}) => {
   
  const history = useHistory(); 

  const DetailProfile = (row: any) => {
    history.push(`/itinerary-management-reg/${row.id}`);

  }
  const handleTableChange = (pagenumber:number,sizeperpage:number) => {
    getItineraries(pagenumber,sizeperpage)
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
  
  const columns = [
    {
      dataField: "no_id",
      text: "No",

    },
    {
      dataField: "Itinerary_Country",
      text: "국가",


    },
    {
      dataField: "Itinerary_Region",
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

  const ltineraryRegBtn = () => {
    history.push('/itinerary-management-reg');
  }

  return (
    <>
      <div className="py-2 total-results mt-4 mb-3 d-flex">
        <div><h5 className="font-27-bold">총 <span className="span-color-pink"> {totalSize ?? 0} </span> 개</h5></div>
        <div className="reg-memberbtn ml-auto">
          <Buttons
            type="file"
            children="등록하기"
            ButtonStyle="search-button ml-auto"
            onClick={()=>{}} />
        </div>
      </div>
      <div className="App text-center">
          <RemotePagination
            data={ data }
            columns={columns}
            totalSize={ totalSize ?? 0 }
            onTableChange={(page,sizePerPage) => handleTableChange(page,sizePerPage)}
            pagesizedropdownflag
            />
      </div>
    </>
  );
}
export default ItineraryMngList
