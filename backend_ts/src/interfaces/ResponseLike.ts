import type { ValidateSessionResponse } from "./ValidateSessionResponse";

export interface ResponseLike {
  status: (code: number) => { json: (data: ValidateSessionResponse) => any };
  json: (data: ValidateSessionResponse) => any;
}