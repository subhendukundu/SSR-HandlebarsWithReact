import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../shared/App";

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <head>
        <title>Universal Reacl</title>
        <link rel="stylesheet" href="/css/main.css">
        <script src="/bundle.js" defer></script>
        <script type="text/javascript" src="../jquery-3.2.1.min"></script>
        <script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossorigin="anonymous"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.10/handlebars.runtime.min.js"></script>
        <script type="text/javascript" src="precomp.js"></script>
        <script type="text/javascript">
         $("document").ready(function() {
           // When the template is compiled it is added to Handlebars.templates
            var renderer = Handlebars.templates["precomp"];
            
            // call the compiled function with the template data
            var result = renderer({
                "item" : "Whisper 4000 in-home heater and dog walker",
                "description" : "Walk your dog and heat your house at the same time? Now you can, with the Whisper 4000 Home Heating system / Dog Treadmill!",
                "price" : 895.99,
                "inStock" : true,
                "quantity" : 100
            });
            
            $("#container").html(result);
         });
        </script>
      </head>

      <body>
        <div id="root">${renderToString(<App />)}
          <div id="container"></div>
        </div>
      </body>
    </html>
  `);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});
