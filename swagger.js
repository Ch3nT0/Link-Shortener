const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Serverless URL Shortener API",
    version: "1.0.0"
  },
  servers: [
    {
      url: "https://qe8riffx66.execute-api.us-east-1.amazonaws.com/dev",
      description: "Development server"
    },
  ],
  paths: {
    "/shorten": {
      post: {
        summary: "Tạo link rút gọn",
        responses: { "200": { description: "Thành công" } },
        // Thêm phần này để hiện ô nhập liệu (Input)
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  longUrl: {
                    type: "string",
                    example: "https://google.com"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/{shortCode}": {
      get: {
        summary: "Truy cập link ngắn",
        parameters: [
          {
            name: "shortCode",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
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