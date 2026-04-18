"use client";
import React from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { templateData } from "@/app/data";
import { getLocalStorage } from "@/app/utils";
import { Template } from "@/app/types";
import ProtectedRoute from "@/app/utils/ProtectedRoute";

const page = () => {
  const chosenTemplate = getLocalStorage<Template>("chosenTemplate");

  console.log("chosenTemplate",chosenTemplate)

  const selectedResume = templateData.find(
    (resume) => resume.id == chosenTemplate?.id || chosenTemplate?.templateId,
  );

  console.log("selectedResume",selectedResume)

  const SelectedComponent = selectedResume?.component;

  return (
    <ProtectedRoute>
      <Header />

      {SelectedComponent && <SelectedComponent />}

      <Footer />
    </ProtectedRoute>
  );
};

export default page;
