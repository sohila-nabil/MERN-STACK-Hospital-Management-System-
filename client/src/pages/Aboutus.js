import React from "react";
import Hero from "../components/Hero";
import Biodraphy from './../components/Biodraphy';
function Aboutus() {
  return (
    <>
      <Hero
        title={"Learn More About Us | ZeeCare Medical Institute"}
        imgUrl={"/about.png"}
      />
      <Biodraphy imgUrl={"/whoweare.png"} />
    </>
  );
}

export default Aboutus;
