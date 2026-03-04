const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Serverless URL Shortener API",
    version: "1.0.0",
    description: "API Documentation for Link-Shortener project"
  },
  paths: {
    "/shorten": {
      post: {
        summary: "Tạo link rút gọn",
        responses: { "200": { description: "Thành công" } }
      }
    },
    "/{shortCode}": {
      get: {
        summary: "Điều hướng đến URL gốc",
        responses: { "301": { description: "Redirect" } }
      }
    }
  }
};

module.exports.handler = async () => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>API Docs</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            SwaggerUIBundle({
              spec: ${JSON.stringify(swaggerDocument)},
              dom_id: '#swagger-ui',
            });
          };
        </script>
    </body>
    </html>`;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html,
  };
};