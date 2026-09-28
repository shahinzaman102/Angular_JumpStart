import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  AbstractControl, AsyncValidatorFn, FormBuilder,
  ReactiveFormsModule, ValidationErrors, Validators
} from '@angular/forms';
import { form, FormField, required, minLength } from '@angular/forms/signals';

interface DeviceConfigForm {
  deviceId: string;
  sensorType: 'temperature' | 'gps' | 'humidity';
  minMaxC: {
    min: number;
    max: number;
  };
  locationInterval: number;
  humidityThreshold: number;
}

@Component({
  selector: 'app-forms',
  imports: [FormsModule, ReactiveFormsModule, FormField],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
  // Signal Forms currently has SSR/hydration mismatches; skip hydration for this component as a workaround.
  host: { 'ngSkipHydration': 'true' }
})
export class Forms {
  private readonly fb = inject(FormBuilder);

  // =========================================================
  // 1) TEMPLATE-DRIVEN FORM (FormsModule) — "Add a Tag" quick form
  // =========================================================
  tdModel = { tagName: '' };
  tdSubmittedTags: string[] = [];

  onTdSubmit(ngForm: NgForm): void {
    if (ngForm.valid) {
      this.tdSubmittedTags.push(this.tdModel.tagName.trim());
      this.tdModel.tagName = '';
      ngForm.resetForm();
    }
  }

  // =========================================================
  // 2) REACTIVE FORM — IoT device config with conditional fields
  // =========================================================
  readonly sensorTypes: ReadonlyArray<DeviceConfigForm['sensorType']> = ['temperature', 'gps', 'humidity'];
  reactiveSubmitResult: string | null = null;

  // NOTE: Validators.required/minLength are static methods on a class,
  // which trips @typescript-eslint/unbound-method as a false positive
  // (see https://github.com/angular/angular/issues/40571 and
  // https://github.com/typescript-eslint/typescript-eslint/issues/1929).
  // Angular's own Validators never rely on `this`, so this is safe to
  // disable for this well-known, widely-reported case rather than
  // rewriting every Validators reference into an arrow-wrapped call.
  /* eslint-disable @typescript-eslint/unbound-method */
  readonly deviceForm = this.fb.nonNullable.group({
    deviceId: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.minLength(4)],
      asyncValidators: [Forms.deviceIdTakenValidator()]
    }),
    sensorType: this.fb.nonNullable.control<DeviceConfigForm['sensorType']>('temperature', Validators.required),
    minMaxC: this.fb.nonNullable.group({
      min: this.fb.nonNullable.control(-10, Validators.required),
      max: this.fb.nonNullable.control(50, Validators.required)
    }),
    locationInterval: this.fb.nonNullable.control(60, Validators.required),
    humidityThreshold: this.fb.nonNullable.control(80, Validators.required)
  });
  /* eslint-enable @typescript-eslint/unbound-method */

  constructor() {
    // react to sensorType changes -> toggle which sub-fields are active
    this.deviceForm.controls.sensorType.valueChanges.subscribe((type) => {
      this.updateConditionalValidators(type);
    });
    this.updateConditionalValidators(this.deviceForm.controls.sensorType.value);
  }

  private updateConditionalValidators(sensorType: DeviceConfigForm['sensorType']): void {
    this.deviceForm.controls.minMaxC.disable({ emitEvent: false });
    this.deviceForm.controls.locationInterval.disable({ emitEvent: false });
    this.deviceForm.controls.humidityThreshold.disable({ emitEvent: false });

    if (sensorType === 'temperature') {
      this.deviceForm.controls.minMaxC.enable({ emitEvent: false });
    } else if (sensorType === 'gps') {
      this.deviceForm.controls.locationInterval.enable({ emitEvent: false });
    } else if (sensorType === 'humidity') {
      this.deviceForm.controls.humidityThreshold.enable({ emitEvent: false });
    }
  }

  private static deviceIdTakenValidator(): AsyncValidatorFn {
    const takenIds = new Set(['device-0001', 'sensor-test']);
    return (control: AbstractControl<string>): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const taken = takenIds.has(control.value.toLowerCase());
          resolve(taken ? { deviceIdTaken: true } : null);
        }, 400); // simulate network latency
      });
    };
  }

  get sensorType(): DeviceConfigForm['sensorType'] {
    return this.deviceForm.controls.sensorType.value;
  }

  onReactiveSubmit(): void {
    if (this.deviceForm.valid) {
      // Angular's .value property automatically excludes disabled controls!
      this.reactiveSubmitResult = JSON.stringify(this.deviceForm.value, null, 2);
    }
  }

  // =========================================================
  // 3) SIGNAL FORMS (experimental, @angular/forms/signals)
  // =========================================================
  protected loginModel = signal({ email: '', password: '' });
  protected loginForm = form(this.loginModel, (login) => {
    required(login.email, { message: 'Email is required' });
    required(login.password, { message: 'Password is required' });
    minLength(login.password, 6, { message: 'Password must be at least 6 characters' });
  });

  signalSubmitResult = signal<string | null>(null);

  onSignalSubmit(): void {
    if (this.loginForm().valid()) {
      this.signalSubmitResult.set(JSON.stringify(this.loginModel(), null, 2));
    }
  }
}