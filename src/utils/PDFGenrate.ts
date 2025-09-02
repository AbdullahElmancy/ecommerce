import puppeteer from "puppeteer";
import { generateContent } from './PDFContent';

export const generatePDF = async (data:any) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const content = generateContent(data)
  // Load HTML content directly
  await  page.setContent(content, { waitUntil: "networkidle0" });

  // Save PDF
  await page.pdf({
    path: "src/uploads/invoice.pdf",  // output file
    format: "A4",         // page size
    printBackground: true // keep CSS backgrounds/colors
  });

  await browser.close();
  console.log("✅ PDF generated: invoice.pdf");
};

