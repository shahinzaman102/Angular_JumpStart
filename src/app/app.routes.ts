import { Routes } from '@angular/router';
import { StudentTable } from './student-table/student-table';
import { ApiProductCategory } from './api-product-category/api-product-category';
import { BuiltinPipes } from './builtin-pipes/builtin-pipes';
import { CustomPipe } from './custom-pipe/custom-pipe';
import { ObservableUseCases } from './observable-use-cases/observable-use-cases';
import { ObservableWithOperators } from './observable-with-operators/observable-with-operators';
import { BehaviorSubjectUseCases } from './behavior-subject-use-cases/behavior-subject-use-cases';
import { JsTsBuiltinFuncs } from './js-ts-builtin-funcs/js-ts-builtin-funcs';
import { HomePage } from './home-page/home-page';
import { SignalUseCases } from './signal-use-cases/signal-use-cases';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'js_ts-builtin-funcs', component: JsTsBuiltinFuncs },
  { path: 'student-table', component: StudentTable },
  { path: 'apiProduct-category', component: ApiProductCategory },
  { path: 'observable-use-cases', component: ObservableUseCases },
  { path: 'observable-with-operators', component: ObservableWithOperators },
  { path: 'behavior-subject-use-cases', component: BehaviorSubjectUseCases },
  { path: 'signal-use-cases', component: SignalUseCases },
  { path: 'builtin-pipes', component: BuiltinPipes },
  { path: 'custom-pipe', component: CustomPipe },
];
