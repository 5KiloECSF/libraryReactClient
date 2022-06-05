import React from "react";
import TabDescription from "./TabDescription";
import TabAdditionalInfo from "./TabAdditionalInfo";
import TabReviews from "./TabReviews";

class TabsContent extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          {}
          <TabDescription/>
          {}
          <TabAdditionalInfo/>
          {}
          <TabReviews/>
        </div>
      </div>
    );
  }
}

export default TabsContent;
