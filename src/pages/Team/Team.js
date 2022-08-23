import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import Dropzone from "react-dropzone"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

import { Name, Email, Tags, Projects, Img } from "./contactlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getUsers as onGetUsers,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "store/contacts/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const Team = props => {
  //meta title
  document.title = "Хэрэглэгчийн самбар"
  const [selectedFiles, setselectedFiles] = useState([])
  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem("amazon-token"))
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const [contact, setContact] = useState()
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstName: (contact && contact.firstName) || "",
      email: (contact && contact.email) || "",
      phone: (contact && contact.phone) || "",
      role: (contact && contact.role) || "",
      // password: (password && contact.password) || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter Your Name"),
      email: Yup.string().required("Please Enter Your Email"),
      phone: Yup.number().required("Please Enter Your Project"),
      role: Yup.string().required("Please Enter Tag"),
    }),

    onSubmit: values => {
      axios
        .put(
          `http://167.71.196.5/api/v1/users/${contact.id}`,
          {
            email: values["email"],
            lastName: values["lastName"],
            firstName: values["firstName"],
            occupation: values["occupation"],
            phone: values["phone"],
            password: values["password"],
            team: values["team"],
            role: values["role"],
          },
          { headers }
        )
        .then(res => {
          const xhr = new XMLHttpRequest()
          const data = new FormData()
          data.append("file", selectedFiles[0])
          xhr.open(
            "PUT",
            `http://167.71.196.5/api/v1/users/${contact.id}/profile`,
            { headers }
          )
          xhr.send(data)
          validation.resetForm()
          setIsEdit(false)
          toggle()
        })
        .catch(err => {
          console.log(err)
        })
    },
  })
  const { users } = useSelector(state => ({
    users: state.contacts.users,
  }))

  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const columns = useMemo(
    () => [
      {
        Header: "Про",
        // accessor: "name",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={`http://167.71.196.5/upload/${cellProps.profile}`}
                alt=""
              />
            </div>
          </>
        ),
      },
      {
        Header: "Нэр",
        accessor: "firstName",
        filterable: true,
        disableFilters: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "И-мэйл",
        accessor: "email",
        filterable: true,
        disableFilters: true,
        Cell: cellProps => {
          return <Email {...cellProps} />
        },
      },
      {
        Header: "Утасны дугаар",
        accessor: "phone",
        filterable: true,
        disableFilters: true,
        Cell: cellProps => {
          return (
            <>
              <Projects {...cellProps} />
            </>
          )
        },
      },
      {
        Header: "Эрх",
        accessor: "role",
        filterable: true,
        disableFilters: true,
        Cell: cellProps => {
          return (
            <>
              <Projects {...cellProps} />
            </>
          )
        },
      },

      {
        Header: "Үйлдэл",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original
                  handleUserClick(userData)
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Өөрчил
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original
                  onClickDelete(userData)
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Устга
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers())
      setIsEdit(false)
    }
  }, [])

  useEffect(() => {
    setContact(users)
    setIsEdit(false)
  }, [])

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users)
      setIsEdit(false)
    }
  }, [])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const user = arg
    setContact({
      id: user._id,
      firstName: user.firstName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    })
    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = users => {
    setContact(users)
    setDeleteModal(true)
  }

  const handleDeleteUser = () => {
    dispatch(onDeleteUser(contact._id))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const handleUserClicks = () => {
    setUserList("")
    setIsEdit(false)
    toggle()
  }
  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs breadcrumbItem="Багын гишүүд" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={users}
                    isGlobalFilter={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Хэрэглэгч засах" : "Add User"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Нэр</Label>
                              <Input
                                name="firstName"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.firstName || ""}
                                invalid={
                                  validation.touched.firstName &&
                                  validation.errors.firstName
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.firstName &&
                              validation.errors.firstName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.firstName}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Email</Label>
                              <Input
                                name="email"
                                label="Email"
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">
                                Утасны дугаар
                              </Label>
                              <Input
                                name="phone"
                                label="phone"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                                invalid={
                                  validation.touched.phone &&
                                  validation.errors.phone
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.phone &&
                              validation.errors.phone ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.phone}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Эрх</Label>
                              <Input
                                name="role"
                                label="role"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.role || ""}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Label className="col-form-label col-lg-2">
                            Профайл зураг
                          </Label>
                          <Col lg="10">
                            <Form>
                              <Dropzone
                                onDrop={acceptedFiles => {
                                  handleAcceptedFiles(acceptedFiles)
                                }}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <div className="dropzone">
                                    <div
                                      className="dz-message needsclick"
                                      {...getRootProps()}
                                    >
                                      <input {...getInputProps()} />
                                      <div className="dz-message needsclick">
                                        <div className="mb-3">
                                          <i className="display-4 text-muted bx bxs-cloud-upload" />
                                        </div>
                                        <h4>Зурагаа оруулна уу.</h4>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Dropzone>

                              <div
                                className="dropzone-previews mt-3"
                                id="file-previews"
                              >
                                {selectedFiles.map((f, i) => {
                                  return (
                                    <Card
                                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                      key={i + "-file"}
                                    >
                                      <div className="p-2">
                                        <Row className="align-items-center">
                                          <Col className="col-auto">
                                            <img
                                              data-dz-thumbnail=""
                                              height="80"
                                              className="avatar-sm rounded bg-light"
                                              alt={f.name}
                                              src={f.preview}
                                            />
                                          </Col>
                                          <Col>
                                            <Link
                                              to="#"
                                              className="text-muted font-weight-bold"
                                            >
                                              {f.name}
                                            </Link>
                                            <p className="mb-0">
                                              <strong>{f.formattedSize}</strong>
                                            </p>
                                          </Col>
                                        </Row>
                                      </div>
                                    </Card>
                                  )
                                })}
                              </div>
                            </Form>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                                Хадгалах
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Team)
