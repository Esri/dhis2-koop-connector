# DHIS2 to ArcGIS Online Integration with Koop

This repository contains a project that facilitates the integration of DHIS2 content with ArcGIS Online using Koop. Koop is a flexible Node.js server framework designed for building geospatial APIs, and this project extends its capabilities to bridge DHIS2 and ArcGIS Platform.

## Table of Contents

- [DHIS2 to ArcGIS Online Integration with Koop](#dhis2-to-arcgis-online-integration-with-koop)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Overview of Koop](#overview-of-koop)
    - [DHIS2 (District Health Information Software 2)](#dhis2-district-health-information-software-2)
  - [Getting Started](#getting-started)
  - [Obtaining a Personal Access Token](#obtaining-a-personal-access-token)
    - [Option A: Create a token in the DHIS2 UI](#option-a-create-a-token-in-the-dhis2-ui)
    - [Option B: Create a token via the API](#option-b-create-a-token-via-the-api)
    - [Prerequisites](#prerequisites)
    - [Installation Guide](#installation-guide)
  - [Installing Koop](#installing-koop)
  - [Contributing](#contributing)
  - [Licensing](#licensing)

## Introduction

This library will help users to create connection to the DHIS2 data to query data and present that data in a format that is accessible from the ArcGIS Platform.

### Overview of Koop
**Koop** is an open-source geospatial data transformation and caching engine developed by Esri. It provides a flexible and extensible platform for integrating and transforming data from various sources into GeoJSON format, making it easier to work with geospatial data in web applications and services. Here are some key points to understand about Koop:
- **Data Integration:** Koop allows you to connect to different data sources, including APIs, databases, and file systems, and transform the data into a standardized GeoJSON format. This simplifies the process of working with geospatial data from diverse sources.
- **Caching:** Koop includes a caching mechanism that stores transformed data, reducing the need to repeatedly fetch and process data from the original sources. This improves performance and allows for faster data retrieval.
- **Extensibility:** Koop is designed to be extensible, allowing developers to create custom modules to integrate with specific data sources or implement custom data transformations. This flexibility enables the integration of new data sources and the development of specialized functionality.
- **RESTful API:** Koop provides a RESTful API that allows clients to access and query geospatial data. The API supports standard HTTP methods such as GET, POST, PUT, and DELETE, making it easy to interact with the data stored in Koop.
- **Integration with GIS Platforms:** Koop can be integrated with popular GIS platforms, including Esri's ArcGIS platform. This allows users to leverage the power of Koop within their existing GIS workflows and applications.
- **Community and Ecosystem:** Koop has an active and supportive community of developers and users. The community contributes to the development of Koop, shares modules and plugins, and provides support and guidance to users. This ecosystem ensures the continuous improvement and expansion of Koop's capabilities.

Overall, Koop simplifies the process of working with geospatial data by providing a flexible and extensible platform for data integration and transformation. It enables developers to build applications and services that can easily consume and process geospatial data from various sources, making it a valuable tool in the geospatial data ecosystem.

For full Koop Documentation and use please visit:  (https://koopjs.github.io/)

### DHIS2 (District Health Information Software 2)
DHIS2 is an open-source platform for managing and analyzing health data. It is designed to support the collection, analysis, and visualization of health information at various levels, from local clinics to national health systems. Here are some key points to understand about DHIS2:
- **Data Collection**: DHIS2 provides tools for data collection, allowing health workers to enter and submit data electronically. It supports various data types, including routine health facility data, surveys, and aggregate data.
- **Data Management**: DHIS2 offers a robust data management system, allowing users to define data elements, indicators, data sets, and data validation rules. It supports data aggregation, data quality checks, and data import/export functionalities.
- **Analytics and Reporting**: DHIS2 includes powerful analytics and reporting features. It enables users to generate a wide range of reports, charts, and visualizations to gain insights from the collected data. It supports standard health indicators, custom indicators, and data visualization tools.
- **Customization and Configuration**: DHIS2 is highly customizable and configurable to meet the specific needs of different health systems. Users can define their own data elements, indicators, and data entry forms. The system supports multiple languages, user roles, and access controls.
- **Interoperability**: DHIS2 supports interoperability with other health information systems and standards. It can integrate with external systems through APIs, data exchange formats (such as XML and JSON), and standard protocols (such as HL7 and OpenHIE).
- **Mobile and Offline Capabilities**: DHIS2 offers mobile and offline data collection capabilities, allowing health workers to collect and submit data using mobile devices even in areas with limited or no internet connectivity.
- **Community and Support**: DHIS2 has a vibrant and active community of users, developers, and implementers. The community provides support, shares best practices, and contributes to the ongoing development and improvement of DHIS2.

DHIS2 is widely used globally, particularly in low-resource settings, to strengthen health information systems and improve data-driven decision-making in healthcare. Its open-source nature, flexibility, and scalability make it a valuable tool for managing health data and improving health outcomes.
For full DHIS API Documentation and use please visit:  (https://docs.dhis2.org/en/home.html)

## Getting Started

## Obtaining a Personal Access Token

To obtain a Personal Access Token (PAT) in DHIS2, you have two options:

### Option A: Create a token in the DHIS2 UI

1. Log in to DHIS2 with your username and password.
2. Go to your profile page by clicking on your username in the top right corner and selecting "Edit profile" from the dropdown menu.
3. In the left side menu, click on "Personal access tokens."
4. Click on "Generate new token" to create a new token.
5. Choose the token type based on your use case:
   - "Server/script context" for integrations and scripts not accessed by a browser.
   - "Browser context" for applications accessed with a web browser.
6. Configure the token by setting constraints such as expiry time, allowed IP addresses, allowed HTTP methods, and allowed HTTP referrers.
7. Save the token and securely store the generated secret token key.

### Option B: Create a token via the API

1. Send a POST request to the `/api/apiToken` endpoint with the following details:
   - Content-Type: application/json
   - Authorization: Basic [base64encode(username:password)]
   - Request body: `{}`

   Example:
   ```http
   POST /api/apiToken
   Content-Type: application/json
   Authorization: Basic [base64encode(username:password)]

   {}

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/).
- You have installed [Git](https://git-scm.com/).
- You have a `<Your Choice>` IDE or text editor. Some popular choices are [Visual Studio Code](https://code.visualstudio.com/), [Atom](https://atom.io/), or [Sublime Text](https://www.sublimetext.com/).

List the prerequisites or dependencies required for running this integration.

### Installation Guide

Follow these steps to install and run this project:

1. **Clone the repository**
   Use the command `git clone <repository_url>` to clone the repository from GitHub. Replace `<repository_url>` with the actual URL of the repository.

2. **Navigate into the project directory**
   Use the command `cd <project_directory>` to navigate into the cloned repository. Replace `<project_directory>` with the actual directory name.

3. **Install the dependencies**
   Use the command `npm install` to install the necessary dependencies for the project.

4. **Configure environment variables**
   You may need to create a `.env` file or modify the existing one with the necessary environment variables. In this case, you might need to provide values for `port` and `dhis2` configuration. Here's an example of what your configuration might look like:

   ```json
   {
     "port": 8080,
     "dhis2": {
       "apiKey": "ApiToken d2pat_zyvDHe31ahA2QZLN52txtFsufSJpx1vV0911556847",
       "serverURL": "https://play.dhis2.org/40.1.0/api/40/"
     }
   }

## Installing Koop

Follow these steps to install Koop and create a new Koop project:

1. **Install Koop**
   Use the command `npm install -g koop` to install Koop globally.

2. **Install the dependencies**
   Use the command `npm install` to install the necessary dependencies for the project.

3. **Start the project**
   Use the command npm start or npm run start to start the project.
   
## Contributing 
Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing
 
Copyright 2023 Esri
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
   http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 
A copy of the license is available in the repository's [license.txt](https://github.com/EsriPS/dhis2-koop-connector/licensce.txt) file.

