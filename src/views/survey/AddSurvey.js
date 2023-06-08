import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Steps, Panel } from 'rsuite';
import { CButton } from '@coreui/react';
import api, { registerAccessToken } from "../../api";
import 'rsuite/styles/index.less';
import "rsuite/dist/rsuite.min.css";
import TextArea from "../../components/TextArea"
import Options from "./AttributeManager/AddDeleteTableRows"
import AddDeleteTableRowsUser from "./UserManager/AddDeleteTableRows"
import OptionsManager from "./OptionsManager/AddDeleteTableRows"
import ImageList1 from "./ImageUpload1/AddDeleteTableRows"
import ImageList2 from "./ImageUpload2/AddDeleteTableRows"
import ImageList3 from "./ImageUpload3/AddDeleteTableRows"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { accessToken } from "../../store";
import { useDispatch } from "react-redux";

export default function SurveyPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [step, setStep] = React.useState(0);
  const [title, setTitle] = useState('');
  const [description1, setDescription1] = useState('');
  const [description2, setDescription2] = useState('');
  const [description3, setDescription3] = useState('');
  const [surveytype, setSurveyType] = useState('BEST_CHOICE');
  const [numOfoptions, setnumOfoptions] = useState([]);
  const [numOfscenarios, setnumOfscenarios] = useState(5);
  const [attributeData, setattributeData] = useState([]);
  const [usrData, setusrData] = useState([]);
  const [imgdata1, setimageData1] = useState([])
  const [imgdata2, setimageData2] = useState([])
  const [imgdata3, setimageData3] = useState([])
  const [onsubmission, setonsubmission] = useState(false)

  const [validData, setvalidData] = useState(false);
  const [errorMsg, seterrorMsg] = useState(false);

  useEffect(() => {
    // console.log({
    //   "title": title,
    //   "surveyType": surveytype,
    //   "numofScenario": numOfscenarios,
    //   "numofOptions": numOfoptions,
    //   "option": attributeData,
    //   "userDetails": usrData,
    //   "description": {description1, description2, description3},
    // })
    let validator = () => validateInputs()
    setvalidData(validator)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, numOfoptions, numOfscenarios, attributeData, step, usrData]);

  const validateInputs = () => {
    if (step === 0){
      if (title === ""){
        seterrorMsg("Title is required")
        return false
      }
    } 

    if (step === 1){
      if (numOfscenarios === "" || numOfoptions.length === 0){
        seterrorMsg("Number of scenarios & options are required")
        return false
      } 

      let validation = numOfoptions.filter(checkvalidity)

      function checkvalidity(data){
        return data.options_val === ""
      }
      
      if (validation.length >= 1){
        seterrorMsg("Options should have a value")
        return false
      }
    } 

    if (step === 2){
      if (attributeData.length === 0){
        seterrorMsg("At least add one attribute")
        return false
      }

      let validation = attributeData.filter(checkvalidity)

      function checkvalidity(data){
        if (data.options_val === "" || data.attributes === "" || data.attribute_Values === ""){
          return data
        }
      }
      
      if (validation.length >= 1){
        seterrorMsg("Define attributes, Attribute values and included alternatives")
        return false
      }
    } 

    if (step === 3){
      // if (usrData.length === 0){
      //   seterrorMsg("At least add one user data requirement")
      //   return false
      // }

      let validation = usrData.filter(checkvalidity)

      function checkvalidity(data){
        if (data.user_deail === ""){
          return data
        }
      }
      
      if (validation.length >= 1){
        seterrorMsg("User Details should have values for each column")
        return false
      }
    } 

    //should set error message and return false if there is error
    return true //if there is no error
  }

  const onChange = (nextStep, optionsval) => {
    if (optionsval === "previous" || validData === true) {
      setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    }else{
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onNext = async () => {
    onChange(step + 1, "next")
  }
  const onPrevious = async () => {
    onChange(step - 1, "previous");
  } 

  const SubmitData = async () => {
    setonsubmission(false)
    let survey = {
      "title": title,
      "surveyType": surveytype,
      "numofScenario": numOfscenarios,
      "numofOptions": numOfoptions,
      "option": attributeData,
      "userDetails": usrData,
      "description": {description1, description2, description3},
      "images": [imgdata1 , imgdata2, imgdata3]
    }
    console.log(survey)
    if (!registerAccessToken(accessToken(), history, dispatch)) return;
    let res;
    let data;
    [res, data] = await api.designer.createSurvey(survey);
    if (res.status === 201 ){
      toast.success("Survey submition successed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      history.push("/designer/survey/all")
    } else {
      toast.error("Survey submition failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } 

  const moduleVal = {toolbar: {
    container: [
        [{ 'header': [1,2,3,4,5,6,false] }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        ['clean'],
        [{ 'align': [] }],
    ],
    // handlers: {
    //   image : imageHandler
    // }
    }}

  const moduleVal_Title = {toolbar: {
    container: [
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        ['clean'],
        [{ 'align': [] }],
    ],
    // handlers: {
    //   image : imageHandler
    // }
    }}

  return (
    <div className="p-2">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
      <ToastContainer />
      <Steps current={step}>
        <Steps.Item title="Basic Details" description="Description" />
        <Steps.Item title="Survey Type Selection and Define Alternatives" description="Description" />
        <Steps.Item title="Attribute Define" description="Description" />
        <Steps.Item title="Social Economic Information" description="Description" />
      </Steps>
      <hr />
      {/* <Panel header={`Step: ${step + 1}`} hidden={step === 1 | step === 2 | step === 3}> */}
      <Panel hidden={step === 1 | step === 2 | step === 3}>
        <div class="grid grid-flow-row auto-rows-max pb-3">
          <div><h5>Survey Title<span >★</span></h5></div>
          <div class="mb-3">
          <div><TextArea moduleVal={moduleVal_Title} txtvalue={title} txtsetValue={setTitle}/></div>
          </div>
        </div>
        <div class="grid grid-flow-row auto-rows-max pb-3">
          <div><h5>Description for first page</h5></div>
          <div><TextArea moduleVal={moduleVal} txtvalue={description1} txtsetValue={setDescription1}/></div>
        </div>
        <div class="grid grid-flow-row auto-rows-max pb-3">
          <div><h5>Images for the first page</h5></div>
          <div><p>If Multiple photos are uploaded upload as one pictures after creating a collage, else pictures will be shown below each</p></div>
          <ImageList1 imgdata={imgdata1} setimageData={setimageData1}/>
        </div>
        <div class="grid grid-flow-row auto-rows-max pb-3">
          <div><h5>Description for second page</h5></div>
          <div><TextArea moduleVal={moduleVal} txtvalue={description2} txtsetValue={setDescription2}/></div>
        </div>
        <div class="grid grid-flow-row auto-rows-max pb-3">
          <div><h5>Images for the second page</h5></div>
          <div><p>If Multiple photos are uploaded upload as one pictures after creating a collage, else pictures will be shown below each</p></div>
          <ImageList2 imgdata={imgdata2} setimageData={setimageData2}/>
        </div>
        <div class="grid grid-flow-row auto-rows-max pb-3">
          <div><h5>Description for third page</h5></div>
          <div><TextArea moduleVal={moduleVal} txtvalue={description3} txtsetValue={setDescription3}/></div>
        </div>
        <div class="grid grid-flow-row auto-rows-max pb-3">
          <div><h5>Images for the third page</h5></div>
          <div><p>If Multiple photos are uploaded upload as one pictures after creating a collage, else pictures will be shown below each</p></div>
          <ImageList3 imgdata={imgdata3} setimageData={setimageData3}/>
        </div>
      </Panel>
      {/* <Panel header={`Step: ${step + 1}`} hidden={step === 2 | step === 3 | step === 0}> */}
      <Panel hidden={step === 2 | step === 3 | step === 0}>
        <div>
            <div class="mb-6">
                <label for="countries_disabled" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a survey type</label>
                <select id="countries_disabled" value={surveytype} onChange={e => setSurveyType(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="BEST_CHOICE" selected>Choice Survey</option>
                  <option value="MULTIPLE_CHOICE">Rank Survey</option>
                </select>
            </div> 
            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Number of Games per survey<span class="red-star">★</span></label>
                <input type="number" id="email" value={numOfscenarios} onChange={e => setnumOfscenarios(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add the number of games for each survey" required/>
            </div> 
            <div class="mb-6">

              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Define Alternatives<span class="red-star">★</span></label>
              <OptionsManager numOfoptions={numOfoptions} setnumOfoptions={setnumOfoptions}/>
            </div>
        </div>
      </Panel>
      <Panel hidden={step === 1 | step === 0 | step === 3}>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Define Attributes<span class="red-star">★</span></label>
        <Options numOfoptions={numOfoptions} attributeData={attributeData} setattributeData={setattributeData}/>
      </Panel>
      <Panel hidden={step === 1 | step === 2 | step === 0}>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Social Economic Information<span class="red-star">★</span></label>
        <div>
            <div class="mb-6">
               <AddDeleteTableRowsUser usrData={usrData} setusrData={setusrData}/>
            </div> 
            {/* <div class="flex justify-center mb-6">
              <CButton onClick={SubmitData} disabled={ validData === false || onsubmission} color="info">Submit</CButton>
            </div>  */}
        </div>
      </Panel>
      <hr />
      <div class="flex justify-center m-2 p-6">
          <CButton className="m-2 w-40" onClick={onPrevious} disabled={step === 0 }  color="primary" size="sm">
            {"Previous"}
          </CButton>
          {step === 3 ? 
            <CButton className="m-2 w-40" onClick={SubmitData} disabled={ validData === false || onsubmission} color="success" size="sm">
                Submit
            </CButton> :
            <CButton className="m-2 w-40" onClick={onNext} disabled={step === 3 || validData === false} color="primary" size="sm">
              {"Next"}
            </CButton>
          }
      </div>
    </div>
  );
};