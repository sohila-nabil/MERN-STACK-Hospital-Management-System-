import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
function Appointement() {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imgUrl={"/signin.png"}
      />
      <AppointmentForm />
    </>
  );
}

export default Appointement;
