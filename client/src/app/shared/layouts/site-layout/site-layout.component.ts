import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.sass']
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floatingBtn', { static: false }) floatingBtn: ElementRef<HTMLDivElement>;

  links = [
    { url: '/overview', name: 'Overview'},
    { url: '/analytics', name: 'Analytics'},
    { url: '/history', name: 'History'},
    { url: '/order', name: 'Order'},
    { url: '/categories', name: 'Categories'},
  ]

  constructor(private authService: AuthService, private router: Router) { }

  ngAfterViewInit() {
    MaterialService.initFloatingBtn(this.floatingBtn);
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
