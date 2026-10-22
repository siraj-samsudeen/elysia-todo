import { Elysia } from "elysia";

export const createApp = () =>
  new Elysia().get(
    "/",
    () => new Response("<!doctype html>", { headers: { "content-type": "text/html; charset=utf-8" } }),
  );
