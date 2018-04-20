import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css']
})
export class ViewRoomsComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  @ViewChild('myCanvasUpper') canvasRefUpper: ElementRef;
  rectsSelected: Array<any>;
  ctx: CanvasRenderingContext2D;
  noOfBerths: number;
  ctxUpper: CanvasRenderingContext2D;
  event: MouseEvent;
  eventUpper: MouseEvent;
  rooms: Array<any>
  offsetX = 0;
  offsetY = 0;
  offsetXUpper = 0;
  offsetYUpper = 0;
  rects: Array<any>;
  constructor() { }
  onEvent(event: MouseEvent) {
    this.event = event;
    this.offsetX = event.offsetX;
    this.offsetY = event.offsetY;
    this.rects.forEach(rect => {
      let clickedRectangle = this.isInside(this.offsetX, this.offsetY, rect);
      if (clickedRectangle && clickedRectangle.berth === "lower") {
        if (!this.rectsSelected.find(rec => rec.id === clickedRectangle.id)) {
          this.rectsSelected.push(clickedRectangle);
          this.ctx.fillStyle = "#F08080";
          this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        } else {
          this.rectsSelected.splice(this.rectsSelected.indexOf(clickedRectangle), 1);
          this.ctx.fillStyle = "#7CFC00";
          this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        }
        console.log("Rects", this.rectsSelected);
        console.log("Clicked on Rectangle" + clickedRectangle.id);
      }
    });
  }

  onEventUpper(event: MouseEvent) {
    this.eventUpper = event;
    this.offsetXUpper = event.offsetX;
    this.offsetYUpper = event.offsetY;
    this.rects.forEach(rect => {
      let clickedRectangle = this.isInside(this.offsetXUpper, this.offsetYUpper, rect);
      if (clickedRectangle && clickedRectangle.berth === "upper") {
        if (!this.rectsSelected.find(rec => rec.id === clickedRectangle.id)) {
          this.rectsSelected.push(clickedRectangle);
          this.ctxUpper.fillStyle = "#F08080";
          this.ctxUpper.fillRect(rect.x, rect.y, rect.w, rect.h);
        } else {
          this.rectsSelected.splice(this.rectsSelected.indexOf(clickedRectangle), 1);
          this.ctxUpper.fillStyle = "#7CFC00";
          this.ctxUpper.fillRect(rect.x, rect.y, rect.w, rect.h);
        }
        console.log("Rects", this.rectsSelected);
        console.log("Clicked on Rectangle" + clickedRectangle.id);
      }
    });
  }

  isInside(x, y, rectangle) {
    let z1 = rectangle.x;
    let z2 = rectangle.y;
    let z3 = rectangle.x + rectangle.w;
    let z4 = rectangle.y + rectangle.h;
    let x1 = Math.min(z1, z3);
    let x2 = Math.max(z1, z3);
    let y1 = Math.min(z2, z4);
    let y2 = Math.max(z2, z4);
    if ((x1 <= x) && (x <= x2) && (y1 <= y) && (y <= y2)) {
      return rectangle;
    } else {
      return null;
    };
  };

  ngOnInit() {
    this.noOfBerths = 2;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.ctxUpper = this.canvasRefUpper.nativeElement.getContext('2d');
    this.rectsSelected = [];
    /*this.rooms = [
      {
        id : 1,
        bedsCount : 3,
        berths : 2
      },
      {
        id : 2,
        bedsCount : 2,
        berths : 3
      }, 
      {
        id: 3,
        bedsCount : 3,
        berths : 1
      }
    ];*/
    this.rects = [
      {
        id: 1,
        x: 550,
        y: 100,
        w: 50,
        h: 25,
        //color: "#7CFC00",
        berth: "lower"
      },
      {
        id: 2,
        x: 550,
        y: 150,
        w: 50,
        h: 25,
        //color: "#7CFC00",
        berth: "lower"
      },
      {
        id: 3,
        x: 750,
        y: 100,
        w: 25,
        h: 50,
        //color: "#7CFC00",
        berth: "lower"
      },
      {
        id: 4,
        x: 650,
        y: 200,
        w: 50,
        h: 25,
        //color: "#7CFC00",
        berth: "lower"
      },
      {
        id: 5,
        x: 550,
        y: 100,
        w: 50,
        h: 25,
        //color: "#7CFC00",
        berth: "upper"
      },
      {
        id: 6,
        x: 550,
        y: 150,
        w: 50,
        h: 25,
        //color: "#7CFC00",
        berth: "upper"
      },
      {
        id: 7,
        x: 650,
        y: 200,
        w: 50,
        h: 25,
        //color: "#7CFC00",
        berth: "upper"
      }
    ];


    this.ctx.beginPath();
    this.ctx.rect(500, 50, 300, 200);
    this.ctx.stroke();
    this.rects.forEach(rect => {
      if (rect.berth === "lower") {
        this.ctx.fillStyle = "#7CFC00";
        this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
      }
    });
    this.ctxUpper.beginPath();
    this.ctxUpper.rect(500, 50, 300, 200);
    this.ctxUpper.stroke();
    this.rects.forEach(rect => {
      if (rect.berth === "upper") {
        this.ctxUpper.fillStyle = "#7CFC00";
        this.ctxUpper.fillRect(rect.x, rect.y, rect.w, rect.h);
      }
    });
  }
}
