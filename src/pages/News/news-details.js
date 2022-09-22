import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Dropzone from "react-dropzone"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap"

import "react-datepicker/dist/react-datepicker.css"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import {
  getProjectDetail as onGetProjectDetail,
  deleteProject as onDeleteProject,
} from "store/projects/actions"
import { useHistory } from "react-router-dom"
import axios from "axios"
import DeleteModal from "common/DeleteModal"
import { useFormik } from "formik"
const NewsDetails = props => {
  let history = useHistory()
  //meta title
  document.title = "Medialab товхимол засах"
  const dispatch = useDispatch()

  const { projectDetail } = useSelector(state => ({
    projectDetail: state.projects.projectDetail,
  }))

  const {
    match: { params },
  } = props
  //delete order
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedFiles, setselectedFiles] = useState([])
  const [selectedFiles1, setselectedFiles1] = useState([])
  const token = JSON.parse(localStorage.getItem("amazon-token"))
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      title: (projectDetail && projectDetail.title) || "",
      body: (projectDetail && projectDetail.body) || "",
      body1: (projectDetail && projectDetail.body1) || "",
      body2: (projectDetail && projectDetail.body2) || "",
      category: (projectDetail && projectDetail.category) || "",
    },
    onSubmit: values => {
      axios
        .put(
          `https://medialabadmin.com/api/v1/articles/${projectDetail._id}`,
          {
            title: values["title"],
            body: values["body"],
            body1: values["body1"],
            body2: values["body2"],
            category: values["category"],
          },
          { headers }
        )
        .then(res => {
          toast("Амжилттай өөрчиллөө")
          const newNews = res.data.data
          if (selectedFiles[0]) {
            const xhr = new XMLHttpRequest()
            const data = new FormData()
            data.append("file", selectedFiles[0])
            xhr.open(
              "PUT",
              `https://medialabadmin.com/api/v1/articles/${newNews._id}/profile`,
              { headers }
            )
            xhr.send(data)
          }
          if (selectedFiles1[0]) {
            const xhr = new XMLHttpRequest()
            const data = new FormData()
            data.append("file", selectedFiles1[0])
            xhr.open(
              "PUT",
              `https://medialabadmin.com/api/v1/articles/${newNews._id}/photo`,
              { headers }
            )
            xhr.send(data)
          }
          history.push("/news")
        })
        .catch(err => {
          console.log(err)
          toast(err.message)
        })
    },
  })

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }
  function handleAcceptedFiles1(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles1(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }
  useEffect(() => {
    dispatch(onGetProjectDetail(params.id))
  }, [])
  //delete project

  const onClickDelete = () => {
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    dispatch(onDeleteProject(projectDetail._id))
    setDeleteModal(false)
    history.push("/news")
  }
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="" breadcrumbItem="Нийтлэл засах" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Нийтлэл засах</CardTitle>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectname"
                        className="col-form-label col-lg-2"
                      >
                        Гарчиг
                      </Label>
                      <Col lg="10">
                        <Input
                          id="title"
                          name="title"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.title || ""}
                          invalid={
                            validation.touched.title && validation.errors.title
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectname"
                        className="col-form-label col-lg-2"
                      >
                        Category
                      </Label>
                      <Col lg="10">
                        <Input
                          id="category"
                          name="category"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.category || ""}
                          invalid={
                            validation.touched.category &&
                            validation.errors.category
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Нийтлэлийн агуулга 1
                      </Label>
                      <Col lg="10">
                        <Input
                          id="body"
                          name="body"
                          type="textarea"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.body || ""}
                          invalid={
                            validation.touched.body && validation.errors.body
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Нийтлэлийн агуулга 2
                      </Label>
                      <Col lg="10">
                        <Input
                          id="body1"
                          name="body1"
                          type="textarea"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.body1 || ""}
                          invalid={
                            validation.touched.body1 && validation.errors.body1
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Нийтлэлийн агуулга 3
                      </Label>
                      <Col lg="10">
                        <Input
                          id="body2"
                          name="body2"
                          type="textarea"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.body2 || ""}
                          invalid={
                            validation.touched.body2 && validation.errors.body2
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>

                    <Row className="mb-4">
                      <Label className="col-form-label col-lg-2">
                        Нүүр зураг
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
                                    <h4>Drop files here or click to upload.</h4>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Dropzone>

                          {selectedFiles[0] ? (
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
                          ) : (
                            projectDetail.profile && (
                              <img
                                className="mt-4"
                                src={`https://medialabadmin.com/upload/${projectDetail.profile}`}
                                alt={"profile"}
                                height={80}
                              />
                            )
                          )}
                        </Form>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Label className="col-form-label col-lg-2">
                        Толгой зураг
                      </Label>
                      <Col lg="10">
                        <Form>
                          <Dropzone
                            onDrop={acceptedFiles => {
                              handleAcceptedFiles1(acceptedFiles)
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
                                    <h4>Толгой зураг оруулах.</h4>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          {selectedFiles1[0] ? (
                            <div
                              className="dropzone-previews mt-3"
                              id="file-previews"
                            >
                              {selectedFiles1.map((f, i) => {
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
                          ) : (
                            projectDetail.image && (
                              <img
                                className="mt-4"
                                src={`https://medialabadmin.com/upload/${projectDetail.image}`}
                                alt={"zurag"}
                                height={80}
                              />
                            )
                          )}
                        </Form>
                      </Col>
                    </Row>
                    <Row className="justify-content-end">
                      <Col lg="10">
                        <Button type="submit" color="primary">
                          Янзлах
                        </Button>

                        <Button
                          style={{ marginLeft: 10 }}
                          color="danger"
                          onClick={() => onClickDelete()}
                        >
                          Устгах
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default NewsDetails
