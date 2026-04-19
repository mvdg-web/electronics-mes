import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PartService, WorkOrderService } from '@mes/api';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from 'primeng/card';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-orders',
  imports: [
    Card,
    Select,
    InputNumber,
    Button,
    TableModule,
    ReactiveFormsModule,
    ProgressBar,
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Orders {
  private orderService = inject(WorkOrderService);
  private partService = inject(PartService);

  protected readonly workOrders = toSignal(this.orderService.getWorkOrders(), {
    initialValue: [],
  });
  protected readonly parts = toSignal(this.partService.getParts(), {
    initialValue: [],
  });

  quantityInput = new FormControl(1, {
    nonNullable: true,
    validators: [Validators.min(1)],
  });
  partsSelector = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  suffix = () => (this.quantityInput.getRawValue() === 1 ? ' unit' : ' units');

  btnDisabled = () => this.partsSelector.invalid || this.quantityInput.invalid;

  protected submitOrder() {
    const id = this.partsSelector.getRawValue();
    const quantity = this.quantityInput.getRawValue();
    this.orderService.createWorkOrder(id, quantity).subscribe({
      next: () => {
        this.partsSelector.reset();
        this.quantityInput.reset(1);
      },
      error: (err) => {
        console.error('Failed to create work order', err);
      },
    });
  }
}
