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

## License
Apache License - 2.0

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control 
with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management 
of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial 
ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, 
and configuration files.

"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to 
compiled object code, generated documentation, and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice 
that is included in or attached to the work (an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the 
editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes 
of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, 
the Work and Derivative Works thereof.

"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work 
or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual 
or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of 
electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on 
electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for 
the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing 
by the copyright owner as "Not a Contribution."

"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and 
subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, 
worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, 
publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, 
non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, 
sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are 
necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was
submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work
or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You
under this License for that Work shall terminate as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications,
and in Source or Object form, provided that You meet the following conditions:

    1. You must give any other recipients of the Work or Derivative Works a copy of this License; and

    2. You must cause any modified files to carry prominent notices stating that You changed the files; and

    3. You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices 
    from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and

    4. If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a 
    readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the 
    Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the 
    Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever 
    such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. 
    You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, 
    provided that such additional attribution notices cannot be construed as modifying the License. You may add Your own copyright statement to 
    Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your 
    modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with 
    the conditions stated in this License.

5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You 
to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, 
nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except 
as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides 
its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, 
any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for 
determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under 
this License.

8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required
by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, 
including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the 
use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or 
any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a 
fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting 
such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree 
to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your
accepting any such warranty or additional liability.

END OF TERMS AND CONDITIONS

