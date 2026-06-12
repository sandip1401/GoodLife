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
        <title>Doctor In City | Doctors, Clinics & Blood Donors in Rampurhat</title>

        <meta
          name="description"
          content="Doctor In City helps you find trusted doctors, clinics, and blood donors in Rampurhat. Book appointments online, search specialists, and get urgent donor support."
        />
        <meta
          name="keywords"
          content="Doctor In City, Rampurhat doctors, doctors in Rampurhat, clinics in Rampurhat, blood donor Rampurhat, book doctor appointment, emergency blood donor"
        />
        <meta property="og:title" content="Doctor In City | Doctors, Clinics & Blood Donors in Rampurhat" />
        <meta
          property="og:description"
          content="Find trusted doctors, clinics, and blood donors in Rampurhat. Book doctor appointments online and connect with emergency blood donors fast."
        />
        <meta property="og:url" content="https://www.doctorincity.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.doctorincity.com/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Doctor In City Rampurhat banner" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Doctor In City | Doctors, Clinics & Blood Donors in Rampurhat" />
        <meta name="twitter:description" content="Find trusted doctors, clinics, and blood donors in Rampurhat. Book doctor appointments online and connect with emergency blood donors fast." />
        <meta name="twitter:image" content="https://www.doctorincity.com/logo.png" />
        <meta name="twitter:image:alt" content="Doctor In City Rampurhat banner" />
        <link rel="image_src" href="https://www.doctorincity.com/logo.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Doctor In City",
            url: "https://www.doctorincity.com/",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.doctorincity.com/doctors/{search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        <link rel="canonical" href="https://www.doctorincity.com/" />
      </Helmet>
      <Header />
      <SpecilityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
}
