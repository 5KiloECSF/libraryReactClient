import React from "react";
import TabsTopSelection from "./Tabs/TabsTopSelection";
import TabsContent from "./Tabs/TabsContent";

class Tabs extends React.Component {
  render() {
    return (
      <div className="tabs_section_container">
        <div className="container">
          <TabsTopSelection/>
          <TabsContent/>
        </div>
      </div>
    );
  }
}

export default Tabs;
