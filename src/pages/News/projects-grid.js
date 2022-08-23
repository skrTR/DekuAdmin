import React, { useEffect } from "react"
import { Container, Row } from "reactstrap"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Cards
import CardProject from "./card-project"

import { getProjects as onGetProjects } from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const ProjectsGrid = props => {
  //meta title
  document.title = "Medialab admin товхимол"

  const dispatch = useDispatch()

  const { projects } = useSelector(state => ({
    projects: state.projects.projects,
  }))

  useEffect(() => {
    dispatch(onGetProjects())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs breadcrumbItem="Нийтлэл" />

          <Row>
            {/* Import Cards */}
            {projects && <CardProject projects={projects} />}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(ProjectsGrid)
