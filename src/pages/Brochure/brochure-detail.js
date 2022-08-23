import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
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

import Breadcrumbs from "../../components/Common/Breadcrumb"

import { getBrochureDetail as onGetBrochureDetail } from "store/brochure/actions"
import { deleteBrochure as onDeleteBrochure } from "store/brochure/actions"
import axios from "axios"
import DeleteModal from "common/DeleteModal"
import { useFormik } from "formik"
import { toast } from "react-toastify"
const BrochureDetail = props => {
  let history = useHistory()
  //meta title
  document.title = "Medialab Hийтлэл засах"
  const dispatch = useDispatch()

  const { brochureDetail } = useSelector(state => ({
    brochureDetail: state.brochures.brochureDetail,
  }))

  const {
    match: { params },
  } = props
  //delete order
  const [deleteModal, setDeleteModal] = useState(false)
  const [brochure, setBrochure] = useState()
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
      title: (brochureDetail && brochureDetail.title) || "",
      body: (brochureDetail && brochureDetail.body) || "",
      body1: (brochureDetail && brochureDetail.body1) || "",
      body2: (brochureDetail && brochureDetail.body2) || "",
      category: (brochureDetail && brochureDetail.category) || "",
    },
    onSubmit: values => {
      axios
        .put(
          `http://167.71.196.5/api/v1/brochures/${brochureDetail._id}`,
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
          const newNews = res.data.data
          history.push("/brochure")
          toast("Амжиллтай өөрчиллөө")
          if (selectedFiles[0]) {
            const xhr = new XMLHttpRequest()
            const data = new FormData()
            data.append("file", selectedFiles[0])
            xhr.open(
              "PUT",
              `http://167.71.196.5/api/v1/brochures/${newNews._id}/profile`,
              { headers }
            )
            xhr.send(data)
          }
          if (selectedFiles1[0]) {
            const xhr1 = new XMLHttpRequest()
            const data1 = new FormData()
            data1.append("file", selectedFiles[0])
            xhr1.open(
              "PUT",
              `http://167.71.196.5/api/v1/brochures/${newNews._id}/photo`,
              { headers }
            )
            xhr1.send(data1)
          }
        })
        .catch(err => {
          console.log(err)
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
    dispatch(onGetBrochureDetail(params.id))
  }, [])

  const onClickDelete = brochure => {
    setBrochure(brochure)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    dispatch(onDeleteBrochure(brochureDetail._id))
    setDeleteModal(false)
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
                            brochureDetail.profile && (
                              <img
                                className="mt-4"
                                src={`http://167.71.196.5/upload/${brochureDetail.profile}`}
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
                            brochureDetail.image && (
                              <img
                                className="mt-4"
                                src={`http://167.71.196.5/upload/${brochureDetail.image}`}
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
                          Нэмэх
                        </Button>
                        <Button
                          style={{ marginLeft: 10 }}
                          color="danger"
                          onClick={() => onClickDelete()}
                        >
                          Засах
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

export default BrochureDetail
