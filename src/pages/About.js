import React from 'react'
import Layout from '../components/layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const About = () => {
    return (
      <Layout title={"About us - Ecommer app"}>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/about.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <h4 className="text-justify mt-2">
             Hey there!. <br/>
             This Website is created by Raunak Agarwal.
             <br/>
             <a href='https://raunakkkkk.github.io/Portfolio-Website/'>       Click here to visit portfolio website </a>
             <br/>
             <hr></hr>
             <a href='https://linktr.ee/raunakkk'> Visit all links </a>
      
             <br/>

             Email: agarwalraunak2000@gmail.com
             <br/>

             <a href='https://www.linkedin.com/in/raunak-agarwal-397467257'>Linkedin</a>
             <br/>

             <a href='https://github.com/Raunakkkkk'>Github</a>
            </h4>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default About;
  