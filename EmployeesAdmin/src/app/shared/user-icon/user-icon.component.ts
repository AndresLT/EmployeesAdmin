import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.scss'
})

// Componente que crea un icono de usuario ciruclar con las iniciales
// de su nombre y apellido
export class UserIconComponent implements OnInit {

  @Input() text: string = '';

  background_colors = [ "#ffa9a9", "#daa9ff", "#aba9ff", "#a9d1ff", "#a9fffa", "#a9ffbf", "#d3ffa9", "#f8ffa9", "#ffe6a9", "#ffc9a9" ];
  foreground_colors = [ "#e00000", "#e0005f", "#9e00e0", "#3500e0", "#003fe0", "#165b74", "#005b47", "#007015", "#bf3d04", "#cd4d00" ];

  background = ''
  foreground = ''

  ngOnInit(): void {
    this.getBackground()
    this.getForeground()
  }


  getBackground(){
    this.background = this.background_colors[Math.floor(Math.random() * this.background_colors.length)]

  }

  getForeground(){
    this.foreground = this.foreground_colors[Math.floor(Math.random() * this.foreground_colors.length)]
  }
}
