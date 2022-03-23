import React, { Key, useEffect, useState } from "react";
import { Container, Col, Row, Form, InputGroup, Modal } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import Buttons from "../../component/Buttons/Buttons";
import InputField from "../../component/InputField/InputField";
import swal from "sweetalert";
import { ApiGet, ApiGetNoAuth, ApiPatch, ApiPost, ApiPut } from "../../helper/API/ApiData";
import moment from "moment";
import RemotePagination from "../../component/RemotePagination/RemotePagination";
import UploadPic from '../../img/uploadpic.png'
import Select from "react-select";
export interface commonHistory {
    id: string;
    HostHisContry: string;
    HostHisTour: string;
    HostHisStatus: string;
    HostHisPax: string;
}
export interface ItineryWish {
    id: string;
    HostHisContry: string;
    HostHisTour: string;
}
export interface HostWish {
    id: string;
    HostWishNick: string;
    HostWishType: string;
    HostWishNational: string;
    HostWishGender: string;
    HostWishAge: string;
}

interface selectOption {
    value: string;
    label: string;
}

const UserMagReg = () => {
    const history = useHistory();
    const [userhost, setuserhost] = useState(false);
    const [userhostApp, setuserhostApp] = useState(false);
    const [userhostwish, setuserhostwish] = useState(false);
    const [hostHistoryData, sethostHistoryData] = useState<commonHistory[]>([]);
    const [totalHostHistory, setTotalHostHistory] = useState(Number);
    const [userAppliedHostingData, setuserAppliedHostingData] = useState<
        commonHistory[]
    >([]);
    const [totalUserAppliedHostingData, setTotalUserAppliedHosting] = useState();
    const [ItineryWish, setItineraryWishData] = useState<ItineryWish[]>([]);
    const [totalItineryWish, setTotalItineraryWish] = useState();
    const [HostWish, setHostWishData] = useState<HostWish[]>([]);
    const [totalhostWish, setTotalHostWishData] = useState();
    const [selectedFile, setSelectedFile] = useState<File>();

    const [imgSrc, setImgSrc] = useState(UploadPic);

    const [userdata, setuserData] = useState<any>({
        id: "",
        avatar: "",
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        password: "",
        nationality: "",
        gender: "",
        dob: "",
        mobile: "",
        countryCode: "",
        hosting: "",
        signdate: "",
        note: "",
    });

    const [countryCode, setCountryCode] = useState<selectOption[]>([]);

    var { id }: any = useParams();

    // effects

    
    useEffect(() => {
        getCountryData();
    }, [])
    
    useEffect(() => {
        getUserManagementById();
    }, [countryCode]);

    useEffect(() => {
        if (!selectedFile) {

            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);

        setImgSrc(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);


    const getCountryData = () => {
        ApiGetNoAuth("general/country").then((res: any) => {
            setCountryCode(
                res.data.map((x: any) => {
                    return {
                        value: `+${x.code.toString()}`,
                        label: `+(${x.code.toString()}) ${x.name}`,
                    };
                })
            )
        })
            .catch(error => {
                console.log(error);
            })
    }

    // useEffect(() => {
    //     console.log("userdata", userdata);

    // }, [userdata])

    const gethostHistoryDataById = (pagenumber = 1, sizeperpage = 10) => {
        setuserhost(true);
        if (id) {
            ApiGet(
                `admin/userHostingHistory/${id}?per_page=${sizeperpage}&page_number=${pagenumber}`
            ).then((res: any) => {
                // console.log("Hosting history: ", res.data);

                setTotalHostHistory(res.data.count);
                sethostHistoryData(
                    res.data.hosting.map((x: any, index: any) => {
                        return {
                            id: x.id,
                            no_id: (res.data.count - ((pagenumber - 1) * sizeperpage)) - index,
                            HostHisContry: x.country,
                            HostHisTour: x.title,
                            HostHisStatus: x.status,
                            HostHisPax: `전체${x.pax},참석${x.participate_count}`,
                            HostHisDate: `${x.date}|${x.start_time}|${x.end_time}`,
                        };
                    })
                );
            });
        }
    };
    const handleTableChangeHostHistory = (
        pagenumber: number,
        sizeperpage: number
    ) => {
        gethostHistoryDataById(pagenumber, sizeperpage);
    };
    const getuserAppliedHosting = (pagenumber = 1, sizeperpage = 10) => {
        setuserhostApp(true);
        if (id) {
            ApiGet(
                `admin/userAppliedHosting/${id}?per_page=${sizeperpage}&page_number=${pagenumber}`
            ).then((res: any) => {
                // console.log("applied hostings: ", res.data);
                setTotalUserAppliedHosting(res.data.count);
                setuserAppliedHostingData(
                    res.data.participant.map((x: any, index: any) => {
                        return {
                            id: x.id,
                            no_id: (res.data.count - ((pagenumber - 1) * sizeperpage)) - index,
                            HostHisContry: x.country,
                            HostHisTour: x.title,
                            HostHisStatus: x.status,
                            HostHisPax: `전체${x.pax},참석${x.participate_count}`,
                            HostHisDate: `${x.date}|${x.start_time}|${x.end_time}`,
                        };
                    })
                );
            });
        }
    };
    const handleTableChangeuserAppliedHosting = (
        pagenumber: number,
        sizeperpage: number
    ) => {
        getuserAppliedHosting(pagenumber, sizeperpage);
    };

    //HostWish && ItineryWish

    const handleTableChangeHostWish = (
        pagenumber: number,
        sizeperpage: number
    ) => {
        getuserhostwishById(pagenumber, sizeperpage, "hostwish");
    };
    const handleTableChangeItineryWish = (
        pagenumber: number,
        sizeperpage: number
    ) => {
        getuserhostwishById(pagenumber, sizeperpage, "itineryWish");
    };
    const getuserhostwishById = (
        pagenumber = 1,
        sizeperpage = 10,
        type = "both"
    ) => {
        setuserhostwish(true);
        if (id) {
            if (type == "both" || type == "itineryWish") {
                ApiGet(
                    `admin/getItineraryWishlist/${id}?per_page=${sizeperpage}&page_number=${pagenumber}`
                ).then((res: any) => {
                    setTotalItineraryWish(res && res.data && res.data.count);
                    setItineraryWishData(
                        res.data.itinerary.map((x: any, index: any) => {
                            return {
                                id: x.id,
                                no_id: (res.data.count - ((pagenumber - 1) * sizeperpage)) - index,
                                HostWishContry: x.country,
                                HostWishTour: x.title,
                            };
                        })
                    );
                });
            }
            if (type == "both" || type == "hostwish") {
                ApiGet(
                    `admin/getHostWishlist/${id}?per_page=${sizeperpage}&page_number=${pagenumber}`
                ).then((res: any) => {
                    setTotalHostWishData(res && res.data && res.data.count);
                    setHostWishData(
                        res.data.host.map((x: any, index: any) => {
                            return {
                                id: x.id,
                                no_id: (res.data.count - ((pagenumber - 1) * sizeperpage)) - index,
                                HostWishNick: x.nickname,
                                HostWishType: x.host_type,
                                HostWishNational: x.nationality,
                                HostWishGender: x.gender,
                                HostWishAge: x.age_group,
                            };
                        })
                    );
                });
            }
        }
    };
    const getUserManagementById = () => {
        ApiGet(`user/${id}`)
            .then((res: any) => {
                const label = countryCode?.filter(x => x.value === res.data.mobile.split(" ")[0])[0]?.label
                const value = res.data.mobile.split(" ")[0]
                let data = {
                    id: res.data.id,
                    avatar: res.data.avatar,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    user_name: res.data.user_name,
                    email: res.data.email,
                    password: "",
                    nationality: res.data.nationality,
                    gender: res.data.gender,
                    dob: res.data.dob,
                    mobile: res.data.mobile.split(" ")[1],
                    countryCode: { value, label },
                    hosting: res.data.my_hosting,
                    signdate: moment(res.data.signUp).format("YYYY-MM-DD"),
                    note: res.data.note,
                    coming_up: res.data.count.coming_up,
                    completed: res.data.count.completed,
                    standing_by: res.data.count.standing_by,
                    accepted: res.data.count.accepted,
                    declined: res.data.count.declined,
                    tour: res.data.count.tour,
                    host: res.data.count.host,
                };
                setImgSrc(data.avatar || UploadPic)
                setuserData(data)
            })
            .catch();
    };

    useEffect(() => {
        console.log("userdata: ", userdata);

    }, [userdata])

    const handleChange = (e: any, key: string) => {
        console.log("eee", key, e.target.value);
        
        setuserData((prev: any) => {
            return {
                ...prev,
                [key]: e.target.value,
            };
        });
    };

    const BacktoUserMag = () => {
        history.push("/user-management");
    };

    const Saveuser = () => {
        let formData = new FormData();

        formData.append("first_name", userdata.first_name);
        formData.append("last_name", userdata.last_name);
        formData.append("user_name", userdata.user_name);
        formData.append("mobile", userdata.countryCode.value + " " + userdata.mobile);
        if (selectedFile) {
            formData.append('avatar', selectedFile);
        }
        // console.log("userdata.countryCode", userdata.countryCode.value);

        ApiPut(`admin/note?user=${id}`, { note: userdata.note })


        ApiPatch(`admin/editUser?id=${id}`, formData).then((res: any) => {
            swal("저장 완료", "저장이 완료되었습니다!", {});
        });


        if (userdata.note != undefined) {
            ApiPut(`admin/note?user=${id}`, { "note": userdata.note })
                .then((res: any) => {
                    swal("저장 완료", "저장이 완료되었습니다!", {
                    });
                })
        } else {
            return;
        }
    };

    const DeleteuserMng = () => {
        swal({
            title: "회원정보 삭제",
            text: "회원정보를 삭제하시겠습니까? 삭제 시 복구가 불가합니다.",

            buttons: ["취소", "삭제"],
            // dangerMode: true,
        }).then((willDelete: any) => {
            if (willDelete) {
                ApiPatch(`admin/auth/deleteUser/${id}`, null).then((res: any) => {
                    swal("삭제 완료", "삭제되었습니다.", {}).then((data) => {
                        BacktoUserMag();
                    });
                });
            }
        });
    };

    const HostHisdate = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        const all_date = cell.split('|')
        const date = new Date(all_date[0])

        return (
            <div className="flex table-review-img">
                <p className="font-16-bold mb-0 color-40">
                    {all_date[0].replaceAll('-', '.')} ( {date.toLocaleString('ko-KR', { weekday: 'long' })} ) </p>
                <p className="font-16-bold mb-0 color-40">{all_date[1].slice(0, 5)} - {all_date[2].slice(0, 5)}</p>
            </div>
        );
    };
    const host_his_head = [
        {
            dataField: "no_id",
            text: "No",
        },
        {
            dataField: "HostHisContry",
            text: "국가",
        },
        {
            dataField: "HostHisTour",
            text: "여행제목",
        },
        {
            dataField: "HostHisStatus",
            text: "진행 상태",
        },
        {
            dataField: "HostHisPax",
            text: "여행 인원",
        },
        {
            dataField: "HostHisDate",
            text: "여행일정",
            formatter: HostHisdate,
        },
    ];

    const ItineryWishHead = [
        {
            dataField: "no_id",
            text: "No",
        },
        {
            dataField: "HostWishContry",
            text: "국가",
        },
        {
            dataField: "HostWishTour",
            text: "여행제목",
        },
    ];

    const HostWishHead = [
        {
            dataField: "no_id",
            text: "No",
        },
        {
            dataField: "HostWishNick",
            text: "호스트 이름",
        },
        {
            dataField: "HostWishType",
            text: "호스트 타입",
        },
        {
            dataField: "HostWishNational",
            text: "국적",
        },
        {
            dataField: "HostWishGender",
            text: "성별",
        },
        {
            dataField: "HostWishAge",
            text: "연령대",
        },
    ];

    return (
        <>
            <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">회원 관리</h2>
                </div>
            </div>
            <Container fluid className="creator-table ">
                <Row className=" pl-md-3 pt-5 mt-4 mt-md-0 pb-5 ">
                    <Col lg={12}>
                        <div className="overflow-table pt-5">
                            <Col md={12} className="pb-3 pl-0  text-left align-items-center">
                                <h4 className=" font-25-bold">기본 회원정보</h4>
                            </Col>
                            <Form className="user_mngform">
                                <Container fluid className="mt-2  mb-5 border-tabel-b1">
                                    <Row>
                                        <Col md={3} className=" yellow-bg-table font-18-bold">
                                            프로필 이미지
                                        </Col>
                                        <Col
                                            md={9}
                                            className="profile-table-td-input align-items-center"
                                        >
                                            <div className="py-3 position-relative">
                                                <img
                                                    src={imgSrc}
                                                    alt="Profile"
                                                    id="usermng-profile"
                                                />

                                                <InputField
                                                    label=""
                                                    fromrowStyleclass=""
                                                    name=""
                                                    value=""
                                                    placeholder=""
                                                    type="file"
                                                    InputstyleClass="custom-file-input"
                                                    lablestyleClass=""
                                                    onChange={(e: any) => {
                                                        if (!e.target.files || e.target.files.length === 0) {
                                                            setSelectedFile(undefined);
                                                            return;
                                                        }
                                                        setSelectedFile(e.target.files[0]);
                                                    }}
                                                />
                                            </div>
                                        </Col>

                                        <Col md={3} className=" yellow-bg-table font-18-bold">
                                            이름
                                        </Col>
                                        <Col
                                            md={9}
                                            className="profile-table-td-input align-items-center"
                                        >
                                            <div className="py-3 d-md-flex">
                                                <InputField
                                                    name="firstname"
                                                    value={userdata.first_name}
                                                    lablestyleClass=""
                                                    InputstyleClass="mb-0 usermng-name custom-place"
                                                    onChange={(e) => {
                                                        handleChange(e, "first_name");
                                                    }}
                                                    label=""
                                                    placeholder="재영"
                                                    type="text"
                                                    fromrowStyleclass=""
                                                />
                                                <InputField
                                                    name="lastname"
                                                    value={userdata.last_name}
                                                    lablestyleClass=""
                                                    InputstyleClass="mb-0 usermng-name custom-place"
                                                    onChange={(e) => handleChange(e, "last_name")}
                                                    label=""
                                                    placeholder="이"
                                                    type="text"
                                                    fromrowStyleclass=""
                                                />
                                            </div>
                                        </Col>

                                        <Col md={3} className=" yellow-bg-table font-18-bold">
                                            닉네임
                                        </Col>
                                        <Col
                                            md={9}
                                            className="profile-table-td-input align-items-center"
                                        >
                                            <div className="py-3">
                                                <InputField
                                                    name="username"
                                                    value={userdata.user_name}
                                                    lablestyleClass=""
                                                    InputstyleClass="mb-0 userinputs custom-place"
                                                    onChange={(e) => handleChange(e, "user_name")}
                                                    label=""
                                                    placeholder="재영"
                                                    type="text"
                                                    fromrowStyleclass=""
                                                />
                                            </div>
                                        </Col>

                                        <Col md={3} className=" yellow-bg-table font-18-bold">
                                            이메일 주소
                                        </Col>
                                        <Col
                                            md={9}
                                            className="profile-table-td-input align-items-center"
                                        >
                                            <div className="py-3">
                                                <InputGroup className="mb-2">
                                                    <InputGroup.Text className="userinputs disble">
                                                        {userdata.email}
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </div>
                                        </Col>

                                        <Col md={3} className=" yellow-bg-table font-18-bold">
                                            Password
                                        </Col>
                                        <Col
                                            md={9}
                                            className="profile-table-td-input align-items-center"
                                        >
                                            <div className="py-3">
                                                <InputGroup className="mb-2">
                                                    <InputGroup.Text className="userinputs disble">
                                                        ********
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </div>
                                            {/* <div className="py-3">
                                                <InputField
                                                    name="date"
                                                    value={userdata.password}
                                                    lablestyleClass=""
                                                    InputstyleClass="mb-0 userinputs custom-place"
                                                    onChange={(e)=>handleChange(e,"password")}
                                                    label=""
                                                    placeholder="jaeyojae123"
                                                    type="text"
                                                    fromrowStyleclass=""
                                                />

                                            </div> */}
                                        </Col>

                                        <Col md={3} className=" yellow-bg-table font-18-bold">
                                            국적
                                        </Col>
                                        <Col
                                            md={9}
                                            className="profile-table-td-input align-items-center"
                                        >
                                            <div className="py-3">
                                                <InputGroup>
                                                    <InputGroup.Text className="userinputs custom-place disble">
                                                        {userdata.nationality}
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </div>
                                        </Col>

                                        <Col md={3} className=" yellow-bg-table font-18-bold">
                                            성별
                                        </Col>
                                        <Col
                                            md={9}
                                            className="profile-table-td-input align-items-center"
                                        >
                                            <div className="py-3">
                                                <InputGroup>
                                                    <InputGroup.Text className="userinputs  custom-place disble">
                                                        {userdata.gender}
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </div>
                                        </Col>

                                        <Col md={3} className=" yellow-bg-table font-18-bold">
                                            생년월일
                                        </Col>
                                        <Col
                                            md={9}
                                            className="profile-table-td-input align-items-center"
                                        >
                                            <div className="py-3 d-md-flex">
                                                <InputGroup>
                                                    <InputGroup.Text className="userbdayinputs disble custom-place">
                                                        {userdata.dob.slice(0, 4)}
                                                    </InputGroup.Text>
                                                    <InputGroup.Text className="userbdayinputs disble custom-place">
                                                        {userdata.dob.slice(5, 7)}
                                                    </InputGroup.Text>
                                                    <InputGroup.Text className="userbdayinputs disble custom-place">
                                                        {userdata.dob.slice(8, 10)}
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </div>
                                        </Col>

                                        <Col md={3} className=" yellow-bg-table font-18-bold">
                                            휴대폰 번호
                                        </Col>
                                        <Col
                                            md={9}
                                            className="profile-table-td-input align-items-center"
                                        >
                                            <div className="py-3 d-md-flex">
                                                <Select
                                                    options={countryCode}
                                                    name="countryCode"
                                                    value={userdata.countryCode}
                                                    lablestyleClass=""
                                                    label=""
                                                    InputstyleClass="mb-0 usermng-name custom-place"
                                                    onChange={(e) => handleChange(e, "countryCode")}
                                                    placeholder="(+82) 대한민국 "
                                                    type="text"
                                                    fromrowStyleclass=""
                                                >

                                                </Select>
                                                <InputField
                                                    name="date"
                                                    value={userdata.mobile}
                                                    lablestyleClass=""
                                                    InputstyleClass="mb-0 usermng-name custom-place"
                                                    onChange={(e) => handleChange(e, "mobile")}
                                                    label=""
                                                    placeholder="10-1111-1111"
                                                    type="text"
                                                    fromrowStyleclass=""
                                                />
                                            </div>
                                        </Col>

                                        <Col md={3} className=" yellow-bg-table font-18-bold">
                                            가입일
                                        </Col>
                                        <Col
                                            md={9}
                                            className="profile-table-td-input align-items-center"
                                        >
                                            <p className="mb-0 nondisbale">{userdata.signdate}</p>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </div>
                    </Col>

                    <Col lg={12}>
                        <Form>
                            <div className="overflow-table">
                                <Col xs={12} className="pb-3 pl-0">
                                    <h4 className=" font-25-bold">활동 내역</h4>
                                </Col>

                                <Container fluid className="mt-2 mb-5 border-tabel-b1">
                                    <Row>
                                        <Col md={3} className="yellow-bg-table font-18-bold">
                                            호스팅한 여행
                                        </Col>
                                        <Col md={9} className="profile-table-td-input d-lg-flex">
                                            <p className="mb-0 px-2 ">
                                                진행중 <span className="span-color-pink"> {userdata.coming_up} </span> |
                                                종료 <span className="span-color-pink"> {userdata.completed} </span>
                                            </p>
                                            <Buttons
                                                type="button"
                                                // children="목록으로"
                                                children="내역보기"
                                                ButtonStyle="modal-btn-user font-16-bold text-white"
                                                onClick={() => gethostHistoryDataById()}
                                            />
                                        </Col>

                                        <Col md={3} className="yellow-bg-table font-18-bold">
                                            여행 참석 신청
                                        </Col>
                                        <Col md={9} className="profile-table-td-input d-lg-flex">
                                            <p className="mb-0 px-2 ">
                                                승인 전 <span className="span-color-pink"> {userdata.standing_by} </span> |
                                                승인완료 <span className="span-color-pink"> {userdata.accepted} </span>
                                                ㅣ승인불가 <span className="span-color-pink"> {userdata.declined} </span>
                                            </p>
                                            <Buttons
                                                type="button"
                                                // children="목록으로"
                                                children="내역보기"
                                                ButtonStyle="modal-btn-user font-16-bold text-white"
                                                onClick={() => getuserAppliedHosting()}
                                            />
                                        </Col>

                                        <Col md={3} className="yellow-bg-table font-18-bold">
                                            찜
                                        </Col>
                                        <Col md={9} className="profile-table-td-input d-lg-flex">
                                            <p className="mb-0 px-2">
                                                여행일정 <span className="span-color-pink"> {userdata.tour} </span> |
                                                호스트 <span className="span-color-pink"> {userdata.host} </span>
                                            </p>
                                            <Buttons
                                                type="button"
                                                // children="목록으로"
                                                children="내역보기"
                                                ButtonStyle="modal-btn-user font-16-bold text-white"
                                                // onClick={() => { return setuserhostwish(true); }}
                                                onClick={() => getuserhostwishById()}
                                            />
                                        </Col>
                                    </Row>
                                </Container>
                                <Col className="textarea-border"></Col>
                            </div>
                        </Form>
                    </Col>

                    <Col lg={12} className="mt-5">
                        <Container fluid className="mt-1 border-tabel-b1">
                            <Row>
                                <Col md={3} className="yellow-bg-table font-18-bold">
                                    관리자 메모
                                </Col>
                                <Col md={9} className="profile-table-td-input">
                                    <div className="py-3">
                                        <InputField
                                            name="text"
                                            value={userdata.note}
                                            lablestyleClass=""
                                            InputstyleClass="mb-0 manage-datepicker"
                                            onChange={(e) => handleChange(e, "note")}
                                            // onChange={handleChange}
                                            label=""
                                            placeholder=""
                                            type="textarea"
                                            fromrowStyleclass=""
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>

                    <Col md={12} className="pb-3 pl-0 pt-5 w-100">
                        <div className="text-center">
                            <Buttons
                                type="submit"
                                children="목록"
                                ButtonStyle="border-button font-22-bold"
                                onClick={BacktoUserMag}
                            />

                            <Buttons
                                type="submit"
                                children="저장"
                                ButtonStyle="modal-pink-button font-22-bold"
                                onClick={() => {
                                    Saveuser();
                                }}
                            />

                            <Buttons
                                type="submit"
                                children="삭제"
                                ButtonStyle="border-button font-22-bold"
                                onClick={DeleteuserMng}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal
                show={userhost}
                onHide={() => {
                    setuserhost(false);
                }}
                dialogClassName="modal-80w my_his_modal"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="">
                    <Col md={12}>
                        <div className="center-modal-title">
                            <h6>호스팅한 여행 내역</h6>
                        </div>
                    </Col>
                    <Col className="overflow-table ">
                        <div className="App text-center">
                            <RemotePagination
                                data={hostHistoryData}
                                columns={host_his_head}
                                totalSize={totalHostHistory ?? 0}
                                onTableChange={(page, sizePerPage) =>
                                    handleTableChangeHostHistory(page, sizePerPage)
                                }
                                pagesizedropdownflag={false}
                            />
                        </div>
                    </Col>
                </Modal.Body>
            </Modal>

            <Modal
                show={userhostApp}
                onHide={() => {
                    setuserhostApp(false);
                }}
                dialogClassName="modal-80w my_his_modal"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="">
                    <Col md={12}>
                        <div className="center-modal-title">
                            <h6>여행 참석신청 내역</h6>
                        </div>
                    </Col>
                    <Col className="overflow-table ">
                        <div className="App text-center">
                            <RemotePagination
                                data={userAppliedHostingData}
                                columns={host_his_head}
                                totalSize={totalUserAppliedHostingData ?? 0}
                                onTableChange={(page, sizePerPage) =>
                                    handleTableChangeuserAppliedHosting(page, sizePerPage)
                                }
                                pagesizedropdownflag={false}
                            />
                        </div>
                    </Col>
                </Modal.Body>
            </Modal>

            <Modal
                show={userhostwish}
                onHide={() => {
                    setuserhostwish(false);
                }}
                dialogClassName="modal-80w my_his_modal"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="">
                    <Col md={12}>
                        <div className="center-modal-title">
                            <h6>찜한 내역</h6>
                        </div>
                    </Col>
                    <Col className="overflow-table ">
                        <div className="App text-center">
                            <RemotePagination
                                data={ItineryWish}
                                columns={ItineryWishHead}
                                totalSize={totalItineryWish ?? 0}
                                onTableChange={(page, sizePerPage) =>
                                    handleTableChangeItineryWish(page, sizePerPage)
                                }
                                pagesizedropdownflag={false}
                            />
                        </div>
                    </Col>

                    <Col className="overflow-table mt-5">
                        <div className="App text-center">
                            <RemotePagination
                                data={HostWish}
                                columns={HostWishHead}
                                totalSize={totalhostWish ?? 0}
                                onTableChange={(page, sizePerPage) =>
                                    handleTableChangeHostWish(page, sizePerPage)
                                }
                                pagesizedropdownflag={false}
                            />
                        </div>
                    </Col>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserMagReg;
