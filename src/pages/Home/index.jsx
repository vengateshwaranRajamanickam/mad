import React from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import { object, string, array, yup } from 'yup';
import "../../index.css";
import {
  Question,
  Options,
  Choice,
  Que
} from "../../common/component/intialValues";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { Button } from "reactstrap";
export default function Home() {
  const handleSubmit = (values) => {
    // patchModalData(baseurl, educationEndpoints, values, setLoading, setOpen, "")
  };

  const formikRef = React.useRef();
  const ValidationSchema = object().shape({
    question_details: array().of(
      object().shape({
        questionId: string().required("Question ID is Required"),
        question: string().required("Question is Required"),
        questionType: string().required("questionType is Required"),
        radio: object().when('questionType', {
          is: "2",
          then: object().shape({
            optionA: string().required("Option A is required"),
            optionB: string().required("Option B is required"),
            optionC: string().required("Option C is required"),
            optionD: string().required("Option D is required"),
          }),
          otherwise: object().shape({
            optionA: string().notRequired(),
            optionB: string().notRequired(),
            optionC: string().notRequired(),
            optionD: string().notRequired(),
          }),
        }),
        check: object().when('questionType', {
          is: "1",
          then: object().shape({
            optionA: string().required("Option A is required"),
            optionB: string().required("Option B is required"),
            optionC: string().required("Option C is required"),
            optionD: string().required("Option D is required"),
          }),
          otherwise: object().shape({
            optionA: string().notRequired(),
            optionB: string().notRequired(),
            optionC: string().notRequired(),
            optionD: string().notRequired(),
          }),
        }),
        short: string().when('questionType', {
          is: "3",
          then: () => string().required("Short Answer is required"),
          otherwise: () => string().notRequired(),
        }),
        solution: string().required("Solution is required"),
        remark: string().notRequired(),

      })
    ),
  })

  // });
  return (
    <Formik
      enableReinitialize
     //validationSchema={ValidationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      initialValues={Que}
      onSubmit={(values) => handleSubmit(values)}
      innerRef={formikRef}
    >
      {(formik) => {
        console.log("formik Values", formik.values);
       // console.log("formik errors",formik.errors);
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
                    <Button color="primary" onClick={() => { }}>
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
                          <div key={index}>
                            <FormGroup>
                              <Label
                                for={`question_details[${index}].questionId`}
                                sm={10}
                                className="label"
                              >
                                {`Question ID ${index+1}`}<span className="red-required"> *</span>
                              </Label>
                              <br></br>
                              <Input
                                id={`question_details[${index}].questionId`}
                                name={`question_details[${index}].questionId`}
                                value={formik.values.question_details[`${index}`].questionId}
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
                                  value={formik.values.question_details[`${index}`].question}
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
                                        name={`question_details[${index}].questionType`}
                                        defaultValue={formik.values.question_details[`${index}`].questionType}
                                        
                                        value={Options[option]}
                                        type="radio"
                                        onChange={formik.handleChange}
                                      />
                                      <Label
                                        htmlFor={`question_details[${index}].questionType`}
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
                            {
                              formik.values.question_details[`${index}`]
                                .questionType
                             == 1 && (
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
                                          className="m-2 "
                                        >
                                          <div className="d-flex gap-2">                                        <Label
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
                                            //defaultValue={formik.values.question_details[`${index}`].questionType}
                                            checked={formik.values.question_details[`${index}`].check_answer[`${data}`]} 
                                            value={data}
                                            type="checkbox"
                                            onChange={formik.handleChange}
                                          />
                                          </div>
  
                                          <br></br>
                                          <Row>
                                            <Col sm={12} md={12} lg={6} xxl={6}>
                                              <Input
                                                id={`question_details[${index}].check.${data}`}
                                                name={`question_details[${index}].check.${data}`}
                                                value={formik.values.question_details[`${index}`].check[`${data}`]}
                                                placeholder={data}
                                                type="textarea"
                                                style={{
                                                  width: "100%",
                                                  height: "50px",
                                                }}
                                                onChange={formik.handleChange}
                                              />

                                              <ErrorMessage
                                                name={`question_details[${index}].check.${data}`}
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
                                            for={`question_details[${index}].radio-${choiceIndex}`}
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
                                            id={`question_details[${index}].radio_answer-${choiceIndex}`}
                                            name={`question_details[${index}].radio_answer`}
                                            defaultValue={formik.values.question_details[`${index}`].radio_answer}
                                            value={data}
                                            type="radio"
                                            onChange={formik.handleChange}
                                          />
                                          <br></br>
                                          <Row>
                                            <Col sm={12} md={12} lg={6} xxl={6}>
                                              <Input
                                                id={`question_details[${index}].radio.${data}`}
                                                name={`question_details[${index}].radio.${data}`}
                                                value={formik.values.question_details[`${index}`].radio[`${data}`]}
                                                placeholder={`${data}`}
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
                                        id={`question_details[${index}].short`}
                                        name={`question_details[${index}].short`}
                                        value={formik.values.question_details[`${index}`].short}
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
                                  value={formik.values.question_details[`${index}`].solution}
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

                              <Button color="primary" onClick={() => { }}>
                                Save
                              </Button>
                              <Button color="primary" onClick={() => { }}>
                                Reset
                              </Button>
                              <Button color="primary" onClick={() => { }}>
                                Validate
                              </Button>

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
                                  value={formik.values.question_details[`${index}`].remark}
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
                            <Button color="success"  onClick={()=>push(Question)}>Add Question</Button>
                {index >= 1 && <Button color="danger"  onClick={()=>remove(index)}>Remove Question</Button>}
                </div>
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


// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useFieldArray } from 'react-hook-form'; // Assuming useFieldArray is from react-hook-form
// import * as Yup from 'yup'; // Assuming Yup is used for validation

// // Assuming Question and Choice are defined elsewhere
// const Question = {}; // Replace with your Question schema
// const Choice = []; // Replace with your Choice array

// const ValidationSchema = Yup.object().shape({
//   // Add validation rules for your form fields here
//   SheetID: Yup.string().required('Question Sheet ID is required'),
//   question_details: Yup.array().of(
//     Yup.object().shape({
//       questionId: Yup.string().required('Question ID is required'),
//       question: Yup.string().required('Question is required'),
//       questionType: Yup.string().required('Question Type is required'),
//       // Add validation rules for other nested fields as needed
//     })
//   ),
// });

// const MyForm = () => {
//   const formikRef = React.createRef();

//   const handleSubmit = (values) => {
//     console.log('Form values:', values);
//     // Handle form submission logic here
//   };

//   const { push, remove } = useFieldArray(formik.form.question_details);

//   return (
//     <Formik
//       enableReinitialize
//       validationSchema={ValidationSchema}
//       validateOnChange={true}
//       validateOnBlur={true}
//       initialValues={{ question_details: [Question] }} // Assuming Question is an empty array or object
//       onSubmit={handleSubmit}
//       innerRef={formikRef}
//     >
//       {(formik) => {
//         console.log("formik Values", formik.values);
//         console.log("formik errors", formik.errors);

//         return (
//           <Form>
//             <div className="m-3">
//               <div className="mb-2">
//                 <FormGroup row style={{ rowGap: "5px" }}>
//                   <Label for="Question Sheet ID" sm={10} className="label">
//                     Question Sheet ID <span className="red-required"> *</span>
//                   </Label>
//                   <br />
//                   <Col sm={12} md={12} lg={6} xxl={6}>
//                     <Field
//                       id={`SheetID`}
//                       name={`SheetID`}
//                       placeholder="Question Sheet ID"
//                       type="text"
//                       style={{ width: "500px" }}
//                     />
//                     <ErrorMessage
//                       name={`SheetID`}
//                       component="div"
//                       className="error"
//                     />
//                   </Col>
//                   <Col sm={12} md={12} lg={6} xxl={6}>
//                     <Button color="primary" onClick={() => { }}>
//                       Upload to GoogleSheet
//                     </Button>
//                   </Col>
//                 </FormGroup>
//               </div>
//               <hr />

//               {formik.values.question_details?.map((data, index) => (
//                 <div key={index}>
//                   <FormGroup>
//                     <Label
//                       for={`question_details[${index}].questionId`}
//                       sm={10}
//                       className="label"
//                     >
//                       Question ID <span className="red-required"> *</span>
//                     </Label>
//                     <br />
//                     <Field
//                       id={`question_details[${index}].questionId`}
//                       name={`question_details[${index}].questionId`}
//                       placeholder="Question ID"
//                       type="text"
//                       style={{ width: "300px" }}
//                     />
//                     <ErrorMessage
//                       name={`question_details[${index}].questionId`}
//                       component="div"
//                       className="error"
//                     />
//                   </FormGroup>
//                   <FormGroup row style={{ Gap: "5px" }}>
//                     <Label
//                       for={`question_details[${index}].question`}
//                       sm={10}
//                       className="label"
//                     >
//                       Question <span className="red-required"> *</span>
//                     </Label>
//                     <br />
//                     <Col sm={12} md={12} lg={6} xxl={6}>
//                       <Field
//                         id={`question_details[${index}].question`}
//                         name={`question_details[${index}].question`}
//                         placeholder="Question"



// import React from 'react';
// import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const ValidationSchema = Yup.object().shape({
//   // Define your validation schema here
// });

// const initialValues = {
//   question_details: [{ questionId: '', question: '', questionType: '' }],
//   SheetID: ''
// };

// const Options = {
//   // Define your options here
// };

// const Choice = ['Choice1', 'Choice2', 'Choice3'];

// const YourComponent = () => {
//   const handleSubmit = (values) => {
//     // Handle form submission
//   };

//   return (
//     <Formik
//       enableReinitialize
//       validationSchema={ValidationSchema}
//       validateOnChange={true}
//       validateOnBlur={true}
//       initialValues={initialValues}
//       onSubmit={(values) => handleSubmit(values)}
//     >
//       {(formik) => (
//         <Form>
//           <div className="m-3">
//             <FieldArray name="question_details">
//               {({ push, remove }) => (
//                 <div>
//                   {formik.values.question_details.map((data, index) => (
//                     <div key={index}>
//                       <Field name={`question_details[${index}].questionId`} />
//                       <ErrorMessage name={`question_details[${index}].questionId`} component="div" className="error" />

//                       <Field name={`question_details[${index}].question`} />
//                       <ErrorMessage name={`question_details[${index}].question`} component="div" className="error" />

//                       <Field name={`question_details[${index}].questionType`} as="select">
//                         {Object.keys(Options).map((option, optionIndex) => (
//                           <option key={optionIndex} value={Options[option]}>
//                             {option}
//                           </option>
//                         ))}
//                       </Field>
//                       <ErrorMessage name={`question_details[${index}].questionType`} component="div" className="error" />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </FieldArray>

//             {/* Additional form fields outside FieldArray */}
//             <div>
//               <label htmlFor="SheetID">Question Sheet ID</label>
//               <Field id="SheetID" name="SheetID" placeholder="Question Sheet ID" type="text" />
//               <ErrorMessage name="SheetID" component="div" className="error" />
//             </div>

//             {/* Buttons */}
//             <div className="d-flex justify-content-center gap-2">
//               <button type="submit">Submit</button>
//               <button type="reset">Reset</button>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default YourComponent;
