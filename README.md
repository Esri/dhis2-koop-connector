# DHIS2 to ArcGIS Online Integration with Koop

This repository contains a project that facilitates the integration of DHIS2 content with ArcGIS Online using Koop. Koop is a flexible Node.js server framework designed for building geospatial APIs, and this project extends its capabilities to bridge DHIS2 and ArcGIS Platform.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This library will help users to create connection to the DHIS2 data to query data and present that data in a format that is accessible from the ArcGIS Platform.  

## Getting Started

## Obtaining a Personal Access Token (PAT)

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

List the prerequisites or dependencies required for running this integration.

