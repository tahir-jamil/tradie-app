import { Component, OnInit } from '@angular/core';
import { IJob, StatusEnum } from '../interface/job.interface';
import { JobService } from '../job.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  jobList: IJob[] = [];
  tempList: IJob[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.jobList = this.jobService.getAllJobs()
    this.tempList = this.jobList;
  }

  removeJob(job: IJob) {
    this.jobService.removeJob(job)
  }

  onSearchChange(event: any): void {
    if (event.target.value) {
      this.jobList = this.tempList
      this.jobList = this.jobList.filter((item) => item.name.includes(event.target.value));
    } else {
      this.jobList = this.tempList
    }
  }

}
