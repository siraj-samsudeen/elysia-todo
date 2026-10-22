import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { TodoListPage } from "./todo-list-page";

export const createApp = () => new Elysia().use(html()).get("/", () => TodoListPage());
