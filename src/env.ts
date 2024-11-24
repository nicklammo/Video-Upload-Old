import { z } from "zod";

export const jwtSecret = '9b7c68b0cde03d02a29af394bdfa7e93487926000a65ee7f31a56ea3a96f54a2';
export const baseUrl = 'http://localhost:3000';

z.string().parse(jwtSecret);
z.string().parse(baseUrl);