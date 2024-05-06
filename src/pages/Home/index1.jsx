import React from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
//import * as Yup from "yup";
import "../../index.css";
import {
  Question,
  Sheet,
  Options,
  Choice,
} from "../../common/component/intialValues";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { Button } from "reactstrap";
export default function Home() {
  const handleSubmit = (values) => {
    // patchModalData(baseurl, educationEndpoints, values, setLoading, setOpen, "")
  };

  const formikRef = React.useRef();
  // const ValidationSchema = Yup.object().shape({
  //   question_details: Yup.array().of(
  //     Yup.object().shape({
  //       education_id: Yup.string().required("Education is Required"),
  //       board_id: Yup.string().when(["education_id"], {
  //         is: (value) => {
  //           const edu = edudropData?.filter(data => data.id == value)[0]?.education_type;
  //           return edu === "school";
  //         },
  //         then: () => Yup.string().required("Board is Required"),
  //         otherwise: () => Yup.string().notRequired(),
  //       }),
  //       university: Yup.string().when(["education_id"], {
  //         is: (value) => {
  //           const edu = edudropData?.filter(data => data.id == value)[0]?.education_type;
  //           return edu === "graduation";
  //         },
  //         then: () => Yup.string().required("University Name is Required"),
  //         otherwise: () => Yup.string().notRequired(),
  //       }),
  //       test_id: Yup.string().when(["education_id"], {
  //         is: (value) => {
  //           const edu = edudropData?.filter(data => data.id == value)[0]?.education_type;
  //           return edu === "test";
  //         },
  //         then: () => Yup.string().required("Test Name is Required"),
  //         otherwise: () => Yup.string().notRequired(),
  //       }),
  //       cgpa_percentage: Yup.string().when(["education_id"], {
  //         is: (value) => {
  //           const edu = edudropData?.filter(data => data.id == value)[0]?.education_type;
  //           return edu === "school" || edu === "graduation"
  //         },
  //         then: () => Yup.string().required("Percentage is Required"),
  //         otherwise: () => Yup.string().notRequired(),
  //       }),
  //       semester_percentage: Yup.string().when(["education_id"], {
  //         is: (value) => {
  //           const edu = edudropData?.filter(data => data.id == value)[0]?.education_type;
  //           return edu === "graduation"
  //         },
  //         then: () => Yup.string().required("Percentage is Required"),
  //         otherwise: () => Yup.string().notRequired(),
  //       }),
  //       score: Yup.string().when(["education_id"], {
  //         is: (value) => {
  //           const edu = edudropData?.filter(data => data.id == value)[0]?.education_type;
  //           return edu === "test"
  //         },
  //         then: () => Yup.string().required("Score Required"),
  //         otherwise: () => Yup.string().notRequired(),
  //       }),
  //     })
  //   ),

  // });
  return (
    <Formik
      enableReinitialize
      //validationSchema={ValidationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      initialValues={{ question_details: [Question], Sheet }}
      onSubmit={(values) => handleSubmit(values)}
      innerRef={formikRef}
    >
      {(formik) => {
        console.log("formik Values", formik.values);
        return (
          <Form>
            <div className=" m-3">
              <div className="mb-2">
                <FormGroup row style={{ rowGap: "5px" }}>
                  <Label for="Question Sheet ID" sm={10} className="label">
                    Question Sheet ID <span className="red-required"> *</span>
                  </Label>
                  <br></br>
                  <Col sm={12} md={12} lg={6} xxl={6}>
                    <Input
                      id={`Sheet.sheetId`}
                      name={`Sheet.sheetId`}
                      placeholder="Question Sheet ID"
                      type="text"
                      style={{ width: "500px" }}
                      onChange={formik.handleChange}
                    />
                    <ErrorMessage
                      name={`Sheet.sheetId`}
                      component="div"
                      className="error"
                    />
                  </Col>
                  <Col sm={12} md={12} lg={6} xxl={6}>
                    <Button color="primary" onClick={() => {}}>
                      Upload to GoogleSheet
                    </Button>
                  </Col>
                </FormGroup>
              </div>
              <hr />
              <FieldArray name="question_details">
                {({ push, remove }) => (
                  <div>
                    {formik.values.question_details?.length > 0 &&
                      formik.values.question_details?.map((data, index) => {
                        return (
                          <div key={data?.id}>
                            <FormGroup>
                              <Label
                                for={`question_details[${index}].questionId`}
                                sm={10}
                                className="label"
                              >
                                Question ID
                              </Label>
                              <br></br>
                              <Input
                                id={`question_details[${index}].questionId`}
                                name={`question_details[${index}].questionId`}
                                placeholder="Question ID"
                                type="text"
                                style={{ width: "300px" }}
                                onChange={formik.handleChange}
                              />
                              <ErrorMessage
                                name={`question_details[${index}].questionId`}
                                component="div"
                                className="error"
                              />
                            </FormGroup>
                            <FormGroup row style={{ Gap: "5px" }}>
                              <Label
                                for={`question_details[${index}].question`}
                                sm={10}
                                className="label"
                              >
                                Question{" "}
                                <span className="red-required"> *</span>
                              </Label>
                              <br></br>
                              <Col sm={12} md={12} lg={6} xxl={6}>
                                <Input
                                  id={`question_details[${index}].question`}
                                  name={`question_details[${index}].question`}
                                  placeholder="Question"
                                  type="textarea"
                                  style={{ width: "100%", height: "100px" }}
                                  onChange={formik.handleChange}
                                />
                                <ErrorMessage
                                  name={`question_details[${index}].question`}
                                  component="div"
                                  className="error"
                                />
                              </Col>
                              <Col sm={12} md={12} lg={6} xxl={6}>
                                <Input
                                  id="question"
                                  name="question"
                                  placeholder="question"
                                  style={{ width: "100%", height: "100px" }}
                                  type="textarea"
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row style={{ Gap: "5px" }}>
                              <Label
                                for={`question_details[${index}].questionType`}
                                sm={10}
                                className="label"
                              >
                                Question Type{" "}
                                <span className="red-required"> *</span>
                              </Label>
                              <br></br>
                              <Col sm={12} md={12} lg={6} xxl={6}>
                                {Object.keys(Options).map(
                                  (option, optionIndex) => (
                                    <div key={optionIndex} className="d-flex gap-2">
                                      <Input
                                        id={`question_details[${index}].questionType-${optionIndex}`}
                                        name={`question_details[${index}].questionType-${optionIndex}`}
                                        value={Options[option]}
                                        type="radio"
                                        onChange={formik.handleChange}
                                      />
                                      <Label
                                        htmlFor={`question_details[${index}].questionType-${optionIndex}`}
                                      >
                                        {option}
                                      </Label>
                                    </div>
                                  )
                                )}
                                <ErrorMessage
                                  name={`question_details[${index}].questionType`}
                                  component="div"
                                  className="error"
                                />
                              </Col>
                            </FormGroup>
                            {Number(
                              formik.values.question_details[`${index}`]
                                .questionType
                            ) === 1 && (
                              <div>
                                <FormGroup row style={{ Gap: "5px" }}>
                                  <Label
                                    for={`question_details[${index}]-questionType-check`}
                                    sm={10}
                                    className="label"
                                  >
                                    Choices{" "}
                                    <span className="red-required"> *</span>
                                  </Label>
                                  <br></br>
                                  {Choice?.length > 0 &&
                                    Choice.map((data, choiceIndex) => (
                                      <Col
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xxl={12}
                                        key={choiceIndex}
                                      >
                                        <Label
                                          for={`question_details[${index}]check-${choiceIndex}`}
                                          sm={10}
                                          className="label"
                                        >
                                          {data}{" "}
                                          <span className="red-required">
                                            {" "}
                                            *
                                          </span>
                                        </Label>
                                        <Input
                                          id={`question_details[${index}]check-${choiceIndex}`}
                                          name={`question_details[${index}]check-${choiceIndex}`}
                                          value={data}
                                          type="radio"
                                          onChange={formik.handleChange}
                                        />
                                        <br></br>
                                        <Row>
                                          <Col sm={12} md={12} lg={6} xxl={6}>
                                            <Input
                                              id={`question_details[${index}]check-${data}`}
                                              name={`question_details[${index}]check-${data}`}
                                              placeholder="Question"
                                              type="textarea"
                                              style={{
                                                width: "100%",
                                                height: "50px",
                                              }}
                                              onChange={formik.handleChange}
                                            />

                                            <ErrorMessage
                                              name={`question_details[${index}]check-${data}`}
                                              component="div"
                                              className="error"
                                            />
                                          </Col>
                                          <Col sm={12} md={12} lg={6} xxl={6}>
                                            <Input
                                              id={`question_details[${index}].question`}
                                              name={`question_details[${index}].question`}
                                              placeholder="test"
                                              type="textarea"
                                              style={{
                                                width: "100%",
                                                height: "50px",
                                              }}
                                              onChange={formik.handleChange}
                                            />
                                          </Col>
                                        </Row>
                                      </Col>
                                    ))}
                                </FormGroup>
                              </div>
                            )}
                            {Number(
                              formik.values.question_details[`${index}`]
                                .questionType
                            ) === 2 && (
                              <div>
                                <FormGroup row style={{ Gap: "5px" }}>
                                  <Label
                                    for={`question_details[${index}]-questionType-radio`}
                                    sm={10}
                                    className="label"
                                  >
                                    Choices{" "}
                                    <span className="red-required"> *</span>
                                  </Label>
                                  <br></br>
                                  {Choice?.length > 0 &&
                                    Choice.map((data, choiceIndex) => (
                                      <Col
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xxl={12}
                                        key={choiceIndex}
                                      >
                                        <Label
                                          for={`question_details[${index}]radio-${choiceIndex}`}
                                          sm={10}
                                          className="label"
                                        >
                                          {data}{" "}
                                          <span className="red-required">
                                            {" "}
                                            *
                                          </span>
                                        </Label>
                                        <Input
                                          id={`question_details[${index}]radio-${choiceIndex}`}
                                          name={`question_details[${index}]radio-${choiceIndex}`}
                                          value={data}
                                          type="radio"
                                          onChange={formik.handleChange}
                                        />
                                        <br></br>
                                        <Row>
                                          <Col sm={12} md={12} lg={6} xxl={6}>
                                            <Input
                                              id={`question_details[${index}]radio-${data}`}
                                              name={`question_details[${index}]radio-${data}`}
                                              placeholder="Question"
                                              type="textarea"
                                              style={{
                                                width: "100%",
                                                height: "50px",
                                              }}
                                              onChange={formik.handleChange}
                                            />

                                            <ErrorMessage
                                              name={`question_details[${index}]radio-${data}`}
                                              component="div"
                                              className="error"
                                            />
                                          </Col>
                                          <Col sm={12} md={12} lg={6} xxl={6}>
                                            <Input
                                              id={`question_details[${index}].question`}
                                              name={`question_details[${index}].question`}
                                              placeholder="test"
                                              type="textarea"
                                              style={{
                                                width: "100%",
                                                height: "50px",
                                              }}
                                              onChange={formik.handleChange}
                                            />
                                          </Col>
                                        </Row>
                                      </Col>
                                    ))}
                                </FormGroup>
                              </div>
                            )}
                            {Number(
                              formik.values.question_details[`${index}`]
                                .questionType
                            ) === 3 && (
                              <div>
                                <FormGroup row style={{ Gap: "5px" }}>
                                  <Label
                                    for={`question_details[${index}]-questionType-short`}
                                    sm={10}
                                    className="label"
                                  >
                                    Short Answer{" "}
                                    <span className="red-required"> *</span>
                                  </Label>
                                  <br></br>
                                  <Col sm={12} md={12} lg={6} xxl={6}>
                                    <Input
                                      id={`question_details[${index}]short`}
                                      name={`question_details[${index}]short`}
                                      placeholder="Short Answer"
                                      type="textarea"
                                      style={{
                                        width: "100%",
                                        height: "50px",
                                      }}
                                      onChange={formik.handleChange}
                                    />

                                    <ErrorMessage
                                      name={`question_details[${index}]short`}
                                      component="div"
                                      className="error"
                                    />
                                  </Col>
                                   <Col sm={12} md={12} lg={6} xxl={6}>
                                            <Input
                                              id={`question_details[${index}].question`}
                                              name={`question_details[${index}].question`}
                                              placeholder="test"
                                              type="textarea"
                                              style={{
                                                width: "100%",
                                                height: "50px",
                                              }}
                                              onChange={formik.handleChange}
                                            />
                                          </Col>
                                </FormGroup>
                              </div>
                            )}

                            <FormGroup row style={{ Gap: "5px" }}>
                              <Label
                                for={`question_details[${index}].solution`}
                                sm={10}
                                className="label"
                              >
                                Solution{" "}
                                <span className="red-required"> *</span>
                              </Label>
                              <br></br>
                              <Col sm={12} md={12} lg={6} xxl={6}>
                                <Input
                                  id={`question_details[${index}].solution`}
                                  name={`question_details[${index}].solution`}
                                  placeholder="Solution"
                                  type="textarea"
                                  style={{ width: "100%", height: "100px" }}
                                  onChange={formik.handleChange}
                                />
                                <ErrorMessage
                                  name={`question_details[${index}].solution`}
                                  component="div"
                                  className="error"
                                />
                              </Col>
                              <Col sm={12} md={12} lg={6} xxl={6}>
                                <Input
                                  id="question"
                                  name="question"
                                  placeholder="test"
                                  style={{ width: "100%", height: "100px" }}
                                  type="textarea"
                                />
                              </Col>
                            </FormGroup>
                            <div className="d-flex justify-content-center gap-2">
                              {/* <div className="p-5"> */}
                              <Button color="primary" onClick={() => {}}>
                                Save
                              </Button>
                              <Button color="primary" onClick={() => {}}>
                                Reset
                              </Button>
                              <Button color="primary" onClick={() => {}}>
                                Validate
                              </Button>
                              {/* </div> */}
                            </div>
                            <FormGroup row style={{ Gap: "5px" }}>
                              <Label
                                for={`question_details[${index}].remark`}
                                sm={10}
                                className="label"
                              >
                                Remark{" "}
                              </Label>
                              <br></br>
                              <Col sm={12} md={12} lg={6} xxl={6}>
                                <Input
                                  id={`question_details[${index}].remark`}
                                  name={`question_details[${index}].remark`}
                                  placeholder="Remark"
                                  type="textarea"
                                  style={{ width: "100%", height: "100px" }}
                                  onChange={formik.handleChange}
                                />
                                <ErrorMessage
                                  name={`question_details[${index}].remark`}
                                  component="div"
                                  className="error"
                                />
                              </Col>
                            </FormGroup>
                          </div>
                        );
                      })}
                  </div>
                )}
              </FieldArray>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
