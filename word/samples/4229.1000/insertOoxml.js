var ctx = new Word.WordClientContext();
var range = ctx.document.selection;

var ooxmlText =
    "<w:p xmlns:w='http://schemas.microsoft.com/office/word/2003/wordml'><w:r><w:rPr><w:b/><w:b-cs/><w:color w:val='FF0000'/><w:sz w:val='28'/><w:sz-cs w:val='28'/></w:rPr><w:t>Hello world (this should be bold, red, size 14).</w:t></w:r></w:p>";

range.insertOoxml(ooxmlText, Word.InsertLocation.end);

ctx.executeAsync().then(
     function () {
         console.log("Success");
     },
     function (result) {
         console.log("Failed: ErrorCode=" + result.errorCode + ", ErrorMessage=" + result.errorMessage);
         console.log(result.traceMessages);
     }
);
