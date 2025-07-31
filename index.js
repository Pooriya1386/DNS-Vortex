export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  const type = url.searchParams.get("type") || "A";

  if (!name) {
    return new Response(JSON.stringify({ error: "Missing 'name' parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${name}&type=${type}`, {
    headers: { "Accept": "application/dns-json" }
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/dns-json" }
  });
}