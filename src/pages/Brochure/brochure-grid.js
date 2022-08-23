import React, { useEffect } from "react"
import { Container, Row } from "reactstrap"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Cards

import { getBrochures as onGetBrochures } from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import CardBrochure from "./card-brochure"

const BrochureGrid = props => {
  //meta title
  document.title = "Medialab admin нийтлэл"

  const dispatch = useDispatch()

  const { brochures } = useSelector(state => ({
    brochures: state.brochures.brochures,
  }))

  useEffect(() => {
    dispatch(onGetBrochures())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs breadcrumbItem="Нийтлэл" />

          <Row>
            {/* Import Cards */}
            {brochures && <CardBrochure projects={brochures} />}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(BrochureGrid)
