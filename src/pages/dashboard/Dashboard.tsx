import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import "./dashboard.css"

import TotalUserCount from '../../component/Tables/TotalUserCount'
import ReHostItinerary from '../../component/Tables/ReHostItinerary'
import ReAppliedHost from '../../component/Tables/ReAppliedHost'
import ReReviews from '../../component/Tables/ReReviews'
import ReItineraries from '../../component/Tables/ReItineraries'

function Dashboard() {
    return (
        <>
            <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">대시보드</h2>
                </div>
            </div>

            <Container fluid>
                <Row className="pt-5 px-1 mt-2 mt-md-0">
                    <TotalUserCount/>
                </Row>
            </Container>
               
            <Container fluid className="pb-5">
                <Row className=" pl-md-3">
                    <ReHostItinerary />
                    <ReAppliedHost />
                    <ReReviews />
                    <ReItineraries/>
                </Row>
            </Container> 

               
            
        </>
    )
}

export default Dashboard
