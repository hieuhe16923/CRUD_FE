import { AsyncPipe, CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

export const sharedModule = [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AsyncPipe
];
