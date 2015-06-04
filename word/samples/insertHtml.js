var ctx = new Word.WordClientContext();
var range = ctx.document.selection;

var htmlText =
    "<h1><strong>Insert Html</strong></h1>" +
    "<h2><em>Office Extensibility Platform</em></h2>" +
    "<p>This is an example of how the InsertHtml method works.</p>" +
    "<table>" +
        "<tr><td>Check</td><td>out</td></tr>" +
        "<tr><td>this</td><td>table</td></tr>" +
    "</table>";

range.insertHtml(htmlText, Word.InsertLocation.end);

ctx.executeAsync().then(
     function () {
         console.log("Success");
     },
     function (result) {
         console.log("Failed: ErrorCode=" + result.errorCode + ", ErrorMessage=" + result.errorMessage);
         console.log(result.traceMessages);
     }
);
