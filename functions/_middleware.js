export async function onRequest(context) {
  const { request, next } = context;

  const res = await next();

  const accept = request.headers.get("accept") || "";
  const isHtml = accept.includes("text/html");

  if (!isHtml) return res;

  const url = new URL(request.url);

  const headers = new Headers(res.headers);
  headers.append(
    "Set-Cookie",
    `page_status=${res.status}; Path=/; Max-Age=30; SameSite=Lax; Secure`
  );
  headers.append(
    "Set-Cookie",
    `page_path=${encodeURIComponent(url.pathname)}; Path=/; Max-Age=30; SameSite=Lax; Secure`
  );

  return new Response(res.body, { status: res.status, headers });
}
