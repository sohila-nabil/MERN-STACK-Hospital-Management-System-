import React from "react";
import Hero from "../components/Hero";
import Biodraphy from "../components/Biodraphy";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";

function Home() {
  return (
    <>
      <Hero
        title={
          "Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imgUrl={"/hero.png"}
      />
      <Biodraphy imgUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </>
  );
}

export default Home;
