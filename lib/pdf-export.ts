import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportToPDF = async (
  element: HTMLElement,
  filename: string = "resume.pdf"
) => {
  try {
    // Create a clone of the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;

    // Set background to white for PDF
    clone.style.backgroundColor = "white";
    clone.style.margin = "0";
    clone.style.padding = "20px";

    // Replace oklch colors with hex equivalents for PDF compatibility
    const replaceOklchColors = (element: HTMLElement) => {
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_ELEMENT,
        null
      );

      let node;
      while ((node = walker.nextNode())) {
        const el = node as HTMLElement;
        const computedStyle = window.getComputedStyle(el);

        // Replace background colors
        const bgColor = computedStyle.backgroundColor;
        if (bgColor.includes("oklch")) {
          el.style.backgroundColor = "#ffffff";
        }

        // Replace text colors
        const textColor = computedStyle.color;
        if (textColor.includes("oklch")) {
          // Map common oklch colors to hex
          if (textColor.includes("gray")) {
            el.style.color = "#6b7280"; // gray-500
          } else if (textColor.includes("blue")) {
            el.style.color = "#3b82f6"; // blue-500
          } else if (textColor.includes("green")) {
            el.style.color = "#10b981"; // green-500
          } else if (textColor.includes("purple")) {
            el.style.color = "#8b5cf6"; // purple-500
          } else if (textColor.includes("red")) {
            el.style.color = "#ef4444"; // red-500
          } else {
            el.style.color = "#000000"; // fallback to black
          }
        }

        // Replace border colors
        const borderColor = computedStyle.borderColor;
        if (borderColor.includes("oklch")) {
          if (borderColor.includes("gray")) {
            el.style.borderColor = "#d1d5db"; // gray-300
          } else if (borderColor.includes("blue")) {
            el.style.borderColor = "#3b82f6"; // blue-500
          } else if (borderColor.includes("green")) {
            el.style.borderColor = "#10b981"; // green-500
          } else if (borderColor.includes("purple")) {
            el.style.borderColor = "#8b5cf6"; // purple-500
          } else {
            el.style.borderColor = "#d1d5db"; // fallback to gray-300
          }
        }
      }
    };

    // Apply color replacements
    replaceOklchColors(clone);

    // Temporarily append to body for rendering
    document.body.appendChild(clone);
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";

    // Convert to canvas with specific options to avoid oklch issues
    const canvas = await html2canvas(clone, {
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: clone.scrollWidth,
      height: clone.scrollHeight,
      logging: false, // Disable logging to reduce noise
      removeContainer: true, // Clean up after rendering
    });

    // Remove the clone
    document.body.removeChild(clone);

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    let position = 0;

    // Add image to PDF
    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    );
    heightLeft -= pageHeight;

    // Add new pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);

    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);

    // Fallback: Try with a simpler approach
    try {
      console.log("Attempting fallback PDF generation...");

      // Create a simpler clone with basic styling
      const simpleClone = element.cloneNode(true) as HTMLElement;
      simpleClone.style.backgroundColor = "white";
      simpleClone.style.color = "black";
      simpleClone.style.fontFamily = "Arial, sans-serif";
      simpleClone.style.fontSize = "12px";
      simpleClone.style.lineHeight = "1.4";
      simpleClone.style.margin = "0";
      simpleClone.style.padding = "20px";

      // Remove all complex styling that might cause issues
      const allElements = simpleClone.querySelectorAll("*");
      allElements.forEach((el) => {
        const element = el as HTMLElement;
        // Keep only essential styles
        element.style.backgroundColor =
          element.style.backgroundColor || "transparent";
        element.style.color = element.style.color || "black";
        element.style.border = element.style.border || "none";
        element.style.boxShadow = "none";
        element.style.textShadow = "none";
        element.style.filter = "none";
        element.style.transform = "none";
      });

      document.body.appendChild(simpleClone);
      simpleClone.style.position = "absolute";
      simpleClone.style.left = "-9999px";
      simpleClone.style.top = "0";

      const fallbackCanvas = await html2canvas(simpleClone, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        removeContainer: true,
      });

      document.body.removeChild(simpleClone);

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight =
        (fallbackCanvas.height * imgWidth) / fallbackCanvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(
        fallbackCanvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(
          fallbackCanvas.toDataURL("image/png"),
          "PNG",
          0,
          heightLeft - imgHeight,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
      }

      pdf.save(filename);
      return true;
    } catch (fallbackError) {
      console.error("Fallback PDF generation also failed:", fallbackError);
      return false;
    }
  }
};

export const printResume = (element: HTMLElement) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return false;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Resume</title>
        <style>
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
          @media print {
            body { padding: 0; }
            * { -webkit-print-color-adjust: exact !important; }
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();

  // Wait for content to load then print
  printWindow.onload = () => {
    printWindow.print();
    printWindow.close();
  };

  return true;
};
