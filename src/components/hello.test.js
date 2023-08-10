import { add } from "./hello";
import {describe,it, expect} from "vitest";


describe("sum",()=>{
    it('add ',()=>{
       expect(add(200,200)).toBe(400)
    })
})