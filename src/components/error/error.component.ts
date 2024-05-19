import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  state: string = 'start';

  ngOnInit() {
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.state = this.state === 'start' ? 'end' : 'start';
    }, 1000);
  }
}
