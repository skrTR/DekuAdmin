import React, { useState } from "react"
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
import { toast } from "react-toastify"
import { useFormik } from "formik"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import axios from "axios"
const TeamCreate = () => {
  let history = useHistory()
  const [selectedFiles, setselectedFiles] = useState([])
  const token = JSON.parse(localStorage.getItem("amazon-token"))
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: "",
      lastName: "",
      firstName: "",
      occupation: "",
      phone: "",
      password: "",
      team: "Media Lab",
      role: "",
    },
    onSubmit: values => {
      axios
        .post(
          `http://167.71.196.5/api/v1/users`,
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
          const newNews = res.data.data
          toast("Амжиллтай гишүүн нэмлээ")
          history.push("/team")
          if (selectedFiles[0]) {
            const xhr = new XMLHttpRequest()
            const data = new FormData()
            data.append("file", selectedFiles[0])
            xhr.open(
              "PUT",
              `http://167.71.196.5/api/v1/users/${newNews._id}/profile`,
              { headers }
            )
            xhr.send(data)
          }
        })
        .catch(err => {
          console.log(err)
          if (
            err.response.data.error.message ===
            "Энэ талбарын утгыг давхардуулж өгч болохгүй!"
          ) {
            toast("Бүртгүүлсэн хэрэглэгч байна")
          } else if (err.response.data.error.message) {
            toast(err.response.data.error.message)
          } else {
            toast(err.message)
          }
        })
    },
  })
  document.title = "Хэрэглэгч нэмэх"

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
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="" breadcrumbItem="хэрэглэгч нэмэх" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Хэрэглэгч нэмэх</CardTitle>
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
                        email
                      </Label>
                      <Col lg="10">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
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
                        Овог эхний үсэг ЖН/: Ц.
                      </Label>
                      <Col lg="10">
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastName || ""}
                          invalid={
                            validation.touched.lastName &&
                            validation.errors.lastName
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
                        Өөрийн нэр
                      </Label>
                      <Col lg="10">
                        <Input
                          id="firstName"
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
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Албан тушаал
                      </Label>
                      <Col lg="10">
                        <Input
                          id="occupation"
                          name="occupation"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.occupation || ""}
                          invalid={
                            validation.touched.occupation &&
                            validation.errors.occupation
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
                        Эрх Жн: user admin
                      </Label>
                      <Col lg="10">
                        <Input
                          id="role"
                          name="role"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.role || ""}
                          invalid={
                            validation.touched.role && validation.errors.role
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
                        Утасны дугаар
                      </Label>
                      <Col lg="10">
                        <Input
                          id="phone"
                          name="phone"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone || ""}
                          invalid={
                            validation.touched.phone && validation.errors.phone
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
                        Нууц үг
                      </Label>
                      <Col lg="10">
                        <Input
                          id="password"
                          name="password"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>

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
                    <Row className="justify-content-end">
                      <Col lg="10">
                        <Button type="submit" color="primary">
                          Нэмэх
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

export default TeamCreate
