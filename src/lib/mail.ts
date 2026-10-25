import nodemailer from "nodemailer";

export type MailInput = { to?: string; subject: string; html: string; replyTo?: string; attachments?: { filename: string; content: Buffer; contentType?: string }[] };

/** Sends via SMTP when configured; otherwise logs the payload and resolves so forms never fail in dev. */
export async function send(input: MailInput): Promise<{ delivered: boolean }> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;
  const to = input.to ?? MAIL_TO ?? "ho@dhanvesttor.com";
  if (!SMTP_HOST) {
    console.info("[mail] SMTP not configured; would send:", { to, subject: input.subject, replyTo: input.replyTo, attachments: input.attachments?.map((a) => a.filename) });
    return { delivered: false };
  }
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT ?? 587), secure: Number(SMTP_PORT) === 465, auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined });
  await transport.sendMail({ from: MAIL_FROM ?? "Dhanvesttor Website <no-reply@dhanvesttor.com>", to, subject: input.subject, html: input.html, replyTo: input.replyTo, attachments: input.attachments });
  return { delivered: true };
}

export const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export const table = (rows: [string, unknown][]) =>
  `<table style="font:14px system-ui;border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6E6C86">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`).join("")}</table>`;
