import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";

export type CertificateAdminFields = {
  adminField1: boolean;
  adminField2: boolean;
  adminField3: boolean;
  adminField4: boolean;
  adminField5: number | null;
  adminField6: boolean;
  adminField7: string;
  adminField8: boolean;
  adminField9: string;
  adminField10: string;
  selectedSpecialNumbers: number[];
};

type CertificatePdfInput = {
  request: {
    name: string;
    date_of_birth: string;
    age: number;
    address: string;
  };
  fields: CertificateAdminFields;
};

function drawTextAt(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
) {
  if (!text) return;
  page.drawText(text, {
    x,
    y,
    size,
    font,
    color: rgb(0, 0, 0),
  });
}

function drawFittedTextAt(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  maxWidth: number,
) {
  if (!text) return;
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return;

  let content = normalized;
  while (
    content.length > 0 &&
    font.widthOfTextAtSize(content, size) > maxWidth
  ) {
    content = content.slice(0, -1);
  }

  drawTextAt(page, content, x, y, size, font);
}

function wrapTextByCharLimit(text: string, maxChars: number) {
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [] as string[];

  const lines: string[] = [];
  let current = "";

  for (const token of tokens) {
    if (token.length > maxChars) {
      if (current) {
        lines.push(current);
        current = "";
      }
      for (let i = 0; i < token.length; i += maxChars) {
        lines.push(token.slice(i, i + maxChars));
      }
      continue;
    }

    const candidate = current ? `${current} ${token}` : token;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      lines.push(current);
      current = token;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function drawCheckMarkAt(page: PDFPage, x: number, y: number) {
  page.drawLine({
    start: { x, y },
    end: { x: x + 3.5, y: y - 3 },
    thickness: 1.1,
    color: rgb(0, 0, 0),
  });
  page.drawLine({
    start: { x: x + 3.5, y: y - 3 },
    end: { x: x + 9, y: y + 4 },
    thickness: 1.1,
    color: rgb(0, 0, 0),
  });
}

function circleToothNumber(page: PDFPage, x: number, y: number) {
  page.drawEllipse({
    x,
    y,
    xScale: 11.5,
    yScale: 9.8,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
    color: undefined,
  });
}

function drawCertificateOverlay(
  page: PDFPage,
  fonts: { times: PDFFont },
  request: CertificatePdfInput["request"],
  fields: CertificateAdminFields,
) {
  const adminCheckX = 93.2;
  const adminValueX = 254.8;
  const adminValueSize = 11.2;

  const effectiveField2 =
    fields.adminField2 || fields.selectedSpecialNumbers.length > 0;

  drawTextAt(page, request.name, 177.02, 634.54, 12, fonts.times);
  drawTextAt(page, request.date_of_birth, 177.02, 618.7, 12, fonts.times);
  drawTextAt(page, String(request.age), 177.02, 602.86, 12, fonts.times);
  drawTextAt(page, request.address, 177.02, 587.02, 12, fonts.times);
  drawTextAt(page, request.name, 171.98, 555.19, 12, fonts.times);

  if (fields.adminField1) drawCheckMarkAt(page, adminCheckX, 518.1);
  if (effectiveField2) drawCheckMarkAt(page, adminCheckX, 504.3);

  const topTeeth = [
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
  ];
  const bottomTeeth = [
    48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
  ];
  const topX = 18;
  const step = 36.02;
  const topY = 431.95;
  const bottomY = 381.41;
  const selected = new Set(fields.selectedSpecialNumbers);

  topTeeth.forEach((num, i) => {
    if (selected.has(num)) {
      circleToothNumber(page, topX + i * step + 6.2, topY + 3.4);
    }
  });
  bottomTeeth.forEach((num, i) => {
    if (selected.has(num)) {
      circleToothNumber(page, topX + i * step + 6.2, bottomY + 3.4);
    }
  });

  if (fields.adminField3) drawCheckMarkAt(page, adminCheckX, 346.7);
  if (fields.adminField4) drawCheckMarkAt(page, adminCheckX, 330.9);
  drawFittedTextAt(
    page,
    fields.adminField5 ? String(fields.adminField5) : "",
    adminValueX,
    328.7,
    adminValueSize,
    fonts.times,
    120,
  );

  if (fields.adminField6) drawCheckMarkAt(page, adminCheckX, 316.0);
  drawFittedTextAt(
    page,
    fields.adminField6 ? fields.adminField7 : "",
    adminValueX,
    314.0,
    adminValueSize,
    fonts.times,
    145,
  );

  if (fields.adminField8) drawCheckMarkAt(page, adminCheckX, 302.1);
  drawFittedTextAt(
    page,
    fields.adminField8 ? fields.adminField9 : "",
    adminValueX,
    299.1,
    adminValueSize,
    fonts.times,
    145,
  );

  const remarkText = (fields.adminField10 || "").replace(/\s+/g, " ").trim();
  const remarkLines = wrapTextByCharLimit(remarkText, 43);
  const remarkStartY = 213.1;
  const remarkLineStep = 14.7;

  remarkLines.forEach((line, index) => {
    drawTextAt(
      page,
      line,
      56.5,
      remarkStartY - index * remarkLineStep,
      9.6,
      fonts.times,
    );
  });
}

export async function createCertificatePdf({
  request,
  fields,
}: CertificatePdfInput) {
  const templateResponse = await fetch(
    "/certificate-template/Dental-Cert-Calauag-Quezon.pdf",
  );
  if (!templateResponse.ok) {
    throw new Error("Unable to load certificate PDF template.");
  }

  const templateBytes = await templateResponse.arrayBuffer();
  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPages()[0];

  const timesFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  drawCertificateOverlay(page, { times: timesFont }, request, fields);

  return await pdfDoc.save();
}
