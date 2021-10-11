import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() delay = 2000;

  public text: string;
  public type: string = 'success';
  private aSub:Subscription;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.aSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text,
      this.type = alert.type

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
