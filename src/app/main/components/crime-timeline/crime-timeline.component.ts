import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CrimeTimelineService } from './crime-timeline.service';
import { CrimesService } from '../crimes/crimes.service';
import { Crime } from '../crimes/crimes.model';
import { Subscription } from 'rxjs';
import Chart from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-crime-timeline',
  templateUrl: './crime-timeline.component.html',
  styleUrls: ['./crime-timeline.component.scss'],
  providers: [CrimeTimelineService]
})
export class CrimeTimelineComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public showLoading = false;
  lineChart;
  startDate: Date = null;
  endDate: Date = null;

  @ViewChild('crimeTimelineChart') private chartRef;
  crimesList: Crime[];
  currentCrime: Crime;

  constructor(private crimeTimelineService: CrimeTimelineService,
    private crimesService: CrimesService) { }

  ngOnInit() {
    this.getCrimes();
  }

  public changeCrime(event) {
    this.getCrimeTimeline(this.currentCrime, 0, 0);
  }

  private getCrimes() {
    this.showLoading = true;
    this.subscription.add(this.crimesService.getTopCrimes().subscribe(
      (resp: Crime[]) => {
        this.crimesList = resp;
        this.showLoading = false;
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.showLoading = false;
      }
    ));
  }

  private getCrimeTimeline(crimeId, startDate, endDate) {
    this.showLoading = true;
    this.subscription.add(this.crimeTimelineService.getCrimeTimeline(crimeId, startDate, endDate).subscribe(
      (resp: any[]) => {
        this.drawChart(resp);
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.showLoading = false;
      }
    ));
  }

  startDateChange(event) {
    this.startDate = event;

    if (this.startDate != null && this.endDate != null) {
      this.getCrimeTimeline(this.currentCrime, this.formatDateForFilter(this.startDate), this.formatDateForFilter(this.endDate));
    }
  }

  endDateChange(event) {
    this.endDate = event;

    if (this.startDate != null && this.endDate != null) {

      this.getCrimeTimeline(this.currentCrime, this.formatDateForFilter(this.startDate), this.formatDateForFilter(this.endDate));
    }
  }

  private drawChart(resp) {

    this.prepareData(resp);

    this.lineChart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.prepareData(resp).labels,
        datasets: [{
          label: this.currentCrime,
          data: this.prepareData(resp).data,
          borderColor: '#3cba9f',
          fill: false
        }],
        options: {
          layout: {
            padding: {
              left: 10,
              right: 10
            }
          },
          maintainAspectRatio: false,
          responsive: true,
        }
      }
    });

    this.showLoading = false;
  }

  private prepareData(resp) {
    const labels = [];
    const data = [];
    resp.forEach(function (item: any, index: number) {
      labels.push(this.formatDate(new Date(item.Year, item.Month, 1)));
      data.push(item.arrest_count);
    }.bind(this));

    return { labels: labels, data: data };

  }

  private formatDate(data) {
    let date;
    date = moment(data).format('MMM YYYY');
    return date;
  }

  private formatDateForFilter(data) {
    let date;
    date = moment(data).format('YYYY-MM-DD');
    return date;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
