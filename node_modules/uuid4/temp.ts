import { v4 as uuid4 } from "https://deno.land/std/uuid/mod.ts";

const id = uuid4.generate();
console.log(id);
console.log(uuid4.validate(id));
