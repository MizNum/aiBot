import { Component ,Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit{

  @Input() message: string="NO message in there.";
  @Input() showToast: boolean = false;
  @Input() bgColor: string = '#333';

  ngOnInit(): void {
    this.showToast = true;
    setTimeout(() => {
      console.log('Timeout working ')
      this.showToast = false;
    }, 3000);
  }

  showToastMsg() {
  }
}
