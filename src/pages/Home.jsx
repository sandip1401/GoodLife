import React from "react";
import Header from "../components/Header";
import SpecilityMenu from "../components/SpecilityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Doctor In City | Book Doctors Appointment Online</title>

        <meta
          name="description"
          content="Doctor In City helps you find trusted doctors in Rampurhat and nearby areas. Book doctor appointments online quickly and easily."
        />

        <link rel="canonical" href="https://www.doctorincity.com/" />

        <meta property="og:title" content="Doctor In City" />
        <meta property="og:url" content="https://www.doctorincity.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <SpecilityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
}
