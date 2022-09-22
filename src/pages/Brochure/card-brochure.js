import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { map } from "lodash"
import { Card, CardBody, Col, UncontrolledTooltip } from "reactstrap"
import moment from "moment"

const CardBrochure = ({ projects }) => {
  if (!projects) {
    return null
  }
  return (
    <React.Fragment>
      {map(projects, (project, key) => (
        <Col xl="4" sm="6" key={key}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="avatar-md me-4">
                  <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                    <img
                      src={`https://medialabadmin.com/upload/${project.profile}`}
                      alt=""
                      height="50"
                    />
                  </span>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="text-truncate font-size-15">
                    <Link
                      to={`/brochure-details/${project.id}`}
                      className="text-dark"
                    >
                      {project.title}
                    </Link>
                    <p className="text-muted mb-4">
                      Үүсгэсэн админ: {project.author}
                    </p>
                  </h5>
                </div>
              </div>
            </CardBody>
            <div className="px-4 py-3 border-top">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-3"></li>
                <li className="list-inline-item me-3" id="dueDate">
                  <i className="bx bx-calendar me-1" />{" "}
                  {moment(project.createdAt).format("YY/MM/DD hh:mm a")}
                  <UncontrolledTooltip placement="top" target="dueDate">
                    Үүсгэсэн огноо
                  </UncontrolledTooltip>
                </li>
                <li className="list-inline-item me-3" id="comments">
                  <i className="bx bx-comment-dots me-1" /> {project.count}{" "}
                  үзсэн
                  <UncontrolledTooltip placement="top" target="comments">
                    Хандалт
                  </UncontrolledTooltip>
                </li>
              </ul>
            </div>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
}

CardBrochure.propTypes = {
  brochures: PropTypes.array,
}

export default CardBrochure
