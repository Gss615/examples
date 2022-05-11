import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { fromEvent, reduce, tap, map, scan } from 'rxjs';
@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.less']
})
export class WrapperComponent implements OnInit {
  @Input() refScope: any; // 定义范围
  state: any;
  mouseDown$: any;
  mouseMove$: any;
  mouseDate$: any;
  mouseDown: any;
  mouseMove: any;
  styleState: any = null; // 保留最大化或者最小化之前的style
  @ViewChild("wrapper", { static: true })
  public wrapper!: ElementRef;
  source$: any
  rect: any
  constructor() { }
  style: any = { left: null, top: null }
  ngOnInit(): void {
    if (!this.refScope) {
      this.refScope = document.body.getBoundingClientRect()
      console.log(this.refScope)
    }
    this.mouseDown$ = fromEvent(this.wrapper.nativeElement, 'mousedown');
    this.mouseMove$ = fromEvent(document, 'mousemove');
    const mouseUp$ = fromEvent(document, 'mouseup');
    let disposeMouseMove: any
    mouseUp$.subscribe((event: any) => {
      console.log('event', disposeMouseMove)
      if (this.mouseMove) {
        this.mouseMove.unsubscribe()
      }
    })
  }
  handleMouseDown(event: any) {
    console.log('event', event)
    const { target, x: ox, y: oy } = event
    this.rect = this.wrapper.nativeElement.getBoundingClientRect()
    this.style.left = this.rect.x
    this.style.top = this.rect.y
    if (this.mouseMove) {
      this.mouseMove.unsubscribe()
    }
    this.mouseMove = this.mouseMove$.pipe(
      map((event: any) => {
        const { x, y } = event
        return { x: x - ox, y: y - oy }
      })
    ).subscribe((event: any) => {
      this.handle(target.className, event)
    })

  }
  handle(type: any, move: any) {
    let { x, y } = move
    const { x: rx, y: ry, width, height } = this.rect
    const { width: scopeWidth, height: scopeHeight } = this.refScope
    switch (type) {
      case 'title':
        x = Math.min(x + rx, scopeWidth - width)
        y = Math.min(y + ry, scopeHeight - height)
        this.style.left = Math.max(x, 0) + 'px'
        this.style.top = Math.max(y, 0) + 'px'
        break;
      case 'text':
        x = Math.min(x + rx, scopeWidth - width)
        y = Math.min(y + ry, scopeHeight - height)
        this.style.left = Math.max(x, 0) + 'px'
        this.style.top = Math.max(y, 0) + 'px'
        break;
      case 'resizable-t':
        if (ry + y >= 0) {
          this.style.height = height - y + 'px'
          this.style.top = ry + y + 'px'
        }
        break;
      case 'resizable-r':
        if (rx + x + width <= scopeWidth) {
          this.style.width = width + x + 'px'
        }
        break;
      case 'resizable-l':
        if (rx + x >= 0) {
          this.style.width = width - x + 'px'
          this.style.left = rx + x + 'px'
        }
        break;
      case 'resizable-b':
        if (height + y + ry <= scopeHeight) {
          this.style.height = height + y + 'px'
        }
        break;
      case 'resizable-rt':
        if (rx + x + width <= scopeWidth) {
          this.style.width = width + x + 'px'
        }
        if (ry + y >= 0) {
          this.style.height = height - y + 'px'
          this.style.top = ry + y + 'px'
        }
        break;
      case 'resizable-rb':
        if (rx + x + width <= scopeWidth) {
          this.style.width = width + x + 'px'
        }
        if (height + y + ry <= scopeHeight) {
          this.style.height = height + y + 'px'
        }
        break;
      case 'resizable-lt':
        if (rx + x >= 0) {
          this.style.width = width - x + 'px'
          this.style.left = rx + x + 'px'
        }
        if (ry + y >= 0) {
          this.style.height = height - y + 'px'
          this.style.top = ry + y + 'px'
        }
        break;
      case 'resizable-lb':
        if (rx + x >= 0) {
          this.style.width = width - x + 'px'
          this.style.left = rx + x + 'px'
        }
        if (height + y + ry <= scopeHeight) {
          this.style.height = height + y + 'px'
        }
        break;
    }

  }
  handleMin(event: any) {
    if (this.styleState) {
      this.style = this.styleState
      this.styleState = null
    } else {
      this.styleState = this.style
      this.style = { display: 'none' }
    }
    console.log('最小化')
  }
  handleMax(event: any) {
    console.log('style', this.style)
    if (this.styleState) {
      const { left, top } = this.styleState
      this.style = Object.assign(this.styleState, { left: left + 'px', top: top + 'px' })
      this.styleState = null
    } else {
      this.styleState = this.style
      this.style = {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: 'auto',
        width: 'auto',
        overflow: 'hidden'

      }
    }
    console.log('最大化', this.style, this.styleState)

  }
  handleClose(event: any) {
    console.log('关闭')
  }
}
