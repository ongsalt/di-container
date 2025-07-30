/*
  from laravel docs
  Route::get('/', function (Request $request) {
    // ...
  });

  we need to transform this
  
  import type { Request } from "..."
  Route.get('/', (request: Request) => { ... })
  
  into
  import { $$injectedFn } from "../runtime-helper"
  import { Request } from "..."
  Route.get('/', $$injectedFn((request) => { ... }, [Request]))
*/

import type { Constructor } from "./container";


export interface GeneratedInjectedFunction<Deps extends any[], Value> {
  fn: (...deps: Deps) => Value;
  deps: Constructor<Deps>;
}
