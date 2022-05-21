import PdfPrinter from "pdfmake";
import striptags from "striptags";
import axios from "axios";

const fonts = {
  Roboto: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
  },
};

const printer = new PdfPrinter(fonts);

export const getPDFReadableStream = async (media) => {
  let imagePart = {};
  if (media.Poster) {
    const response = await axios.get(media.Poster, {
      responseType: "arraybuffer",
    });
    console.log("Response ", response);
    const mediaPosterURLParts = media.Poster.split("/");
    const fileName = mediaPosterURLParts[mediaPosterURLParts.length - 1];
    const [id, extension] = fileName.split(".");
    const base64 = response.data.toString("base64");
    const base64Image = `data:image/${extension};base64,${base64}`;
    imagePart = { image: base64Image, width: 400, margin: [0, 0, 0, 40] };
  }

  const mediasDefinition = {
    content: [
      imagePart,
      {
        text: `Title : ${media.Title}`,
        style: "header",
      },
      { text: media.Type, lineHeight: 1.5 },

      {
        text: media.reviews
          .map((review) => ` Review: ${review.comment} ${review.rate}`)
          .join("\n"),
        lineHeight: 1.5,
        style: "subheader",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      small: {
        fontSize: 8,
      },
      defaultStyle: {
        font: "Helvetica",
      },
    },
  };

  const pdfReadableStream = printer.createPdfKitDocument(mediasDefinition, {});

  pdfReadableStream.end();

  return pdfReadableStream;
};
