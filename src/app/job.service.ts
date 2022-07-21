import { Injectable } from '@angular/core';
import { IJob, StatusEnum } from './interface/job.interface';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  jobsList: IJob[] = [];
  constructor() {
    let list: any = localStorage.getItem('jobsList')
    if (list && list.length >= 1) {
      this.jobsList = JSON.parse(list);
    }
  }

  getAllJobs() {
    return this.jobsList;
  }

  addNewJob(job: IJob) {
    job.id = this.jobsList.length + 1
    job.createdAt = new Date().toString();
    (job as any).notes = [];
    this.jobsList.push(job);
    this.updateLocalStorage();
  }

  addNote(job: IJob, noteTitle: { title: string }) {
    let index = this.jobsList.findIndex((item) => item.id === job.id);
    if (index !== -1) {
      if (this.jobsList[index] && this.jobsList[index].notes && this.jobsList[index].notes.length >= 1) {
        this.jobsList[index].notes.push({ id: job.notes.length + 1, title: noteTitle.title })
      } else {
        (this.jobsList[index].notes as any) = []
        this.jobsList[index].notes.push({ id: job.notes.length + 1, title: noteTitle.title })
      }
    }
    this.updateLocalStorage();
  }

  updateNote(job: IJob, note: { title: string, id: number }) {
    let index = job.notes.findIndex((item) => item.id === note.id);
    if (index !== -1) {
      job.notes[index] = note;
    }

    this.updateLocalStorage();
  }

  deleteNote(job: IJob, note: { title: string; id: number }) {
    let index = job.notes.findIndex((item) => item.id === note.id);
    if (index !== -1) {
      job.notes.splice(index, 1);
    }

    this.updateLocalStorage();
  }

  updateNewJob(job: IJob) {
    let index = this.jobsList.findIndex((item) => item.id === job.id);
    if (index !== -1) {
      this.jobsList[index] = job;
    }
    this.updateLocalStorage();
  }

  removeJob(job: IJob) {
    let index = this.jobsList.findIndex((item) => item.id === job.id);
    if (index !== -1) {
      this.jobsList.splice(index, 1);
    }
    this.updateLocalStorage();
  }

  getOneJob(id: any) {
    let item = this.jobsList.find((item) => item.id === id);
    return item;
  }

  setJobsList(jobs: IJob[]) {
    this.jobsList = jobs;
  }

  updateLocalStorage() {
    localStorage.setItem("jobsList", JSON.stringify(this.jobsList));
  }
}
