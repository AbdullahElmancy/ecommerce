export const generateContent = (data:any = "")=>{
    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
          }
          h1 {
            color: #d32f2f;
            text-align: center;
          }
          p {
            font-size: 14px;
          }
          .invoice {
            border: 1px solid #ccc;
            padding: 20px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        <div class="invoice">
          <p><strong>Name:</strong> ${data.full_name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>id:</strong> ${data._id}</p>
        </div>
      </body>
    </html>
  `;
  return htmlContent
}