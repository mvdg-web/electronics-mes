import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgIcon } from '@ng-icons/core';
import { Toast } from 'primeng/toast';
import { Orders } from './components/orders/orders';
import { Workflow } from './components/workflow/workflow';

@Component({
  imports: [RouterModule, Toast, Orders, Workflow],
  providers: [MessageService],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // private breakpointObserver = inject(BreakpointObserver);
  // isNarrow = toSignal(
  //   this.breakpointObserver
  //     .observe('(max-width: 1400px)')
  //     .pipe(map((result) => result.matches)),
  // );

  messageService = inject(MessageService);
}
