import React from "react";
import { useHistory } from 'react-router-dom'
import Buttons from "../../component/Buttons/Buttons";
import RemotePagination from "../../component/RemotePagination/RemotePagination";
import { ApiGet } from "../../helper/API/ApiData";
import { userManagment } from "./UserManagement";

interface Props {
    data: userManagment[];
    getUserManagment: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    ltineraryRegBtn?: any;
}

const UserMagList: React.FC<Props> = ({ data, getUserManagment, totalSize, ltineraryRegBtn }) => {
    const history = useHistory();


    // console.log("data",data);
    const userManage = (row: any) => {
        history.push(`/user-management-edit/${row.id}`);
    }


    const linkFollow = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
            <Buttons
                type="button"
                children="관리"
                ButtonStyle="rounded-0 bg-custom-black"
                onClick={() => userManage(row)}
            />
        );
    }

    const DbMngListHead = [
        {
            dataField: "no_id",
            text: "No",
        },
        {
            dataField: "user_Name",
            text: "이름",
        },
        {
            dataField: "user_Nick",
            text: "닉네임",
        },
        {
            dataField: "user_email",
            text: "이메일 주소",
        },
        {
            dataField: "user_Mo",
            text: "휴대폰 번호",
        },
        {
            dataField: "user_National",
            text: "국적",
        },
        {
            dataField: "user_Hosting",
            text: "호스팅한 여행",
        },
        {
            dataField: "user_SignDate",
            text: "가입일",
        },
        {
            dataField: "Itinerary_Manage",
            text: "관리",
            formatter: linkFollow,
        },
    ];


    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getUserManagment(pagenumber, sizeperpage)
    }

    return (
        <>
            <div className="py-2 total-results mt-4 mb-3 d-flex">
                <div><h5 className="font-27-bold">총 <span className="span-color-pink"> {totalSize ?? 0} </span> 개
                </h5>
                </div>
                

                <div className="reg-memberbtn ml-auto">

                <Buttons
                    type="submit"
                    children="회원 등록하기"
                    ButtonStyle="Register-button-small ml-auto"
                    onClick={() => { }}
                />

                    <Buttons
                        type="submit"
                        children="전체 회원 엑셀 파일 다운로드"
                        ButtonStyle="csvexport-btn ml-auto"
                        onClick={ltineraryRegBtn} />

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
export default UserMagList
