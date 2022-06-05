import React from "react";


class Benefit extends React.Component {
  render() {
    return (
      <div className="benefit">
        <div className="container">
          <div className="row benefit_row">
            <BenefitItem/>
            <BenefitItem/>
            <BenefitItem/>
            <BenefitItem/>
          </div>
        </div>
      </div>
    );
  }
}

export default Benefit;


const BenefitItem =()=>{
  return (
      <div className="col-lg-3 benefit_col">
        <div className="benefit_item d-flex flex-row align-items-center">
          <div className="benefit_icon">
            <i className="fa fa-truck" aria-hidden="true" />
          </div>
          <div className="benefit_content">
            <h6>free shipping</h6>
            <p>Suffered Alteration in Some Form</p>
          </div>
        </div>
      </div>
  );

}