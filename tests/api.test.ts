import { describe, it, expect, vi } from "vitest";

describe("enquiry api", () => {
  it("returns 200 without SMTP configured and logs instead", async () => {
    delete process.env.SMTP_HOST;
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    const { POST } = await import("@/app/api/enquiry/route");
    const fd = new FormData();
    fd.set("name", "Test Person"); fd.set("email", "t@example.com"); fd.set("phone", "9876543210"); fd.set("path", "mf"); fd.set("consent", "on");
    const res = await POST(new Request("http://localhost/api/enquiry", { method: "POST", body: fd }));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    expect(info).toHaveBeenCalled();
    info.mockRestore();
  });
  it("rejects invalid input with 400 and field errors", async () => {
    const { POST } = await import("@/app/api/enquiry/route");
    const fd = new FormData(); fd.set("name", "A"); fd.set("email", "nope"); fd.set("phone", "1"); fd.set("path", "mf");
    const res = await POST(new Request("http://localhost/api/enquiry", { method: "POST", body: fd }));
    expect(res.status).toBe(400);
    const j = await res.json(); expect(j.errors.email).toBeTruthy(); expect(j.errors.consent).toBeTruthy();
  });
  it("revalidate rejects a bad secret", async () => {
    process.env.REVALIDATE_SECRET = "s3cret";
    const { POST } = await import("@/app/api/revalidate/route");
    const res = await POST(new Request("http://localhost/api/revalidate?secret=wrong", { method: "POST" }));
    expect(res.status).toBe(401);
  });
});
