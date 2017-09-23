import { Directive, HostListener, HostBinding, ElementRef, Renderer, OnInit, Input } from "@angular/core";
@Directive({
    selector: "[set-IsActive]"
})
export class SetActiveInactiveDirective implements OnInit {
    constructor(public ele: ElementRef, public renderer: Renderer) {
        this.test = "this is from directive!!";
    }
    public test: string;
     @Input() oneInput: string;     
    @HostListener('mouseenter') cc() {
        this.renderer.setElementStyle(this.ele.nativeElement, "background-color", "red");
    }
    @HostListener('mouseleave') cc1() {
        this.renderer.setElementStyle(this.ele.nativeElement, "background-color", "yellow");
    }
    @HostListener('click') cc2() {
        alert("This is varibale changed by component " + this.oneInput);
    }
    ngOnInit() {
        this.renderer.setElementStyle(this.ele.nativeElement, "background-color", "blue");
        this.renderer.setElementStyle(this.ele.nativeElement, "color", "blue");
    }
}