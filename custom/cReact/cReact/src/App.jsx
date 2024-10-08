import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div id="temp-edit-con">
        <div id="temp-wrap">
          <div
            className="formbuilder-text form-group field-AccountId"
            in="false"
          >
            <label for="AccountId" className="formbuilder-text-label">
              Account ID
            </label>
            <input
              type="text"
              className="form-control"
              name="AccountId"
              id="AccountId"
            />
          </div>
          <div
            className="formbuilder-section form-group field-IsActive section-render"
            type="section"
            repeat="true"
            contains="Pricebook2"
          >
            <div
              type="section"
              contains="Pricebook2"
              repeat="repeat"
              name="IsActive"
              id="IsActive"
            >
              Active
              <hr style="border: 2px dashed #9797ff" />
            </div>
            <div
              className="formbuilder-radio-group form-group field-IsActive"
              in="true"
            >
              <label for="IsActive" className="formbuilder-radio-group-label">
                Active
              </label>
              <div className="radio-group">
                <div className="formbuilder-radio">
                  <input
                    name="IsActive"
                    id="IsActive-16"
                    value="option-2"
                    type="radio"
                  />
                  <label for="IsActive-16">Option 2</label>
                </div>
                <div className="formbuilder-radio">
                  <input
                    
                    name="IsActive"
                    id="IsActive-17"
                    value="option-3"
                    type="radio"
                  />
                  <label for="IsActive-17">Option 3</label>
                </div>
              </div>
            </div>
            <div
              className="formbuilder-radio-group form-group field-IsActive"
              in="true"
            >
              <label className="formbuilder-radio-group-label">
                Active
              </label>
              <div className="radio-group">
                <div className="formbuilder-radio">
                  <input
                    
                    name="IsActive"
                    id="IsActive-16"
                    value="option-2"
                    type="radio"
                  />
                  <label for="IsActive-16">Option 2</label>
                </div>
                <div className="formbuilder-radio">
                  <input
                    
                    name="IsActive"
                    id="IsActive-17"
                    value="option-3"
                    type="radio"
                  />
                  <label for="IsActive-17">Option 3</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="temp-editor">
          <h1>Hello</h1>
        </div>
      </div>
    </>
  );
}

export default App;
