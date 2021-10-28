# Intelly - General Overview and Current State

Intelly is a platform being built to help small-to-medium-sized food and beverage brands manage various aspects of their business. The project is divided into separate repos to allow independent development. Below, you can find a list of the specific front and back ends that make up this project, links to their individual repos, as well as whether or not they have been deployed for public demo.

The public demos should be accessed thought this link: https://gallant-wing-415919.netlify.app/
This will bring you to a login page, which you can enter with the following credentials:

email: guest@intelly.test
password: guest

Once logged in, you will be brough to a dashboard that allows you to navigate the project in its current form. The guest account will have access to all services currently deployed for public demo, with only certain subservices being excluded to prevent any possible interference with sensitive data.

# This Specific Repo - Overview

As mentioned above, Intelly is split into several independent repos in order to facilitate different timelines for development, and thus make it possible to demonstrate those services that have reached an appropriate stage of devlopment.

The repo you are currently visiting is the back end for the Administrative Tasks App. Its purpose is to allow brands to streamline certain tasks. This particular project is at a very early stage of development. At the moment, its primary function is a proof-of-concept for a PDF parser that is specifically intended to to allow brands to submit invoices from distributors, identify generally cryptic reimbursement codes, and decide if they wish to take action to collect those reimbursements.

At the moment, the process exists in an early stage that simply tests the workflow, and has much development ahead of it.

Additionally, while not available to the guest account, there is a similar service that allows us to upload bulk data to our Retail Data Dashboard, proividing a crucial service to that project.

# Additional Goals for Development

The above description embodies the specificity of the goals of this project. Our hope is to gradually build out a list of other similar tasks that are in need of automation, and provide a simple solution to our clients. This section will be expanded in greater detail as they become available. Additionally, we will soon be implementing proper role-based protection for all endpoints.

# Installation and Contribution

If you wish to test this project locally, you may clone the repo to a directory on your machine. Navigate to the new directory using your terminal, and install all necessary dependencies by running the command 'npm i'.

The app itself should be set up to connect to the deployed server, so at that point, you should be able to start it up by running the command 'npm start' and accessing its routes via localhost:4500 or a service such as Postman.

At this time, I am not inviting individual contribution, unless there has been a specific conversation around it. If you come across something in the code that you wish to share, by all means message me and we can speak about it.

# All Repos Related to the Intelly Project

The following is a list of all related projects that have entered some stage of development. It will be updated as work begins on new services.

<a href="https://github.com/tomekregulski/intelly-auth-client">Authorization - Front End</a> - Deployed as part of the Public Demo  
<a href="https://github.com/tomekregulski/intelly-auth-service">Authorization - Back End</a> - Deployed as part of the Public Demo  
<a href="https://github.com/tomekregulski/intelly">Retail Data Dashboard - Front End</a> - Deployed as part of the Public Demo  
<a href="https://github.com/tomekregulski/intelly-server">Retail Data Dashboard - Back End</a> - Deployed as part of the Public Demo  
<a href="https://github.com/tomekregulski/fieldist-rep-web-client">Field Reporting - Front End</a> - Deployed as part of the Public Demo  
<a href="https://github.com/tomekregulski/fieldist-rep-react-native">Field Reporting - React Native Front End</a> - Early Stage, Not Deployed for Public Demo  
<a href="https://github.com/tomekregulski/fieldist-back-end">Field Events - Back End</a> - Deployed as part of the Public Demo  
<a href="https://github.com/tomekregulski/fieldist-admin-web-client">Field Events Administration - Front End</a> - Deployed as part of the Public Demo  
<a href="https://github.com/tomekregulski/intelly-admin-tasks-client">Administrative Tasks - Front End</a> - Deployed as part of the Public Demo  
<a href="https://github.com/tomekregulski/intelly-admin-task-server">Administrative Tasks - Back End</a> - Deployed as part of the Public Demo  

