import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  pin: any;
  constructor() { }

  ngOnInit(): void {
    localStorage.setItem("user", "");
  }

  submit(): void {
    if (this.pin != '0000') {
      alert("Incorrect PIN, try again!"); return;
    }

    localStorage.setItem("user", "ok");
    window.location.href = "/dashboard";
  }

}
