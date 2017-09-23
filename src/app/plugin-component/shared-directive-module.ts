import { NgModule } from '@angular/core';
import { SetActiveInactiveDirective } from './setActiveInactive-directive';
@NgModule(
    { declarations: [
        SetActiveInactiveDirective
    ],
        exports : [SetActiveInactiveDirective]
    })
    export class SharedDirectiveModule
    {


    }