import React from "react";
import { Formik, Form, FieldArray, ErrorMessage, } from "formik";
import * as Yup from "yup";
import "../../index.css";
import { Question, Options, Choice, QuestionData, } from "../../common/component/intialValues";
import { Col, FormGroup, Input, Label } from "reactstrap";
import { Button } from "reactstrap";
import { showToast } from "../../common/component/services/toaster";
import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function Home() {
  const formikRef = React.useRef();
  const handleSubmit = (values) => {
    console.log(formikRef.current.dirty,values);
    if (formikRef.current.dirty) {
      showToast("success", "Saved"); 
     // patchModalData(baseurl, educationEndpoints, values, setLoading, setOpen, "")
    }
    else{
      showToast("error", "Form Not Modified");   
     }
  };

  const ValidationSchema = Yup.object().shape({
    question_details: Yup.array().of(
      Yup.object().shape({
        questionId: Yup.string().required("Question ID is Required"),
        question: Yup.string().required("Question is Required"),
        questionType: Yup.string().required("QuestionType is Required"),
        radio: Yup.object().when(["questionType"], {
          is: "2",
          then: () =>
            Yup.object().shape({
              "Option A": Yup.string().required("Option A is required"),
              "Option B": Yup.string().required("Option B is required"),
              "Option C": Yup.string().required("Option C is required"),
              "Option D": Yup.string().required("Option D is required"),
            }),
          otherwise: () => Yup.object().notRequired(),
        }),
        radio_answer: Yup.string().when(["questionType"], {
          is: "2",
          then: () => Yup.string().required("Select Option"),
          otherwise: ()=> Yup.string().notRequired()
        }),
        check: Yup.object().when("questionType", {
          is: "1",
          then: () =>
            Yup.object().shape({
              "Option A": Yup.string().required("Option A is required"),
              "Option B": Yup.string().required("Option B is required"),
              "Option C": Yup.string().required("Option C is required"),
              "Option D": Yup.string().required("Option D is required"),
            }),
          otherwise: () => Yup.object().notRequired(),
        }),
        // mathJaxCheck: Yup.object().when("questionType", {
        //   is: "1",
        //   then: () =>
        //     Yup.object().shape({
        //       "Option A": Yup.string().required("Option A is required"),
        //       "Option B": Yup.string().required("Option B is required"),
        //       "Option C": Yup.string().required("Option C is required"),
        //       "Option D": Yup.string().required("Option D is required"),
        //     }),
        //   otherwise: () => Yup.object().notRequired(),
        // }),
        check_answer: Yup.object().when("questionType", {
          is: "1", 
          then: ()=> Yup.object().test(
            "Select Options",
            "Please select at least one option", // Custom error message
            value => Object.values(value).some(option => option === true)
          ),
          otherwise: () => Yup.object().notRequired(),
        }),
        short: Yup.string().when(["questionType"], {
          is: "3",
          then: () => Yup.string().nonNullable().required("Short Answer is required"),
          otherwise: () => Yup.string().notRequired(),
        }),
        solution: Yup.string().required("Solution is required"),
        remark: Yup.string().notRequired(),
      })
    ),
    SheetID:  Yup.string().required("QuestionSheet ID is Required"),
  });  
  
  return (
    <Formik
      enableReinitialize
      validationSchema={ValidationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      initialValues={QuestionData}
      innerRef={formikRef}
      onSubmit={(values) => handleSubmit(values)}
    >
      {(formik) => {
        console.log("formik Values", formik.values);
        console.log("formik errors", formik.errors);
        return (
          <Form>
            <div className="m-3">
              <div className="mb-4">
                <FormGroup row style={{ rowGap: "5px" }}>
                  <Label for="Question Sheet ID" sm={10} className="label">
                    Question Sheet ID <span className="red-required"> *</span>
                  </Label>
                  <Col sm={12} md={12} lg={6} xxl={6} className="mt-2">
                    <Input
                      id={`SheetID`}
                      name={`SheetID`}
                      placeholder="Question Sheet ID"
                      type="text"
                      style={{ width: "500px" }}
                      onChange={formik.handleChange}
                    />
                    <ErrorMessage
                      name={`SheetID`}
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
                        function reset(index) {
                          formik.setFieldValue( `question_details[${index}]`, Question );
                        }
                        return (
                          <div key={index}>
                            <FormGroup>
                              <Label
                                for={`question_details[${index}].questionId`}
                                sm={10}
                                className="label"
                              >
                                {`Question ID ${index + 1}`}
                                <span className="red-required"> *</span>
                              </Label>
                              <Input
                                id={`question_details[${index}].questionId`}
                                name={`question_details[${index}].questionId`}
                                value={ formik.values.question_details[`${index}`] .questionId }
                                placeholder="Question ID"
                                type="text"
                                style={{ width: "300px" }}
                                onChange={formik.handleChange}
                                className="mt-2"
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

                              <Col
                                sm={12}
                                md={12}
                                lg={6}
                                xxl={6}
                                className="mt-2"
                              >
                                <Input
                                  id={`question_details[${index}].question`}
                                  name={`question_details[${index}].question`}
                                  value={ formik.values.question_details[`${index}`] .question }
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
                              <Col
                                sm={12}
                                md={12}
                                lg={6}
                                xxl={6}
                                className="mt-2"
                              >
                                <Input
                                  id="question"
                                  name="question"
                                  placeholder="test"
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

                              <Col
                                sm={12}
                                md={12}
                                lg={6}
                                xxl={6}
                                className="d-flex"
                              >
                                {Object.keys(Options).map(
                                  (option, optionIndex) => (
                                    <FormGroup
                                      radio
                                      key={optionIndex}
                                      className="d-flex gap-2"
                                      style={{ marginRight: "15px" }}
                                    >
                                      <Input
                                        id={`question_details[${index}].questionType-${optionIndex}`}
                                        name={`question_details[${index}].questionType`}
                                        defaultValue={ formik.values.question_details[ `${index}` ].questionType }
                                        label={option}
                                        value={Options[option]}
                                        type="radio"
                                        onChange={formik.handleChange}
                                      />
                                      <Label
                                        htmlFor={`question_details[${index}].questionType`}
                                      >
                                        {option}
                                      </Label>
                                    </FormGroup>
                                  )
                                )}
                                <ErrorMessage
                                  name={`question_details[${index}].questionType`}
                                  component="div"
                                  className="error"
                                />
                              </Col>
                            </FormGroup>
                            {Number(formik.values.question_details[`${index}`]
                              .questionType) === 1 && (
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

                                  {Choice?.length > 0 &&
                                    Choice.map((data, choiceIndex) => (
                                      <Col
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xxl={12}
                                        key={choiceIndex}
                                        className="mt-3"
                                      >
                                        <div className="d-flex gap-2 mt-2">
                                          <Label
                                            for={`question_details[${index}].check-${choiceIndex}`}
                                            className="label"
                                          >
                                            {data}{" "}
                                            <span className="red-required">
                                              {" "}
                                              *
                                            </span>
                                          </Label>
                                          <Input
                                            id={`question_details[${index}].check_answer.${data}`}
                                            name={`question_details[${index}].check_answer.${data}`}
                                            checked={ formik.values.question_details[ `${index}` ].check_answer[`${data}`] }
                                            value={data}
                                            type="checkbox"
                                            onChange={formik.handleChange}
                                          />
                                          <ErrorMessage
                                              name={`question_details[${index}].check_answer`}
                                              component="div"
                                              className="error"
                                            />
                                        </div>
                                        <div
                                          className="mt-2 d-flex gap-2"
                                        >
                                          <Col sm={12} md={12} lg={6} xxl={6}>
                                            <Input
                                              id={`question_details[${index}].check[${data}]`}
                                              name={`question_details[${index}].check[${data}]`}
                                              value={formik.values.question_details[ `${index}` ].check[`${data}`]}
                                              placeholder={data}
                                              type="textarea"
                                              style={{
                                                width: "100%",
                                                height: "50px",
                                              }}
                                              onChange={(e)=>
                                                {
                                                  formik.handleChange(e)
                                                  formik.setFieldValue(`question_details[${index}].mathJaxCheck[${data}]`,e.target.value);

                                                }}
                                            />

                                            <ErrorMessage
                                              name={`question_details[${index}].check[${data}]`}
                                              component="div"
                                              className="error"
                                            />
                                          </Col>
                                          <Col sm={12} md={12} lg={6} xxl={6}>
                                            <Input
                                              id={`question_details[${index}].mathJaxCheck[${data}]`}
                                              name={`question_details[${index}].mathJaxCheck[${data}]`}
                                              value={<MathJax>{`DFDf`}</MathJax>}
                                              placeholder={`converted ${data}`}
                                              type="textarea"
                                              style={{
                                                width: "100%",
                                                height: "50px",
                                              }}
                                              onChange={formik.handleChange}
                                            />
                                          </Col>
                                          <ErrorMessage
                                              name={`question_details[${index}].mathJaxCheck.${data}`}
                                              component="div"
                                              className="error"
                                            />
                                        </div>
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
                                  {Choice?.length > 0 &&
                                    Choice.map((data, choiceIndex) => (
                                      <Col
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xxl={12}
                                        key={choiceIndex}
                                        className="mt-3"
                                      >
                                        <div className="d-flex gap-2 mt-2">
                                          <Label
                                            for={`question_details[${index}].radio-${choiceIndex}`}
                                            className="label"
                                          >
                                            {data}{" "}
                                            <span className="red-required">
                                              {" "}
                                              *
                                            </span>
                                          </Label>
                                          <Input
                                            id={`question_details[${index}].radio_answer-${choiceIndex}`}
                                            name={`question_details[${index}].radio_answer`}
                                            defaultValue={ formik.values.question_details[ `${index}` ].radio_answer }
                                            value={data}
                                            type="radio"
                                            onChange={formik.handleChange}
                                          />
                                           <ErrorMessage
                                              name={`question_details[${index}].radio_answer`}
                                              component="div"
                                              className="error"
                                            />
                                        </div>
                                        <div className="d-flex gap-2 mt-2">
                                          <Col sm={12} md={12} lg={6} xxl={6}>
                                            <Input
                                              id={`question_details[${index}].radio.${data}`}
                                              name={`question_details[${index}].radio.${data}`}
                                              value={ formik.values.question_details[ `${index}` ].radio[`${data}`] }
                                              placeholder={data}
                                              type="textarea"
                                              style={{
                                                width: "100%",
                                                height: "50px",
                                              }}
                                              onChange={formik.handleChange}
                                            />

                                            <ErrorMessage
                                              name={`question_details[${index}].radio.${data}`}
                                              component="div"
                                              className="error"
                                            />
                                          </Col>
                                          <Col sm={12} md={12} lg={6} xxl={6}>
                                            <Input
                                              id={`question_details[${index}].mathJaxRadio[${data}]`}
                                              name={`question_details[${index}].mathJaxRadio[${data}]`}
                                              placeholder={`converted ${data}`}
                                              type="textarea"
                                              style={{
                                                width: "100%",
                                                height: "50px",
                                              }}
                                              onChange={formik.handleChange}
                                            />
                                          </Col>
                                        </div>
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
                                  <Col
                                    sm={12}
                                    md={12}
                                    lg={6}
                                    xxl={6}
                                    className="mt-2"
                                  >
                                    <Input
                                      id={`question_details[${index}].short`}
                                      name={`question_details[${index}].short`}
                                      value={ formik.values.question_details[ `${index}` ].short }
                                      placeholder="Short Answer"
                                      type="textarea"
                                      style={{
                                        width: "100%",
                                        height: "50px",
                                      }}
                                      onChange={formik.handleChange}
                                    />

                                    <ErrorMessage
                                      name={`question_details[${index}].short`}
                                      component="div"
                                      className="error"
                                    />
                                  </Col>
                                  <Col
                                    sm={12}
                                    md={12}
                                    lg={6}
                                    xxl={6}
                                    className="mt-2"
                                  >
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
                              <Col
                                sm={12}
                                md={12}
                                lg={6}
                                xxl={6}
                                className="mt-2"
                              >
                                <Input
                                  id={`question_details[${index}].solution`}
                                  name={`question_details[${index}].solution`}
                                  value={ formik.values.question_details[`${index}`] .solution }
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
                              <Col
                                sm={12}
                                md={12}
                                lg={6}
                                xxl={6}
                                className="mt-2"
                              >
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
                              <Button
                                color="primary"
                                onClick={(index) => formik.handleSubmit(index)}
                              >
                                Save
                              </Button>
                              <Button
                                color="primary"
                                onClick={() => reset(index)}
                              >
                                Reset
                              </Button>
                              <Button color="primary" onClick={() => {}}>
                                Validate
                              </Button>
                            </div>
                            <FormGroup row className="FormGroup">
                              <Label
                                for={`question_details[${index}].remark`}
                                sm={10}
                                className="label"
                              >
                                Remark{" "}
                              </Label>
                              <Col sm={12} md={12} lg={6} xxl={6}>
                                <Input
                                  id={`question_details[${index}].remark`}
                                  name={`question_details[${index}].remark`}
                                  value={ formik.values.question_details[`${index}`] .remark }
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
                            <div className="d-flex justify-content-end gap-3">
                              <Button
                                color="success"
                                onClick={() => push(Question)}
                              >
                                Add Question
                              </Button>
                              {index >= 1 && (
                                <Button
                                  color="danger"
                                  onClick={() => remove(index)}
                                >
                                  Remove Question
                                </Button>
                              )}
                            </div>
                            <hr />
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
