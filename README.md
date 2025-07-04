# FHIR Patient Viewer

## 🧠 Purpose

This project is a demo application built with **TypeScript**, **React**, and **MUI (Material UI)** that demonstrates how to fetch and display clinical data for a patient using the **FHIR** standard.

The goal is to showcase how to connect to a FHIR server and pull related data (e.g., labs, vitals) for a given patient using the `fhirclient` JavaScript library. This can serve as a learning tool or reference implementation for developers working with FHIR-based applications.

---

## 🛠️ Technologies Used

- **React** – Frontend framework
- **TypeScript** – Type-safe development
- **MUI (Material UI)** – React UI component library
- **fhirclient** – JavaScript client for SMART on FHIR

---

## 🌐 FHIR Server

This application fetches data from the public FHIR server hosted at: https://server.fire.ly

It retrieves **Observation** resources such as lab results and vital signs.

> The app was tested using the sample patient **Tom Brady**, who has both labs and vitals available on the Firely server.

## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/jozcar1/fhirdemo.git
cd fhirdemo
npm install
npm run dev
```
## 🧪 Features

- Connects to a public FHIR server using `fhirclient`
- Retrieves and displays:
  - Patient demographics
  - Lab Observations
  - Vital Signs Observations
- Built using MUI components for a modern, responsive UI