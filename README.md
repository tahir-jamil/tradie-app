# Description
> Its a single page application build using angular which use localStorage as database to save jobs added by tradie.

# Requirements
## Bussiness Logic
Each job should have
- Unique job identifier.
- Status: one of "scheduled", "active", "invoicing", “to priced” or “completed”.
- Creation date and time.
- General information like name and contact details of the client
- The tradie can also make notes for each job
- A job can have any number of notes associated with job

## Functional Requirement
The tradie should be able to:
- Filter List.
- Click on a job in the list to view their details and add/edit notes for that job.
- Change the status of a job.

## Non Functional Requirement
> This project is based on front-end so for storage we use localStorage of browser

# Framework 
> I use **Angular** framework of javascript

# Project Structure 
![image](https://user-images.githubusercontent.com/40952630/180107772-32dd9761-3a12-4162-85d0-698b62128230.png)

> Project Structure includes app folder which contain all the modules and components needed to complete the task

# Components
## app-list
> app-list component is used to disply list of all jobs

## app-job-detail
> app-job-detail component is used to Add/Edit/Update. Its a reuseable component which is responsible for adding new jobs and update already created jobs.

# Interface
```
export interface IJob {
  id: number
  status: StatusEnum
  date: string
  name: string
  description: string
  company: string
  createdAt: string
  client: {
    name: string
    email: string
    contact: string
  },
  notes: [
    {
      id: number
      title: string
    }
  ]
}
```

# Status Enum
```
export enum StatusEnum {
  'scheduled',
  'active',
  'invoicing',
  'to priced',
  'completed',
}
```
