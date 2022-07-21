import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IJob } from '../interface/job.interface';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  jobForm: FormGroup = new FormGroup({});
  clientForm: FormGroup = new FormGroup({});
  noteForm: FormGroup = new FormGroup({});
  jobDetail = false;
  currentJob: any;
  addNewNote = true;

  constructor(private route: ActivatedRoute, private jobService: JobService, private router: Router) { }

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id');

    if (this.router.url === '/add') {
      this.jobDetail = false;
      this.setupForm({})
    } else if (this.router.url === '/job/' + id) {
      this.jobDetail = true;
      this.currentJob = this.jobService.getOneJob(parseInt(id));
      this.setupForm(this.currentJob)

    }
  }

  setupForm(currentJob: any) {
    this.jobForm = new FormGroup({
      id: new FormControl(currentJob && currentJob.id ? currentJob.id : 0),
      name: new FormControl(currentJob && currentJob.name ? currentJob.name : ''),
      description: new FormControl(currentJob && currentJob.description ? currentJob.description : ''),
      company: new FormControl(currentJob && currentJob.company ? currentJob.company : ''),
      status: new FormControl(currentJob && currentJob.status ? currentJob.status : 'active'),
      createdAt: new FormControl(currentJob && currentJob.createdAt ? currentJob.createdAt : new Date().toString()),
    })
    this.clientForm = new FormGroup({
      name: new FormControl(currentJob && currentJob.client && currentJob.client.name ? currentJob.client.name : ''),
      email: new FormControl(currentJob && currentJob.client && currentJob.client.email ? currentJob.client.email : ''),
      contact: new FormControl(currentJob && currentJob.client && currentJob.client.contact ? currentJob.client.contact : ''),
    })
    this.noteForm = new FormGroup({
      title: new FormControl(''),
      id: new FormControl(0),
    })
  }

  onSubmit() {
    let data = {
      ...this.jobForm.value,
      client: this.clientForm.value
    }
    if (this.jobDetail) {
      this.jobService.updateNewJob(data);
    } else {
      this.jobService.addNewJob(data);
    }

    this.router.navigate([''])
  }

  onSubmitNote() {
    if (this.addNewNote) {
      this.jobService.addNote(this.currentJob, this.noteForm.value)
    } else {
      this.jobService.updateNote(this.currentJob, this.noteForm.value,)
    }
  }

  onEditNote(item: { title: string, id: number }) {
    this.noteForm.controls['title'].setValue(item.title);
    this.noteForm.controls['id'].setValue(item.id);
    this.addNewNote = false;
  }

  onDeleteNote(item: { title: string, id: number }) {
    this.jobService.deleteNote(this.currentJob, item)
  }


}
