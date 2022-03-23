import React, { useEffect, useState } from "react";
import { Row, Container, Col, Form, Modal, Image } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import DatePicker from "react-datepicker";
import Buttons from "../../component/Buttons/Buttons";
import InputField from "../../component/InputField/InputField";
import { InputGroup } from "react-bootstrap"

import RadioButton from "../../component/radiobutton/RadioButton";
import swal from "sweetalert";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router";
import CheckBox from "../../component/checkbox/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { ApiDelete, ApiGet, ApiPost, ApiPut } from "../../helper/API/ApiData";
import moment from "moment";
import { itineraryCommon } from "./ItineraryMng";
// import ItineraryToutDetail from './ItineraryTourDetail';
import ItineraryTourDetail from "./ItineraryTourDetail";
import { resolve } from "dns";
import { useLastLocation } from "react-router-last-location";
import { List } from "react-bootstrap/lib/Media";
import Swal from "sweetalert2";
export interface tourCourses {
  id: string;
  country: string;
  region: string;
  category: string;
  name: string;
  image: any;
  opening_date: string;
  closing_date: string;
  summary: string;
  address: string;
  website: string;
  n_p_transportation: string;
  mobile: string;
}
export interface tourCourseFilters {
  country: string;
  region: string;
  category: string[];
  itnerySearch: string;
}

