# AngularDotnetDemo

## Purpose
This application was created in about 15 hours to showcase my ability to quickly put
together applications, and learn new technologies. Before this project, I had only a small amount of exposure to C#, no experience with ASP.NET, and had never touched Angular.

## Overview
This application consists of a C# ASP.NET Core application serving a simple CRUD REST API which stores a list of records, and an Angular frontend which has a table of records, a tab to create new records, a tab to modify existing records. The application is deployed with Kubernetes on Digital Ocean, and has a GitHub Action to test, build, and push images for both the frontend and backend to two Digital Ocean Container Registry repositories. Nx was used to structure the project and provide caching of target artifacts. The frontend is served by a container 

## Time Breakdown
* Studying Angular basics from official Angular docs and [this book](https://www.amazon.com/gp/product/B08XXNBKNP/ref=ppx_yo_dt_b_d_asin_title_o00?ie=UTF8&psc=1) (1.5hr)
* Creating monorepo, learning about .NET project structure, researching/configuring Nx plugins for .NET and Docker, containerizing front/backend (4hr)
* Setting up Digital Ocean Kubernetes Cluster, installing basic monitoring, setting up Digital Ocean Container Registry, creating K8s resource files for front/backend containers, configuring CI/CD to build/push both images to DOCR on push to Git repo (2.5hr)
* Building Angular frontend with Material UI component library (7hr)

## What's Not Done
This project is far from up to my standards for a real production app, but given that it's only intended to showcase my ability to get up to speed quickly, I believe a list of things I would and currently have the skills to do is an appropriate substitute for what's missing. If given the time, I would do the following:
* The project lacks a significant amount of documentation, and would be difficult to onboard another developer onto or hand off. I would create a guidebook containing an overview of the project structure, getting started instructions, lists of commands/procedures to perform common workflows, etc. This would also include creating a set of standards for code formatting/structure, and procedures such as pull requests/code reviews within this project.
* The API has almost no error handling, and requires a significant amount of hardening. There is no input validation, and it would be easy to put the system in a bad state. I would research best practices for making resilient ASP.NET Core applications and implement them.
* The API only persists records in memory right now. I would set up a Postgres database and use something like Entity Framework to connect the API to it.
* The frontend has no automated testing. I believe automated tests are paramount for any production application, both at the component level and E2E testing. I have experience with Puppeteer and Cypress, and I would absolutely spend the time to create a comprehensive set of tests for the frontend.
* The backend does have automated testing in the form of an Xunit test suite, but it only covers the most important paths. I would extend this test suite significantly to cover more paths such as incorrect media types, malformed payloads, etc.
* This application is very opaque, there is no system in place for developers to detect/diagnose issues or monitor application performance. A comprehensive monitoring/telemetry stack would be a huge value addition, and has been a relatively straightforward thing to implement in past projects. I would likely use OpenTelemetry with Grafana products to create a Prometheus metrics system for tracking system load/performance, Loki for events/logging, Tempo/Loki for tracing, Grafana for interacting with all this data, and I would do some research to identify a suitable alerting system.