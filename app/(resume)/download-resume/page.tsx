'use client'
import React from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import TemplateOne from "../../components/templates/TemplateOne";
import { templateData } from "@/app/data";
import { getLocalStorage } from "@/app/utils";
import { Template } from "@/app/types";

const page = () => {
  const chosenTemplate = getLocalStorage<Template>("chosenTemplate");
  const selectedResume = templateData.find(
    (resume) => resume.id === chosenTemplate?.id,
  );

  const SelectedComponent = selectedResume?.component;

  return (
    <div>
      <Header />

      {SelectedComponent && <SelectedComponent />}

      <Footer />
    </div>
  );
};

export default page;
