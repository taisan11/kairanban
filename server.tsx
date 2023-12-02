/** @jsx jsx */
/** @jsxFrag Fragment */
import { Hono } from 'https://deno.land/x/hono@v3.10.4/mod.ts'
import { logger,compress,html,jsx,basicAuth,serveStatic } from "https://deno.land/x/hono@v3.10.4/middleware.ts"

const app = new Hono()
const Layout = (props: Props) =>
  html`<!DOCTYPE html><html><head><title>${props.title}</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${props.children}</body></html>`;

app.use("*", compress({ encoding: "gzip" }));
app.use('*', logger());
app.use(
    '/sa-pasu/*',
    basicAuth({
      username: '01278',
      password: '0908789',
    })
  )
app.get("/", async (c) => {
    return c.html(
      <Layout title="たんLink">
        <h1>回覧板!!</h1>
        <p>回覧板を見れるサービスです</p>
        <p>現在手動登録です</p>

      </Layout>,
    );
});
app.get(
    "/sa-pasu/*",
    serveStatic("./sa-pasu/*")
);

Deno.serve(app.fetch)