const ItineraryMngReg = () => {
  ///////////////////////////_____________________States ////////////////////////////
  const history = useHistory();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [showAddItinerary, setshowAddItinerary] = useState(false); // to show hide popup
  const [tourDetailsflag, settourDetailsFlag] = useState(false);
  const [cards, setcardsDetails] = useState<tourCourses>();
  const [tourcoursesDetail, settourcoursesDetail] = useState<tourCourses[]>([]);
  const [tourcoursesCount, settourcoursesCount] = useState<number>(1);
  const [itineryRegion, setItineryRegionData] = useState<itineraryCommon[]>([]);
  const [itineryCategory, setItItineryCategoryData] = useState<
    itineraryCommon[]
  >([]);
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [colorOfError, setcolorOfError] = useState("#b931b8");

  const { id }: any = useParams();
  const [page, setPage] = useState(1);
  const [pagePerSize, setPagePerSize] = useState(8);
  const [pageCount, setPageCount] = useState<number>(1);
  const [defaultNote, setdefaultNote] = useState("");
  const [isNoteChanged, setNoteChange] = useState(false);

  const [state, setState] = useState<any>({
    title: "",
    information: "",
    disclosure: "OPEN",
    creator: "",
    hosted_count: "",
    hosts: [],
    region: "",
    tourcourses: [],
    courseImages: [],
    star: "",
    reviews: [],
    wishlist: "",
    nationality: "aa",
    adminNote: "",
  });
  const [tourCourseFilters, settourCourseFilters] = useState<tourCourseFilters>(
    {
      country: "",
      region: "",
      category: [],
      itnerySearch: "",
    }
  );

  ///////////////////////////////////////

  /////////////////_____________useEffect_________________//////////////

  useEffect(() => {
    settourCourseFilters({
      ...tourCourseFilters,
      category: itineryCategory.filter((x) => x.isSelected).map((y) => y.value),
    });
  }, [itineryCategory]);

  useEffect(() => {
    changeColorOfError();
  }, [state]);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  useEffect(() => {
    console.log("{{{{{{{{{--", itinerary);
    setItinerary(state.tourcourses);
  }, [state]);

  useEffect(() => {
    if (id) getItineraryById();
  }, []);

  useEffect(() => {
    filterTourCourse();
  }, [page]);

  useEffect(() => {
    paginationCount();
  }, [tourcoursesCount]);

  useEffect(() => {
    filterTourCourse();
  }, [tourCourseFilters.category, tourCourseFilters.region]);

  /////////////////////////////////////////

  //____________Functions______________///

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangedisclosure = (e: any) => {
    setState({
      ...state,
      disclosure: e.target.value,
    });
  };

  const handleCategory = (category: itineraryCommon) => {
    setItItineryCategoryData(
      itineryCategory.map((data) => {
        if (data.value == category.value) {
          data.isSelected = !data.isSelected;
        }
        return data;
      })
    );
    console.log("work-done", category);
  };

  const changeColorOfError = () => {
    if (checkUniqueRegionError()) {
      setcolorOfError("#b931b8");
    } else {
      setcolorOfError("red");
    }
  };

  const saveItinery = () => {
    setState({
      ...state,
      tourcourses: itinerary.map((data: any, index: number) => ({
        ...data,
        Tid: index + 1,
        Itinerary_Cate: data.category,
        Itinerary_title: data.name,
      })),
      courseImages: itinerary.map((data: any) => ({
        id: data.id,
        img: data.image,
      })),
    });

    changeColorOfError();

    setshowAddItinerary(false);
  };

  const DetailProfile = (row: any) => {
    getTourCourseById(row.id);
    settourDetailsFlag(true);
  };
  const addItinerary = (e: React.ChangeEvent<HTMLInputElement>, iti: any) => {
    console.log("iti", iti);

    if (e.target.checked) {
      setItinerary([...itinerary, iti]);
    } else {
      setItinerary((prev) =>
        prev.filter((x) => {
          return x.id != iti.id;
        })
      );
    }
    console.log("list", itinerary);
  };

  const checkForCreateItineraryError = () => {
    return !(state.title === "" || state.information === "")

  };
  const createNewItinerary = () => {
    // console.log("state.tourcourses", state.tourcourses);

    //   console.log("checkUniqueRegionError",checkUniqueRegionError());

    // console.log("tourcourseeeeeeeeee",checkForCreateItineraryError());
    if (checkUniqueRegionError() && checkForCreateItineraryError()) {
      setState({
        ...state,
        country: getUniqueCountryFromRegion(),
      })

      const body = {
        "title": state.title,
        "information": state.information,
        "disclosure": state.disclosure,
        "start_date": startDate,
        "end_date": endDate,
        "courses": state.tourcourses.map((course: any) => course.id),
      };

      // console.log("CS", body);


      swal({
        title: "여행 일정 저장",
        text: "입력된 내용으로 저장하시겠습니까?",

        buttons: ["취소", "저장"],
        // dangerMode: true,
      }).then((willSave: any) => {
        if (willSave) {
          ApiPost("itinerary/create", body)
            .then((res: any) => {
              swal("저장 완료", "저장되었습니다.", {});
            })
            .catch((err: any) => {
              if (err) {
              }
            });
        }
      });
    }
  };

  const convertDate = (inputFormat: any) => {
    function pad(s: any) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  };

  const numberOfUniqueRegions = () => {
    const regions = new Set(state.tourcourses.map((x: any) => x.region));
    return regions.size;
  };

  const getUniqueCountryFromRegion = () => {
    if (numberOfUniqueRegions() === 1) {
      const country = state.tourcourses.map((x: any) => x.country);
      return country[0]
    }
    else
      return null;
  }
  const checkUniqueRegionError = () => {
    if (numberOfUniqueRegions() === 1) {
      return true;
    } else return false;
  };



  const modifyItinery = () => {

    if (checkUniqueRegionError()) {
      Swal.fire({
        title: '여행 일정 수정',
        text: "입력된 내용으로 수정하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        reverseButtons: true,
        showCloseButton: true,
      }).

        then((result: { isConfirmed: any; }) => {
          if (result.isConfirmed) {

            const TourCourseIds = state.tourcourses.map(
              (course: any) => course.id
            );

            const data = {
              title: state.title,
              information: state.information,
              disclosure: state.disclosure,
              start_date: convertDate(startDate),
              end_date: convertDate(endDate),
              courses: TourCourseIds,
            };
            // console.log("tourcourses",);
            console.log("isNoteChanged", isNoteChanged);

            if (defaultNote != state.adminNote) {
              ApiPut(`admin/note?itinerary=${id}`, { note: state.adminNote });
            }

            ApiPut(`admin/editItinerary/${id}`, data);


            Swal.fire({
              title: '여행 일정 수정',
              text: "일정이 수정되었습니다!",
              confirmButtonText: `확인`,
              showConfirmButton: true,
              showCloseButton: true

            })
          }
        })
    }
  }

  const deletefullItinery = () => {
    Swal.fire({
      title: '여행 일정 삭제',
      text: "이 일정을 삭제하시겠습니까? ",
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      reverseButtons: true,
      showCloseButton: true,
    }).

      then((result: { isConfirmed: any; }) => {
        if (result.isConfirmed) {

          ApiDelete(`admin/deleteItinerary/${id}`).then((res: any) => {
            history.push("/itinerary-management");
          });

          Swal.fire({
            title: '여행 일정 삭제',
            text: "일정이 삭제되었습니다!",
            confirmButtonText: `확인`,
            showConfirmButton: true,
            showCloseButton: true

          })
        }
      })
  }

  const BacktoItineryList = () => {
    history.push("/itinerary-management");
  };

  const deleteItineraryFromTable = (row: any) => {
    swal({
      title: "코스 삭제s",
      text: "해당 코스를 삭제하시겠습니까??",

      buttons: ["취소", "삭제"],
      // dangerMode: true,
    }).then((willDelete: any) => {
      console.log("filter", row);
      if (willDelete) {
        setState((prev: any) => {
          return {
            ...prev,
            tourcourses: prev.tourcourses.filter(
              (data: any) => data.id != row.id
            ),
            courseImages: prev.courseImages.filter(
              (data: any) => data.id != row.id
            ),
          };
        });

        swal("코스 삭제", "삭제되었습니다!", {});
      }
    });
  };



  // const deleteItineraryFromTable = () => {
  //   Swal.fire({
  //     title: '코스 삭제s',
  //     text: "해당 코스를 삭제하시겠습니까?? ",
  //     showCancelButton: true,
  //     confirmButtonText: '삭제',
  //     cancelButtonText: '취소',
  //     reverseButtons: true,
  //     showCloseButton: true,
  //   }).

  //     then((result: { isConfirmed: any; }) => {
  //       if (result.isConfirmed) {

  //         setState((prev: any) => {
  //                   return {
  //                     ...prev,
  //                     tourcourses: prev.tourcourses.filter(
  //                       (data: any) => data.id != row.id
  //                     ),
  //                     courseImages: prev.courseImages.filter(
  //                       (data: any) => data.id != row.id
  //                     ),
  //                   };
  //                 });

  //         Swal.fire({
  //           title: '여행 일정 삭제',
  //           text: "일정이 삭제되었습니다!",
  //           confirmButtonText: `확인`,
  //           showConfirmButton: true,
  //           showCloseButton: true

  //         })
  //       }
  //     })
  // }

  

  const showInfoTourCourse = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return (
      <Buttons
        type="button"
        children="정보"
        ButtonStyle="rounded-0 bg-custom-black"
        onClick={() => DetailProfile(row)}
      />
    );
  };

  const dellinkFollow = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return (
      <Buttons
        type="button"
        children="삭제 "
        ButtonStyle="rounded-0 bg-custom-black"
        onClick={() => deleteItineraryFromTable(row)}
      />
    );
  };

  const priceFormatter = (
    cell:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined,
    row: any
  ) => {
    return <strong style={{ color: "#B931B8" }}>{cell}</strong>;
  };

  const columns = [
    {
      dataField: "Tid",
      text: "No",
    },
    {
      dataField: "Itinerary_Cate",
      text: "카테고리명",
    },
    {
      dataField: "Itinerary_title",
      text: "제목",
      formatter: priceFormatter,
    },

    {
      dataField: "Itinerary_info",
      text: "정보",
      formatter: showInfoTourCourse,
    },

    {
      dataField: "Itinerary_del",
      text: "삭제",
      formatter: dellinkFollow,
    },
  ];

  const reviewProfile = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => {
    return (
      <div className="flex table-review-img">
        <img src={row.avatar} alt="" />
        <span className="font-16-bold-pink ">{row.review_nickname}</span>
      </div>
    );
  };

  const reviewlistHead = [
    {
      dataField: "review_nickname",
      text: "닉네임",
      formatter: reviewProfile,
    },
    {
      dataField: "review_score",
      text: "별점",
    },

    {
      dataField: "review_date",
      text: "등록일",
    },

    {
      dataField: "review_review",
      text: "리뷰",
    },
  ];

  const counder = [
    { value: "10", label: "10개" },
    { value: "20", label: "20개" },
    { value: "30", label: "30개" },
  ];

  const getSignupdata = () => {
    getRegion();
    getCategory();
    setshowAddItinerary(true);
    filterTourCourse();
  };

  const getRegion = () => {
    ApiGet("itinerary/region").then((res: any) => {
      setItineryRegionData(
        res.data.map((x: any) => {
          return {
            isSelected: false,
            value: x.region,
            label: x.region,
          };
        })
      );
    });
  };
  const getCategory = () => {
    ApiGet(`itinerary/category`).then((res: any) => {
      setItItineryCategoryData(
        res.data.map((x: any) => {
          return {
            isSelected: false,
            value: x.category,
            label: x.category,
          };
        })
      );
    });
  };
  const getTourCourseById = (id: any) => {
    ApiGet(`itinerary/tourcourse/${id}`).then((res: any) =>
      setcardsDetails(res.data)
    );
  };
  const getItineraryById = () => {
    ApiGet(`itinerary/get/${id}`).then((res: any) => {
      setdefaultNote(res?.data.note);

      setState({
        tourcourses:
          res.data &&
          res.data.tourcourse &&
          res.data.tourcourse.map((tour: any, index: number) => {
            return {
              ...tour,
              Tid: index + 1,
              Itinerary_Cate: tour.category,
              Itinerary_title: tour.name,
            };
          }),
        reviews:
          res.data &&
          res.data.reviews &&
          res.data.reviews.map((review: any) => {
            return {
              avatar: review.avatar,
              review_nickname: review.nick_name,
              review_score: "★" + review.star,
              review_date: review.registration_date,
              review_review: review.content,
            };
          }),
        courseImages:
          res.data &&
          res.data.tourcourse &&
          res.data.tourcourse.map((tour: any, index: number) => {
            return {
              id: tour.id,
              img: tour.image,
            };
          }),
        title: res.data && res.data.title,
        information: res.data && res.data.information,
        disclosure: res.data && res.data.disclosure,
        creator: res.data && res.data.creator,
        hosted_count: res.data && res.data.hosted_count,
        hosts: res.data && res.data.hosts,
        star: res.data && res.data.star,
        wishlist: res.data && res.data.wishlist,
        // counder:'10',
        region: res.data && res.data.region,
        country: res.data && res.data.country,
        nationality: "",
        adminNote: res.data && res.data.note,
      });
      changeColorOfError();
      setItinerary(
        res.data &&
        res.data.tourcourse &&
        res.data.tourcourse.map((tour: any, index: number) => {
          return {
            ...tour,
            Tid: index + 1,
            Itinerary_Cate: tour.category,
            Itinerary_title: tour.name,
          };
        })
      );
      setStartDate(
        new Date(res.data && res.data.start_date && res.data.start_date)
      );
      setEndDate(new Date(res.data && res.data.end_date && res.data.end_date));
    });
  };
  const onFilterChnage = (i: number) => {
    setPage(i);
  };

  const paginationCount = () => {
    let pagecount = Math.ceil(tourcoursesCount / pagePerSize);
    setPageCount(pagecount);
  };

  const filterTourCourse = () => {
    ApiPost(
      `itinerary/tourcourse/filter?per_page=${pagePerSize}&page_number=${page}&keyword=${tourCourseFilters.itnerySearch}`,
      {
        region: tourCourseFilters.region,
        category: tourCourseFilters.category.toString(),
      }
    )
      .then((res: any) => {
        console.log("res", res);

        settourcoursesDetail(res?.data && res?.data.data);
        settourcoursesCount(res?.data && res?.data.count);
      })
      .catch((err: any) => {
        if (err) {
        }
      });
  };

  const showItineraryTourDetail = (cards: any) => {
    settourDetailsFlag(true);
    setcardsDetails(cards);
  };
  const hideItineraryTourDetail = () => {
    settourDetailsFlag(false);
  };

  return (
    <>
      <div className="col-12 p-0">
        <div className="bg-navigation">
          <h2 className="text-white">여행 일정 관리</h2>
        </div>
      </div>

      <Container fluid className="creator-table text-center">
        <Row className="pt-5 pl-md-3 mt-4 mt-md-0 pb-2">
          <Col lg={12}>
            <Form>
              <div className="overflow-table">
                <Col
                  xs={12}
                  className="pb-3 pl-0 pt-5 d-md-flex text-left align-items-center"
                >
                  <h4 className=" font-25-bold">여행 코스</h4>
                  <Buttons
                    type="button"
                    children="추가하기"
                    ButtonStyle="gray-button-modal ml-md-4 ml-0 mt-2 mt-md-0"
                    onClick={getSignupdata}
                  />
                  <h4
                    className=" mt-2 mt-md-0 ml-md-4 ml-0 font-25-normal-pink"
                    style={{ color: `${colorOfError}` }}
                  >
                    ※ 같은 지역의 코스만 선택하실 수 있습니다.
                  </h4>
                </Col>

                {state.tourcourses && !state.tourcourses.length ? (
                  <Container fluid className="mt-2 border-tabel-b1">
                    <Row>
                      <Col className="profile-table-td-input">
                        <h4 className="blank-tour">
                          여행 코스를 추가해 주세요.
                        </h4>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  ""
                )}

                {state.tourcourses && state.tourcourses.length ? (
                  <Container fluid className="mt-2">
                    <Row>
                      <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={state.tourcourses}
                        columns={columns}
                      />
                    </Row>
                  </Container>
                ) : (
                  ""
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      {state.tourcourses &&
        state.tourcourses.length &&
        state.courseImages &&
        state.courseImages.length ? (
        <Container fluid>
          <Row className="pl-md-3 mb-5">
            <Col className="">
              <div className="upload-pic profile-table-td-input d-custom-flex p-3 border-tabel-b1">
                {state &&
                  state.courseImages.map((data: any) =>
                    data.img.map((img: any) => (
                      <div>
                        <img src={img} />
                        {/* <p className="text-center">이미지명</p> */}
                      </div>
                    ))
                  )}
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}

      <Container fluid className="creator-table ">
        <Row className=" pl-md-3 mt-4 mt-md-0 pb-5 ">
          <Col lg={12}>
            <Form>
              <div className="overflow-table">
                <Col xs={12} className="pb-3 pl-0">
                  <h4 className=" font-25-bold">여행 정보</h4>
                </Col>

                <Container fluid className="mt-2 mb-5 border-tabel-b1">
                  <Row>
                    <Col md={3} className="yellow-bg-table font-18-bold">
                      제목
                    </Col>
                    <Col md={9} className="profile-table-td-input">
                      <div className="py-3">
                        <InputField
                          name="title"
                          value={state.title}
                          lablestyleClass=""
                          InputstyleClass="mb-0 manage-datepicker"
                          onChange={(e: any) => {
                            handleChange(e);
                          }}
                          label=""
                          placeholder="여행 제목을 입력하세요"
                          type="text"
                          fromrowStyleclass=""
                        />
                      </div>
                    </Col>

                    <Col md={3} className="yellow-bg-table font-18-bold">
                      세부 정보
                    </Col>
                    <Col md={9} className="profile-table-td-input">
                      <div className="py-3">
                        <InputField
                          name="information"
                          value={state.information}
                          lablestyleClass=""
                          InputstyleClass="mb-0 manage-datepicker"
                          onChange={handleChange}
                          label=""
                          placeholder="세부 정보를 입력해 주세요."
                          type="textarea"
                          fromrowStyleclass=""
                        />
                      </div>
                    </Col>

                    <Col md={3} className="yellow-bg-table font-18-bold">
                      공개
                    </Col>
                    <Col md={9} className="profile-table-td-input">
                      <div className="d-flex">
                        <div
                          className={`open-radio ${state.disclosure === "OPEN" ? `active-radio` : ``
                            }`}
                        >
                          <RadioButton
                            type="radio"
                            name="disclosure"
                            id="Open"
                            value="OPEN"
                            BtnLable="공개"
                            onSelect={(e) => handleChangedisclosure(e)}
                          />
                        </div>
                        <div
                          className={`private-radio ${state.disclosure === "PRIVATE" ? `active-radio` : ``
                            }`}
                        >
                          <RadioButton
                            type="radio"
                            name="disclosure"
                            id="Private"
                            value="PRIVATE"
                            BtnLable="비공개"
                            onSelect={(e) => handleChangedisclosure(e)}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md={3} className="yellow-bg-table font-18-bold">
                      작성자 정보
                    </Col>
                    <Col md={9} className="profile-table-td-input">
                      <div className="py-3 w-100">
                        {/* <InputField
                          name="creator"
                          value={state.creator}
                          lablestyleClass=""
                          InputstyleClass="mb-0 manage-datepicker"
                          onChange={handleChange}
                          label=""
                          placeholder="Created by Compastrips"
                          type="text"
                          fromrowStyleclass=""
                        /> */}

                        <InputGroup className="w-100">
                          <InputGroup.Text className="userinputs disble">
                            {state.creator || "Created by Compastrips"}
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                    </Col>

                    <Col md={3} className="yellow-bg-table font-18-bold">
                      여행게시기간
                    </Col>
                    <Col md={9} className="profile-table-td-input">
                      <div className="table-date d-md-flex">
                        <DatePicker
                          selected={startDate}
                          onChange={(date: Date | null) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          dateFormat="yyyy.MM.dd"
                          disabledKeyboardNavigation
                          placeholderText="This has disabled keyboard navigation"
                        />
                        <DatePicker
                          selected={endDate}
                          onChange={(date: Date | null) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          dateFormat="yyyy.MM.dd"
                          disabledKeyboardNavigation
                          placeholderText="This has disabled keyboard navigation"
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Form>
          </Col>

          {id && state.hosts ? (
            <Col lg={12}>
              <div className="overflow-table">
                <Col xs={12} className="pb-3 pl-0">
                  <h4 className=" font-25-bold">호스팅/리뷰 현황</h4>
                </Col>

                <Container fluid className="mt-1 border-tabel-b1">
                  <Row>
                    <Col md={3} className="yellow-bg-table font-18-bold">
                      호스팅/리뷰 현황
                    </Col>
                    <Col
                      md={9}
                      className="profile-table-td-input align-items-center"
                    >
                      <p className="mb-0">{state.hosted_count}</p>
                    </Col>

                    <Col md={3} className="yellow-bg-table font-18-bold">
                      호스트
                    </Col>
                    <Col
                      md={9}
                      className="profile-table-td-input align-items-center"
                    >
                      {state &&
                        state.hosts.map((host: any) => {
                          return (
                            <div>
                              <p className="mb-0">
                                {host.name}({host.type} 호스트, {host.gender},{" "}
                                {host.age}대, {host.nationality})| ｜ Before
                                proceeding ｜ {host.participate_count} 명 참가
                                중 ｜{moment(host.date).format("YYYY.MM.DD")}{" "}
                                (Day) {host.start_time} - {host.end_time}
                              </p>
                            </div>
                          );
                        })}
                    </Col>

                    <Col md={3} className="yellow-bg-table font-18-bold">
                      평점
                    </Col>
                    <Col
                      md={9}
                      className="profile-table-td-input align-items-center"
                    >
                      <p className="mb-0">★ {state.star}</p>
                    </Col>

                    <Col md={3} className="yellow-bg-table font-18-bold">
                      리뷰{" "}
                    </Col>
                    <Col
                      md={9}
                      className="profile-table-td-input align-items-center"
                    >
                      <p className="mb-0">
                        총{" "}
                        <span className="span-color-pink">
                          {state.reviews.length}
                        </span>
                        개
                      </p>
                      <div className="mt-3 text-center">
                        {state.reviews.length != 0 && (
                          <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={state.reviews}
                            columns={reviewlistHead}
                          />
                        )}
                      </div>
                    </Col>

                    <Col md={3} className="yellow-bg-table font-18-bold">
                      찜
                    </Col>
                    <Col
                      md={9}
                      className="profile-table-td-input align-items-center"
                    >
                      <p className="mb-0">{state.wishlist}</p>
                    </Col>
                  </Row>
                </Container>
                <Col className="textarea-border"></Col>
              </div>
            </Col>
          ) : (
            ""
          )}

          {id ? (
            <Col lg={12} className="mt-5">
              <Container fluid className="mt-1 border-tabel-b1">
                <Row>
                  <Col md={3} className="yellow-bg-table font-18-bold">
                    관리자 메모
                  </Col>
                  <Col md={9} className="profile-table-td-input">
                    <div className="py-3">
                      <InputField
                        name="adminNote"
                        value={state.adminNote}
                        lablestyleClass=""
                        InputstyleClass="mb-0 manage-datepicker"
                        onChange={(e: any) => handleChange(e)}
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
          ) : (
            ""
          )}

          <Col md={12} className="pb-3 pl-0 pt-5 w-100">
            <div className="text-center">
              <Buttons
                type="submit"
                children="목록"
                ButtonStyle="border-button font-22-bold"
                onClick={BacktoItineryList}
              />

              {!id ? (
                <Buttons
                  type="submit"
                  children="저장"
                  ButtonStyle="modal-pink-button font-22-bold"
                  onClick={createNewItinerary}
                />
              ) : (
                ""
              )}
              {id ? (
                <Buttons
                  type="submit"
                  children="수정"
                  ButtonStyle="modal-pink-button font-22-bold"
                  onClick={modifyItinery}
                />
              ) : (
                ""
              )}
              <Buttons
                type="submit"
                children="삭제"
                ButtonStyle="border-button font-22-bold"
                onClick={deletefullItinery}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <ItineraryTourDetail
        cards={cards}
        flag={tourDetailsflag}
        hideItineraryTourDetail={hideItineraryTourDetail}
      />

      <Modal
        show={showAddItinerary}
        onHide={() => {
          setshowAddItinerary(false);
          setItinerary(state.tourcourses);
        }}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <h6 className="font-30-bold">여행 코스 검색</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="additinery_modal">
          <Col lg={12}>
            <Row className="radio-list ml-0">
              <Col md={2}>
                <h5 className="font-20-normal text-black">국가</h5>
              </Col>
              <Col md={10} className="mb-4 font-18-normal">
                <RadioButton
                  type="checkbox"
                  name="country"
                  id="Open-Private"
                  value="Open-Private"
                  BtnLable="대한민국"
                  checked={true}
                  onSelect={(e: any) => {
                    settourCourseFilters({
                      ...tourCourseFilters,
                      country: e.target.value,
                    });
                  }}
                />
              </Col>

              <Col md={2} className="mt-md-2 mt-4">
                <h5 className="font-20-normal text-black">지역</h5>
              </Col>
              <Col md={10} className="mt-2 d-md-flex radio-flex mb-4">
                {itineryRegion.map((region: any) => (
                  <div
                    className="pr-3 pr-md-0 font-18-normal"
                    key={region.value}
                  >
                    <RadioButton
                      type="radio"
                      name="region"
                      id="region"
                      value={region.value}
                      checked={region.value == tourCourseFilters.region}
                      BtnLable={region.label}
                      onSelect={(e: any) => {
                        settourCourseFilters({
                          ...tourCourseFilters,
                          region: e.target.value,
                        });
                      }}
                    />
                  </div>
                ))}
              </Col>
              <Col md={2} className="mt-md-2 mt-4">
                <h5 className="font-20-normal text-black">
                  카테고리 <br /> (복수선택 가능)
                </h5>
              </Col>
              <Col md={10} className="mt-2 d-md-flex radio-flex ">
                <RadioButton
                  type="checkbox"
                  name="category"
                  id="Open-Private"
                  checked={!tourCourseFilters?.category?.length}
                  value=""
                  BtnLable="All"
                  onSelect={() => {
                    setItItineryCategoryData(
                      itineryCategory.map((data) => {
                        data.isSelected = false;
                        return data;
                      })
                    );
                  }}
                />
                {itineryCategory.map((category: any) => (
                  <div
                    className="pr-3 pr-md-0 font-18-normal"
                    key={category.value}
                  >
                    <RadioButton
                      type="checkbox"
                      name="category"
                      id="Open-Private"
                      checked={category.isSelected}
                      value={category.value}
                      BtnLable={category.label}
                      onSelect={() => {
                        handleCategory(category);
                      }}
                    />
                  </div>
                ))}
              </Col>
            </Row>

            <Row className="mt-3 modal-search">
              <Col xl={11} className="mt-2 d-md-flex ">
                <InputField
                  name="itnerySearch"
                  value={tourCourseFilters.itnerySearch}
                  lablestyleClass=""
                  InputstyleClass="mb-0 w-100 manage-datepicker"
                  onChange={(e: any) => {
                    settourCourseFilters({
                      ...tourCourseFilters,
                      itnerySearch: e.target.value,
                    });
                  }}
                  label=""
                  placeholder="검색어 입력"
                  type="text"
                  fromrowStyleclass=""
                />
              </Col>
              <Col xl={1} className="mt-2 text-right">
                <Buttons
                  type="submit"
                  children="검색"
                  ButtonStyle="search-button ml-0 py-3  px-4"
                  onClick={filterTourCourse}
                />
              </Col>
            </Row>

            <Row className=" mt-4">
              <Col>
                <h3 className="font-27-bold">
                  총{" "}
                  <span className="span-color-pink">
                    {tourcoursesCount ?? 0}
                  </span>
                  개 ｜ 선택 <span className="span-color-pink">0</span> 개
                </h3>
              </Col>
            </Row>
            {console.log("tourcoursesDetail", tourcoursesDetail)
            }
            {!(tourcoursesDetail.length) ? (
              <Row className=" mt-4">
                <Col lg={12}>
                  <div className="no-data-found-modal">
                    <p className="font-20-normal text-center">
                      검색 내역이 없습니다.
                    </p>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row className="mb-4">
                {tourcoursesDetail.map((cards, i) => (
                  <Col xl={3} lg={4} md={6} key={cards.id}>
                    <div className="modal-card">
                      <div>
                        <div className="checkboxes p-0  ml-auto">
                          {/* <CheckBox
                          label=""
                          type="checkbox"
                          name="agree"
                          id="agree"
                          value="agree"
                          styleCheck="checkmark"
                          onChange={(e: any) => {}}
                        /> */}
                          <CheckBox
                            label=""
                            type="checkbox"
                            name="agree"
                            id="agree"
                            value="agree"
                            checked={itinerary
                              .map((x) => x.id)
                              .includes(cards.id)}
                            styleCheck="checkmark"
                            onChange={(e: any) => {
                              addItinerary(e, cards);
                            }}
                          />
                        </div>

                        <div
                          className="modal-card-content"
                          onClick={() => showItineraryTourDetail(cards)}
                        >
                          <Image src={cards.image[0]} className="w-100 mb-3" />
                          <h3 className="font-23-bold">{cards.name}</h3>
                          <h4 className="font-18-bold mt-1">
                            {cards.address} , {cards.region}{" "}
                          </h4>
                          <h5 className="font-18-normal mt-2">
                            {cards.category}
                          </h5>
                          <h5 className="font-18-bold mt-1">
                            {cards.opening_date}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}


            {tourcoursesDetail?.length ? (
              <Row className="">
                <Col lg={12}>
                  <Row>
                    <Col xl={2} xs={6} className="select-card-apge">
                      <div>
                        <h6 className="font-16-bold">
                          <span className="font-16-bold-pink">1</span> of{" "}
                          {pageCount} pages
                        </h6>
                      </div>
                    </Col>
                    {tourcoursesDetail.length > 10 ? (
                      <Col
                        xl={2}
                        xs={6}
                        className="select-card-apge order-xl-12"
                      >
                        <Select
                          options={counder}
                          name="counder"
                          defaultValue={[counder[0]]}
                          className="ml-auto"
                          onChange={(e: any) => setPagePerSize(e.value)}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                              ...theme.colors,
                              primary25: "",
                              primary: "#B931B8",
                            },
                          })}
                        />
                      </Col>
                    ) : (
                      ""
                    )}

                    <Col xl={8} className="order-xl-1">
                      <ul className="list-pagination text-center ">
                        <li className="border-li">
                          <a onClick={() => {
                            onFilterChnage(1);
                          }}>
                            {" "}
                            <FontAwesomeIcon icon={faCaretLeft} />
                            <FontAwesomeIcon icon={faCaretLeft} />
                          </a>
                        </li>
                        <li className="border-li">
                          <a onClick={() => {
                            onFilterChnage((page - 1 > 0) ? page - 1 : 1);
                          }}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                          </a>
                        </li>
                        {[...Array(pageCount)].map((item: any, i: any) => (
                          <li key={i}>
                            <a
                              onClick={() => {
                                onFilterChnage(i + 1);
                              }}
                              className={(i + 1 === page) ? `active-page` : ""}
                            >
                              {i + 1}
                            </a>
                          </li>
                        ))}
                        <li className="border-li">
                          <a onClick={() => {
                            onFilterChnage(page + 1 <= pageCount ? page + 1 : pageCount);
                          }}>
                            <FontAwesomeIcon icon={faCaretRight} />
                          </a>
                        </li>
                        <li className="border-li">
                          <a onClick={() => {
                            onFilterChnage(pageCount);
                          }}>
                            <FontAwesomeIcon icon={faCaretRight} />
                            <FontAwesomeIcon icon={faCaretRight} />
                          </a>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              ""
            )}

            <Row className="justify-content-center button-combo">
              <Buttons
                type="submit"
                children="취소"
                ButtonStyle="border-button font-22-bold"
                onClick={saveItinery}
              />

              <Buttons
                type="submit"
                children="적용"
                ButtonStyle="modal-gray-button font-22-bold"
                onClick={saveItinery}
              />
            </Row>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ItineraryMngReg;
