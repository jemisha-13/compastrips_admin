import { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import { intineraryProduct } from '../../pages/Itinerary/ItineraryMng';
import { dbManagment } from '../../pages/itineryDB/ItineraryMngDB';
import { commonHistory, HostWish, ItineryWish } from '../../pages/User Managment/UserMagReg';
import { userManagment } from '../../pages/User Managment/UserManagement';
// ...
interface Props {
    data: commonHistory[] | ItineryWish[] | HostWish[] | intineraryProduct[] | userManagment[] | dbManagment[];
    columns:any
    onTableChange: (page?: any,sizePerPage?: any) => void;
    totalSize: number;
    pagesizedropdownflag:boolean
  }



const RemotePagination : React.FC<Props> = ({ data,columns, onTableChange, totalSize ,pagesizedropdownflag}) => {
  // console.log("paginationData: ", data);
    
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const onPageChange = (pageNumber:any) =>{
    setPage(pageNumber);
    onTableChange(pageNumber,sizePerPage);

  }
  const onSizePerPageChange = (sizeperpage:any) =>{
    setSizePerPage(sizeperpage)     
    setPage(1);
    onTableChange(1,sizeperpage);
  }

  return( 
  <div>
    <PaginationProvider
      pagination={
        paginationFactory({
          custom: true,
          page,
          sizePerPage,
          totalSize,
          sizePerPageList: [{
            text: '10', value: 10
          }, {
            text: '20', value: 20
          }, {
            text: 'All', value: totalSize
          }],
          alwaysShowAllBtns: true,
         })
      }
    >
      {
        ({
          paginationProps,
          paginationTableProps
        }) => (
          <div>         
            <BootstrapTable
              { ...paginationTableProps }
              remote
              keyField="id"
              data={ data }
              columns={ columns }   
              onTableChange={onTableChange}
            />
              <div className="paginationcustom">
              <PaginationListStandalone
                { ...paginationProps }
                onPageChange={ (p) => onPageChange(p)}
              />
              {totalSize > 0 && pagesizedropdownflag && 
              <SizePerPageDropdownStandalone
                { ...paginationProps }
                onSizePerPageChange={ (e) => onSizePerPageChange(e)}
              />
              }
              
            </div>
          </div>
        )
      }
    </PaginationProvider>
  </div>
)};

export default RemotePagination;