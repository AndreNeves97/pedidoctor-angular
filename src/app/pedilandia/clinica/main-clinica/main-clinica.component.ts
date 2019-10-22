import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-clinica',
  templateUrl: './main-clinica.component.html',
  styleUrls: ['./main-clinica.component.scss']
})
export class MainClinicaComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

}
